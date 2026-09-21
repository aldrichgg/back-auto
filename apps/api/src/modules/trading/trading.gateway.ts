import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: '/',
})
export class TradingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(TradingGateway.name);

  constructor(private readonly jwtService: JwtService) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth?.token as string;
      if (!token) { client.disconnect(); return; }
      this.jwtService.verify(token);
      this.logger.log(`Client connected: ${client.id}`);
    } catch {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join:market')
  handleJoinMarket(
    @MessageBody() data: { assetId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(`market:${data.assetId}`);
    return { joined: true, room: `market:${data.assetId}` };
  }

  @SubscribeMessage('leave:market')
  handleLeaveMarket(
    @MessageBody() data: { assetId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(`market:${data.assetId}`);
  }

  // Called by TradingService after order execution
  emitOrderBookUpdate(assetId: string, orderBook: any) {
    this.server.to(`market:${assetId}`).emit('orderbook:update', orderBook);
  }

  emitTradeExecuted(assetId: string, trade: any) {
    this.server.to(`market:${assetId}`).emit('trade:executed', trade);
  }

  emitPriceTick(assetId: string, tick: any) {
    this.server.to(`market:${assetId}`).emit('price:tick', tick);
  }

  emitUserNotification(userId: string, notification: any) {
    this.server.to(`user:${userId}`).emit('notification', notification);
  }
}

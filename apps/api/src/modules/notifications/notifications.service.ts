import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface NotificationPayload {
  userId: string;
  title: string;
  body: string;
  data?: Record<string, string>;
}

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(private readonly config: ConfigService) {}

  async sendPush(payload: NotificationPayload): Promise<void> {
    // TODO: Integrate Firebase Admin SDK
    // const message = { notification: { title, body }, data, token: userFcmToken };
    // await admin.messaging().send(message);
    this.logger.log(`[PUSH] ${payload.userId}: ${payload.title}`);
  }

  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    // TODO: Integrate SendGrid
    // await sgMail.send({ to, from: this.config.get('EMAIL_FROM'), subject, html });
    this.logger.log(`[EMAIL] → ${to}: ${subject}`);
  }

  async sendSms(to: string, body: string): Promise<void> {
    // TODO: Integrate Twilio
    // const client = twilio(accountSid, authToken);
    // await client.messages.create({ body, from: twilioPhone, to });
    this.logger.log(`[SMS] → ${to}: ${body}`);
  }
}

import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
@Controller('admin')
export class AdminController {
  // 1. Dashboard KPIs
  @Get('dashboard/kpi')
  @ApiOperation({ summary: 'Get Master Dashboard KPIs' })
  getDashboardKpis() {
    return {
      totalUsers: 15420,
      activeUsers: 8400,
      totalDrops: 45,
      activeDrops: 12,
      totalInvested: 15000000,
      monthlyRevenue: 250000,
    };
  }

  // 2. Drops Management
  @Get('drops')
  @ApiOperation({ summary: 'List all drops' })
  getDrops() {
    return [
      { id: 1, name: 'Ferrari F8 Tributo', status: 'FUNDING', raised: 250000, goal: 350000 },
      { id: 2, name: 'Porsche 911 GT3', status: 'ACTIVE', raised: 200000, goal: 200000 },
    ];
  }

  @Get('drops/:id')
  @ApiOperation({ summary: 'Get drop details' })
  getDropDetails(@Param('id') id: string) {
    return { id, name: 'Ferrari F8 Tributo', status: 'FUNDING', details: {} };
  }

  @Post('drops/:id/compliance')
  @ApiOperation({ summary: 'Submit drop compliance check' })
  submitDropCompliance(@Param('id') id: string, @Body() body: any) {
    return { id, status: 'COMPLIANCE_REVIEW_PENDING' };
  }

  // 3. Telemetry & Operations
  @Get('terminal/telemetry')
  @ApiOperation({ summary: 'Get fleet telemetry data' })
  getTelemetry() {
    return {
      activeVehicles: 5,
      alerts: 2,
      data: [{ vehicleId: 'V001', speed: 120, location: 'SP' }],
    };
  }

  // 4. Compliance & Alerts
  @Get('compliance/alerts')
  @ApiOperation({ summary: 'Get compliance alerts' })
  getComplianceAlerts() {
    return [
      { id: 1, type: 'KYC_EXPIRED', userId: 'U123', severity: 'HIGH' },
      { id: 2, type: 'AML_FLAG', userId: 'U456', severity: 'CRITICAL' },
    ];
  }

  // 5. Custody & Inventory
  @Get('custody/bunkers')
  @ApiOperation({ summary: 'List physical bunkers' })
  getBunkers() {
    return [
      { id: 'B1', location: 'São Paulo', capacity: 20, currentLoad: 15 },
      { id: 'B2', location: 'Miami', capacity: 50, currentLoad: 12 },
    ];
  }

  // 6. Users & Roles (Super Admin Only for Role Changes)
  @Get('users')
  @ApiOperation({ summary: 'List platform users' })
  getUsers() {
    return [
      { id: 'U1', name: 'John Doe', role: 'user' },
      { id: 'U2', name: 'Admin Silva', role: 'admin' },
    ];
  }

  @Patch('users/:id/role')
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Change user role (SUPER_ADMIN only)' })
  changeUserRole(@Param('id') id: string, @Body() body: { role: UserRole }) {
    return { id, newRole: body.role, status: 'SUCCESS' };
  }

  // 7. Finance
  @Get('finance/profits')
  @ApiOperation({ summary: 'Get profit distribution reports' })
  getProfits() {
    return {
      totalDistributed: 500000,
      nextDistributionDate: '2026-10-01',
      pendingAmount: 25000,
    };
  }
}

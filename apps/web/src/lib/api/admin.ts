import { apiClient } from './client';

// ── Admin KPIs ────────────────────────────────────────────────
export async function getAdminDashboard() {
  const { data } = await apiClient.get('/admin/dashboard');
  return data;
}

// ── Users ─────────────────────────────────────────────────────
export async function getAdminUsers(params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  tier?: string;
  kycStatus?: string;
}) {
  const { data } = await apiClient.get('/admin/users', { params });
  return data;
}

export async function updateAdminUser(
  userId: string,
  payload: {
    tier?: string;
    kycStatus?: string;
    isActive?: boolean;
    dailyLimit?: number;
  },
) {
  const { data } = await apiClient.patch(`/admin/users/${userId}`, payload);
  return data;
}

// ── Assets / Catálogo ─────────────────────────────────────────
export async function getAdminAssets(params?: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}) {
  const { data } = await apiClient.get('/admin/assets', { params });
  return data;
}

export async function createAdminAsset(payload: {
  vin: string;
  name: string;
  year: number;
  make?: string;
  model?: string;
  color?: string;
  description?: string;
  totalFractions: number;
  fractionPrice: number;
  yieldTarget?: number;
  investmentTermMonths?: number;
  custodyLocation?: string;
  thumbnailUrl?: string;
}) {
  const { data } = await apiClient.post('/admin/assets', payload);
  return data;
}

export async function updateAdminAsset(assetId: string, payload: Record<string, unknown>) {
  const { data } = await apiClient.patch(`/admin/assets/${assetId}`, payload);
  return data;
}

export async function publishAssetDrop(assetId: string, ipoExpiresAt: string) {
  const { data } = await apiClient.post(`/admin/assets/${assetId}/publish`, {
    ipoExpiresAt,
  });
  return data;
}

// ── Compliance ────────────────────────────────────────────────
export async function getKycQueue(params?: { page?: number; limit?: number; status?: string }) {
  const { data } = await apiClient.get('/admin/compliance/kyc-queue', { params });
  return data;
}

export async function approveKyc(userId: string) {
  const { data } = await apiClient.post(`/admin/compliance/kyc/${userId}/approve`);
  return data;
}

export async function rejectKyc(userId: string, reason: string) {
  const { data } = await apiClient.post(`/admin/compliance/kyc/${userId}/reject`, {
    reason,
  });
  return data;
}

export async function getComplianceReports() {
  const { data } = await apiClient.get('/admin/compliance/reports');
  return data;
}

export async function getAuditLogs(params?: { page?: number; limit?: number }) {
  const { data } = await apiClient.get('/admin/compliance/audit-logs', { params });
  return data;
}

// ── Custódia ─────────────────────────────────────────────────
export async function getCustodyAssets() {
  const { data } = await apiClient.get('/admin/custody/assets');
  return data;
}

export async function getTelemetryStream() {
  const { data } = await apiClient.get('/admin/custody/telemetry');
  return data;
}

// ── Lucros / DRE ─────────────────────────────────────────────
export async function getRevenueDashboard() {
  const { data } = await apiClient.get('/admin/revenue');
  return data;
}

export async function getDividendCalendar() {
  const { data } = await apiClient.get('/admin/revenue/dividends');
  return data;
}

export async function distributeDividends(assetId: string) {
  const { data } = await apiClient.post(`/admin/revenue/dividends/${assetId}/distribute`);
  return data;
}

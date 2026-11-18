import { getActiveUser, hasRoleLevel, requireFacilityScope } from './authz.js';

// 練習用の仮データ
const SALES = { sankara: 12000000, samana: 9800000, plaza: 15000000 };
const BUDGET = { sankara: 11000000, samana: 10000000, plaza: 14000000 };
const OCCUPANCY = { sankara: 82, samana: 76, plaza: 91 }; // 稼働率（%）

// 売上を返す（お手本：認証 → 施設スコープ の順に確認している）
export function getSales(email, facility) {
  const user = getActiveUser(email);
  if (!user) return { status: 401, error: 'unauthorized' };

  const denied = requireFacilityScope(user, facility);
  if (denied) return denied;

  return { status: 200, body: { facility, sales: SALES[facility] ?? null } };
}

// 予算を返す（練習ルール：manager 以上だけ）
// 認証 → ロール → 施設スコープ の順に確認する
export function getBudget(email, facility) {
  const user = getActiveUser(email);
  if (!user) return { status: 401, error: 'unauthorized' };

  if (!hasRoleLevel(user, 'manager')) return { status: 403, error: 'forbidden role' };

  const denied = requireFacilityScope(user, facility);
  if (denied) return denied;

  return { status: 200, body: { facility, budget: BUDGET[facility] ?? null } };
}

// 稼働率を返す（reservation 以上だけ）
// 認証 → ロール → 施設スコープ の順に確認する
export function getOccupancy(email, facility) {
  const user = getActiveUser(email);
  if (!user) return { status: 401, error: 'unauthorized' };

  if (!hasRoleLevel(user, 'reservation')) return {status: 403, error: 'forbidden role' };

  const denied = requireFacilityScope(user, facility);
  if (denied) return denied;

  return { status: 200, body: { facility, occupancy: OCCUPANCY[facility] ?? null } };
}

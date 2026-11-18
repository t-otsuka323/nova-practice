// 練習用ミニ認可（NOVA本番の core/authz.js を小さくした写し）
export const ROLE_LEVEL = { staff: 1, reservation: 2, manager: 3, admin: 4 };
export const FACILITIES = ['sankara', 'samana', 'senvie', 'sakurai', 'plaza', 'land', 'graciani', 'terrace', 'dijest'];

// 本番では D1 の users テーブル。ここでは練習用の仮ユーザー
export const USERS = {
  'staff-sankara@example.com': { role: 'staff', facility_id: 'sankara', is_active: 1 },
  'reservation-samana@example.com': { role: 'reservation', facility_id: 'samana', is_active: 1 },
  'manager-plaza@example.com': { role: 'manager', facility_id: 'plaza', is_active: 1 },
  'admin-all@example.com': { role: 'admin', facility_id: 'all', is_active: 1 },
  'newbie@example.com': { role: null, facility_id: null, is_active: 0 },
};

// 登録済み・承認済み・ロールあり、の3つが揃った人だけ通す（fail-closed）
export function getActiveUser(email) {
  const user = USERS[email];
  if (!user || user.is_active !== 1) return null;
  if (!(user.role in ROLE_LEVEL)) return null;
  return { email, ...user };
}

// ロールの強さを比べる（minRole 以上か）
export function hasRoleLevel(user, minRole) {
  return ROLE_LEVEL[user.role] >= ROLE_LEVEL[minRole];
}

// その施設を触ってよいか。null なら OK、オブジェクトならエラー応答
export function requireFacilityScope(user, facility) {
  if (!FACILITIES.includes(facility)) return { status: 400, error: 'invalid facility' };
  if (user.facility_id !== 'all' && user.facility_id !== facility) {
    return { status: 403, error: 'forbidden facility' };
  }
  return null;
}

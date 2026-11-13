// 施設IDから施設名を返す関数
export function getFacilityName(facilityId) {
  const names = {
    sankara: 'sankara hotel & spa 屋久島',
    samana: 'samana hotel YAKUSHIMA',
    plaza: '奈良プラザホテル',
    sakurai: 'ホテル奈良さくらいの郷',
  };
  return names[facilityId] ?? null;
}

// 施設IDが有効かどうかチェックする関数
export function isValidFacility(facilityId) {
  const validIds = ['sankara', 'samana', 'plaza', 'sakurai', 'land'];
  return validIds.includes(facilityId);
}

// 客室数を返す関数
export function getRoomCount(facilityId) {
  const rooms = {
    sankara: 29,
    samana: 43,
    plaza: 79,
    sakurai: 40,
  };
  return rooms[facilityId] ?? null;
}
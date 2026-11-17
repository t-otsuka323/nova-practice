import { test, describe } from 'node:test';
import assert from 'node:assert';
import {
  getFacilityName,
  isValidFacility,
  getRoomCount,
  getFacilityType,
} from '../src/hotel.js';

describe('getFacilityName', () => {
  test('sankara の施設名が正しく返る', () => {
    assert.strictEqual(
      getFacilityName('sankara'),
      'sankara hotel & spa 屋久島'
    );
  });

  test('plaza の施設名が正しく返る', () => {
    assert.strictEqual(getFacilityName('plaza'), '奈良プラザホテル');
  });

  test('存在しない施設IDは null を返す', () => {
    assert.strictEqual(getFacilityName('unknown'), null);
  });
});

describe('isValidFacility', () => {
  test('plaza は有効な施設ID', () => {
    assert.strictEqual(isValidFacility('plaza'), true);
  });

  test('存在しない施設IDは無効', () => {
    assert.strictEqual(isValidFacility('unknown'), false);
  });
});



describe('getRoomCount', () => {
  test('samana の客室数が返る', () => {
    assert.strictEqual(getRoomCount('samana'), 43);
  });

  test('存在しない施設は null を返す', () => {
    assert.strictEqual(getRoomCount('unknown'), null);
  });

  test('plaza の客室数が返る', () => {
    assert.strictEqual(getRoomCount('plaza'), 79);
  });
});

describe('getFacilityType', () => {
  for (const id of ['sankara', 'samana', 'plaza', 'sakurai']) {
    test(`${id} の種別は hotel`, () => {
      assert.strictEqual(getFacilityType(id), 'hotel');
    });
  }

  test('dijest の種別は bar', () => {
    assert.strictEqual(getFacilityType('dijest'), 'bar');
  });

  test('存在しない施設IDは null を返す', () => {
    assert.strictEqual(getFacilityType('unknown'), null);
  });

  test('land は種別が未定義のため null を返す', () => {
    assert.strictEqual(getFacilityType('land'), null);
  });
});
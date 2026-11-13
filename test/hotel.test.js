import { test, describe } from 'node:test';
import assert from 'node:assert';
import { getFacilityName, isValidFacility, getRoomCount } from '../src/hotel.js';

describe('getFacilityName', () => {
  test('sankara の施設名が正しく返る', () => {
    assert.strictEqual(
      getFacilityName('sankara'),
      'sankara hotel & spa 屋久島'
    );
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
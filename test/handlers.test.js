import { test, describe } from 'node:test';
import assert from 'node:assert';
import { getSales, getBudget, getOccupancy } from '../src/handlers.js';

describe('getSales（お手本）', () => {
  test('未登録の人は 401', () => {
    assert.strictEqual(getSales('nobody@example.com', 'sankara').status, 401);
  });
  test('未承認（is_active=0）の人は 401', () => {
    assert.strictEqual(getSales('newbie@example.com', 'sankara').status, 401);
  });
  test('自分の施設は 200', () => {
    assert.strictEqual(getSales('staff-sankara@example.com', 'sankara').status, 200);
  });
  test('担当外の施設は 403', () => {
    assert.strictEqual(getSales('staff-sankara@example.com', 'plaza').status, 403);
  });
  test('存在しない施設IDは 400', () => {
    assert.strictEqual(getSales('staff-sankara@example.com', 'unknown').status, 400);
  });
  test('全施設担当（all）は他の施設も 200', () => {
    assert.strictEqual(getSales('admin-all@example.com', 'plaza').status, 200);
  });
});

describe('getBudget（穴あき）', () => {
  test('未ログインは 401', () => {
    assert.strictEqual(getBudget('nobody@example.com', 'sankara').status, 401);
  });
  test('staff はロール不足で 403', () => {
    assert.strictEqual(getBudget('staff-sankara@example.com', 'sankara').status, 403);
  });
  test('manager は自分の施設なら 200', () => {
    assert.strictEqual(getBudget('manager-plaza@example.com', 'plaza').status, 200);
  });
  test('manager でも担当外の施設は 403', () => {
    assert.strictEqual(getBudget('manager-plaza@example.com', 'sankara').status, 403);
  });
  test('全施設担当（all）の admin は 200', () => {
    assert.strictEqual(getBudget('admin-all@example.com', 'samana').status, 200);
  });
  test('reservation は manager 未満なのでロール不足で 403', () => {
    assert.strictEqual(getBudget('reservation-samana@example.com', 'samana').status, 403);
  });
});

describe('getOccupancy', () => {
  test('未ログインは 401', () => {
    assert.strictEqual(getOccupancy('nobody@example.com', 'sankara').status, 401);
  });
  test('staff はロール不足で 403', () => {
    assert.strictEqual(getOccupancy('staff-sankara@example.com', 'sankara').status, 403);
  });
  test('reservation 以上（manager）は自分の施設なら 200', () => {
    assert.strictEqual(getOccupancy('manager-plaza@example.com', 'plaza').status, 200);
  });
  test('reservation（境界のロール）は自分の施設なら 200', () => {
    assert.strictEqual(getOccupancy('reservation-samana@example.com', 'samana').status, 200);
  });
  test('施設を絞った manager でも担当外の施設は 403', () => {
    assert.strictEqual(getOccupancy('manager-plaza@example.com', 'sankara').status, 403);
  });
  test('存在しない施設IDは 400', () => {
    assert.strictEqual(getOccupancy('manager-plaza@example.com', 'unknown').status, 400);
  });
  test('全施設担当（all）の admin は他の施設も 200', () => {
    assert.strictEqual(getOccupancy('admin-all@example.com', 'samana').status, 200);
  });
});

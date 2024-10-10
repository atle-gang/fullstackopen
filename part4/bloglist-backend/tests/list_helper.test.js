const { test, describe } = require('node:test');
const assert = require('node:assert');
const res = require('express/lib/response');
const listHelper = require('../utils/list_helper');

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});
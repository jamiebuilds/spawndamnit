// @flow
'use strict';
const test = require('ava');
const fixtures = require('fixturez');
const spawn = require('./');
const f = fixtures(__dirname, { root: __dirname });

test('argv', async t => {
  let { code, stdout, stderr } = await spawn('node', [f.find('argv.js'), 'foo', 'bar']);
  t.is(code, 0);
  t.deepEqual(stdout, Buffer.from('foo bar'));
  t.deepEqual(stderr, Buffer.from(''));
});

test('event: stdout', async t => {
  t.plan(1);
  let child = spawn('node', [f.find('stdout.js')]);
  child.on('stdout', data => t.deepEqual(data, Buffer.from('some stdout')));
  child.on('stderr', data => t.fail('stderr: ' + data));
  await child;
});

test('event: stderr', async t => {
  t.plan(1);
  let child = spawn('node', [f.find('stderr.js')]);
  child.on('stdout', data => t.fail('stdout: ' + data));
  child.on('stderr', data => t.deepEqual(data, Buffer.from('some stderr')));
  await child;
});

test('exit code 0', async t => {
  let res = await spawn('node', [f.find('exit0.js')]);
  t.is(res.code, 0);
  t.deepEqual(res.stdout, Buffer.from('some stdout'));
  t.deepEqual(res.stderr, Buffer.from('some stderr'));
});

test('exit code 1', async t => {
  let { code, stdout, stderr } = await spawn('node', [f.find('exit1.js')]);
  t.is(code, 1);
  t.deepEqual(stdout, Buffer.from('some stdout'));
  t.deepEqual(stderr, Buffer.from('some stderr'));
});

test('encoding: utf-8', async t => {
  let res = await spawn('node', [f.find('exit0.js')], { encoding: "utf-8" });
  t.is(res.code, 0);
  t.deepEqual(res.stdout, 'some stdout');
  t.deepEqual(res.stderr, 'some stderr');
});

test('encoding: buffer', async t => {
  let res = await spawn('node', [f.find('exit0.js')], { encoding: "utf-8" });
  t.is(res.code, 0);
  t.deepEqual(res.stdout, Buffer.from('some stdout'));
  t.deepEqual(res.stderr, Buffer.from('some stderr'));
});

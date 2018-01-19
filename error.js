// @flow
'use strict';

class ChildProcessError extends Error {
  /*::
  code: number;
  stdout: Buffer;
  stderr: Buffer;
  */
  constructor(opts /*: { code: number, stdout: Buffer, stderr: Buffer } */) {
    super('Child process error');
    this.code = opts.code;
    this.stdout = opts.stdout;
    this.stderr = opts.stderr;
  }
}

module.exports = ChildProcessError;

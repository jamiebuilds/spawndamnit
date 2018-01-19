# spawndamnit

> Take care of your `spawn()`

## Features

- Returns an `await`-able promise
- Collects `stdout` and `stderr` buffers
- Emits events "stdout" and "stderr"
- Automatically kills all spawn processes when parent process dies

## Installation

```sh
yarn add spawndamnit
```

## Usage

**Basic:**

```js
const spawn = require('spawndamnit');

async function main() {
  await spawn('npm', ['star', 'spawndamnit']);
}
```

**With events and resolved values:**

```js
const spawn = require('spawndamnit');

async function main() {
  let child = spawn('npm', ['star', 'spawndamnit']);

  child.on('stdout', data => console.log(data.toString()));
  child.on('stderr', data => console.error(data.toString()));

  let { code, stdout, stderr } = await child;
  // ...
}
```

**With errors:**

```js
const spawn = require('spawndamnit');

async function main() {
  try {
    await spawn('npm', ['star', 'spawndamnit']);
  } catch (err) {
    if (err instanceof spawn.ChildProcessError) {
      let { code, stdout, stderr } = err;
      // ...
    }
  }
}
```

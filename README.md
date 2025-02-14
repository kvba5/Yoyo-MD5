# JavaScript MD5

## Contents

- [Demo](https://kvba5.github.io/Yoyo-MD5/)
- [Description](#description)
- [Usage](#usage)
  - [Client-side](#client-side)
  - [Server-side](#server-side)
- [Requirements](#requirements)
- [API](#api)
- [Tests](#tests)
- [License](#license)

## Description

Yoyo [MD5](https://en.wikipedia.org/wiki/MD5) implementation.  
Compatible with server-side environments like [Node.js](https://nodejs.org/),
module loaders like [RequireJS](https://requirejs.org/) or
[webpack](https://webpack.js.org/) and all web browsers.  

This fork is modified version of MD5 used by Yoyo for hashing GM runners.

## Usage

### Client-side

Install the package with [NPM](https://www.npmjs.org/):

```sh
# npm
npm install https://github.com/kvba5/Yoyo-MD5
# pnpm
pnpm install https://github.com/kvba5/Yoyo-MD5
# bun
bun add https://github.com/kvba5/Yoyo-MD5
```

Include the (minified) JavaScript [MD5](https://en.wikipedia.org/wiki/MD5)
script in your JS code:

```js
import { yoyomd5 } from "js/md5.min.js"
```

In your application code, calculate the
([hex](https://en.wikipedia.org/wiki/Hexadecimal)-encoded)
[MD5](https://en.wikipedia.org/wiki/MD5) hash of a string by calling the **yoyomd5**
method with the string as argument:

```js
const hash = yoyomd5('string') // "<yoyo-md5 byte string>"
```

### Server-side

The following is an example how to use the JavaScript MD5 module on the
server-side with [Node.js](https://nodejs.org/).

Install the package with [NPM](https://www.npmjs.org/):

```sh
# npm
npm install https://github.com/kvba5/Yoyo-MD5
# pnpm
pnpm install https://github.com/kvba5/Yoyo-MD5
# bun
bun add https://github.com/kvba5/Yoyo-MD5
```

Import module using the following code:

```js
import { yoyomd5 } from "yoyo-md5"
```

## Requirements

The JavaScript MD5 script has zero dependencies.

## API

This fork has been stripped from any other API that Javascript-MD5 used. Instead there's only one exposed function `yoyomd5` for generating byte string of the value you provide.

```js
const hash = yoyomd5('string') // "<yoyo-md5 byte string>"
```

You can of course then base64 it by using:
```js
// node.js
const base64hash = hash.toString("base64")
// browser
const base64hash = btoa(hash)
```


## Tests

All original tests of Javascript-MD5 have been replaced with ones that are needed for proper generation of Yoyo MD5 hashing. For original tests please visit [original source code](https://github.com/blueimp/JavaScript-MD5).

## License

The Yoyo MD5 script is released under the
[MIT license](https://opensource.org/licenses/MIT) just like it's original project.

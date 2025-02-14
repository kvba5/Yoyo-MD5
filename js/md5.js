const K = new Int32Array([
  -680876936, -389564586, 606105819, -1044525330, -176418897, 1200080426, -1473231341, -45705983,
  1770035416, -1958414417, -42063, -1990404162, 1804603682, -40341101, -1502002290, 1236535329,
  -165796510, -1069501632, 643717713, -373897302, -701558691, 38016083, -660478335, -405537848,
  568446438, -1019803690, -187363961, 1163531501, -1444681467, -51403784, 1735328473, -1926607734,
  -378558, -2022574463, 1839030562, -35309556, -1530992060, 1272893353, -155497632, -1094730640,
  681279174, -358537222, -722521979, 76029189, -640364487, -421815835, 530742520, -995338651,
  -198630844, 1126891415, -1416354905, -57434055, 1700485571, -1894986606, -1051523, -2054922799,
  1873313359, -30611744, -1560198380, 1309151649, -145523070, -1120210379, 718787259, -343485551
]);

const S = new Uint8Array([
  7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
  5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
  4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
  6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21
]);


const safeAdd = (x, y) => {
  const lsw = (x & 0xffff) + (y & 0xffff);
  const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xffff);
};

const bitRotateLeft = (num, cnt) => (num << cnt) | (num >>> (32 - cnt));


const md5cmn = (q, a, b, x, s, t) => safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);


const md5ff = (a, b, c, d, x, s, t) => md5cmn((b & c) | (~b & d), a, b, x, s, t);
const md5gg = (a, b, c, d, x, s, t) => md5cmn((b & d) | (c & ~d), a, b, x, s, t);
const md5hh = (a, b, c, d, x, s, t) => md5cmn(b ^ c ^ d, a, b, x, s, t);
const md5ii = (a, b, c, d, x, s, t) => md5cmn(c ^ (b | ~d), a, b, x, s, t);

function binlMD5(x, len, { a = 1732584193, b = -271733879, c = -1732584194, d = 271733878, yoyo = false } = {}) {
  if (!yoyo) {
    x[len >> 5] |= 0x80 << len % 32;
    x[(((len + 64) >>> 9) << 4) + 14] = len;
  }

  let olda, oldb, oldc, oldd;
  let k = 0;  
  let s = 0;  

  for (let i = 0; i < x.length; i += 16) {
    olda = a;
    oldb = b;
    oldc = c;
    oldd = d;

    
    a = md5ff(a, b, c, d, x[i], S[s++], K[k++]);
    d = md5ff(d, a, b, c, x[i + 1], S[s++], K[k++]);
    c = md5ff(c, d, a, b, x[i + 2], S[s++], K[k++]);
    b = md5ff(b, c, d, a, x[i + 3], S[s++], K[k++]);
    a = md5ff(a, b, c, d, x[i + 4], S[s++], K[k++]);
    d = md5ff(d, a, b, c, x[i + 5], S[s++], K[k++]);
    c = md5ff(c, d, a, b, x[i + 6], S[s++], K[k++]);
    b = md5ff(b, c, d, a, x[i + 7], S[s++], K[k++]);
    a = md5ff(a, b, c, d, x[i + 8], S[s++], K[k++]);
    d = md5ff(d, a, b, c, x[i + 9], S[s++], K[k++]);
    c = md5ff(c, d, a, b, x[i + 10], S[s++], K[k++]);
    b = md5ff(b, c, d, a, x[i + 11], S[s++], K[k++]);
    a = md5ff(a, b, c, d, x[i + 12], S[s++], K[k++]);
    d = md5ff(d, a, b, c, x[i + 13], S[s++], K[k++]);
    c = md5ff(c, d, a, b, x[i + 14], S[s++], K[k++]);
    b = md5ff(b, c, d, a, x[i + 15], S[s++], K[k++]);

    
    a = md5gg(a, b, c, d, x[i + 1], S[s++], K[k++]);
    d = md5gg(d, a, b, c, x[i + 6], S[s++], K[k++]);
    c = md5gg(c, d, a, b, x[i + 11], S[s++], K[k++]);
    b = md5gg(b, c, d, a, x[i], S[s++], K[k++]);
    a = md5gg(a, b, c, d, x[i + 5], S[s++], K[k++]);
    d = md5gg(d, a, b, c, x[i + 10], S[s++], K[k++]);
    c = md5gg(c, d, a, b, x[i + 15], S[s++], K[k++]);
    b = md5gg(b, c, d, a, x[i + 4], S[s++], K[k++]);
    a = md5gg(a, b, c, d, x[i + 9], S[s++], K[k++]);
    d = md5gg(d, a, b, c, x[i + 14], S[s++], K[k++]);
    c = md5gg(c, d, a, b, x[i + 3], S[s++], K[k++]);
    b = md5gg(b, c, d, a, x[i + 8], S[s++], K[k++]);
    a = md5gg(a, b, c, d, x[i + 13], S[s++], K[k++]);
    d = md5gg(d, a, b, c, x[i + 2], S[s++], K[k++]);
    c = md5gg(c, d, a, b, x[i + 7], S[s++], K[k++]);
    b = md5gg(b, c, d, a, x[i + 12], S[s++], K[k++]);

    
    a = md5hh(a, b, c, d, x[i + 5], S[s++], K[k++]);
    d = md5hh(d, a, b, c, x[i + 8], S[s++], K[k++]);
    c = md5hh(c, d, a, b, x[i + 11], S[s++], K[k++]);
    b = md5hh(b, c, d, a, x[i + 14], S[s++], K[k++]);
    a = md5hh(a, b, c, d, x[i + 1], S[s++], K[k++]);
    d = md5hh(d, a, b, c, x[i + 4], S[s++], K[k++]);
    c = md5hh(c, d, a, b, x[i + 7], S[s++], K[k++]);
    b = md5hh(b, c, d, a, x[i + 10], S[s++], K[k++]);
    a = md5hh(a, b, c, d, x[i + 13], S[s++], K[k++]);
    d = md5hh(d, a, b, c, x[i], S[s++], K[k++]);
    c = md5hh(c, d, a, b, x[i + 3], S[s++], K[k++]);
    b = md5hh(b, c, d, a, x[i + 6], S[s++], K[k++]);
    a = md5hh(a, b, c, d, x[i + 9], S[s++], K[k++]);
    d = md5hh(d, a, b, c, x[i + 12], S[s++], K[k++]);
    c = md5hh(c, d, a, b, x[i + 15], S[s++], K[k++]);
    b = md5hh(b, c, d, a, x[i + 2], S[s++], K[k++]);

    
    a = md5ii(a, b, c, d, x[i], S[s++], K[k++]);
    d = md5ii(d, a, b, c, x[i + 7], S[s++], K[k++]);
    c = md5ii(c, d, a, b, x[i + 14], S[s++], K[k++]);
    b = md5ii(b, c, d, a, x[i + 5], S[s++], K[k++]);
    a = md5ii(a, b, c, d, x[i + 12], S[s++], K[k++]);
    d = md5ii(d, a, b, c, x[i + 3], S[s++], K[k++]);
    c = md5ii(c, d, a, b, x[i + 10], S[s++], K[k++]);
    b = md5ii(b, c, d, a, x[i + 1], S[s++], K[k++]);
    a = md5ii(a, b, c, d, x[i + 8], S[s++], K[k++]);
    d = md5ii(d, a, b, c, x[i + 15], S[s++], K[k++]);
    c = md5ii(c, d, a, b, x[i + 6], S[s++], K[k++]);
    b = md5ii(b, c, d, a, x[i + 13], S[s++], K[k++]);
    a = md5ii(a, b, c, d, x[i + 4], S[s++], K[k++]);
    d = md5ii(d, a, b, c, x[i + 11], S[s++], K[k++]);
    c = md5ii(c, d, a, b, x[i + 2], S[s++], K[k++]);
    b = md5ii(b, c, d, a, x[i + 9], S[s++], K[k++]);

    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }

  if (!yoyo) {
    const arr = new Array(15).fill(0);
    const yoyolen = len + 32;
    arr[0] = 0x80;
    arr[14] = yoyolen;
    return binlMD5(arr, yoyolen, { a, b, c, d, yoyo: true });
  }

  return [a, b, c, d];
}


function binl2rstr(input) {
  const length32 = input.length * 32;
  const chunks = new Uint8Array(length32 / 8);
  
  for (let i = 0; i < length32; i += 8) {
    chunks[i / 8] = (input[i >> 5] >>> (i % 32)) & 0xff;
  }
  
  return String.fromCharCode.apply(null, chunks);
}


function rstr2binl(input) {
  const words = new Array((input.length + 3) >>> 2);
  words.fill(0);
  
  for (let i = 0; i < input.length; i++) {
    words[i >> 2] |= (input.charCodeAt(i) & 0xff) << ((i % 4) << 3);
  }
  
  return words;
}

/**
 * Turns string into yoyomd5 hashing.
 * @param {string} string Input string to convert
 * @returns {string} Converted string to yoyomd5 hashing
 */
export function yoyomd5(string) {
  return binl2rstr(binlMD5(rstr2binl(string), string.length * 8));
}

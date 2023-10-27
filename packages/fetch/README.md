# @vt7/fetch

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![Codecov][codecov-src]][codecov-href]

This is a wrapper axios plugin

## Usage

Install package:

```sh
# npm
npm install @vt7/fetch

# yarn
yarn add @vt7/fetch

# pnpm
pnpm install @vt7/fetch

# bun
bun install @vt7/fetch
```

Import:

```js
// ESM
import { createFetch, createAxiosExtra, createAxiosDebug } from "@vt7/fetch";

const fetcher = createFetch({
    debug: true,
    debugError: true,
    baseUrl: 'https://api.example.com',
    // options axios
})

fetcher.$get('/api/lorem') // return response.data
```

## License

Made with 💛

Published under [MIT License](./LICENSE).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@vt7/fetch?style=flat&colorA=18181B&colorB=F0DB4F
[npm-version-href]: https://npmjs.com/package/@vt7/fetch
[npm-downloads-src]: https://img.shields.io/npm/dm/@vt7/fetch?style=flat&colorA=18181B&colorB=F0DB4F
[npm-downloads-href]: https://npmjs.com/package/@vt7/fetch
[codecov-src]: https://img.shields.io/codecov/c/gh/unjs/@vt7/fetch/main?style=flat&colorA=18181B&colorB=F0DB4F
[codecov-href]: https://codecov.io/gh/unjs/@vt7/fetch
[bundle-src]: https://img.shields.io/bundlephobia/minzip/@vt7/fetch?style=flat&colorA=18181B&colorB=F0DB4F
[bundle-href]: https://bundlephobia.com/result?p=@vt7/fetch

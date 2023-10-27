# @vt7/iconify

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![Codecov][codecov-src]][codecov-href]

## Usage

Install package:

```sh
# npm
npm install @vt7/iconify

# yarn
yarn add @vt7/iconify

# pnpm
pnpm install @vt7/iconify

# bun
bun install @vt7/iconify
```

Terminal:

```bash
pnpm gen-icon --input=ui --output=ui.json --prefix=ui
```

Import:

```ts
import { generateIconToJSON } from '@vt7/iconify'

generateIconToJSON({
  inputDir: string,
  outputDir: string,
  prefix: string
})
```

## License

Made with 💛

Published under [MIT License](./LICENSE).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@vt7/iconify?style=flat&colorA=18181B&colorB=F0DB4F
[npm-version-href]: https://npmjs.com/package/@vt7/iconify
[npm-downloads-src]: https://img.shields.io/npm/dm/@vt7/iconify?style=flat&colorA=18181B&colorB=F0DB4F
[npm-downloads-href]: https://npmjs.com/package/@vt7/iconify
[codecov-src]: https://img.shields.io/codecov/c/gh/unjs/@vt7/iconify/main?style=flat&colorA=18181B&colorB=F0DB4F
[codecov-href]: https://codecov.io/gh/unjs/@vt7/iconify
[bundle-src]: https://img.shields.io/bundlephobia/minzip/@vt7/iconify?style=flat&colorA=18181B&colorB=F0DB4F
[bundle-href]: https://bundlephobia.com/result?p=@vt7/iconify

# @vt7/iconify - Icon Generator CLI

CLI tool để generate Iconify JSON từ thư mục SVG files. Tự động cleanup, optimize và chuyển đổi màu thành `currentColor`.

## CLI Usage

```bash
# Sử dụng npx
npx gen-icon --input=./icons --output=./icons.json --prefix=icon

# Hoặc install global
npm install -g @vt7/iconify
gen-icon --input=./icons --output=./icons.json --prefix=icon
```

### CLI Options

| Option | Mô tả | Ví dụ |
|--------|-------|-------|
| `--input` | Thư mục chứa SVG files | `--input=./src/icons` |
| `--output` | File JSON output | `--output=./icons.json` |
| `--prefix` | Prefix cho icon names | `--prefix=my-icon` |

## Programmatic API

### `generateIconToJSON(inputDir, outputDir, prefix)`

Generate Iconify JSON từ thư mục SVG.

```ts
import { generateIconToJSON } from '@vt7/iconify'

await generateIconToJSON(
  './src/icons',      // Input directory
  './icons.json',     // Output file
  'icon'              // Prefix
)
```

**Tính năng tự động:**
- Cleanup SVG code
- Chuyển màu đen (`black`) thành `currentColor`
- Xóa background trắng (`white`)
- Optimize với SVGO

### `parseIconifyJSON(collection, transformAttrs)`

Parse và transform attributes trong Iconify JSON collection.

```ts
import { parseIconifyJSON } from '@vt7/iconify'

const transformed = parseIconifyJSON(iconifyCollection, {
  fill: 'currentColor',     // Replace fill attribute
  stroke: undefined         // Remove stroke attribute
})
```

## Output Format

File JSON output theo format Iconify:

```json
{
  "prefix": "icon",
  "icons": {
    "home": {
      "body": "<path d=\"...\" fill=\"currentColor\"/>",
      "width": 24,
      "height": 24
    },
    "user": {
      "body": "<path d=\"...\"/>",
      "width": 24,
      "height": 24
    }
  }
}
```

## Dependencies

- `@iconify/tools` - SVG processing
- `@iconify/types` - TypeScript types
- `@iconify/utils` - Utility functions
- `svgo` - SVG optimization
- `@vt7/utils` - Utility functions
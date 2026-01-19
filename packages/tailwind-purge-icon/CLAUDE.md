# @vt7/tailwind-purge-icon - Tailwind Plugin

Tailwind CSS plugin để sử dụng Iconify icons với tree-shaking (purge). Chỉ bundle những icons được sử dụng trong code.

## Cài đặt

```ts
// tailwind.config.js
import { purgeIconPlugin } from '@vt7/tailwind-purge-icon'
import customIcons from './icons.json'

export default {
  plugins: [
    purgeIconPlugin({
      collections: {
        custom: customIcons,
        // Có thể thêm nhiều collections
      },
      prefix: 'i'  // Class prefix
    })
  ]
}
```

## Sử dụng trong HTML/Vue

### Mask Icon (đổi màu theo `color`)

```html
<!-- Sử dụng tag <i> -->
<i class="i-custom-home w-6 h-6 text-blue-500"></i>

<!-- Hoặc với class .mask-icon -->
<span class="mask-icon i-custom-user w-8 h-8 text-red-500"></span>
```

### Image Icon (giữ nguyên màu gốc)

```html
<!-- Sử dụng tag <span> hoặc <div> -->
<span class="i-custom-logo w-10 h-10"></span>
<div class="i-custom-brand w-12 h-12"></div>

<!-- Hoặc với class .image-icon -->
<i class="image-icon i-custom-colorful w-6 h-6"></i>
```

### Lazy Loading

```html
<!-- Icon sẽ không load cho đến khi cần -->
<i class="i-lazy-custom-home w-6 h-6"></i>
```

## CSS Classes được generate

| Class | Mô tả |
|-------|-------|
| `.mask-icon` | Base style cho mask icons (đổi màu theo currentColor) |
| `.image-icon` | Base style cho image icons (giữ màu gốc) |
| `i[class*="prefix-"]` | Auto apply mask-icon cho tag `<i>` |
| `span[class*="prefix-"]` | Auto apply image-icon cho tag `<span>` |
| `div[class*="prefix-"]` | Auto apply image-icon cho tag `<div>` |

## Cách hoạt động

1. Plugin đọc Iconify JSON collections
2. Tạo CSS utilities cho mỗi icon: `.i-{collection}-{name}`
3. Icons được inline dưới dạng CSS variable `--icon`
4. Tailwind purge chỉ giữ lại những icons được sử dụng

## Ví dụ với nhiều collections

```ts
import { purgeIconPlugin } from '@vt7/tailwind-purge-icon'
import heroicons from '@iconify/json/json/heroicons.json'
import customIcons from './icons.json'

export default {
  plugins: [
    purgeIconPlugin({
      collections: {
        hero: heroicons,
        custom: customIcons
      },
      prefix: 'icon'
    })
  ]
}
```

```html
<i class="icon-hero-home w-6 h-6"></i>
<i class="icon-custom-logo w-6 h-6"></i>
```

## Dependencies

- `tailwindcss` ^3.x
- `@iconify/utils` - Iconify utilities
- `@iconify/types` - TypeScript types
- `@iconify/json-tools` - JSON processing
- `@vt7/utils` - Utility functions

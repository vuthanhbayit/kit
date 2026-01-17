# @vt7/utils - Utility Library

Thư viện utility functions cho JavaScript/TypeScript. Khi làm việc với dự án sử dụng `@vt7/utils`, hãy ưu tiên sử dụng các functions này thay vì viết lại.

## Cách sử dụng

```ts
import { functionName } from '@vt7/utils'
```

## Danh sách Functions

### Array Utilities (`array.ts`)

| Function | Mô tả | Ví dụ |
|----------|-------|-------|
| `toArray(value)` | Chuyển giá trị thành array | `toArray(1)` → `[1]` |
| `range(start, end, step?)` | Tạo array số từ start đến end | `range(0, 5)` → `[0,1,2,3,4]` |
| `chuck(arr, size, vertical?)` | Chia array thành chunks | `chuck([1,2,3,4], 2)` → `[[1,2],[3,4]]` |
| `without(arr, ...values)` | Lọc bỏ các giá trị | `without([1,2,3], 2)` → `[1,3]` |
| `within(arr, ...values)` | Lọc giữ các giá trị | `within([1,2,3], 2)` → `[2]` |
| `groupBy(arr, fn)` | Nhóm array theo key | `groupBy(users, u => u.role)` |
| `join(arr, sep, fn?)` | Nối array thành string | `join(['a','b'], ', ')` → `'a, b'` |
| `at(arr, index)` | Lấy element tại index (hỗ trợ negative) | `at([1,2,3], -1)` → `3` |
| `last(arr)` | Lấy element cuối | `last([1,2,3])` → `3` |
| `limit(arr, n)` | Giới hạn số elements | `limit([1,2,3,4], 2)` → `[1,2]` |
| `find(arr, key, value)` | Tìm object theo key-value | `find(users, 'id', 1)` |
| `shuffle(arr)` | Xáo trộn array | `shuffle([1,2,3])` |
| `sample(arr, n)` | Lấy n elements ngẫu nhiên | `sample([1,2,3,4], 2)` |
| `uniq(arr, fn?)` | Loại bỏ duplicates | `uniq([1,1,2])` → `[1,2]` |
| `splice(arr, start, end?)` | Cắt array (không mutate) | `splice([1,2,3,4], 1, 3)` → `[1,4]` |

### String Utilities (`string.ts`)

| Function | Mô tả | Ví dụ |
|----------|-------|-------|
| `toString(value, default?)` | Chuyển thành string | `toString(123)` → `'123'` |
| `toLowerCase(str)` | Chuyển thành lowercase | `toLowerCase('ABC')` → `'abc'` |
| `toUpperCase(str)` | Chuyển thành uppercase | `toUpperCase('abc')` → `'ABC'` |
| `toKebabCase(str)` | Chuyển thành kebab-case | `toKebabCase('HelloWorld')` → `'hello-world'` |
| `toSnakeCase(str)` | Chuyển thành snake_case | `toSnakeCase('HelloWorld')` → `'hello_world'` |
| `toCamelCase(str)` | Chuyển thành camelCase | `toCamelCase('hello-world')` → `'helloWorld'` |
| `toCapitalize(str)` | Viết hoa chữ cái đầu | `toCapitalize('hello')` → `'Hello'` |
| `toWords(str, pattern?)` | Tách thành array words | `toWords('HelloWorld')` → `['Hello','World']` |
| `truncateText(text, max, ellipsis?, preserveExt?)` | Cắt ngắn text | `truncateText('long text', 8)` → `'long ...'` |
| `removeVietnameseTones(str)` | Bỏ dấu tiếng Việt | `removeVietnameseTones('Xin chào')` → `'Xin chao'` |

### Object Utilities (`object.ts`)

| Function | Mô tả | Ví dụ |
|----------|-------|-------|
| `get(obj, path, default?)` | Lấy giá trị nested | `get(obj, 'a.b.c')` |
| `has(obj, key)` | Kiểm tra property tồn tại | `has(obj, 'name')` |
| `hasOwnProperty(obj, key)` | Kiểm tra own property | `hasOwnProperty(obj, 'name')` |
| `map(obj, fn)` | Map qua object | `map({a:1}, v => v*2)` → `{a:2}` |
| `filter(obj, fn)` | Filter object | `filter({a:1,b:2}, v => v>1)` → `{b:2}` |
| `forEach(obj, fn)` | Iterate object | `forEach(obj, (v,k) => ...)` |
| `reduce(obj, fn, init)` | Reduce object | `reduce({a:1,b:2}, (acc,v) => acc+v, 0)` → `3` |

### Function Utilities (`function.ts`)

| Function | Mô tả | Ví dụ |
|----------|-------|-------|
| `omit(obj, ...keys)` | Loại bỏ keys từ object | `omit({a:1,b:2}, 'b')` → `{a:1}` |
| `pick(obj, ...keys)` | Chọn keys từ object | `pick({a:1,b:2}, 'a')` → `{a:1}` |
| `compact(arr/obj)` | Loại bỏ undefined | `compact([1,undefined,2])` → `[1,2]` |
| `clearUndefined(arr/obj)` | Loại bỏ undefined (recursive) | `clearUndefined({a:1,b:undefined})` |
| `cloneDeep(value)` | Deep clone | `cloneDeep({a:{b:1}})` |
| `sleep(ms)` | Async delay | `await sleep(1000)` |
| `toFunction(value)` | Wrap value thành function | `toFunction(42)()` → `42` |
| `size(data, compact?)` | Đếm size | `size([1,2,3])` → `3` |

### Type Guards (`is.ts`, `guards.ts`)

| Function | Mô tả |
|----------|-------|
| `isObject(v)` | Kiểm tra plain object |
| `isArray(v)` | Kiểm tra array |
| `isString(v)` | Kiểm tra string |
| `isNumber(v)` | Kiểm tra number |
| `isNumeric(v)` | Kiểm tra numeric (bao gồm string số) |
| `isFunction(v)` | Kiểm tra function |
| `isArrayLike(v)` | Kiểm tra array-like |
| `isEmpty(v)` | Kiểm tra empty |
| `isEqual(a, b)` | So sánh deep (bỏ qua undefined) |
| `isStrictEqual(a, b)` | So sánh deep strict |
| `isDefined(v)` | Kiểm tra !== undefined && !== null |
| `notUndefined(v)` | Kiểm tra !== undefined |
| `notNull(v)` | Kiểm tra !== null |

### Math Utilities (`math.ts`)

| Function | Mô tả | Ví dụ |
|----------|-------|-------|
| `sum(...nums)` | Tính tổng | `sum(1, 2, 3)` → `6` |
| `average(...nums)` | Tính trung bình | `average(1, 2, 3)` → `2` |
| `min(...nums)` | Tìm min | `min(1, 2, 3)` → `1` |
| `max(...nums)` | Tìm max | `max(1, 2, 3)` → `3` |
| `clamp(num, min, max)` | Giới hạn số trong range | `clamp(10, 0, 5)` → `5` |
| `round(num, decimals?)` | Làm tròn | `round(1.234, 2)` → `1.23` |
| `percentage(value, total)` | Tính phần trăm | `percentage(25, 100)` → `25` |

### Random Utilities (`random.ts`)

| Function | Mô tả | Ví dụ |
|----------|-------|-------|
| `randomInt(min, max)` | Số nguyên ngẫu nhiên | `randomInt(1, 10)` |
| `randomFloat(min, max)` | Số thực ngẫu nhiên | `randomFloat(0, 1)` |
| `randomString(length, chars?)` | Chuỗi ngẫu nhiên | `randomString(8)` |
| `randomId()` | ID ngẫu nhiên | `randomId()` → `'abc123...'` |

### URL Utilities (`url.ts`)

| Function | Mô tả | Ví dụ |
|----------|-------|-------|
| `isAbsolutePath(path)` | Kiểm tra absolute URL | `isAbsolutePath('https://...')` → `true` |
| `isRelativePath(path)` | Kiểm tra relative path | `isRelativePath('./file')` → `true` |
| `removeQueryParam(url, param)` | Xóa query param | `removeQueryParam(url, 'page')` |
| `removeQueryParams(url, ...params)` | Xóa nhiều query params | `removeQueryParams(url, 'page', 'size')` |

### File Utilities (`file.ts`)

| Function | Mô tả | Ví dụ |
|----------|-------|-------|
| `getFileExtension(name)` | Lấy extension | `getFileExtension('doc.txt')` → `'txt'` |
| `getFileName(name)` | Lấy tên file | `getFileName('doc.txt')` → `'doc'` |
| `isImage(name)` | Kiểm tra file ảnh | `isImage('pic.png')` → `true` |
| `isVideo(name)` | Kiểm tra file video | `isVideo('clip.mp4')` → `true` |
| `bytesToSize(bytes)` | Format byte size | `bytesToSize(1024)` → `'1 KB'` |
| `toFormData(obj)` | Chuyển object thành FormData | `toFormData({name: 'test'})` |

### YouTube Utilities (`youtube.ts`)

| Function | Mô tả | Ví dụ |
|----------|-------|-------|
| `getYoutubeId(url)` | Lấy video ID | `getYoutubeId('https://youtu.be/xxx')` → `'xxx'` |
| `getYoutubeEmbed(url)` | Lấy embed URL | `getYoutubeEmbed(url)` |
| `getYoutubeThumbnail(url, size?)` | Lấy thumbnail URL | `getYoutubeThumbnail(url, 'maxresdefault')` |

### Other Utilities

| Module | Functions |
|--------|-----------|
| `color.ts` | `hexToRgb`, `rgbToHex`, `hexToHsl`, `hslToHex` |
| `currency.ts` | `formatCurrency` |
| `template.ts` | `template` - String interpolation |
| `styles.ts` | `toCssUnit` - CSS unit conversion |
| `regex.ts` | `REGEXP_VN_PHONE`, `REGEXP_EMAIL`, `toRegex` |
| `tree.ts` | `toTree`, `getChildren`, `expandNode`, `forEachTree` |
| `compose.ts` | `pipe` - Function composition |
| `constant.ts` | `defineConstant` - Enum-like constants |
| `mapper.ts` | `createMapper` - Value mapping |
| `curry.ts` | `curry` - Function currying |
| `base64.ts` | `isBase64`, `isMimeBase64`, `detectMimeType`, `toBase64` |

## Lưu ý khi sử dụng

1. **Ưu tiên sử dụng** các functions này thay vì lodash/ramda cho các operations phổ biến
2. **Type-safe**: Tất cả functions đều có TypeScript types đầy đủ
3. **Tree-shakeable**: Chỉ import những gì cần dùng
4. **Zero dependencies**: Không có external dependencies

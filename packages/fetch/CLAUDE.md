# @vt7/fetch - Axios Wrapper

Wrapper cho Axios với các tính năng mở rộng: extra methods, debug logging, và request cancellation.

## Cách sử dụng

```ts
import { createFetch } from '@vt7/fetch'

const api = createFetch({
  baseURL: 'https://api.example.com'
})
```

## API Reference

### `createFetch(config?)`

Tạo instance Axios với đầy đủ tính năng mở rộng.

```ts
const api = createFetch({
  baseURL: 'https://api.example.com',
  timeout: 5000
})
```

### Extra Methods

| Method | Mô tả | Ví dụ |
|--------|-------|-------|
| `$get<T>(url, config?)` | GET request, trả về `data` trực tiếp | `api.$get<User[]>('/users')` |
| `$post<T>(url, data?, config?)` | POST request, trả về `data` trực tiếp | `api.$post<User>('/users', { name: 'John' })` |
| `$put<T>(url, data?, config?)` | PUT request, trả về `data` trực tiếp | `api.$put<User>('/users/1', { name: 'Jane' })` |
| `$patch<T>(url, data?, config?)` | PATCH request, trả về `data` trực tiếp | `api.$patch<User>('/users/1', { name: 'Jane' })` |
| `$delete<T>(url, config?)` | DELETE request, trả về `data` trực tiếp | `api.$delete('/users/1')` |
| `$request<T>(config)` | Generic request, trả về `data` trực tiếp | `api.$request({ method: 'GET', url: '/users' })` |

### Helper Methods

| Method | Mô tả | Ví dụ |
|--------|-------|-------|
| `setBaseURL(url)` | Thay đổi base URL | `api.setBaseURL('https://new-api.com')` |
| `setHeader(name, value, scopes?)` | Set header | `api.setHeader('X-Custom', 'value')` |
| `setToken(token, type?, scopes?)` | Set Authorization header | `api.setToken('abc123', 'Bearer')` |
| `onRequest(callback)` | Interceptor cho request | `api.onRequest(config => { ... })` |
| `onResponse(callback)` | Interceptor cho response | `api.onResponse(res => { ... })` |
| `onError(callback)` | Interceptor cho cả request và response error | `api.onError(err => { ... })` |
| `onRequestError(callback)` | Interceptor cho request error | `api.onRequestError(err => { ... })` |
| `onResponseError(callback)` | Interceptor cho response error | `api.onResponseError(err => { ... })` |
| `isCancel(value)` | Kiểm tra request bị cancel | `api.isCancel(error)` |

### Debug Mode

Bật debug để log request/response ra console:

```ts
// Log tất cả requests
api.$get('/users', { debug: true })

// Chỉ log errors
api.$get('/users', { debugError: true })
```

### Request Cancellation

Tự động cancel request cũ khi có request mới với cùng `cancelId`:

```ts
// Request cũ sẽ bị cancel khi có request mới với cùng cancelId
api.$get('/search', { cancelId: 'search-query', params: { q: 'hello' } })
api.$get('/search', { cancelId: 'search-query', params: { q: 'hello world' } }) // Cancel request trước
```

## Standalone Functions

```ts
import { createAxiosExtra, createAxiosDebug, createAxiosCancel, isAxiosError, toFormData } from '@vt7/fetch'

// Áp dụng riêng từng feature cho axios instance
createAxiosExtra(axiosInstance)
createAxiosDebug(axiosInstance)
createAxiosCancel(axiosInstance)

// Re-export từ axios
isAxiosError(error)
toFormData(data)
```

## Dependencies

- `axios` - HTTP client
- `@vt7/utils` - Utility functions

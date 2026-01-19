# @vt7/composables - Vue 3 Composables

Collection các Vue 3 composables hữu ích cho việc quản lý state, data fetching, và UI interactions.

## Cách sử dụng

```ts
import { useFetchData, useMutation, useVisible } from '@vt7/composables'
```

## API Reference

### `useFetchData<P, R, T>(callback, options?)`

Composable cho việc fetch data với loading states và error handling.

```ts
const { data, isLoading, isFetching, isError, fetch, reset } = useFetchData(
  (id: number) => api.$get<User>(`/users/${id}`),
  {
    initialData: null,
    transform: (response) => response,
    onSuccess: (response) => console.log('Success'),
    onError: (error) => console.error('Error'),
    onSettled: (data, error) => console.log('Settled')
  }
)

// Fetch data
await fetch(1)
```

| Return | Type | Mô tả |
|--------|------|-------|
| `data` | `Ref<T>` | Data đã fetch |
| `isLoading` | `Ref<boolean>` | True khi fetch lần đầu (data rỗng) |
| `isFetching` | `Ref<boolean>` | True khi đang fetch |
| `isError` | `Ref<boolean>` | True khi có lỗi |
| `fetch` | `(...args) => Promise` | Function để trigger fetch |
| `reset` | `() => void` | Reset data về initial |

### `useMutation<T, V>(callback, options?)`

Composable cho mutations (POST, PUT, DELETE) với validation và callbacks.

```ts
const { data, error, isLoading, isError, isSuccess, mutate, reset } = useMutation(
  (variables: CreateUserInput) => api.$post<User>('/users', variables),
  {
    onValidate: async (variables) => { /* validate */ },
    onSuccess: (data, variables) => console.log('Created'),
    onError: (error, variables) => console.error('Failed'),
    onSettled: (data, error, variables) => console.log('Done')
  }
)

// Trigger mutation
await mutate({ name: 'John' })

// Mutation với exception (throw error)
await mutateWithException({ name: 'John' })
```

| Return | Type | Mô tả |
|--------|------|-------|
| `data` | `Ref<T \| null>` | Response data |
| `error` | `Ref<Error \| null>` | Error nếu có |
| `isLoading` | `Ref<boolean>` | Đang loading |
| `isError` | `Ref<boolean>` | Có lỗi |
| `isSuccess` | `Ref<boolean>` | Thành công |
| `mutate` | `(variables?) => Promise` | Trigger mutation |
| `mutateWithException` | `(variables?) => Promise` | Mutation với throw error |
| `reset` | `() => void` | Reset state |

### `useResetRef<T>(defaultValueFn)`

Composable tạo ref có thể reset về giá trị mặc định, với tracking thay đổi.

```ts
const { state, reset, isChanged } = useResetRef(() => ({
  name: '',
  email: ''
}))

state.value.name = 'John'
console.log(isChanged.value) // true

reset() // Reset về { name: '', email: '' }
```

### `useVisible(defaultVisible?)`

Composable quản lý visibility state (modal, dropdown, etc).

```ts
const { visible, open, close, toggle } = useVisible(false)

open()   // visible = true
close()  // visible = false
toggle() // đảo ngược visible
```

### `useLoadedValue(modelValue)`

Composable theo dõi khi value lần đầu trở thành true (lazy loading).

```ts
const isLoaded = useLoadedValue(someRef)
// isLoaded sẽ thành true và giữ nguyên khi someRef = true lần đầu
```

### `useLockScreen()`

Composable khóa scroll trên body (dùng cho modal, drawer).

```ts
const { onHiddenScrollBar, onShowScrollBar } = useLockScreen()

// Khi mở modal
onHiddenScrollBar()

// Khi đóng modal
onShowScrollBar()
```

### `watchShallow(source, callback, options?)`

Watch với shallow comparison (sử dụng `isEqual` từ @vt7/utils).

```ts
watchShallow(
  () => state.value,
  (newValue, oldValue) => {
    // Chỉ trigger khi value thực sự thay đổi (deep compare)
  }
)
```

## Peer Dependencies

- `vue` >= 3.0.0 hoặc >= 2.7.0
- `@vueuse/core` >= 10.0.0

## Dependencies

- `@vt7/utils` - Utility functions

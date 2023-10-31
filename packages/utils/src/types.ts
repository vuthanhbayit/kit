export type ValueOf<T extends object> = T[keyof T]

export type Flatten<T> = { [P in keyof T]: T[P] }

export type Replace<O extends object, Key extends keyof O, Value> = Record<Key, Value> & Omit<O, Key>

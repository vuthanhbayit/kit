export const replacer = () => {
  const seen = new WeakSet()
  return (key: string, value: any) => {
    if (key.startsWith('_') || key.startsWith('[Symbol')) {
      return
    }

    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return
      }
      seen.add(value)
    }
    return value
  }
}

export const transformedData = (data: any) => JSON.parse(JSON.stringify(data, replacer(), 2))

export const transformedDataByServer = (data: any) => {
  try {
    // eslint-disable-next-line unicorn/prefer-module
    const util = require('node:util')
    return util.inspect(transformedData(data), {
      showHidden: false,
      depth: 2,
      colors: true,
    })
  } catch {
    return data
  }
}

export const transformedDataByEnv = (data: any) => {
  // @ts-ignore
  return process.browser ? data : transformedDataByServer(data)
}

import { isArray } from './is'

/**
 * @param fileName
 * @return string
 * getExtensionFile('1.txt') // 'txt'
 */
export const getFileExtension = (fileName: string): string => {
  return fileName.slice(fileName.lastIndexOf('.') + 1)
}

/**
 * @param fileName
 * @return string
 * getExtensionFile('abcdef.txt') // 'abcdef'
 */

export const getFileName = (fileName: string): string => {
  return fileName.slice(0, Math.max(0, fileName.lastIndexOf('.')))
}

/**
 * Checks if a file is an image based on its extension.
 *
 * @param {string} fileName - The name of the file to check.
 * @returns {boolean} True if the file is an image, otherwise false.
 */
export const isImage = (fileName: string): boolean => {
  return Boolean(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/.test(fileName))
}

/**
 * Checks if a file is a video based on its extension.
 *
 * @param {string} fileName - The name of the file to check.
 * @returns {boolean} True if the file is a video, otherwise false.
 */
export const isVideo = (fileName: string): boolean => {
  return Boolean(/\.(mp4|mkv|avi|mov|wmv|flv|webm|mpeg)(\?.*)?$/.test(fileName))
}

/**
 * Download an image from a URL.
 * @param {string} url - The URL of the image to download.
 * @param {string} [filename] - The desired name for the downloaded file. If not provided, the file will be saved with an empty name.
 */
export const downloadImageByUrl = (url: string, filename?: string) => {
  const a = document.createElement('a')
  a.href = url
  a.download = filename || ''
  document.body.append(a)
  a.click()
  a.remove()
}

/**
 * Converts a given URL to a Blob object.
 *
 * @param {string} url - The URL to fetch and convert to a Blob.
 * @return {Promise<Blob>} - A promise that resolves to a Blob object.
 */
export const toBlob = async (url: string): Promise<Blob> => {
  const response = await fetch(url, { mode: 'no-cors' })
  return await response.blob()
}

/**
 * Converts a data object to a FormData object.
 *
 * @param {Record<string, any>} data - The data object to convert to FormData.
 * @return {FormData} - The converted FormData object.
 */
export const toFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData()

  for (const key in data) {
    const value = data[key]

    if (isArray(value)) {
      for (const item of value) {
        formData.append(`${key}[]`, item)
      }
    } else {
      formData.append(key, value)
    }
  }

  return formData
}

/*
 * Converts a size in bytes to a human-readable string representation.
 *
 * @param {number} bytes - The size in bytes.
 * @param {number} [unit=1024] - The unit used to calculate the size.
 * @returns {string} - The human-readable string representation in the format of "<value> <unit>".
 */
export const bytesToSize = (bytes: number, unit = 1024) => {
  if (bytes === 0) {
    return '0 Byte'
  }

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const index = Math.floor(Math.log(bytes) / Math.log(unit))
  const roundedValue = Math.round(bytes / Math.pow(unit, index))

  return `${roundedValue} ${sizes[index]}`
}

/**
 * Get the dimensions (width and height) of an image file.
 * @param {File | Blob} file - The image file to get the dimensions of.
 * @returns {Promise<{ width: number; height: number }>} A promise that resolves to an object containing the width and height of the image.
 */
export const getImageDimensions = (file: File | Blob): Promise<{ width: number; height: number }> => {
  return new Promise(resolve => {
    const img = new Image()
    img.addEventListener('load', () => {
      resolve({
        height: img.height,
        width: img.width,
      })
    })
    img.src = URL.createObjectURL(file)
  })
}

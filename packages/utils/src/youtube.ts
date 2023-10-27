/**
 *
 * @param url
 * @return string
 * @example getYoutubeId('https://www.youtube.com/watch?v=jCYoCa3--Sk') //jCYoCa3--Sk
 * @example getYoutubeId('https://youtu.be/jCYoCa3--Sk') //jCYoCa3--Sk
 * @example getYoutubeId('https://www.youtube.com/embed/jCYoCa3--Sk') //jCYoCa3--Sk
 */
export const getYoutubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)

  return match && match[2].length === 11 ? match[2] : null
}

export const getYoutubeEmbed = (url: string) => {
  const baseUrl = 'https://www.youtube.com/embed'
  const youtubeId = getYoutubeId(url)

  return youtubeId ? [baseUrl, youtubeId].join('/') : null
}

type YoutubeThumbnailName =
  | '0'
  | '1'
  | '2'
  | '3'
  | 'default'
  | 'hqdefault'
  | 'mqdefault'
  | 'sddefault'
  | 'maxresdefault'

export const getYoutubeThumbnail = (url: string, name: YoutubeThumbnailName = 'default') => {
  const baseUrl = 'https://img.youtube.com/vi'
  const youtubeId = getYoutubeId(url)
  const imageName = name + '.jpg'

  return youtubeId ? [baseUrl, youtubeId, imageName].join('/') : null
}

import { ImageSizeRange, type ImageSize } from '../types/util'

export function isValidImageSize(pixels: number): boolean {
  return pixels >= ImageSizeRange.Min && pixels <= ImageSizeRange.Max
}

export function imageSize(pixels: number): ImageSize {
  if (!isValidImageSize(pixels)) {
    throw new Error(`Gravatar size should be between ${ImageSizeRange.Min} and ${ImageSizeRange.Max}, ${pixels} given`)
  }

  return pixels
}

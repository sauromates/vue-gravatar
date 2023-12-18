import { Ref, ComputedRef } from 'vue'
import { ImageSize, Email } from './util'

export enum GravatarPlaceholderOption {
  NotFound = '404',
  Person = 'mp',
  Geometry = 'identicon',
  Monster = 'monsterid',
  RandomFace = 'mavatar',
  PixelArt = 'retro',
  Robot = 'robohash',
  Blank = 'blank'
}

export enum GravatarRatingOption {
  General = 'g',
  Parental = 'pg',
  Restricted = 'r',
  AdultsOnly = 'x'
}

export type SecureURL = `https://${string}`
export type GravatarPlaceholder = `${GravatarPlaceholderOption}` | SecureURL
export type GravatarRating = `${GravatarRatingOption}`

export type ImageParams = {
  size?: ImageSize
  default?: GravatarPlaceholder
  rating?: GravatarRating
  forceDefault?: 'y'
  extenstion?: '.jpg'
}

export type Gravatar = { email: Email } & ImageParams

export type GravatarComposableReturn = {
  source: Ref<URL | null>
  gravatar: ComputedRef<string>
  email: ComputedRef<Email>
  size: ComputedRef<ImageSize | undefined>
  imageParams: ComputedRef<ImageParams>
  emptyParams: ComputedRef<boolean>
  buildGravatarUrl: () => Promise<void>
}

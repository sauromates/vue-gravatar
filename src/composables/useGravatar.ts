import { ref, computed, watch } from 'vue'
import { sha256 } from 'js-sha256'
import type { GravatarType, GravatarComposableReturn, ImageParams } from '../types/gravatar'
import type { Email, ImageSize } from '../types/util'
import { createEmail } from '../utils/email'
import { imageSize } from '../utils/size'

export const useGravatar = (image: GravatarType): GravatarComposableReturn => {
  const source = ref<URL | null>(null)

  const gravatar = computed<string>(() => source.value?.toString() ?? '')
  const email = computed<Email>(() => createEmail(image.email))
  const size = computed<ImageSize | undefined>(() => (image.size ? imageSize(image.size) : image.size))
  const imageParams = computed<ImageParams>(() => {
    return {
      size: size.value,
      default: image.default,
      rating: image.rating,
      forceDefault: image.forceDefault,
      extension: image.extension
    }
  })
  const emptyParams = computed<boolean>(() => Object.values(imageParams.value).every((item) => item === undefined))

  watch(imageParams, async () => await buildGravatarUrl())
  watch(email, async () => await buildGravatarUrl())

  async function buildGravatarUrl(): Promise<void> {
    const gravatarBaseUrl: string = 'https://gravatar.com/avatar'
    const gravatarEmailHash: string = sha256.create().update(email.value).toString()
    const pathname = imageParams.value.extension ? gravatarEmailHash + imageParams.value.extension : gravatarEmailHash
    const gravatarSource = new URL(`${gravatarBaseUrl}/${pathname}`)

    if (emptyParams.value) {
      source.value = gravatarSource
      return
    }

    for (const [key, value] of Object.entries(imageParams.value)) {
      if (!value || key === 'extension') continue
      gravatarSource.searchParams.append(key.toLowerCase(), value.toString())
    }

    source.value = gravatarSource
  }

  buildGravatarUrl()

  return {
    source,
    gravatar,
    email,
    size,
    imageParams,
    emptyParams,
    buildGravatarUrl
  }
}

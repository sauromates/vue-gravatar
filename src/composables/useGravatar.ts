import { ref, computed, watch } from 'vue'
import type { Gravatar, GravatarComposableReturn, ImageParams } from '../types/gravatar'
import type { Email, ImageSize } from '../types/util'
import { sha256 } from '../utils/sha256'
import { createEmail } from '../utils/email'
import { imageSize } from '../utils/size'

export const useGravatar = (image: Gravatar): GravatarComposableReturn => {
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
      extenstion: image.extenstion
    }
  })
  const emptyParams = computed<boolean>(() => Object.values(imageParams.value).every((item) => item === undefined))

  watch(imageParams, async () => await buildGravatarUrl())
  watch(email, async () => await buildGravatarUrl())

  async function buildGravatarUrl(): Promise<void> {
    const gravatarBaseUrl: string = 'https://gravatar.com/avatar'
    const gravatarEmailHash: string = await sha256(email.value)
    const gravatarSource = new URL(`${gravatarBaseUrl}/${gravatarEmailHash}`)

    if (emptyParams.value) {
      source.value = gravatarSource
      return
    }

    for (const [key, value] of Object.entries(imageParams.value)) {
      if (!value) continue
      gravatarSource.searchParams.append(key, value.toString())
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

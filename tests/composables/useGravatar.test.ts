import { expectTypeOf } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import { reactive } from 'vue'
import type { GravatarComposableReturn, GravatarType } from '../../src/types/gravatar'
import { useGravatar } from '../../src/composables/useGravatar'
import { exampleHash } from '../helpers/exampleHash'
import { ImageSize, type Email } from '../../src/types/util'

describe('useGravatar', () => {
  it('returns correct type', () => {
    expectTypeOf(useGravatar({ email: 'test@example.org' })).toMatchTypeOf<GravatarComposableReturn>()
  })

  it('can be used without image params', async () => {
    const correctUrl: URL = new URL(`https://gravatar.com/avatar/${exampleHash}`)
    const { source, gravatar, email, emptyParams, buildGravatarUrl } = useGravatar({ email: 'test@example.org' })

    await buildGravatarUrl()

    expect(source.value).toEqual(correctUrl)
    expect(gravatar.value).toEqual(correctUrl.toString())
    expect(email.value).toEqual('test@example.org')
    expectTypeOf(email.value).toMatchTypeOf<Email>()
    expect(emptyParams.value).toBe(true)
  })

  it('can be used with image params', async () => {
    const image: GravatarType = {
      email: 'test@example.org',
      size: 80,
      default: 'mp',
      rating: 'g',
      forceDefault: 'y',
      extension: '.jpg'
    }
    const { email, ...imageParams } = image
    const expectedUrl: URL = new URL(
      `https://gravatar.com/avatar/${exampleHash}.jpg?size=80&default=mp&rating=g&forcedefault=y`
    )

    const composable = useGravatar(image)
    await composable.buildGravatarUrl()

    expect(composable.source.value).toEqual(expectedUrl)
    expect(composable.gravatar.value).toEqual(expectedUrl.toString())
    expect(composable.email.value).toEqual(email)
    expect(composable.imageParams.value).toEqual(imageParams)
    expect(composable.emptyParams.value).toBe(false)

    expectTypeOf(composable.email.value).toMatchTypeOf<Email>()
    expectTypeOf(composable.size.value).toMatchTypeOf<ImageSize | undefined>()
  })

  it('always returns valid string as gravatar url', () => {
    const image: GravatarType = { email: 'test@example.org' }
    const { gravatar } = useGravatar(image)

    expect(gravatar.value).toStrictEqual(`https://gravatar.com/avatar/${exampleHash}`)
  })

  it('watches for email value', async () => {
    const image = reactive<GravatarType>({ email: 'test@example.org' })
    const { email, gravatar, buildGravatarUrl } = useGravatar(image)

    await buildGravatarUrl()
    await flushPromises()

    expect(email.value).toEqual('test@example.org')
    expect(gravatar.value).toEqual(`https://gravatar.com/avatar/${exampleHash}`)

    image.email = 'example@test.com'

    await flushPromises()

    expect(email.value).toEqual('example@test.com')
    expect(gravatar.value).not.toEqual(`https://gravatar.com/avatar/${exampleHash}`)
  })

  it('watches for image params change', async () => {
    const image = reactive<GravatarType>({
      email: 'test@example.org',
      size: 80,
      default: 'mp',
      rating: 'g',
      forceDefault: 'y',
      extension: '.jpg'
    })
    const { gravatar, buildGravatarUrl } = useGravatar(image)

    await buildGravatarUrl()
    await flushPromises()

    delete image.forceDefault
    delete image.extension
    image.size = 400
    image.default = 'retro'

    await new Promise((resolve) => setTimeout(resolve, 100))
    await flushPromises()

    const expectedNewUrl: string = `https://gravatar.com/avatar/${exampleHash}?size=400&default=retro&rating=g`

    expect(gravatar.value).toEqual(expectedNewUrl)
  })
})

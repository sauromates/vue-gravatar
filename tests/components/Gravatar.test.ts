import { vi } from 'vitest'
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils'
import Gravatar from '../../src/components/Gravatar.vue'
import { GravatarPlaceholderOption, GravatarRatingOption } from '../../src/types/gravatar'

describe('gravatar component', () => {
  let gravatar: VueWrapper<InstanceType<typeof Gravatar>>

  beforeAll(() => {
    vi.mock('../../src/composables/useGravatar', () => {
      return {
        useGravatar: vi.fn().mockReturnValue({ gravatar: 'https://gravatar.com/HASH' })
      }
    })
  })

  beforeEach(() => {
    gravatar = mount(Gravatar, { props: { email: 'test@example.com' } })
  })

  afterEach(() => {
    gravatar.unmount()
  })

  it('can be rendered', () => {
    expect(gravatar.vm.email).toEqual('test@example.com')

    expect(gravatar.findAll('img').length).toEqual(1)

    const { src, alt } = gravatar.find('img').attributes()

    expect(src).toEqual('https://gravatar.com/HASH')
    expect(alt).toEqual("User's avatar from Gravatar service")
  })

  it('can accept arbitrary alt text', async () => {
    const testAlt = 'Test alt value'
    gravatar.setProps({ alt: testAlt })

    await flushPromises()

    expect(gravatar.vm.alt).toEqual(testAlt)
    expect(gravatar.find('img').attributes().alt).toEqual(testAlt)
  })

  describe('gravatar placeholders', () => {
    test('placeholders match gravatar docs', () => {
      const fixedValues: string[] = ['404', 'mp', 'identicon', 'monsterid', 'mavatar', 'retro', 'robohash', 'blank']
      const enumValues: string[] = Object.values(GravatarPlaceholderOption)

      for (const placeholder of enumValues) {
        expect(fixedValues).toContainEqual(placeholder)
      }
    })
  })

  describe('gravatar rating', () => {
    test('rating options match gravatar docs', () => {
      const fixedValues: string[] = ['g', 'pg', 'r', 'x']
      const enumValues: string[] = Object.values(GravatarRatingOption)

      for (const ratingOption of enumValues) {
        expect(fixedValues).toContainEqual(ratingOption)
      }
    })
  })
})

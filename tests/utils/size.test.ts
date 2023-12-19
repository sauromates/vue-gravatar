import { expectTypeOf } from 'vitest'
import { ImageSizeRange, ImageSize } from '../../src/types/util'
import { isValidImageSize, imageSize } from '../../src/utils/size'
import { randomInt } from '../helpers/randomInt'

describe.each([
  { pixels: 10, expected: false, scenario: 'less than min' },
  { pixels: 80, expected: true, scenario: 'equals min' },
  { pixels: randomInt(ImageSizeRange.Min, ImageSizeRange.Max), expected: true, scenario: 'between min and max' },
  { pixels: 3000, expected: false, scenario: 'greater than max' }
])('image size util', ({ pixels, expected, scenario }) => {
  test(`validator returns ${expected} with ${pixels} pixels (${scenario})`, () => {
    expect(isValidImageSize(pixels)).toBe(expected)
  })

  if (!expected) {
    it('throws error on invalid image size', () => {
      expect(() => imageSize(pixels)).toThrow(
        `Gravatar size should be between ${ImageSizeRange.Min} and ${ImageSizeRange.Max}, ${pixels} given`
      )
    })
  } else {
    it('creates a type from raw number', () => {
      expectTypeOf(imageSize).toBeFunction()
      expectTypeOf(imageSize(pixels)).toMatchTypeOf<ImageSize>()
    })
  }
})

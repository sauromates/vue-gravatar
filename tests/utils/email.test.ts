import { expectTypeOf } from 'vitest'
import { type Email } from '../../src/types/util'
import { isValidEmail, createEmail } from '../../src/utils/email'

describe('email util', () => {
  const validEmail: string = 'test@example.org'
  const invalidEmail: string = 'test.example.org'

  it('accepts valid emai', () => {
    expect(isValidEmail(validEmail)).toBeTruthy()
  })

  it('does not accept invalid email', () => {
    expect(isValidEmail(invalidEmail)).toBeFalsy()
  })

  it('creates a type from raw string', () => {
    expectTypeOf(createEmail(validEmail)).toMatchTypeOf<Email>()
  })

  it('throws error on invalid email', () => {
    expect(() => createEmail(invalidEmail)).toThrow(`Can't use ${invalidEmail} as Gravatar profile email`)
  })
})

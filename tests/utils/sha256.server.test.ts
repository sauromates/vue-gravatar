// @vitest-environment node

import { sha256 } from 'js-sha256'
import { exampleHash } from '../helpers/exampleHash'

describe('sha256 hash util', () => {
  it('produces 64 characters hex digest', async () => {
    const hash = sha256.create().update('test@example.org').toString()

    expect(hash).toBeTruthy()
    expect(hash.length).toEqual(64)
  })

  it('produces correct hash', async () => {
    const expected: string = exampleHash
    const hash = sha256.create().update('test@example.org').toString()

    expect(hash).toStrictEqual(expected)
  })
})

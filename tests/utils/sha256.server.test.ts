// @vitest-environment node

import { sha256 } from '../../src/utils/sha256'
import { exampleHash } from '../helpers/exampleHash'

describe('sha256 hash util', () => {
  it('produces 64 characters hex digest', async () => {
    const hash = await sha256('test@example.org')

    expect(hash).toBeTruthy()
    expect(hash.length).toEqual(64)
  })

  it('produces correct hash', async () => {
    const expected: string = exampleHash
    const hash = await sha256('test@example.org')

    expect(hash).toStrictEqual(expected)
  })
})

import { sha256 } from '../../src/utils/sha256'

describe('sha256 hash util', () => {
  it('produces 64 characters hex digest', async () => {
    const hash = await sha256('test@example.org')

    expect(hash).toBeTruthy()
    expect(hash.length).toEqual(64)
  })

  it('produces correct hash', async () => {
    const expected: string = '388c735eec8225c4ad7a507944dd0a975296baea383198aa87177f29af2c6f69'
    const hash = await sha256('test@example.org')

    expect(hash).toStrictEqual(expected)
  })
})

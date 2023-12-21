import { createHash } from 'crypto'

export async function sha256(target: string): Promise<string> {
  return typeof window !== 'undefined' ? await hashUsingBrowserModule(target) : await hashUsingNodeModule(target)
}

async function hashUsingBrowserModule(target: string): Promise<string> {
  const crypto = window.crypto.subtle

  const sanitizedString = target.trim().toLowerCase()
  const encodedString = new TextEncoder().encode(sanitizedString)

  const hashBuffer = await crypto.digest('sha-256', encodedString)
  const hashArray = Array.from(new Uint8Array(hashBuffer))

  return hashArray.map((item) => item.toString(16).padStart(2, '0')).join('')
}

async function hashUsingNodeModule(target: string): Promise<string> {
  return new Promise<string>((resolve) =>
    resolve(createHash('sha256').update(target.trim().toLowerCase()).digest('hex'))
  )
}

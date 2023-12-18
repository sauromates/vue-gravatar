export async function sha256(target: string): Promise<string> {
  const crypto = window.crypto.subtle

  const sanitizedEmail = target.trim().toLowerCase()
  const encodedEmail = new TextEncoder().encode(sanitizedEmail)

  const hashBuffer = await crypto.digest('sha-256', encodedEmail)
  const hashArray = Array.from(new Uint8Array(hashBuffer))

  return hashArray.map((item) => item.toString(16).padStart(2, '0')).join('')
}

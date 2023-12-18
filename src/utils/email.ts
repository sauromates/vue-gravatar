import { type Email } from '../types/util'

export function isValidEmail(email: string): email is Email {
  return email.includes('@') && email.includes('.')
}

export function createEmail<T extends string>(email: T & (string extends T ? string : Email)): Email {
  if (!isValidEmail(email)) {
    throw new Error(`Can't use ${email} as Gravatar profile email`)
  }

  return email
}

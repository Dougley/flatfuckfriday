export async function checkSecurityHeaders (request: Request, body: string, env: Record<string, any>): Promise<boolean> {
  if (!request.headers.has('X-Signature-Ed25519') || !request.headers.has('X-Signature-Timestamp')) return false

  const signature = request.headers.get('X-Signature-Ed25519') as string
  const timestamp = request.headers.get('X-Signature-Timestamp') as string

  const pubkey = valueToUint8Array(env.DISCORD_NACL_PUBLIC_KEY, 'hex')
  const timestampUint8 = valueToUint8Array(timestamp)
  const signatureUint8 = valueToUint8Array(signature, 'hex')
  const bodyUint8 = valueToUint8Array(body)
  const hashbuf = concatUint8Arrays(timestampUint8, bodyUint8)

  const key = await crypto.subtle.importKey(
    'raw',
    pubkey,
    { name: 'NODE-ED25519', namedCurve: 'NODE-ED25519' },
    false,
    ['verify']
  )
  return await crypto.subtle.verify('NODE-ED25519', key, signatureUint8, hashbuf)
}

// https://github.com/discord/discord-interactions-js/blob/main/src/index.ts

export function valueToUint8Array (value: Uint8Array | ArrayBuffer | string, format?: string): Uint8Array {
  if (value == null) {
    return new Uint8Array()
  }
  if (typeof value === 'string') {
    if (format === 'hex') {
      const matches = value.match(/.{1,2}/g)
      if (matches == null) {
        throw new Error('Value is not a valid hex string')
      }
      const hexVal = matches.map((byte: string) => parseInt(byte, 16))
      return new Uint8Array(hexVal)
    } else {
      return new TextEncoder().encode(value)
    }
  }
  if (value instanceof ArrayBuffer) {
    return new Uint8Array(value)
  }
  if (value instanceof Uint8Array) {
    return value
  }
  throw new Error('Unrecognized value type, must be one of: string, ArrayBuffer, Uint8Array')
}

export function concatUint8Arrays (arr1: Uint8Array, arr2: Uint8Array): Uint8Array {
  const merged = new Uint8Array(arr1.length + arr2.length)
  merged.set(arr1)
  merged.set(arr2, arr1.length)
  return merged
}

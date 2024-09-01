export function ensureError(value: unknown): Error {
  if (value instanceof Error) return value

  let stringified = "[Unable to stringify the thrown value]"
  try {
    stringified = JSON.stringify(value)
  } catch {}

  return new Error(`Unexpected error: ${stringified}`)
}

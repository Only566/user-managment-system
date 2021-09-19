import status from 'http-status'

export default class HttpError extends Error {
  constructor(
    code: keyof status.HttpStatus, msg: string
  ) {
    super(`[${status[code]}] ${msg}`)
    Object.setPrototypeOf(this, HttpError.prototype)
  }
}

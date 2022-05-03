export class NotFoundError extends Error {
  constructor (resource: string) {
    super(`NotFound resource: ${resource}`)
    this.name = 'NotFoundError'
  }
}

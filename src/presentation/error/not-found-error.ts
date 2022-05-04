export class NotFoundError extends Error {
  constructor (resource: string) {
    super(`${resource} NotFound`)
    this.name = 'NotFoundError'
  }
}

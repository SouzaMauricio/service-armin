interface ISendEmailInput {
  to: string[]
  cc?: string[]
  cco?: string[]
  subject: string
  body: string
}

export class SendEmailInput {
  readonly to: string[]
  readonly cc?: string[]
  readonly cco?: string[]
  readonly subject: string
  readonly body: string

  constructor (body: ISendEmailInput) {
    this.to = body.to
    this.subject = body.subject
    this.body = body.body
    if (body.cc) this.cc = body.cc
    if (body.cco) this.cco = body.cco
  }
}

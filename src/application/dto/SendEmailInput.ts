interface ISendEmailInput {
  to: string[]
  cc?: string[]
  cco?: string[]
  subject: string
  body: string
}

export class SendEmailInput {
  to: string[]
  cc?: string[]
  cco?: string[]
  subject: string
  body: string

  constructor (body: ISendEmailInput) {
    this.to = body.to
    this.subject = body.subject
    this.body = body.body
    if (body.cc) this.cc = body.cc
    if (body.cco) this.cco = body.cco
  }
}

import { IParserContactUsTypes } from '../../domain/services/IParserContactUsTypes'
import { SELL_MY_PROPERTY, RENT_MY_PROPERTY, PARTNERSHIPS, OTHERS } from '../../domain/enums/contact-us-types-valid-values'
export class ParserContactUsTypes implements IParserContactUsTypes {
  private readonly typesMapped: {}

  constructor () {
    this.typesMapped = {
      [SELL_MY_PROPERTY]: 'Vender minha propriedade',
      [RENT_MY_PROPERTY]: 'Alugar minha propriedade',
      [PARTNERSHIPS]: 'Parcerias',
      [OTHERS]: 'Outros assuntos'
    }
  }

  parseType (type: string): string {
    if (this.typesMapped[type]) return this.typesMapped[type]
    return 'Opção Inválida'
  }
}

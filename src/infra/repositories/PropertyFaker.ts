import { IPropertyRepository } from '../../domain/infra/repositories/IProperty'

export class PropertyRepositoryFaker implements IPropertyRepository {
  async getUserEmailByPropertyId (propertyId): Promise<string> {
    return 'email_user@email.com'
  }
}

export class IPropertyRepository {
  getUserEmailByPropertyId: (propertyId: string) => Promise<string>
}

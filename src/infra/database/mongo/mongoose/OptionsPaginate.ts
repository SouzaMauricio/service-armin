export class OptionsPaginate {
  getOptionsPaginate (options): any {
    const {
      page = 1,
      limit = 10,
      sort = '-createdAt',
      select = '',
      populate = ''
    } = options
    const selectSplitted = select.split(',').join(' ')
    return {
      page,
      limit,
      sort,
      populate,
      select: selectSplitted
    }
  }
}

export class OptionsPaginate {
  getOptionsPaginate (options): any {
    const {
      page = 1,
      limit = 10,
      sort = '-createdAt',
      select
    } = options

    return {
      page,
      limit,
      sort,
      select
    }
  }
}

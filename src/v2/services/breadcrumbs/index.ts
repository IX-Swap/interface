export const breadcrumbsService = {
  items: [] as any[],

  addItem(item: any) {
    this.items.push(item)
  }
}

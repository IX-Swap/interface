import { breadcrumbsService } from 'v2/services/breadcrumbs'

describe('breadcrumbsService', () => {
  it('will return items array and addItem function', () => {
    expect(breadcrumbsService).toEqual({
      items: expect.any(Array),
      addItem: expect.any(Function)
    })
  })

  it('will have correct default values', () => {
    const obj = breadcrumbsService
    expect(obj.items).toEqual([])
  })

  describe('addItem', () => {
    it('will add given item to items', () => {
      const obj = breadcrumbsService
      expect(obj.items).toEqual([])

      obj.addItem('test item')
      expect(obj.items).toEqual(['test item'])
    })
  })
})

import { document, documents } from '__fixtures__/identity'
import { getDataroomFileId, itemComparator } from '../dataroom'

describe('getDataroomFileId', () => {
  it('returns empty string if file is null', () => {
    expect(getDataroomFileId(null)).toBe('')
  })

  it('returns empty string if file is undefined', () => {
    expect(getDataroomFileId(undefined)).toBe('')
  })

  it('returns id string of document', () => {
    expect(getDataroomFileId(document)).toBe(document._id)
  })

  it('returns fileument id of document', () => {
    const extendedDocument = { ...document, fileument: { _id: '1' } }
    expect(getDataroomFileId(extendedDocument)).toBe(
      extendedDocument.fileument._id
    )
  })

  it('returns id of first document', () => {
    expect(getDataroomFileId(documents)).toBe(documents[0]._id)
  })
})

describe('itemComparator', () => {
  it('returns true if both item has equal id values', () => {
    expect(itemComparator({ id: '1', index: 1 }, { id: '1', index: 2 })).toBe(
      true
    )
  })

  it('returns false if both item has not equal id values', () => {
    expect(itemComparator({ id: '1', index: 1 }, { id: '2', index: 2 })).toBe(
      false
    )
  })
})

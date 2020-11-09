import { document, documents } from '__fixtures__/identity'
import { getDataroomFileId } from '../dataroom'

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

  it('returns id of first document', () => {
    expect(getDataroomFileId(documents)).toBe(documents[0]._id)
  })
})

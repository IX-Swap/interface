import docs from 'app/pages/identity/const/documents'
import { prepareDocumentsForUpload, getIdentityDocuments } from '../utils'
import { DataroomFile, FormArray } from 'types/dataroomFile'
import { documents } from '__fixtures__/identity'
import { Maybe } from 'types/util'

const documentsWithGuide: FormArray<Maybe<DataroomFile>> = [
  { value: documents[0] },
  { value: documents[1] }
]

describe('prepareDocumentsForUpload', () => {
  it('returns array of ids if documents exist', () => {
    expect(prepareDocumentsForUpload(documentsWithGuide)).toEqual([
      documents[0]._id,
      documents[1]._id
    ])
  })

  it('returns empty array if documents does not exist', () => {
    expect(prepareDocumentsForUpload([{ value: null }])).toEqual([])
  })
})

describe('getIdentityDocuments', () => {
  it('returns identity documents of specified type if identity is undefined', () => {
    expect(getIdentityDocuments(undefined, 'individual')).toEqual(
      docs.individual
    )
    expect(getIdentityDocuments(undefined, 'corporate')).toEqual(docs.corporate)
  })
})

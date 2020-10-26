import docs from 'v2/app/pages/identity/const/documents'
import {
  allDeclarationsAreChecked,
  prepareDocumentsForUpload,
  getIdentityDocuments
} from '../utils'
import { DataroomFile, FormArray } from 'v2/types/dataroomFile'
import {
  documents,
  checkedDeclarations,
  unCheckedDeclarations
} from '__fixtures__/identity'
import { Maybe } from 'v2/types/util'

describe('allDeclarationsAreChecked', () => {
  it('returns true if all declarations have first property value "Yes"', () => {
    expect(allDeclarationsAreChecked(checkedDeclarations)).toEqual(true)
  })

  it('returns false if all declarations does not have first property value "Yes"', () => {
    expect(allDeclarationsAreChecked(unCheckedDeclarations)).toEqual(false)
  })
})

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

import docs from 'v2/app/pages/identity/const/documents'
import {
  allDeclarationsAreChecked,
  prepareDocumentsForUpload,
  getIdentityDocuments
} from '../utils'
import { DataroomFileWithGuide } from 'v2/types/dataroomFile'
import {
  documents,
  checkedDeclarations,
  unCheckedDeclarations
} from '__fixtures__/identity'

describe('allDeclarationsAreChecked', () => {
  it('returns true if all declarations have first property value "Yes"', () => {
    expect(allDeclarationsAreChecked(checkedDeclarations)).toEqual(true)
  })

  it('returns false if all declarations does not have first property value "Yes"', () => {
    expect(allDeclarationsAreChecked(unCheckedDeclarations)).toEqual(false)
  })
})

const documentsWithGuide: DataroomFileWithGuide[] = [
  { title: '', label: '', type: '', document: documents[0] },
  { title: '', label: '', type: '', document: documents[1] }
]

describe('prepareDocumentsForUpload', () => {
  it('returns array of ids if documents exist', () => {
    expect(prepareDocumentsForUpload(documentsWithGuide)).toEqual([
      documents[0]._id,
      documents[1]._id
    ])
  })

  it('returns empty array if documents does not exist', () => {
    expect(
      prepareDocumentsForUpload([
        { title: '', label: '', type: '', document: null }
      ])
    ).toEqual([])
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

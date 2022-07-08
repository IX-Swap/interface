import { DataroomFile, FormArray } from 'types/dataroomFile'
import { documents } from '__fixtures__/identity'
import { Maybe } from 'types/util'
import {
  adjustIdentityOccupation,
  prepareDocumentsForUpload
} from 'app/pages/identity/utils/shared'

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

describe('adjustIdentityOccupation', () => {
  it('adjusts occupation with space', () => {
    expect(adjustIdentityOccupation('COMPUTER PROGRAMMER')).toEqual(
      'Computer Programmer'
    )
  })

  it('adjusts occupation with /', () => {
    expect(adjustIdentityOccupation('PAINTER/DESIGNER')).toEqual(
      'Painter/Designer'
    )
  })
})

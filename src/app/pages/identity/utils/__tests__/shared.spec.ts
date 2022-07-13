import { DataroomFile, FormArray } from 'types/dataroomFile'
import { documents } from '__fixtures__/identity'
import { Maybe } from 'types/util'
import {
  adjustIdentityOccupation,
  checkSingPassDisabled,
  getCorporateTitleText,
  prepareDocumentsForUpload,
  titleCase
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

describe('getCorporateTitleText', () => {
  it('returns correct title for view issuer', () => {
    expect(getCorporateTitleText('issuer', 'view')).toEqual(
      'View Corporate Issuer Identity'
    )
  })

  it('returns correct title for edit issuer', () => {
    expect(getCorporateTitleText('issuer', 'edit')).toEqual(
      'Edit Corporate Issuer Identity'
    )
  })

  it('returns correct title for create issuer', () => {
    expect(getCorporateTitleText('issuer', 'create')).toEqual(
      'Create Corporate Issuer Identity'
    )
  })

  it('returns correct title for default issuer', () => {
    expect(getCorporateTitleText('issuer')).toEqual('Corporate Issuer Identity')
  })

  it('returns correct title for view investor', () => {
    expect(getCorporateTitleText('investor', 'view')).toEqual(
      'View Corporate Investor Identity'
    )
  })

  it('returns correct title for edit investor', () => {
    expect(getCorporateTitleText('investor', 'edit')).toEqual(
      'Edit Corporate Investor Identity'
    )
  })

  it('returns correct title for create investor', () => {
    expect(getCorporateTitleText('investor', 'create')).toEqual(
      'Create Corporate Investor Identity'
    )
  })

  it('returns correct title for default investor', () => {
    expect(getCorporateTitleText('investor')).toEqual(
      'Corporate Investor Identity'
    )
  })
})

describe('checkSingPassDisabled', () => {
  it('returns correct boolean value when data is defined and from singpass', () => {
    expect(checkSingPassDisabled(true, 'data-value')).toBeTruthy()
  })

  it('returns correct boolean value when data is undefined and not from singpass', () => {
    expect(checkSingPassDisabled(false)).toBeFalsy()
  })

  it('returns correct boolean value when data is empty string and from singpass', () => {
    expect(checkSingPassDisabled(true, '')).toBeFalsy()
  })

  it('returns correct boolean value when data is undefined and from singpass', () => {
    expect(checkSingPassDisabled(true)).toBeFalsy()
  })

  it('returns correct boolean value when data is defined but not from singpass', () => {
    expect(checkSingPassDisabled(false, 'data-value')).toBeFalsy()
  })
})

describe('titleCase', () => {
  it('returns empty string when there is no string value passed', () => {
    expect(titleCase()).toEqual('')
  })

  it('returns correct capitalized string', () => {
    expect(titleCase('data')).toEqual('Data')
  })
})

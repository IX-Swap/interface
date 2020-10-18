import { transformDSOFormValuesToRequestArgs } from '../utils'
import { formvalues, requestargs } from '__fixtures__/issuance'

describe('transformDSOFormValuesToRequestArgs', () => {
  it('returns DSORequestArgs from form values', () => {
    expect(transformDSOFormValuesToRequestArgs(formvalues)).toEqual(requestargs)
  })
})

import { getCorporateInfoRequestPayload } from 'app/pages/identity/utils/corporate/requests'

import { corporateInfoRequestPayload } from '__fixtures__/identity'

describe('requests', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns correct getCorporateInfoRequestPayload data', () => {
    expect(getCorporateInfoRequestPayload(corporateInfoRequestPayload)).toEqual(
      corporateInfoRequestPayload
    )
  })
})

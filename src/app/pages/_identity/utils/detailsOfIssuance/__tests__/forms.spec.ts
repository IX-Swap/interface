import { getIssuerDetailsFormValues } from 'app/pages/_identity/utils/detailsOfIssuance/forms'
import { cleanup } from 'test-utils'
import { detailsOfIssuance } from '__fixtures__/identity'

describe('forms', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns correct data', async () => {
    expect(getIssuerDetailsFormValues(detailsOfIssuance)).toEqual(
      detailsOfIssuance
    )
  })
})

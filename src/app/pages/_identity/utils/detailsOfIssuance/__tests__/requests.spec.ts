import { getIssuerDetailsRequestPayload } from 'app/pages/_identity/utils/detailsOfIssuance/requests'
import { cleanup } from 'test-utils'
import { detailsOfIssuance } from '__fixtures__/identity'

describe('requests', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns correct data', async () => {
    expect(getIssuerDetailsRequestPayload(detailsOfIssuance)).toEqual(
      detailsOfIssuance
    )
  })
})

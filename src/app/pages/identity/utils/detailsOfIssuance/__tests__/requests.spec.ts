import {
  getIssuerDetailsRequestPayload,
  getIssuerDocumentsRequestPayload
} from 'app/pages/identity/utils/detailsOfIssuance/requests'
import { cleanup } from 'test-utils'
import { detailsOfIssuanceFormValues } from '__fixtures__/identity'

describe('requests', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns correct getIssuerDetailsRequestPayload data', () => {
    expect(getIssuerDetailsRequestPayload(detailsOfIssuanceFormValues)).toEqual(
      detailsOfIssuanceFormValues
    )
  })

  it('returns correct getIssuerDocumentsRequestPayload data', () => {
    expect(
      getIssuerDocumentsRequestPayload(detailsOfIssuanceFormValues)
    ).toEqual({ documents: ['1', '2', '3'] })
  })
})

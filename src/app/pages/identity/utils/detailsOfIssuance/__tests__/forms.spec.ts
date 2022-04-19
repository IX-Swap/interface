import {
  getIssuerDetailsFormValues,
  getIssuerDocumentsFormValues
} from 'app/pages/identity/utils/detailsOfIssuance/forms'

import { detailsOfIssuance, document } from '__fixtures__/identity'

describe('forms', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns correct getIssuerDetailsFormValues data', () => {
    expect(getIssuerDetailsFormValues(detailsOfIssuance)).toEqual({
      fullName: detailsOfIssuance.fullName,
      companyName: detailsOfIssuance.companyName,
      companyRegistrationNumber: detailsOfIssuance.companyRegistrationNumber,
      contactNumber: detailsOfIssuance.contactNumber,
      email: detailsOfIssuance.email,
      industry: detailsOfIssuance.industry,
      fundRaisingAmount: detailsOfIssuance.fundRaisingAmount,
      detail: detailsOfIssuance.detail
    })
  })

  it('returns correct getIssuerDocumentsFormValues data', () => {
    expect(getIssuerDocumentsFormValues(detailsOfIssuance)).toEqual({
      companyRelated: [
        { value: { ...document, _id: '1', type: 'Company-Related Documents' } }
      ],
      issuanceRelated: [
        { value: { ...document, _id: '2', type: 'Issuance-Related Documents' } }
      ],
      financial: [
        { value: { ...document, _id: '3', type: 'Financial Documents' } }
      ]
    })
  })
})

import { CompanyPersonnel } from 'app/pages/identity/components/CorporateIdentityView/CompanyPersonnel'
import React from 'react'
import { render } from 'test-utils'
import { corporate } from '__fixtures__/identity'

describe('CompanyPersonnel', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('does not render address when it is undefined', () => {
    const { queryByText } = render(
      <CompanyPersonnel
        personnel={corporate.representatives[0]}
        showDocumentHeader={false}
        documentsTitle='Documents'
      />
    )

    expect(queryByText('Residential Address')).not.toBeTruthy()
  })
})

import { CompanyPersonnel } from 'app/pages/_identity/components/CorporateIdentityView/CompanyPersonnel'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { corporate } from '__fixtures__/identity'

describe('CompanyPersonnel', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <CompanyPersonnel
        personnel={corporate.representatives[0]}
        showDocumentHeader={false}
        documentsTitle='Documents'
      />
    )
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

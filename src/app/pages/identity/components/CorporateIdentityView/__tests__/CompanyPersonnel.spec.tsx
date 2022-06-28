import { CompanyPersonnel } from 'app/pages/identity/components/CorporateIdentityView/CompanyPersonnel'
import React from 'react'
import { render } from 'test-utils'
import { corporate } from '__fixtures__/identity'

describe('CompanyPersonnel', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const { container } = render(
      <CompanyPersonnel
        personnel={corporate.representatives[0]}
        title='Documents'
      />
    )

    expect(container).toMatchSnapshot()
  })
})

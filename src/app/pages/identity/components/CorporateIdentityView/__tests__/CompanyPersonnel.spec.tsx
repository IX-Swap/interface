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
        personnel={[{ value: corporate.representatives[0] }] as any}
        title='Documents'
      />
    )

    expect(queryByText('Residential Address')).not.toBeTruthy()
  })
})

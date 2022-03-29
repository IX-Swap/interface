import { CorporateInfo } from 'app/pages/identity/components/CorporateIdentityView/CorporateInfo'
import React from 'react'
import { render } from 'test-utils'
import { corporate } from '__fixtures__/identity'

window.URL.revokeObjectURL = jest.fn()

describe('CorporateInfo', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders data labels correctly', () => {
    const { getByText } = render(<CorporateInfo data={corporate} />)
    expect(getByText('Company Name')).toBeTruthy()
    expect(getByText('Company Registration Number/UEN')).toBeTruthy()
    expect(getByText('Country of Incorporation')).toBeTruthy()
    expect(getByText('Legal Entity')).toBeTruthy()
  })
})

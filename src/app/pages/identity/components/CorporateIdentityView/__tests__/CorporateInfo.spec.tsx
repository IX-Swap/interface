import { CorporateInfo } from 'app/pages/identity/components/CorporateIdentityView/CorporateInfo'
import React from 'react'
import { render } from 'test-utils'
import { corporate } from '__fixtures__/identity'

window.URL.revokeObjectURL = jest.fn()

describe('CorporateInfo', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const { container } = render(<CorporateInfo data={corporate} />)
    expect(container).toMatchSnapshot()
  })
})

import { CorporateIdentityView } from 'app/pages/identity/components/CorporateIdentityView/CorporateIdentityView'
import React from 'react'
import { render } from 'test-utils'
import { corporate } from '__fixtures__/authorizer'

window.URL.revokeObjectURL = jest.fn()

describe('CorporateIdentityView', () => {
  it('should match snapshot', () => {
    const { container } = render(<CorporateIdentityView data={corporate} />)
    expect(container).toMatchSnapshot()
  })
})

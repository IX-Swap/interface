import { CompanyInfoView } from 'app/pages/identity/components/CompanyInfoView/CompanyInfoView'
import React from 'react'
import { render } from 'test-utils'
import { corporate } from '__fixtures__/identity'

window.URL.revokeObjectURL = jest.fn()

describe('CompanyInfoView', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<CompanyInfoView data={corporate} />)
  })
})

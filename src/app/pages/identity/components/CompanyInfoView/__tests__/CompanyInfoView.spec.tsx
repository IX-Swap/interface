import { CompanyInfoView } from 'app/pages/_identity/components/CompanyInfoView/CompanyInfoView'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { corporate } from '__fixtures__/identity'

window.URL.revokeObjectURL = jest.fn()

describe('CompanyInfoView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<CompanyInfoView data={corporate} />)
  })
})

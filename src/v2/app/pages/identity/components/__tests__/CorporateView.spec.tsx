import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  CorporateView,
  CorporateViewProps
} from 'v2/app/pages/identity/components/CorporateView'
import { corporate } from '__fixtures__/identity'
import { CompanyInfoView } from 'v2/app/pages/identity/components/CompanyInfoView'

jest.mock('v2/app/pages/identity/components/CompanyInfoView', () => ({
  CompanyInfoView: jest.fn(() => null)
}))

describe('CorporateView', () => {
  const props: CorporateViewProps = { data: corporate }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<CorporateView {...props} />)
  })

  it('renders CompanyInformation with correct props', () => {
    render(<CorporateView {...props} />)

    expect(CompanyInfoView).toHaveBeenCalledWith({ data: corporate }, {})
  })
})

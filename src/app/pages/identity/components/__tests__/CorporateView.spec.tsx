import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  CorporateView,
  CorporateViewProps
} from 'app/pages/identity/components/CorporateView'
import { corporate } from '__fixtures__/identity'

jest.mock('app/pages/identity/components/CompanyInfoView', () => ({
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
})

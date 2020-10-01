/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { IndividualIdPreview } from 'v2/app/pages/identity/components/IndividualIdPreview'
import { CorporateIdPreview } from 'v2/app/pages/identity/components/CorporateIdPreview'
import { IdentitiesList } from 'v2/app/pages/identity/pages/IdentitiesList'

jest.mock('v2/app/pages/identity/components/IndividualIdPreview', () => ({
  IndividualIdPreview: jest.fn(() => null)
}))
jest.mock('v2/app/pages/identity/components/CorporateIdPreview', () => ({
  CorporateIdPreview: jest.fn(() => null)
}))

describe('IdentitiesList', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<IdentitiesList />)
  })

  it('renders IndividualIdPreview & CorporateIdPreview', () => {
    render(<IdentitiesList />)

    expect(IndividualIdPreview).toHaveBeenCalledTimes(1)
    expect(CorporateIdPreview).toHaveBeenCalledTimes(1)
  })
})

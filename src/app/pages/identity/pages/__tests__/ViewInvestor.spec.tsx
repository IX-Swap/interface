import React from 'react'
import {
  getTitleText,
  ViewInvestor
} from 'app/pages/identity/pages/ViewInvestor/ViewInvestor'

describe('ViewInvestor', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('getTitleText should return correct value', () => {
    expect(getTitleText('issuer')).toEqual('View Corporate Issuer Identity')
    expect(getTitleText('investor')).toEqual('View Corporate Investor Identity')
  })
})

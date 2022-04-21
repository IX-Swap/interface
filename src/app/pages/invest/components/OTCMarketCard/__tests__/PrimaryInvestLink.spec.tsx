import React from 'react'
import { render } from 'test-utils'
import { dso } from '__fixtures__/authorizer'
import {
  PrimaryInvestLink,
  PrimaryInvestLinkProps
} from 'app/pages/invest/components/OTCMarketCard/PrimaryInvestLink'
import * as Button from '@mui/material/Button'

jest.mock('@mui/material/Button', () => jest.fn(() => null))

describe('PrimaryInvestLink', () => {
  const primaryProps: PrimaryInvestLinkProps = {
    type: 'Primary',
    data: dso
  }

  const OTCProps: PrimaryInvestLinkProps = {
    type: 'OTC',
    data: dso
  }
  const TopOffersProps: PrimaryInvestLinkProps = {
    type: 'Primary',
    data: dso
  }
  const defaultPrimaryInvestProps = {
    style: { fontSize: 16, marginTop: 16 },
    variant: 'contained',
    color: 'primary'
  }
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders Button with correct props when type is Primary', () => {
    render(<PrimaryInvestLink {...primaryProps} />)

    expect(Button).toHaveBeenCalledTimes(1)
    expect(Button).toHaveBeenCalledWith(
      expect.objectContaining({
        ...defaultPrimaryInvestProps,
        disabled: false,
        children: 'Invest'
      }),
      {}
    )
  })

  it('renders Button with correct props when type is Primary', () => {
    render(<PrimaryInvestLink {...TopOffersProps} />)

    expect(Button).toHaveBeenCalledTimes(1)
    expect(Button).toHaveBeenCalledWith(
      expect.objectContaining({
        ...defaultPrimaryInvestProps,
        disabled: false,
        children: 'Invest'
      }),
      {}
    )
  })

  it('renders Button with correct props when type is OTC', () => {
    render(<PrimaryInvestLink {...OTCProps} />)

    expect(Button).toHaveBeenCalledTimes(1)
    expect(Button).toHaveBeenCalledWith(
      expect.objectContaining({
        ...defaultPrimaryInvestProps,
        disabled: true,
        children: 'Trade'
      }),
      {}
    )
  })
})

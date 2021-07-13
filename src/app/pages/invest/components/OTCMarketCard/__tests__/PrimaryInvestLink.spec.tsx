import React from 'react'
import { render, cleanup } from 'test-utils'
import { dso } from '__fixtures__/authorizer'
import {
  PrimaryInvestLink,
  PrimaryInvestLinkProps
} from 'app/pages/invest/components/OTCMarketCard/PrimaryInvestLink'
import * as Button from '@material-ui/core/Button'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { OTCMarketRoute } from 'app/pages/exchange/router/config'
import { InvestRoute } from 'app/pages/invest/router/config'

jest.mock('@material-ui/core/Button', () => jest.fn(() => null))

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
    style: { fontSize: 16 },
    variant: 'contained',
    color: 'primary',
    component: AppRouterLinkComponent
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<PrimaryInvestLink {...primaryProps} />)
  })

  it('renders Button with correct props when type is Primary', () => {
    render(<PrimaryInvestLink {...primaryProps} />)

    expect(Button).toHaveBeenCalledTimes(1)
    expect(Button).toHaveBeenCalledWith(
      expect.objectContaining({
        ...defaultPrimaryInvestProps,
        disabled: false,
        to: InvestRoute.makeInvestment,
        params: {
          issuerId: dso.createdBy,
          dsoId: dso._id
        },
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
        to: InvestRoute.makeInvestment,
        params: {
          issuerId: dso.createdBy,
          dsoId: dso._id
        },
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
        // TODO Change route for OTC after complete OTC page
        to: OTCMarketRoute.market,
        params: {
          pairId: dso._id
        },
        children: 'Trade'
      }),
      {}
    )
  })
})

import React from 'react'
import { render } from 'test-utils'
import { dso } from '__fixtures__/authorizer'
import {
  DSOCardAction,
  DSOCardActionProps
} from 'app/pages/invest/components/DSOCard/DSOCardAction'
import * as Button from '@mui/material/Button'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { InvestRoute } from 'app/pages/invest/router/config'

jest.mock('@mui/material/Button', () => jest.fn(() => null))

describe('DSOCardAction', () => {
  const defaultPrimaryInvestProps = {
    fullWidth: true,
    style: { fontSize: 16, marginTop: 24 },
    variant: 'contained',
    color: 'primary',
    component: AppRouterLinkComponent
  }

  const primaryProps: DSOCardActionProps = {
    type: 'Primary',
    data: dso
  }

  const OTCProps: DSOCardActionProps = {
    type: 'OTC',
    data: dso
  }
  const TopOffersProps: DSOCardActionProps = {
    type: 'Primary',
    data: dso
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders Button with correct props when type is Primary', () => {
    render(<DSOCardAction {...primaryProps} />)

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
    render(<DSOCardAction {...TopOffersProps} />)

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
    render(<DSOCardAction {...OTCProps} />)

    expect(Button).toHaveBeenCalledTimes(1)
    expect(Button).toHaveBeenCalledWith(
      expect.objectContaining({
        ...defaultPrimaryInvestProps,
        disabled: false,
        // TODO Change route when we will have more featured pairs
        to: InvestRoute.trading,
        params: {
          pairId: dso._id
        },
        children: 'Trade'
      }),
      {}
    )
  })
})

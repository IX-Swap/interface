import React from 'react'
import { render } from 'test-utils'
import { DSOLogo } from 'app/components/DSO/components/DSOLogo'
import { dso } from '__fixtures__/authorizer'
import {
  CardCover,
  CardCoverProps
} from 'app/pages/invest/components/OTCMarketCard/CardCover'
import { DSOFavorite } from 'app/components/DSOFavorite'
import { dsoQueryKeys } from 'config/queryKeys'

jest.mock('app/components/DSO/components/DSOLogo', () => ({
  DSOLogo: jest.fn(() => null)
}))
jest.mock('app/components/DSOFavorite', () => ({
  DSOFavorite: jest.fn(() => null)
}))

describe('CardCover', () => {
  const primaryProps: CardCoverProps = {
    data: dso,
    viewURL: 'foo',
    type: 'Primary'
  }
  const OTCProps: CardCoverProps = {
    data: dso,
    viewURL: 'foo',
    type: 'OTC'
  }
  const TopOffersProps: CardCoverProps = {
    data: dso,
    viewURL: 'foo',
    type: 'TopOffers'
  }
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<CardCover {...primaryProps} />)
  })

  it('renders DSOLogo with correct props when type is Primary', () => {
    render(<CardCover {...primaryProps} />)

    expect(DSOLogo).toHaveBeenCalledTimes(1)
    expect(DSOLogo).toHaveBeenCalledWith(
      expect.objectContaining({
        uri: undefined,
        dsoId: dso._id
      }),
      {}
    )
  })

  it('renders DSOLogo with correct props when type is OTC', () => {
    render(<CardCover {...OTCProps} />)

    expect(DSOLogo).toHaveBeenCalledTimes(1)
    expect(DSOLogo).toHaveBeenCalledWith(
      expect.objectContaining({
        uri: '/dataroom/raw/',
        dsoId: dso.logo
      }),
      {}
    )
  })

  it('renders DSOFavorite with correct props when type is Primary', () => {
    render(<CardCover {...primaryProps} />)

    expect(DSOFavorite).toHaveBeenCalledTimes(1)
    expect(DSOFavorite).toHaveBeenCalledWith(
      {
        dso: dso,
        dependentQueryKeys: [dsoQueryKeys.getPromoted]
      },
      {}
    )
  })

  it('renders DSOFavorite with correct props when type is TopOffers', () => {
    render(<CardCover {...TopOffersProps} />)

    expect(DSOFavorite).toHaveBeenCalledTimes(1)
    expect(DSOFavorite).toHaveBeenCalledWith(
      {
        dso: dso,
        dependentQueryKeys: [
          dsoQueryKeys.getPromoted,
          dsoQueryKeys.getApprovedList
        ]
      },
      {}
    )
  })

  it('renders DSOFavorite when type is OTC', () => {
    render(<CardCover {...OTCProps} />)

    expect(DSOFavorite).toHaveBeenCalledTimes(0)
  })
})

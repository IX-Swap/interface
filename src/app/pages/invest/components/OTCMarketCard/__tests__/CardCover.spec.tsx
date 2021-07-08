import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSOLogo } from 'app/components/DSO/components/DSOLogo'
import { dso } from '__fixtures__/authorizer'
import {
  CardCover,
  CardCoverProps
} from 'app/pages/invest/components/OTCMarketCard/CardCover'
import { DSOFavorite } from 'app/components/DSOFavorite'

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
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
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
        dso: dso
      },
      {}
    )
  })

  it('renders DSOFavorite when type is OTC', () => {
    render(<CardCover {...OTCProps} />)

    expect(DSOFavorite).toHaveBeenCalledTimes(0)
  })
})

import React from 'react'
import { render } from 'test-utils'
import { dso } from '__fixtures__/authorizer'
import { DSOCardAction } from 'app/pages/invest/components/DSOCard/DSOCardAction'
import {
  DSOCard,
  DSOCardProps
} from 'app/pages/invest/components/DSOCard/DSOCard'
import { DSOCardCover } from 'app/pages/invest/components/DSOCard/DSOCardCover'
import { PrimaryCardContent } from 'app/pages/invest/components/DSOCard/PrimaryCardContent'
import { OTCCardContent } from 'app/pages/invest/components/DSOCard/OTCCardContent'
import { DSOLogo } from 'app/components/DSO/components/DSOLogo'

jest.mock('app/pages/invest/components/DSOCard/DSOCardCover', () => ({
  DSOCardCover: jest.fn(() => null)
}))
jest.mock('app/pages/invest/components/DSOCard/PrimaryCardContent', () => ({
  PrimaryCardContent: jest.fn(() => null)
}))
jest.mock('app/pages/invest/components/DSOCard/OTCCardContent', () => ({
  OTCCardContent: jest.fn(() => null)
}))
jest.mock('app/pages/invest/components/DSOCard/DSOCardAction', () => ({
  DSOCardAction: jest.fn(() => null)
}))

jest.mock('app/components/DSO/components/DSOLogo', () => ({
  DSOLogo: jest.fn(() => null)
}))

describe('DSOCard', () => {
  const primaryProps: DSOCardProps = {
    data: dso,
    viewURL: 'foo',
    type: 'Primary'
  }

  const OTCProps: DSOCardProps = {
    data: dso,
    viewURL: 'foo',
    type: 'OTC'
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders DSOLogo with correct props when type is Primary', () => {
    render(<DSOCard {...primaryProps} />)

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
    render(<DSOCard {...OTCProps} />)

    expect(DSOLogo).toHaveBeenCalledTimes(1)
    expect(DSOLogo).toHaveBeenCalledWith(
      expect.objectContaining({
        uri: '/dataroom/raw/',
        dsoId: dso.logo
      }),
      {}
    )
  })

  it('renders DSOCardCover with correct primaryProps', () => {
    render(<DSOCard {...primaryProps} />)

    expect(DSOCardCover).toHaveBeenCalledTimes(1)
    expect(DSOCardCover).toHaveBeenCalledWith(primaryProps, {})
  })

  it('renders DSOCardCover with correct OTCProps', () => {
    render(<DSOCard {...OTCProps} />)

    expect(DSOCardCover).toHaveBeenCalledTimes(0)
  })

  it('renders PrimaryCardContent and OTCCardContent with correct primaryProps', () => {
    render(<DSOCard {...primaryProps} />)

    expect(PrimaryCardContent).toHaveBeenCalledTimes(1)
    expect(OTCCardContent).toHaveBeenCalledTimes(0)
    expect(PrimaryCardContent).toHaveBeenCalledWith(
      { data: primaryProps.data },
      {}
    )
  })

  it('renders PrimaryCardContent and OTCCardContent with correct OTCProps', () => {
    render(<DSOCard {...OTCProps} />)

    expect(PrimaryCardContent).toHaveBeenCalledTimes(0)
    expect(OTCCardContent).toHaveBeenCalledTimes(1)
    expect(OTCCardContent).toHaveBeenCalledWith({ data: OTCProps.data }, {})
  })

  it('renders DSOCardAction with correct props', () => {
    render(<DSOCard {...primaryProps} />)

    expect(DSOCardAction).toHaveBeenCalledTimes(1)
    expect(DSOCardAction).toHaveBeenCalledWith(
      { data: primaryProps.data, type: primaryProps.type },
      {}
    )
  })

  it('renders DSOCardAction with correct props', () => {
    render(<DSOCard {...OTCProps} />)

    expect(DSOCardAction).toHaveBeenCalledTimes(1)
    expect(DSOCardAction).toHaveBeenCalledWith(
      { data: OTCProps.data, type: OTCProps.type },
      {}
    )
  })
})

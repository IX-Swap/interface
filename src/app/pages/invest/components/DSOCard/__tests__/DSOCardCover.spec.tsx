import React from 'react'
import { render } from 'test-utils'
import { dso } from '__fixtures__/authorizer'
import { dsoQueryKeys } from 'config/queryKeys'
import {
  DSOCardCover,
  DSOCardCoverProps
} from 'app/pages/invest/components/DSOCard/DSOCardCover'
import { DSOCardFavorite } from 'app/pages/invest/components/DSOCard/DSOCardFavorite'

jest.mock('app/pages/invest/components/DSOCard/DSOCardFavorite', () => ({
  DSOCardFavorite: jest.fn(() => null)
}))

describe('DSOCardCover', () => {
  const primaryProps: DSOCardCoverProps = {
    data: dso,
    viewURL: 'foo',
    type: 'Primary'
  }

  const TopOffersProps: DSOCardCoverProps = {
    data: dso,
    viewURL: 'foo',
    type: 'TopOffers'
  }
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders capitalStructure information', () => {
    const { getByText } = render(<DSOCardCover {...primaryProps} />)

    expect(getByText(dso.capitalStructure)).toBeInTheDocument()
  })

  it('renders DSOFavorite with correct props when type is Primary', () => {
    render(<DSOCardCover {...primaryProps} />)

    expect(DSOCardFavorite).toHaveBeenCalledTimes(1)
    expect(DSOCardFavorite).toHaveBeenCalledWith(
      {
        dso: dso,
        dependentQueryKeys: [dsoQueryKeys.getPromoted]
      },
      {}
    )
  })

  it('renders DSOFavorite with correct props when type is TopOffers', () => {
    render(<DSOCardCover {...TopOffersProps} />)

    expect(DSOCardFavorite).toHaveBeenCalledTimes(1)
    expect(DSOCardFavorite).toHaveBeenCalledWith(
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
})

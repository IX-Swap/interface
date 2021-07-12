import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSOFavorite } from 'app/components/DSOFavorite'
import * as useToggleDSOFavorite from 'app/pages/invest/hooks/useToggleDSOFavorite'
import { dso } from '__fixtures__/authorizer'
import { generateQueryResult } from '__fixtures__/useQuery'
import StarIcon from '@material-ui/icons/Star'
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined'
import CircularProgress from '@material-ui/core/CircularProgress'
// import * as IconButton from '@material-ui/core'

jest.mock('@material-ui/core/CircularProgress', () => jest.fn(() => null))
jest.mock('@material-ui/icons/Star', () => jest.fn(() => null))
jest.mock('@material-ui/icons/StarBorderOutlined', () => jest.fn(() => null))

// jest.mock('@material-ui/core/IconButton', () => jest.fn(() => null))

const useToggleDSOFavoriteResponse = generateQueryResult({
  isLoading: false
})

describe('DSOFavourite', () => {
  const mutationFn = jest.fn()

  beforeEach(() => {
    jest
      .spyOn(useToggleDSOFavorite, 'useToggleDSOFavorite')
      .mockImplementation(
        () => [mutationFn, useToggleDSOFavoriteResponse] as any
      )
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DSOFavorite dependentQueryKeys={[]} dso={dso} />)
  })

  it('renders IconButton with correct props when isStarred is true', () => {
    // const handleFav = async () => {
    //   await mutationFn(dso.isStarred)
    // }

    const { getByTestId } = render(
      <DSOFavorite dependentQueryKeys={[]} dso={dso} />
    )

    // expect(IconButton).toHaveBeenCalledTimes(1)
    // expect(getByTestId('icon-button')).toHaveBeenCalledWith(
    //   expect.objectContaining({
    //     size: 'small',
    //     style: { color: '#F0D400' },
    //     children: <StarIcon color={'inherit'} />,
    //     onClick: handleFav
    //   }),
    //   {}
    // )
    expect(getByTestId('icon-button')).toHaveAttribute(
      'style',
      'color: rgb(240, 212, 0);'
    )
  })

  it('renders IconButton with correct props isStarred is false', () => {
    const { getByTestId } = render(
      <DSOFavorite dependentQueryKeys={[]} dso={{ ...dso, isStarred: false }} />
    )

    expect(getByTestId('icon-button')).toHaveAttribute(
      'style',
      'color: rgb(0, 0, 0);'
    )
  })

  it('renders CircularProgress with correct props when isLoading', () => {
    const useToggleDSOFavoriteResponse = generateQueryResult({
      isLoading: true
    })

    jest
      .spyOn(useToggleDSOFavorite, 'useToggleDSOFavorite')
      .mockImplementation(
        () => [mutationFn, useToggleDSOFavoriteResponse] as any
      )

    render(<DSOFavorite dependentQueryKeys={[]} dso={dso} />)

    expect(CircularProgress).toHaveBeenCalledTimes(1)
    expect(CircularProgress).toHaveBeenCalledWith(
      expect.objectContaining({
        thickness: 5.5,
        size: 16
      }),
      {}
    )
  })

  it('renders StarIcon with correct props isStarred is true', () => {
    render(<DSOFavorite dependentQueryKeys={[]} dso={dso} />)

    expect(StarIcon).toHaveBeenCalledTimes(1)
    expect(StarIcon).toHaveBeenCalledWith(
      expect.objectContaining({
        color: 'inherit'
      }),
      {}
    )
  })

  it('renders StarBorderOutlinedIcon with correct props isStarred is true', () => {
    render(
      <DSOFavorite dependentQueryKeys={[]} dso={{ ...dso, isStarred: false }} />
    )

    expect(StarBorderOutlinedIcon).toHaveBeenCalledTimes(1)
    expect(StarBorderOutlinedIcon).toHaveBeenCalledWith(
      expect.objectContaining({
        color: 'action'
      }),
      {}
    )
  })
})

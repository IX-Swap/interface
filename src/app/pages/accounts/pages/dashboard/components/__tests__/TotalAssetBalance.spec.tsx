import React from 'react'
import { render, cleanup } from 'test-utils'
import * as useAppBreakpoints from 'hooks/useAppBreakpoints'
import Typography from '@material-ui/core/Typography'
import { TotalAssetBalance } from 'app/pages/accounts/pages/dashboard/components/TotalAssetBalance/TotalAssetBalance'

jest.mock('@material-ui/core/Typography', () => jest.fn(() => null))

const totalAssetBalance = 1000

describe('TotalAssetBalance', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<TotalAssetBalance value={totalAssetBalance} />)
  })

  it('renders title with correct props', () => {
    render(<TotalAssetBalance value={totalAssetBalance} />)

    expect(Typography).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        children: ['Total Asset Balance', ''],
        variant: 'subtitle2'
      }),
      {}
    )
  })

  it('renders title with correct props when isMobile is true', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMobile: true
    } as any)

    render(<TotalAssetBalance value={totalAssetBalance} />)

    expect(Typography).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        children: ['Total Asset Balance', ':'],
        variant: 'subtitle2'
      }),
      {}
    )
  })
})

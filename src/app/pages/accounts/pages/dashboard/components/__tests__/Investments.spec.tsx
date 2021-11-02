import React from 'react'
import { render, cleanup } from 'test-utils'
import { Investments } from 'app/pages/accounts/pages/dashboard/components/Investments/Investments'
import * as useAppBreakpoints from 'hooks/useAppBreakpoints'
import Typography from '@material-ui/core/Typography'
import { formatAmount } from 'helpers/numbers'

jest.mock('@material-ui/core/Typography', () => jest.fn(() => null))

const primaryInvestment = 1000
const secondaryInvestment = 2000

describe('Investments', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Investments primary={primaryInvestment} />)
  })

  it('renders title with correct props', () => {
    render(<Investments primary={primaryInvestment} />)

    expect(Typography).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        children: ['Investments', ''],
        variant: 'subtitle2'
      }),
      {}
    )
  })

  it('renders title with correct props when isMobile is true', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMobile: true
    } as any)

    render(<Investments primary={primaryInvestment} />)

    expect(Typography).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        children: ['Investments', ':'],
        variant: 'subtitle2'
      }),
      {}
    )
  })

  it('renders primary investments info with correct props', () => {
    render(<Investments primary={primaryInvestment} />)

    expect(Typography).toHaveBeenCalledTimes(3)

    expect(Typography).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        children: 'Primary:',
        variant: 'subtitle2'
      }),
      {}
    )

    expect(Typography).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        children: ['US$ ', formatAmount(primaryInvestment)],
        variant: 'body1'
      }),
      {}
    )
  })

  it('renders secondary investments info with correct props', () => {
    render(
      <Investments
        primary={primaryInvestment}
        secondary={secondaryInvestment}
      />
    )

    expect(Typography).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        children: 'Secondary:',
        variant: 'subtitle2'
      }),
      {}
    )

    expect(Typography).toHaveBeenNthCalledWith(
      5,
      expect.objectContaining({
        children: ['US$ ', formatAmount(secondaryInvestment)],
        variant: 'body1'
      }),
      {}
    )
  })
})

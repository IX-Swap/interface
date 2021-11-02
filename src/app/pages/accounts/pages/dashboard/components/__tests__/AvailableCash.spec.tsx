import React from 'react'
import { render, cleanup } from 'test-utils'
import { AvailableCash } from 'app/pages/accounts/pages/dashboard/components/AvailableCash/AvailableCash'
import Typography from '@material-ui/core/Typography'
import * as useAppBreakpoints from 'hooks/useAppBreakpoints'
import { formatAmount } from 'helpers/numbers'
import { fakeVirtualAccountInfo } from '__fixtures__/portfolio'

jest.mock('@material-ui/core/Typography', () => jest.fn(() => null))

describe('AvailableCash', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<AvailableCash accounts={[fakeVirtualAccountInfo]} />)
  })

  it('renders empty container when accounts is undefined', () => {
    const { container } = render(<AvailableCash accounts={undefined} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders title with correct props', () => {
    render(<AvailableCash accounts={[fakeVirtualAccountInfo]} />)

    expect(Typography).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        children: ['Available Cash', ''],
        variant: 'subtitle2'
      }),
      {}
    )
  })

  it('renders title with correct props when isMobile is true', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMobile: true
    } as any)

    render(<AvailableCash accounts={[fakeVirtualAccountInfo]} />)

    expect(Typography).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        children: ['Available Cash', ':'],
        variant: 'subtitle2'
      }),
      {}
    )
  })

  it('renders accounts balances with correct props', () => {
    render(
      <AvailableCash
        accounts={[
          fakeVirtualAccountInfo,
          { ...fakeVirtualAccountInfo, currency: 'USD' }
        ]}
      />
    )

    expect(Typography).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        children: ['S$', ' ', formatAmount(fakeVirtualAccountInfo.balance)],
        variant: 'body1'
      }),
      {}
    )

    expect(Typography).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        children: ['US$', ' ', formatAmount(fakeVirtualAccountInfo.balance)],
        variant: 'body1'
      }),
      {}
    )
  })
})

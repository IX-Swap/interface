import React from 'react'
import { render, cleanup } from 'test-utils'
import { OrderStatus } from 'app/pages/exchange/market/components/PastOrderTable/OrderStatus'
import Typography from '@material-ui/core/Typography'

jest.mock('@material-ui/core/Typography', () => jest.fn(() => null))

describe('OrderStatus', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without error', () => {
    render(<OrderStatus status={'Open'} />)
  })

  it('renders Typography with filled status and correct prop', () => {
    render(<OrderStatus status={'Filled'} />)

    expect(Typography).toBeCalledWith(
      expect.objectContaining({ color: 'initial' }),
      {}
    )
  })

  it('renders Typography with canceled status and correct prop', () => {
    render(<OrderStatus status={'Canceled'} />)

    expect(Typography).toBeCalledWith(
      expect.objectContaining({ color: 'error' }),
      {}
    )
  })
})

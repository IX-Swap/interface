import React from 'react'
import { render, cleanup } from 'test-utils'
import { OrderStatus } from 'app/pages/exchange/components/PastOrderTable/OrderStatus'
import Typography from '@material-ui/core/Typography'

jest.mock('@material-ui/core/Typography', () => jest.fn(() => null))

describe('OrderStatus', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without error', () => {
    render(<OrderStatus status={'OPEN'} />)
  })

  it('renders Typography with filled status and correct prop', () => {
    render(<OrderStatus status={'FILLED'} />)

    expect(Typography).toBeCalledWith(
      expect.objectContaining({ color: 'initial' }),
      {}
    )
  })

  it('renders Typography with canceled status and correct prop', () => {
    render(<OrderStatus status={'CANCELLED'} />)

    expect(Typography).toBeCalledWith(
      expect.objectContaining({ color: 'error' }),
      {}
    )
  })
})

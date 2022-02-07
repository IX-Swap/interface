import React from 'react'
import { render } from 'test-utils'
import { OrderStatus } from 'app/pages/exchange/components/PastOrderTable/OrderStatus'
import Typography from '@mui/material/Typography'

jest.mock('@mui/material/Typography', () => jest.fn(() => null))

describe('OrderStatus', () => {
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

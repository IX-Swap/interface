import React from 'react'
import { render } from 'test-utils'
import * as useAppBreakpoints from 'hooks/useAppBreakpoints'
import { Trades } from 'app/pages/exchange/components/Trades/Trades'
import Grid from '@material-ui/core/Grid'

jest.mock('@material-ui/core/Grid', () => jest.fn(() => null))

describe('Trades', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders correct styles if theme type is dark', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      theme: {
        palette: { type: 'dark' }
      }
    } as any)
    render(<Trades />)

    expect(Grid).toHaveBeenCalledWith(
      expect.objectContaining({
        style: {
          backgroundColor: '#292929',
          marginTop: 10
        }
      }),
      {}
    )
  })

  it('renders correct styles if theme type is light', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      theme: {
        palette: { type: 'light' }
      }
    } as any)

    render(<Trades />)
    expect(Grid).toHaveBeenCalledWith(
      expect.objectContaining({
        style: {
          backgroundColor: '#ffffff',
          marginTop: 10
        }
      }),
      {}
    )
  })
})

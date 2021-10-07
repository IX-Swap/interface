import { Trades } from 'app/pages/exchange/components/Trades/Trades'
import * as React from 'react'
import { render, cleanup } from 'test-utils'
import * as useAppBreakpoints from 'hooks/useAppBreakpoints'
import { fireEvent, waitFor } from '@testing-library/dom'

describe('Trades', () => {
  const setActiveTab = jest.fn()

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<Trades />)
  })

  it('renders correct styles if theme type is dark', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      theme: {
        palette: { type: 'dark' }
      }
    } as any)

    const { getByTestId } = render(<Trades />)
    const wrapper = getByTestId('wrapper')
    expect(wrapper).toHaveAttribute(
      'style',
      'background-color: rgb(41, 41, 41); margin-top: 10px;'
    )
  })

  it('renders correct styles if theme type is light', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      theme: {
        palette: { type: 'light' }
      }
    } as any)

    const { getByTestId } = render(<Trades />)
    const wrapper = getByTestId('wrapper')
    expect(wrapper).toHaveAttribute(
      'style',
      'background-color: rgb(255, 255, 255); margin-top: 10px;'
    )
  })

  it('renders without errors', async () => {
    jest.spyOn(React, 'useState').mockImplementation(() => [0, setActiveTab])

    const { getByTestId } = render(<Trades />)
    const tabs = getByTestId('tabs')
    fireEvent.change(tabs)
    await waitFor(() => {
      expect(setActiveTab).toBeCalled()
    })
  })
})

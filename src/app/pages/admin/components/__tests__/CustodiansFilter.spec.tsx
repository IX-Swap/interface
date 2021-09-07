import React from 'react'
import { render, cleanup } from 'test-utils'
import { CustodiansFilter } from 'app/pages/admin/components/CustodiansFilter'
import { Box } from '@material-ui/core'
import * as useAppBreakpoints from 'hooks/useAppBreakpoints'
import { VSpacer } from 'components/VSpacer'

jest.mock('@material-ui/core/Box', () => jest.fn(() => null))
jest.mock('components/VSpacer', () => ({
  VSpacer: jest.fn(() => null)
}))

describe('CustodiansFilter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<CustodiansFilter />)
  })

  it('renders Box components when isMobile is true', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMobile: true,
      isTablet: false
    } as any)
    render(<CustodiansFilter />)
    expect(Box).toHaveBeenCalledTimes(2)
    expect(Box).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        pr: 3
      }),
      {}
    )
    expect(Box).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        pr: 3
      }),
      {}
    )
  })

  it('renders Box components when isTablet is true', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMobile: false,
      isTablet: true
    } as any)
    render(<CustodiansFilter />)
    expect(Box).toHaveBeenCalledTimes(2)
    expect(Box).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        pr: 3
      }),
      {}
    )
    expect(Box).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        pr: 3
      }),
      {}
    )
  })

  it('renders Box components when isMobile and isTablet is false', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMobile: false,
      isTablet: false
    } as any)
    render(<CustodiansFilter />)
    expect(Box).toHaveBeenCalledTimes(0)
  })

  it('renders VSpacer components when isMobile is true', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMobile: true,
      isTablet: false
    } as any)
    render(<CustodiansFilter />)

    expect(VSpacer).toHaveBeenCalledTimes(3)
    expect(VSpacer).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        size: 'small'
      }),
      {}
    )
    expect(VSpacer).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        size: 'small'
      }),
      {}
    )
    expect(VSpacer).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        size: 'small'
      }),
      {}
    )
  })

  it('renders VSpacer components when isTablet is true', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMobile: false,
      isTablet: true
    } as any)
    render(<CustodiansFilter />)

    expect(VSpacer).toHaveBeenCalledTimes(3)
    expect(VSpacer).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        size: 'small'
      }),
      {}
    )
    expect(VSpacer).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        size: 'small'
      }),
      {}
    )
    expect(VSpacer).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        size: 'small'
      }),
      {}
    )
  })

  it('renders VSpacer components when isMobile and isTablet is false', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMobile: false,
      isTablet: false
    } as any)
    render(<CustodiansFilter />)

    expect(VSpacer).toHaveBeenCalledTimes(0)
  })
})

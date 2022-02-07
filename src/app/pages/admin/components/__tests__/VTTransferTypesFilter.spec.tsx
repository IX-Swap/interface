import React from 'react'
import { render } from 'test-utils'
import Box from '@mui/material/Box'
import * as useAppBreakpoints from 'hooks/useAppBreakpoints'
import { TransferTypesFilter } from 'app/pages/admin/components/TransferTypesFilter'
import { VTTransferTypesFilter } from 'app/pages/admin/components/VTTransferTypesFilter'

jest.mock('@mui/material/Box', () => jest.fn(() => null))

jest.mock('app/pages/admin/components/TransferTypesFilter', () => ({
  TransferTypesFilter: jest.fn(() => null)
}))

describe('VTTransferTypesFilter', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders empty box components when isMobile is true', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMobile: true
    } as any)
    render(<VTTransferTypesFilter />)
    expect(Box).toHaveBeenCalledTimes(0)
  })

  it('renders empty box components when isMobile is false', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMobile: false
    } as any)
    render(<VTTransferTypesFilter />)
    expect(Box).toHaveBeenCalledTimes(3)
  })

  it('renders type filter components with correct props', () => {
    render(<VTTransferTypesFilter />)
    expect(TransferTypesFilter).toHaveBeenCalledTimes(3)
    expect(TransferTypesFilter).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ type: 'PP', defaultValue: null }),
      {}
    )
    expect(TransferTypesFilter).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ type: 'Fast', defaultValue: null }),
      {}
    )
    expect(TransferTypesFilter).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({ type: 'ACH', defaultValue: null }),
      {}
    )
  })
})

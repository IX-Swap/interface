import React from 'react'
import { render, cleanup } from 'test-utils'
import { IndividualAccountSettings } from 'app/pages/admin/components/IndividualAccountSettings'
import * as useIndividualAccountSettings from 'app/pages/admin/hooks/useIndividualAccountSettings'
import { TabPanel } from 'app/pages/admin/components/TabPanel'

jest.mock('app/pages/admin/components/AccountLoginHistory', () => ({
  AccountLoginHistory: jest.fn(() => <></>)
}))

jest.mock('app/pages/admin/components/TabPanel', () => ({
  TabPanel: jest.fn(({ children }) => <div>{children}</div>)
}))

describe('IndividualAccountSettings', () => {
  const handleChange = jest.fn()
  const value = 0
  beforeEach(() => {
    jest
      .spyOn(useIndividualAccountSettings, 'useIndividualAccountSettings')
      .mockImplementation(() => ({ value, handleChange } as any))
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<IndividualAccountSettings />)
  })

  it('renders components with correct props', () => {
    const { getByText } = render(<IndividualAccountSettings />)

    expect(getByText(/login history/i)).toBeInTheDocument()
    expect(getByText(/revoke access/i)).toBeInTheDocument()
    expect(getByText(/role management/i)).toBeInTheDocument()

    expect(TabPanel).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ value: 0, index: 0 }),
      {}
    )
    expect(TabPanel).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ value: 0, index: 1 }),
      {}
    )
    expect(TabPanel).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({ value: 0, index: 2 }),
      {}
    )
  })
})

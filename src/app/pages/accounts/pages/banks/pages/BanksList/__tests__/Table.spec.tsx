import { Table } from 'app/pages/accounts/pages/banks/pages/BanksList/Table'
import * as useAuthHook from 'hooks/auth/useAuth'
import * as useAppBreakpoints from 'hooks/useAppBreakpoints'
import React from 'react'
import { renderWithUserStore } from 'test-utils'
import { user } from '__fixtures__/user'
import { TableView } from 'ui/UIKit/TablesKit/components/TableView/TableView'

jest.mock('ui/UIKit/TablesKit/components/TableView/TableView', () => ({
  TableView: jest.fn(() => null)
}))

jest.mock('app/context/ActiveElementContextWrapper', () => ({
  ActiveElementContextWrapper: jest.fn(({ children }) => <>{children}</>)
}))

describe('Bank Table', () => {
  jest.spyOn(useAuthHook, 'useAuth').mockReturnValue({
    isAuthenticated: true,
    user
  })
  it('renders TableView with correct props', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isTablet: false
    } as any)

    const { container } = renderWithUserStore(<Table />)
    expect(container).toMatchSnapshot()
  })

  it('renders Table view component with correct children prop', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isTablet: true
    } as any)

    renderWithUserStore(<Table />)

    expect(TableView).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ children: undefined }),
      {}
    )
  })
})

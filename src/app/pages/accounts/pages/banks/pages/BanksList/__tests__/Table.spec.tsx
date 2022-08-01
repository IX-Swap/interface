import { Table } from 'app/pages/accounts/pages/banks/pages/BanksList/Table'
import * as useAuthHook from 'hooks/auth/useAuth'
import * as useAppBreakpoints from 'hooks/useAppBreakpoints'
import React from 'react'
import { renderWithUserStore } from 'test-utils'
import { user } from '__fixtures__/user'

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
})

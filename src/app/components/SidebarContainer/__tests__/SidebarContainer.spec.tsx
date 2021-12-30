import React from 'react'
import { render } from 'test-utils'
import { SidebarContainer } from 'app/components/SidebarContainer/SidebarContainer'
import * as acl from 'helpers/acl'

jest.mock('assets/icons/navigation/invest.svg', () => ({
  ReactComponent: jest.fn(() => null)
}))
jest.mock('assets/icons/navigation/account.svg', () => ({
  ReactComponent: jest.fn(() => null)
}))
jest.mock('assets/icons/navigation/issuance.svg', () => ({
  ReactComponent: jest.fn(() => null)
}))
jest.mock('assets/icons/navigation/otc-market.svg', () => ({
  ReactComponent: jest.fn(() => null)
}))
jest.mock('assets/icons/navigation/authorizer.svg', () => ({
  ReactComponent: jest.fn(() => null)
}))
jest.mock(
  'app/components/SidebarContainer/components/SidebarLinkContainer',
  () => ({
    SidebarLinkContainer: jest.fn(() => null)
  })
)

describe('Sidebar', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    jest.spyOn(acl, 'useIsAuthorizer').mockReturnValue(false)
    jest.spyOn(acl, 'useIsIssuer').mockReturnValue(false)
    render(<SidebarContainer />)
  })
})

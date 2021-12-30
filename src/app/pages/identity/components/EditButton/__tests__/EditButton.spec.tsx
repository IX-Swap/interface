import React from 'react'
import { render } from 'test-utils'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { EditButton } from 'app/pages/identity/components/EditButton/EditButton'

jest.mock('components/AppRouterLink', () => ({
  AppRouterLinkComponent: jest.fn(() => null)
}))

describe('EditButton', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders AppRouterLink with default params & replace', () => {
    render(<EditButton link='/' />)

    expect(AppRouterLinkComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        to: '/',
        params: {},
        replace: false,
        children: expect.anything()
      }),
      {}
    )
  })

  it('renders AppRouterLink with correct props', () => {
    render(<EditButton link='/' params={{ id: 'test-param' }} replace />)

    expect(AppRouterLinkComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        to: '/',
        params: { id: 'test-param' },
        replace: true,
        children: expect.anything()
      }),
      {}
    )
  })
})

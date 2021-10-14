import React from 'react'
import { render, cleanup } from 'test-utils'
import { Actions } from 'app/pages/admin/components/CustodyManagementTable/Actions'
import { fakeCustodyAccountsListItem } from '__fixtures__/custodyAccount'
import { fireEvent, waitFor } from '@testing-library/dom'

describe('Actions', () => {
  const launchButtonHandleClick = jest.fn()
  const linkOffButtonHandleClick = jest.fn()

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Actions
        item={fakeCustodyAccountsListItem}
        onLaunchButtonClick={launchButtonHandleClick}
        onLinkOffButtonClick={linkOffButtonHandleClick}
      />
    )
  })

  it('invokes onLaunchButtonClick function on launch button click', async () => {
    const { getByTestId } = render(
      <Actions
        item={fakeCustodyAccountsListItem}
        onLaunchButtonClick={launchButtonHandleClick}
        onLinkOffButtonClick={linkOffButtonHandleClick}
      />
    )

    const launchButton = getByTestId('launch')

    fireEvent.click(launchButton)
    await waitFor(() => {
      expect(launchButtonHandleClick).toBeCalled()
    })
  })

  it('invokes onLinkOffButtonClick function on link off button click', async () => {
    const { getByTestId } = render(
      <Actions
        item={fakeCustodyAccountsListItem}
        onLaunchButtonClick={launchButtonHandleClick}
        onLinkOffButtonClick={linkOffButtonHandleClick}
      />
    )

    const linkOffButton = getByTestId('link-off')

    fireEvent.click(linkOffButton)
    await waitFor(() => {
      expect(linkOffButtonHandleClick).toBeCalled()
    })
  })
})

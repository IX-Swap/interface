import React from 'react'
import { render, cleanup } from 'test-utils'
import { Actions } from 'app/pages/admin/components/CustodyManagementTable/Actions'
import { fakeCustodyAccountsListItem } from '__fixtures__/custodyAccount'
import { fireEvent, waitFor } from '@testing-library/dom'

const fakeActionProps = {
  cacheQueryKey: '',
  item: {
    fakeCustodyAccountsListItem
  }
}

describe('Actions', () => {
  const linkOffButtonHandleClick = jest.fn()

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Actions
        item={fakeActionProps as any}
        onLinkOffButtonClick={linkOffButtonHandleClick}
      />
    )
  })

  it('invokes onLinkOffButtonClick function on link off button click', async () => {
    const { getByTestId } = render(
      <Actions
        item={fakeActionProps as any}
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

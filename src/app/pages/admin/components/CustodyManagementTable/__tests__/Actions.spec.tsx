import React from 'react'
import { render } from 'test-utils'
import { Actions } from 'app/pages/admin/components/CustodyManagementTable/Actions'
import { fakeCustodyAccountsListItem } from '__fixtures__/custodyAccount'
import { fireEvent } from '@testing-library/dom'

const fakeActionProps = {
  cacheQueryKey: '',
  item: fakeCustodyAccountsListItem
}

describe('Actions', () => {
  const linkOffButtonHandleClick = jest.fn()

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <Actions
        item={fakeActionProps}
        onLinkOffButtonClick={linkOffButtonHandleClick}
      />
    )
  })

  it('invokes onLinkOffButtonClick function on link off button click', () => {
    const { getByTestId } = render(
      <Actions
        item={fakeActionProps}
        onLinkOffButtonClick={linkOffButtonHandleClick}
      />
    )

    const linkOffButton = getByTestId('link-off')

    fireEvent.click(linkOffButton)
    expect(linkOffButtonHandleClick).toBeCalled()
  })
})

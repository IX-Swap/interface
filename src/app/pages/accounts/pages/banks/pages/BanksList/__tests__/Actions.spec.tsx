import React from 'react'
import { render, cleanup, fireEvent, waitFor } from 'test-utils'
import {
  Actions,
  ActionsProps
} from 'app/pages/accounts/pages/banks/pages/BanksList/Actions'
import { bank } from '__fixtures__/authorizer'
import { history } from 'config/history'

jest.mock('components/AppRouterLink', () => ({
  AppRouterLinkComponent: jest.fn(() => null)
}))

describe('Actions', () => {
  const props: ActionsProps = {
    item: bank
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', async () => {
    render(<Actions {...props} />)
  })

  it('displays bank details dialog box correctly', async () => {
    const { getByTestId, getByText, getByRole, queryByText } = render(
      <Actions {...props} />
    )
    const moreButton = getByTestId('more-button') as HTMLButtonElement

    fireEvent.click(moreButton, { bubbles: true })

    expect(getByText('View')).toBeTruthy()
    expect(getByText('Edit')).toBeTruthy()
    expect(getByText('Remove')).toBeTruthy()

    const viewButton = getByRole('button', {
      name: /view/i
    }) as HTMLButtonElement

    fireEvent.click(viewButton, { bubbles: true })

    expect(getByText(/Bank Account Information/i)).toBeTruthy()

    const closeButton = getByRole('button', {
      name: /close/i
    }) as HTMLButtonElement

    fireEvent.click(closeButton, { bubbles: true, cancelable: true })

    await waitFor(
      () => {
        expect(queryByText(/Bank Account Information/i)).toBeFalsy()
      },
      { timeout: 1000 }
    )
  })

  it('displays otp dialog box correctly', () => {
    const { getByTestId, getByText, getByRole } = render(<Actions {...props} />)
    const moreButton = getByTestId('more-button') as HTMLButtonElement

    fireEvent.click(moreButton, { bubbles: true })

    expect(getByText('View')).toBeTruthy()
    expect(getByText('Edit')).toBeTruthy()
    expect(getByText('Remove')).toBeTruthy()

    const removeButton = getByRole('button', {
      name: /remove/i
    }) as HTMLButtonElement

    fireEvent.click(removeButton, { bubbles: true })

    expect(
      getByText(/Are You Sure You Want To Remove Bank Account?/i)
    ).toBeTruthy()
  })

  it('handles edit action correctly', async () => {
    const { getByTestId, getByText, getByRole } = render(<Actions {...props} />)
    const moreButton = getByTestId('more-button') as HTMLButtonElement

    fireEvent.click(moreButton, { bubbles: true })

    expect(getByText('View')).toBeTruthy()
    expect(getByText('Edit')).toBeTruthy()
    expect(getByText('Remove')).toBeTruthy()

    const editButton = getByRole('button', {
      name: /Edit/i
    }) as HTMLButtonElement

    fireEvent.click(editButton, { bubbles: true })

    await waitFor(
      () => {
        expect(history.location.pathname).toBe(
          '/app/accounts/bank-accounts/1/edit'
        )
      },
      { timeout: 1000 }
    )
  })
})

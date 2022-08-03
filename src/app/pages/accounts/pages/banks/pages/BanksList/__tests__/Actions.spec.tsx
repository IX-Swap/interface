import React from 'react'
import { render, fireEvent, waitFor } from 'test-utils'
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
    item: bank,
    isLoading: false,
    removeBankHandler: jest.fn()
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('displays bank details dialog box correctly', async () => {
    const { getByTestId, getByText, getByRole } = render(<Actions {...props} />)
    const moreButton = getByTestId('more-button') as HTMLButtonElement

    fireEvent.click(moreButton, { bubbles: true })

    expect(getByText('View details')).toBeTruthy()
    expect(getByText('Edit')).toBeTruthy()
    expect(getByText('Delete')).toBeTruthy()

    const viewButton = getByRole('button', {
      name: /view details/i
    }) as HTMLButtonElement

    fireEvent.click(viewButton, { bubbles: true })

    expect(getByText(/Bank Account Information/i)).toBeTruthy()
  })

  it('invokes removeBankHandler on delete button click ', () => {
    const { getByTestId, getByText, getByRole } = render(<Actions {...props} />)
    const moreButton = getByTestId('more-button') as HTMLButtonElement

    fireEvent.click(moreButton, { bubbles: true })

    expect(getByText('View details')).toBeTruthy()
    expect(getByText('Edit')).toBeTruthy()
    expect(getByText('Delete')).toBeTruthy()

    const removeButton = getByRole('button', {
      name: /delete/i
    }) as HTMLButtonElement

    fireEvent.click(removeButton, { bubbles: true })

    expect(props.removeBankHandler).toBeCalled()
  })

  it('handles edit action correctly', async () => {
    const { getByTestId, getByText, getByRole } = render(<Actions {...props} />)
    const moreButton = getByTestId('more-button') as HTMLButtonElement

    fireEvent.click(moreButton, { bubbles: true })

    expect(getByText('View details')).toBeTruthy()
    expect(getByText('Edit')).toBeTruthy()
    expect(getByText('Delete')).toBeTruthy()

    const editButton = getByRole('button', {
      name: /Edit/i
    }) as HTMLButtonElement

    fireEvent.click(editButton, { bubbles: true })

    await waitFor(
      () => {
        expect(history.location.pathname).toBe(
          '/app/accounts/cash/bank-accounts/1/edit'
        )
      },
      { timeout: 1000 }
    )
  })
})

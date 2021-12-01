import React from 'react'
import { render, cleanup } from 'test-utils'
import { Actions } from 'app/pages/authorizer/components/Actions'
import { bank, commitment } from '__fixtures__/authorizer'
import { history } from 'config/history'
import { AuthorizerRoute } from 'app/pages/authorizer/router/config'
import { Dropdown } from 'app/components/Dropdown/Dropdown'

jest.mock('app/components/Dropdown/Dropdown', () => ({
  Dropdown: jest.fn(() => null)
}))

describe('Actions', () => {
  const defaultProps = {
    item: bank,
    cacheQueryKey: [],
    onView: jest.fn()
  }

  afterEach(async () => {
    jest.clearAllMocks()
    await cleanup()
  })

  it('renders view button', () => {
    history.push(AuthorizerRoute.banks)
    const { getByTestId } = render(<Actions {...defaultProps} />)
    const viewButton = getByTestId('view-button')

    expect(viewButton).toBeTruthy()
  })

  it('renders dropdown component', () => {
    history.push(AuthorizerRoute.banks)

    render(<Actions {...defaultProps} />)

    expect(Dropdown).toHaveBeenCalledTimes(0)
  })

  it('renders dropdown component when item fundStatus is "Fund on hold" and category is "commitments"', () => {
    history.push(AuthorizerRoute.commitments)
    const props = {
      ...defaultProps,
      item: {
        ...commitment,
        fundStatus: 'Funds on hold'
      }
    }

    render(<Actions {...props} />)

    expect(Dropdown).toHaveBeenCalledTimes(1)
  })

  it('renders dropdown component when category is not "commitments" and status is "Submitted"', () => {
    history.push(AuthorizerRoute.banks)
    const props = {
      ...defaultProps,
      item: {
        ...bank,
        status: 'Submitted'
      }
    }

    render(<Actions {...props} />)

    expect(Dropdown).toHaveBeenCalledTimes(1)
  })
})

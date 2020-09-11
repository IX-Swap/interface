/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import {
  fireEvent,
  waitFor,
  renderWithAuthorizerTableStore,
  cleanup
} from 'test-utils'
import { Actions } from 'v2/app/pages/authorizer/components/Actions'
import * as useApproveOrRejectHook from 'v2/app/pages/authorizer/hooks/useApproveOrReject'
import { generateMutationResult } from '__fixtures__/useQuery'

describe('Actions', () => {
  const props = {
    item: { id: 1, status: 'Submitted' },
    onView: jest.fn()
  }

  afterEach(async () => {
    await cleanup()
  })

  it('renders view button', () => {
    const { getByTestId } = renderWithAuthorizerTableStore(
      <Actions {...props} />
    )
    const viewButton = getByTestId('view-button')

    expect(viewButton).toBeTruthy()
  })

  it('renders dropdown button if item.status = "Submitted"', () => {
    const { getByTestId } = renderWithAuthorizerTableStore(
      <Actions {...props} />
    )
    const moreButton = getByTestId('more-button')

    expect(moreButton).toBeTruthy()
  })

  it('does not render dropdown button if item.status != "Submitted"', () => {
    const modifiedProps = {
      ...props,
      item: { ...props.item, status: 'Status' }
    }
    const { queryByTestId } = renderWithAuthorizerTableStore(
      <Actions {...modifiedProps} />
    )
    const dropdownMenu = queryByTestId('dropdown-menu')

    expect(dropdownMenu).toBeFalsy()
  })

  it('invokes props.onView function when view item clicked', async () => {
    const { getByTestId, getByText } = renderWithAuthorizerTableStore(
      <Actions {...props} />
    )

    const moreButton = getByTestId('more-button')
    fireEvent.click(moreButton)
    await waitFor(() => {
      const dropdown = getByTestId('dropdown')
      expect(dropdown).toBeTruthy()
    })

    const viewButton = getByText('View')
    fireEvent.click(viewButton)
    await waitFor(() => {
      expect(props.onView).toHaveBeenCalledTimes(1)
      expect(props.onView).toHaveBeenCalledWith(props.item)
    })
  })

  it('invokes approve function when approve item clicked', async () => {
    const approve = jest.fn()
    jest
      .spyOn(useApproveOrRejectHook, 'useApproveOrReject')
      .mockReturnValue([approve, generateMutationResult({})])

    const { getByTestId, getByText } = renderWithAuthorizerTableStore(
      <Actions {...props} />
    )

    const moreButton = getByTestId('more-button')
    fireEvent.click(moreButton)
    await waitFor(() => {
      const dropdown = getByTestId('dropdown')
      expect(dropdown).toBeTruthy()
    })

    const approveButton = getByText('Approve')
    fireEvent.click(approveButton)
    await waitFor(() => {
      expect(approve).toHaveBeenCalledTimes(1)
    })
  })

  it('invokes store.reject function when approve item clicked', async () => {
    const reject = jest.fn()
    jest
      .spyOn(useApproveOrRejectHook, 'useApproveOrReject')
      .mockReturnValue([reject, generateMutationResult({})])

    const { getByTestId, getByText } = renderWithAuthorizerTableStore(
      <Actions {...props} />
    )

    const moreButton = getByTestId('more-button')
    fireEvent.click(moreButton)
    await waitFor(() => {
      const dropdown = getByTestId('dropdown')
      expect(dropdown).toBeTruthy()
    })

    const rejectButton = getByText('Reject')
    fireEvent.click(rejectButton)
    await waitFor(() => {
      expect(reject).toHaveBeenCalledTimes(1)
    })
  })

  it('invokes props.onView function with props.item as an argument', async () => {
    const props = {
      item: { id: 1, status: "Submitted" },
      onView: jest.fn(),
    };

    const { getByTestId } = renderWithAuthorizerTableStore(
      <Actions {...props} />
    )
    const viewButton = getByTestId('view-button')

    fireEvent.click(viewButton)
    await waitFor(() => {
      expect(props.onView).toHaveBeenCalledTimes(1)
      expect(props.onView).toHaveBeenCalledWith(props.item)
    })
  })
})

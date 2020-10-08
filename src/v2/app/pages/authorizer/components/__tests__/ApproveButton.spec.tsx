/**  * @jest-environment jsdom-sixteen  */
import { fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  ApproveButton,
  ApproveButtonProps
} from 'v2/app/pages/authorizer/components/ApproveButton'
import { Form } from 'v2/components/form/Form'
import * as approveHook from 'v2/app/pages/authorizer/hooks/useApprove'
import { generateMutationResult } from '__fixtures__/useQuery'

describe('ApproveButton', () => {
  const props: ApproveButtonProps = { itemId: 'testItemId' }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <ApproveButton {...props} />
      </Form>
    )
  })

  it('will disable Button if values.comment is undefined', () => {
    const { getByText } = render(
      <Form>
        <ApproveButton {...props} />
      </Form>
    )
    const approveButton = getByText(/approve/i)

    expect(approveButton.parentElement).toBeDisabled()
  })

  it('will disable Button if values.sharedWithUser is undefined', () => {
    const { getByText } = render(
      <Form>
        <ApproveButton {...props} />
      </Form>
    )
    const approveButton = getByText(/approve/i)

    expect(approveButton.parentElement).toBeDisabled()
  })

  it('invokes approve when button is clicked', async () => {
    const approve = jest.fn()
    jest
      .spyOn(approveHook, 'useApprove')
      .mockReturnValue([approve, generateMutationResult({})])

    const { getByText } = render(
      <Form defaultValues={{ comment: '', sharedWithUser: false }}>
        <ApproveButton {...props} />
      </Form>
    )
    const approveButton = getByText(/approve/i)

    fireEvent.click(approveButton)
    await waitFor(() => {
      expect(approve).toHaveBeenCalledTimes(1)
    })
  })
})

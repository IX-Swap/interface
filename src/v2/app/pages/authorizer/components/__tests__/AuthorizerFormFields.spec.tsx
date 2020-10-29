/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { ApproveButton } from 'v2/app/pages/authorizer/components/ApproveButton'
import { RejectButton } from 'v2/app/pages/authorizer/components/RejectButton'
import {
  AuthorizerFormFields,
  AuthorizerFormFieldsProps
} from 'v2/app/pages/authorizer/components/AuthorizerFormFields'
import { TypedField } from 'v2/components/form/TypedField'
import { Form } from 'v2/components/form/Form'
import { AuthorizerCategory } from 'v2/types/app'
import * as useAuthorizerCategoryHook from 'v2/hooks/location/useAuthorizerCategory'

jest.mock('v2/components/form/TypedField', () => ({
  TypedField: jest.fn(() => null)
}))

jest.mock('v2/app/pages/authorizer/components/ApproveButton', () => ({
  ApproveButton: jest.fn(() => null)
}))

jest.mock('v2/app/pages/authorizer/components/RejectButton', () => ({
  RejectButton: jest.fn(() => null)
}))

describe('AuthorizerForm', () => {
  const props: AuthorizerFormFieldsProps = {
    itemId: 'test-itemId',
    status: 'Submitted'
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <AuthorizerFormFields {...props} />
      </Form>
    )
  })

  it('renders TextInput  with correct props', () => {
    render(
      <Form>
        <AuthorizerFormFields {...props} />
      </Form>
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        label: 'Comment / Remarks',
        name: 'comment'
      }),
      {}
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        label: 'Share this comment with the user',
        name: 'sharedWithUser'
      }),
      {}
    )
  })

  it('renders ApproveButton with correct props', () => {
    render(
      <Form>
        <AuthorizerFormFields {...props} />
      </Form>
    )

    expect(ApproveButton).toHaveBeenCalledTimes(1)
    expect(ApproveButton).toHaveBeenCalledWith(
      { itemId: props.itemId, disabled: false },
      {}
    )
  })

  it('renders ApproveButton with correct props if approved', () => {
    jest
      .spyOn(useAuthorizerCategoryHook, 'useAuthorizerCategory')
      .mockReturnValue(AuthorizerCategory['Bank Accounts'])

    render(
      <Form>
        <AuthorizerFormFields {...props} status='Approved' />
      </Form>
    )

    expect(ApproveButton).toHaveBeenCalledWith(
      { itemId: props.itemId, disabled: true },
      {}
    )
  })

  it('renders RejectButton with correct props if rejected', () => {
    jest
      .spyOn(useAuthorizerCategoryHook, 'useAuthorizerCategory')
      .mockReturnValue(AuthorizerCategory['Bank Accounts'])

    render(
      <Form>
        <AuthorizerFormFields {...props} status='Rejected' />
      </Form>
    )

    expect(RejectButton).toHaveBeenCalledWith(
      { itemId: props.itemId, disabled: true },
      {}
    )
  })

  it('renders ApproveButton with correct props if approved and category is transactional', () => {
    jest
      .spyOn(useAuthorizerCategoryHook, 'useAuthorizerCategory')
      .mockReturnValue(AuthorizerCategory['Cash Withdrawals'])

    render(
      <Form>
        <AuthorizerFormFields {...props} status='Approved' />
      </Form>
    )

    expect(ApproveButton).toHaveBeenCalledTimes(1)
    expect(ApproveButton).toHaveBeenCalledWith(
      { itemId: props.itemId, disabled: true },
      {}
    )
  })

  it('renders RejectButton with correct props if rejected and category is transactional', () => {
    jest
      .spyOn(useAuthorizerCategoryHook, 'useAuthorizerCategory')
      .mockReturnValue(AuthorizerCategory['Cash Withdrawals'])

    render(
      <Form>
        <AuthorizerFormFields {...props} status='Rejected' />
      </Form>
    )

    expect(RejectButton).toHaveBeenCalledTimes(1)
    expect(RejectButton).toHaveBeenCalledWith(
      { itemId: props.itemId, disabled: true },
      {}
    )
  })

  it('renders RejectButton with correct props', () => {
    render(
      <Form>
        <AuthorizerFormFields {...props} />
      </Form>
    )

    expect(RejectButton).toHaveBeenCalledTimes(1)
    expect(RejectButton).toHaveBeenCalledWith(
      { itemId: props.itemId, disabled: false },
      {}
    )
  })
})

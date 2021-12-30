import React from 'react'
import { render } from 'test-utils'
import { ApproveButton } from 'app/pages/authorizer/components/ApproveButton'
import { RejectButton } from 'app/pages/authorizer/components/RejectButton'
import {
  AuthorizerFormFields,
  AuthorizerFormFieldsProps
} from 'app/pages/authorizer/components/AuthorizerFormFields'
import { TypedField } from 'components/form/TypedField'
import { Form } from 'components/form/Form'
import { AuthorizerCategory } from 'types/app'
import * as useAuthorizerCategoryHook from 'hooks/location/useAuthorizerCategory'
import * as useAuthorizerAction from 'app/pages/authorizer/hooks/useAuthorizerAction'

jest.mock('components/form/TypedField', () => ({
  TypedField: jest.fn(() => null)
}))

jest.mock('app/pages/authorizer/components/ApproveButton', () => ({
  ApproveButton: jest.fn(() => null)
}))

jest.mock('app/pages/authorizer/components/RejectButton', () => ({
  RejectButton: jest.fn(() => null)
}))

describe('AuthorizerForm', () => {
  const props: AuthorizerFormFieldsProps = {
    itemId: 'test-itemId',
    status: 'Submitted'
  }
  const authorizationAction = jest.fn()

  beforeEach(() => {
    jest
      .spyOn(useAuthorizerAction, 'useAuthorizerAction')
      .mockReturnValue([authorizationAction, { isLoading: false } as any])
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
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
      { approve: authorizationAction, disabled: false },
      {}
    )
  })

  it('renders ApproveButton with correct props if approved', () => {
    jest
      .spyOn(useAuthorizerCategoryHook, 'useAuthorizerCategory')
      .mockReturnValue(AuthorizerCategory.BankAccounts)

    render(
      <Form>
        <AuthorizerFormFields {...props} status='Approved' />
      </Form>
    )

    expect(ApproveButton).toHaveBeenCalledWith(
      { approve: authorizationAction, disabled: true },
      {}
    )
  })

  it('renders RejectButton with correct props if rejected', () => {
    jest
      .spyOn(useAuthorizerCategoryHook, 'useAuthorizerCategory')
      .mockReturnValue(AuthorizerCategory.BankAccounts)

    render(
      <Form>
        <AuthorizerFormFields {...props} status='Rejected' />
      </Form>
    )

    expect(RejectButton).toHaveBeenCalledWith(
      { reject: authorizationAction, disabled: true },
      {}
    )
  })

  it('renders ApproveButton with correct props if approved and category is transactional', () => {
    jest
      .spyOn(useAuthorizerCategoryHook, 'useAuthorizerCategory')
      .mockReturnValue(AuthorizerCategory.CashWithdrawals)

    render(
      <Form>
        <AuthorizerFormFields {...props} status='Approved' />
      </Form>
    )

    expect(ApproveButton).toHaveBeenCalledTimes(1)
    expect(ApproveButton).toHaveBeenCalledWith(
      { approve: authorizationAction, disabled: true },
      {}
    )
  })

  it('renders RejectButton with correct props if rejected and category is transactional', () => {
    jest
      .spyOn(useAuthorizerCategoryHook, 'useAuthorizerCategory')
      .mockReturnValue(AuthorizerCategory.CashWithdrawals)

    render(
      <Form>
        <AuthorizerFormFields {...props} status='Rejected' />
      </Form>
    )

    expect(RejectButton).toHaveBeenCalledTimes(1)
    expect(RejectButton).toHaveBeenCalledWith(
      { reject: authorizationAction, disabled: true },
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
      { reject: authorizationAction, disabled: false },
      {}
    )
  })
})

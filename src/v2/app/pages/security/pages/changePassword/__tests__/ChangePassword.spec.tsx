/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import * as typedForm from 'v2/components/form/createTypedForm'
import * as changePasswordHook from '../hooks/useChangePassword'
import { ChangePassword } from 'v2/app/pages/security/pages/changePassword/ChangePassword'
import { generateCreateTypedFormResult } from '__fixtures__/createTypedForm'
import { fireEvent, waitFor } from '@testing-library/react'

describe('ChangePassword', () => {
  const TextField = jest.fn(() => 'null') as any
  const Submit = jest.fn(() => 'null') as any
  const Form = jest.fn(({ children }) => <div>{children}</div>)
  const changePassword = jest.fn()

  beforeEach(() => {
    jest
      .spyOn(changePasswordHook, 'useChangePassword')
      .mockImplementation(() => [changePassword] as any)
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<ChangePassword />)
  })

  it('invokes changePassword on submit', async () => {
    const { getByLabelText, getByText } = render(<ChangePassword />)

    fireEvent.input(getByLabelText('Old Password'), {
      target: {
        value: 'something'
      }
    })
    fireEvent.input(getByLabelText('New Password'), {
      target: {
        value: 'somethingx'
      }
    })
    fireEvent.input(getByLabelText('Confirm New Password'), {
      target: {
        value: 'somethingx'
      }
    })
    fireEvent.click(getByText('Change'))

    await waitFor(() => {
      expect(changePassword).toHaveBeenCalledTimes(1)
    })
  })

  it('renders Form & Submit', () => {
    jest.spyOn(typedForm, 'createTypedForm').mockReturnValue(() => ({
      ...generateCreateTypedFormResult(),
      TextField,
      Form,
      Submit
    }))

    render(<ChangePassword />)

    expect(Form).toHaveBeenCalledTimes(1)
    expect(Submit).toHaveBeenCalledTimes(1)
  })

  it('renders TextField', () => {
    jest.spyOn(typedForm, 'createTypedForm').mockReturnValue(() => ({
      ...generateCreateTypedFormResult(),
      TextField,
      Form,
      Submit
    }))

    render(<ChangePassword />)

    expect(TextField).toHaveBeenCalledTimes(3)
    expect(TextField).toHaveBeenNthCalledWith(
      1,
      {
        inputProps: {
          type: 'password'
        },
        label: 'Old Password',
        name: 'oldPassword'
      },
      {}
    )
    expect(TextField).toHaveBeenNthCalledWith(
      2,
      {
        inputProps: { type: 'password' },
        label: 'New Password',
        name: 'newPassword'
      },
      {}
    )
    expect(TextField).toHaveBeenNthCalledWith(
      3,
      {
        inputProps: {
          type: 'password'
        },
        label: 'Confirm New Password',
        name: 'confirmPassword'
      },
      {}
    )
  })
})

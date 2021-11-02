import React from 'react'
import { render } from 'test-utils'
import { BlockchainSettingsForm } from 'app/pages/admin/components/BlockchainSettingsForm/BlockchainSettingsForm'
import { fireEvent, waitFor } from '@testing-library/react'
import * as UseUpdateDecimalHook from 'app/pages/admin/hooks/useUpdateDecimal'
import { generateMutationResult } from '__fixtures__/useQuery'
import { history } from 'config/history'

jest.mock('components/form/OTPInputField', () => ({
  OTPInputField: (props: any) => {
    return (
      <input
        name={props.name}
        id={props.name}
        value={props.value}
        onChange={event => {
          props.control.setValue(props.name, event.target.value)
        }}
      />
    )
  }
}))

const updateDecimal = jest.fn()
jest
  .spyOn(UseUpdateDecimalHook, 'useUpdateDecimal')
  .mockReturnValue([updateDecimal, generateMutationResult({})])

describe('BlockchainSettingsForm', () => {
  const decimal = 10

  it('should render', async () => {
    history.push('/?blockchainNetwork=XTZ')

    const { getByLabelText, getByText, container } = render(
      <BlockchainSettingsForm decimal={decimal} />
    )

    const decimalInput = getByLabelText('Decimals')
    const otpDialogButton = getByText('Update')

    expect(decimalInput).toHaveValue(`${decimal}`)
    fireEvent.change(decimalInput, { target: { value: 7 } })
    expect(decimalInput).toHaveValue(`${7}`)
    fireEvent.click(otpDialogButton)

    await waitFor(() => getByText('Please Enter Your 2FA'))
    const dialogContent = container.querySelector('.MuiDialog-container')
    const otpInput = dialogContent?.querySelector('input')
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fireEvent.change(otpInput!, { target: { value: '999999' } })

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const confirmButton = getByText(/Confirm/).parentElement!
    expect(confirmButton).not.toBeDisabled()
    fireEvent.click(confirmButton)
    await waitFor(() => {
      expect(updateDecimal).toBeCalledWith({
        decimal: 7,
        otp: '999999',
        network: 'XTZ'
      })
    })
  })
})

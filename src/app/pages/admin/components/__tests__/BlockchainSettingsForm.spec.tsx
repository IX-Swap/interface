import React from 'react'
import { render } from 'test-utils'
import { BlockchainSettingsForm } from 'app/pages/admin/components/BlockchainSettingsForm/BlockchainSettingsForm'
import { fireEvent, waitFor } from '@testing-library/react'
import * as UseUpdateDecimalHook from 'app/pages/admin/hooks/useUpdateDecimal'
import { generateMutationResult } from '__fixtures__/useQuery'
import { history } from 'config/history'
import { OTPInputFieldProps } from 'components/form/OTPInputField'

jest.mock('components/form/OTPInputField', () => ({
  OTPInputField: (props: OTPInputFieldProps) => (
    <input
      name={props.name}
      id={props.name}
      value={props.value}
      onChange={event => {
        props.control?.setValue(props?.name ?? 'otp', event.target.value)
      }}
    />
  )
}))

describe('BlockchainSettingsForm', () => {
  const defaultDecimal = 10
  const updatedDecimal = 6
  const network = 'XTZ'
  const otp = '123456'
  const updateDecimal = jest.fn()

  jest
    .spyOn(UseUpdateDecimalHook, 'useUpdateDecimal')
    .mockReturnValue([updateDecimal, generateMutationResult({})])

  it.skip('should update decimal', async () => {
    history.push(`/?blockchainNetwork=${network}`)

    const { getByLabelText, getByText, container } = render(
      <BlockchainSettingsForm decimal={defaultDecimal} />
    )

    const decimalInput = getByLabelText('Decimals')
    const otpDialogButton = getByText('Update')

    // check for default value
    expect(decimalInput).toHaveValue(`${defaultDecimal}`)

    // update decimal value
    fireEvent.change(decimalInput, { target: { value: updatedDecimal } })
    expect(decimalInput).toHaveValue(`${updatedDecimal}`)

    // open otp dialog
    fireEvent.click(otpDialogButton)
    await waitFor(() => getByText('Please Enter Your 2FA'))

    // enter otp code
    const dialogContent = container.querySelector('.MuiDialog-container')
    const otpInput = dialogContent?.querySelector('input')
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fireEvent.change(otpInput!, { target: { value: otp } })

    // press confirm button
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const confirmButton = getByText(/Confirm/).parentElement!
    expect(confirmButton).not.toBeDisabled()
    fireEvent.click(confirmButton)

    await waitFor(() => {
      expect(updateDecimal).toBeCalledWith({
        decimal: updatedDecimal,
        otp,
        network
      })
    })
  })
})

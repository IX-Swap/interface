/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Preview } from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/Preview'
import { useTypedForm } from '__fixtures__/createTypedForm'
import { Summary } from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/Summary'
import * as withdrawForm from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/WithdrawForm'

jest.mock(
  'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/Summary',
  () => ({ Summary: jest.fn(() => null) })
)

describe('Preview', () => {
  const TextField = jest.fn(() => null) as any
  const Submit = jest.fn(() => null)

  beforeEach(() => {
    jest.spyOn(withdrawForm, 'useDSWithdrawForm').mockReturnValue({
      ...useTypedForm(),
      TextField,
      Submit
    })
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Preview />)
  })

  it('renders TextField & Submit', () => {
    render(<Preview />)

    expect(TextField).toHaveBeenCalledTimes(1)
    expect(Submit).toHaveBeenCalledTimes(1)
  })

  it('renders Summary', () => {
    render(<Preview />)

    expect(Summary).toHaveBeenCalledTimes(1)
  })
})

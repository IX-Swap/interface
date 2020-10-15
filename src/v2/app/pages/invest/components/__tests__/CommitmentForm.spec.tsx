/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup, fireEvent, waitFor } from 'test-utils'
import {
  CommitmentForm,
  CommitmentFormProps
} from 'v2/app/pages/invest/components/CommitmentForm'
import { dso } from '__fixtures__/authorizer'
import * as useMakeCommitmentHook from 'v2/app/pages/invest/hooks/useMakeCommitment'

describe('CommitmentForm', () => {
  const props: CommitmentFormProps = {
    dso: dso._id,
    currency: dso.currency.symbol
  }
  const makeInvestment = jest.fn()
  beforeEach(() => {
    jest
      .spyOn(useMakeCommitmentHook, 'useMakeCommitment')
      .mockImplementation(() => [makeInvestment] as any)
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<CommitmentForm {...props} />)
  })

  it('renders Form without error', async () => {
    const children: JSX.Element = (
      <React.Fragment>
        <input name='amount' id='amount' defaultValue={100} />
        <input name='otp' id='otp' defaultValue='123456' />
        <button type='submit'>Submit</button>
      </React.Fragment>
    )
    const { getByText } = render(
      <CommitmentForm {...props}>{children}</CommitmentForm>
    )
    const buttonElement = getByText(/submit/i)
    fireEvent.click(buttonElement)

    // TODO: find a way to pass yup validation on submit
    await waitFor(() => expect(makeInvestment).toHaveBeenCalledTimes(0))
  })
})

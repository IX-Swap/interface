import React from 'react'
import { render, fireEvent, waitFor } from 'test-utils'
import { Form } from 'components/form/Form'
import { CommitmentFormCommitButton } from 'app/pages/invest/components/CommitFormCommitButton'
import * as useMakeCommitment from 'app/pages/invest/hooks/useMakeCommitment'
import * as useCommitmentValidator from 'app/pages/invest/hooks/useCommitmentValidator'

describe('CommitmentFormCommitButton', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('submits correct data', async () => {
    const makeCommitment = jest.fn(() => {})
    const objResponse = {
      commit: [makeCommitment]
    }

    jest
      .spyOn(useMakeCommitment, 'useMakeCommitment')
      .mockImplementation(() => objResponse as any)

    const useCommitmentValidatorResponse = {
      isValid: true
    }

    jest
      .spyOn(useCommitmentValidator, 'useCommitmentValidator')
      .mockImplementation(() => useCommitmentValidatorResponse as any)

    const { container } = render(
      <Form
        defaultValues={{
          totalAmount: 20,
          pricePerUnit: 10,
          numberOfUnits: 2,
          withdrawalAddress: '123',
          signedSubscriptionDocument: {
            _id: '456'
          },
          otp: '789012'
        }}
      >
        <CommitmentFormCommitButton
          assetId='123'
          minInvestment={100}
          dsoId='123'
          currency='$'
          disabled={false}
        />
      </Form>
    )

    const submitButton = container.querySelector('button') as HTMLButtonElement
    fireEvent.click(submitButton, { bubbles: true, cancelable: true })

    await waitFor(() => {
      expect(makeCommitment).toHaveBeenCalled()
      expect(makeCommitment).toHaveBeenCalledWith(
        expect.objectContaining({ withdrawalAddress: undefined })
      )
    })
  })
})

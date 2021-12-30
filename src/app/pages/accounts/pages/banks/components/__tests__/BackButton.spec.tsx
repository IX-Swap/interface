import React from 'react'
import { renderWithDepositStore } from 'test-utils'
import { BackButton } from 'app/pages/accounts/pages/banks/components/BackButton'
import { fireEvent, waitFor } from '@testing-library/react'
import { DepositStoreStep } from 'app/pages/accounts/pages/banks/context/store'

describe('BackButton', () => {
  const fakeDepositStore = { setCurrentStep: jest.fn() }

  afterEach(async () => {})

  it.skip('renders without error', () => {
    renderWithDepositStore(<BackButton />, fakeDepositStore)
  })

  it('invokes setCurrentStep on button click', async () => {
    const { getByRole } = renderWithDepositStore(
      <BackButton />,
      fakeDepositStore
    )

    fireEvent.click(getByRole('button'))
    await waitFor(() => {
      expect(fakeDepositStore.setCurrentStep).toHaveBeenCalledTimes(1)
      expect(fakeDepositStore.setCurrentStep).toHaveBeenCalledWith(
        DepositStoreStep.SETUP
      )
    })
  })
})

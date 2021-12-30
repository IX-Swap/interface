import React from 'react'
import { renderWithDepositStore } from 'test-utils'
import { ResetButton } from 'app/pages/accounts/pages/banks/components/ResetButton'
import { fireEvent, waitFor } from '@testing-library/react'
import { Form } from 'components/form/Form'

describe('ResetButton', () => {
  const fakeDepositStore = { clear: jest.fn() }

  afterEach(async () => {})

  it.skip('renders without error', () => {
    renderWithDepositStore(
      <Form>
        <ResetButton />
      </Form>,
      fakeDepositStore
    )
  })

  it('invokes clear on button click', async () => {
    const { getByRole } = renderWithDepositStore(
      <Form>
        <ResetButton />
      </Form>,
      fakeDepositStore
    )

    fireEvent.click(getByRole('button'))
    await waitFor(() => {
      expect(fakeDepositStore.clear).toHaveBeenCalledTimes(1)
    })
  })
})

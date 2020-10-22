/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { renderWithDepositStore, cleanup } from 'test-utils'
import { ResetButton } from 'v2/app/pages/accounts/pages/banks/components/ResetButton'
import { fireEvent, waitFor } from '@testing-library/react'
import { Form } from 'v2/components/form/Form'

describe('ResetButton', () => {
  const fakeDepositStore = { clear: jest.fn() }

  afterEach(async () => {
    await cleanup()
  })

  it('renders without error', () => {
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

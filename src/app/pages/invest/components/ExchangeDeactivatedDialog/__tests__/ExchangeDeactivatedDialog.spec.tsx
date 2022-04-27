import { fireEvent, waitFor } from '@testing-library/dom'
import {
  ModalProps,
  ExchangeDeactivatedDialog
} from 'app/pages/invest/components/ExchangeDeactivatedDialog/ExchangeDeactivatedDialog'
import { render } from 'test-utils'
import React from 'react'
describe('ExchangeDeactivatedDialog', () => {
  let props: ModalProps
  const redirect = jest.fn()

  beforeEach(() => {
    props = {
      open: true,
      toggleOpen: redirect
    }
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('Invokes callback on button click', () => {
    const { getByTestId } = render(<ExchangeDeactivatedDialog {...props} />)
    fireEvent.click(getByTestId('okBtn'))
    expect(redirect).toHaveBeenCalledTimes(1)
  })
})

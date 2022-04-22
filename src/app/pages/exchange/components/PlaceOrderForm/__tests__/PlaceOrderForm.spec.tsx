import React from 'react'
import { render, fireEvent } from 'test-utils'
import { PlaceOrderForm } from 'app/pages/exchange/components/PlaceOrderForm/PlaceOrderForm'
import { Form } from 'components/form/Form'
import { PlaceOrderFields } from 'app/pages/exchange/components/PlaceOrderFields/PlaceOrderFields'
import { waitFor } from '@testing-library/dom'
import { user } from '__fixtures__/user'
import * as useAuth from 'hooks/auth/useAuth'
import * as useParams from 'react-router'
import { TwoFADialog } from 'app/components/TwoFADialog/TwoFADialog'

jest.mock(
  'app/pages/exchange/components/PlaceOrderFields/PlaceOrderFields',
  () => ({
    PlaceOrderFields: jest.fn(() => null)
  })
)

jest.mock('app/components/TwoFADialog/TwoFADialog', () => ({
  TwoFADialog: jest.fn(() => null)
}))

describe('PlaceOrderForm', () => {
  const onSubmit = jest.fn()

  beforeEach(() => {
    jest.spyOn(useParams, 'useParams').mockReturnValue({
      pairId: 'dfdf'
    })
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders PlaceOrderFields with correct props if BUY tab active', () => {
    render(
      <Form>
        <PlaceOrderForm
          tokenLabel={'IXPS'}
          currencyLabel={'SGD'}
          tokenBalance={300}
          currencyBalance={15000}
          onSubmit={async () => {}}
        />
      </Form>
    )

    expect(PlaceOrderFields).toBeCalledWith(
      expect.objectContaining({
        balance: 15000,
        totalCurrencyLabel: 'SGD'
      }),
      {}
    )
  })

  it('renders PlaceOrderFields with correct props if SELL tab active', () => {
    const { getByText } = render(
      <Form>
        <PlaceOrderForm
          tokenLabel={'IXPS'}
          currencyLabel={'SGD'}
          tokenBalance={300}
          currencyBalance={15000}
          onSubmit={async () => {}}
        />
      </Form>
    )
    const sellTab = getByText('SELL')
    fireEvent.click(sellTab)

    expect(PlaceOrderFields).toBeCalledWith(
      expect.objectContaining({
        balance: 300,
        totalCurrencyLabel: 'SGD'
      }),
      {}
    )
  })

  it('invokes onSubmit function and renders 2fa dialog with correct props on place order button click if enable2Fa is true', () => {
    const objResponse = {
      user: { ...user, enable2Fa: true }
    }

    jest.spyOn(useAuth, 'useAuth').mockImplementation(() => objResponse as any)

    const { getByText } = render(
      <Form>
        <PlaceOrderForm
          tokenLabel={'IXPS'}
          currencyLabel={'SGD'}
          tokenBalance={300}
          currencyBalance={15000}
          onSubmit={onSubmit}
        />
      </Form>
    )
    const button = getByText('PLACE ORDER')
    fireEvent.click(button)
    waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(TwoFADialog).toHaveBeenCalledWith(
        expect.objectContaining({
          isOpen: false,
          enable2Fa: objResponse.user.enable2Fa
        }),
        {}
      )
    })
  })

  it('not invokes onSubmit function and renders 2fa dialog with correct props on place order button click if enable2Fa is false', () => {
    const objResponse = {
      user: { ...user, enable2Fa: false }
    }

    jest.spyOn(useAuth, 'useAuth').mockImplementation(() => objResponse as any)

    const { getByText } = render(
      <Form>
        <PlaceOrderForm
          tokenLabel={'IXPS'}
          currencyLabel={'SGD'}
          tokenBalance={300}
          currencyBalance={15000}
          onSubmit={onSubmit}
        />
      </Form>
    )
    const button = getByText('PLACE ORDER')
    fireEvent.click(button)
    waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(0)
      expect(TwoFADialog).toHaveBeenCalledWith(
        expect.objectContaining({
          isOpen: true,
          enable2Fa: objResponse.user.enable2Fa
        }),
        {}
      )
    })
  })
})

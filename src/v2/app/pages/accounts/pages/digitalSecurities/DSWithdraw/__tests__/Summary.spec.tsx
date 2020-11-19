import React from 'react'
import { render, cleanup } from 'test-utils'
import { Summary } from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/Summary'

import { QueryStatus } from 'react-query'
import * as assetsData from 'v2/hooks/asset/useAssetsData'
import * as balancesData from 'v2/hooks/balance/useAllBalances'
import { INVESTAX_BANK } from 'v2/config'
import { balance } from '__fixtures__/balance'
import { asset, dsWithdrawal } from '__fixtures__/authorizer'
import { GenericPreview } from 'v2/app/components/GenericPreview/GenericPreview'
import { formatMoney } from 'v2/helpers/numbers'
import { Form } from 'v2/components/form/Form'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { history } from 'v2/history'
import { DSRoute } from 'v2/app/pages/accounts/pages/digitalSecurities/router'

jest.mock('v2/app/components/GenericPreview/GenericPreview', () => ({
  GenericPreview: jest.fn(() => null)
}))

describe('Summary', () => {
  beforeEach(() => {
    history.push(DSRoute.withdraw, { balanceId: 'testId' })
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })
  afterAll(() => history.push('/'))

  it('renders without error', () => {
    jest
      .spyOn(assetsData, 'useAssetsData')
      .mockReturnValue(
        generateInfiniteQueryResult({ map: { [balance.assetId]: asset } })
      )
    jest
      .spyOn(balancesData, 'useAllBalances')
      .mockReturnValue(
        generateInfiniteQueryResult({ map: { testId: balance } })
      )

    render(
      <Form defaultValues={{ memo: '', amount: dsWithdrawal.amount }}>
        <Summary />
      </Form>
    )
  })

  it('renders nothing if balancesStatus is loading', () => {
    jest.spyOn(assetsData, 'useAssetsData').mockReturnValue(
      generateInfiniteQueryResult({
        map: { [balance.assetId]: asset }
      })
    )

    jest.spyOn(balancesData, 'useAllBalances').mockReturnValue(
      generateInfiniteQueryResult({
        map: { testId: balance },
        queryStatus: QueryStatus.Loading
      })
    )

    const { getByTestId } = render(
      <Form
        data-testid='form'
        defaultValues={{ memo: '', amount: dsWithdrawal.amount }}
      >
        <Summary />
      </Form>
    )
    expect(getByTestId('form')).toBeEmptyDOMElement()
  })

  it('renders nothing if assetsStatus is loading', () => {
    jest.spyOn(assetsData, 'useAssetsData').mockReturnValue(
      generateInfiniteQueryResult({
        map: { [balance.assetId]: asset },
        queryStatus: QueryStatus.Loading
      })
    )
    jest.spyOn(balancesData, 'useAllBalances').mockReturnValue(
      generateInfiniteQueryResult({
        map: { testId: balance }
      })
    )

    const { getByTestId } = render(
      <Form
        data-testid='form'
        defaultValues={{ memo: '', amount: dsWithdrawal.amount }}
      >
        <Summary />
      </Form>
    )
    expect(getByTestId('form')).toBeEmptyDOMElement()
  })

  it('GenericPreview is rendered with correct props', () => {
    const items = [
      {
        label: 'Name of Token',
        value: asset.name,
        secret: true
      },
      {
        label: 'Withdrawal Amount',
        value: formatMoney(dsWithdrawal.amount, asset.numberFormat.currency),
        secret: true
      },
      {
        label: 'Account Number',
        value: INVESTAX_BANK.bankAccountNumber ?? ''
      },
      {
        label: 'Memo',
        value: 'hello',
        secret: true
      }
    ]
    jest
      .spyOn(assetsData, 'useAssetsData')
      .mockReturnValue(
        generateInfiniteQueryResult({ map: { [balance.assetId]: asset } })
      )
    jest
      .spyOn(balancesData, 'useAllBalances')
      .mockReturnValue(
        generateInfiniteQueryResult({ map: { testId: balance } })
      )

    render(
      <Form defaultValues={{ memo: 'hello', amount: dsWithdrawal.amount }}>
        <Summary />
      </Form>
    )

    expect(GenericPreview).toHaveBeenCalledWith({ items }, {})
  })

  it('GenericPreview is rendered with correct props if memo is undefined', () => {
    const items = [
      {
        label: 'Name of Token',
        value: asset.name,
        secret: true
      },
      {
        label: 'Withdrawal Amount',
        value: formatMoney(dsWithdrawal.amount, asset.numberFormat.currency),
        secret: true
      },
      {
        label: 'Account Number',
        value: INVESTAX_BANK.bankAccountNumber ?? ''
      }
    ]
    jest
      .spyOn(assetsData, 'useAssetsData')
      .mockReturnValue(
        generateInfiniteQueryResult({ map: { [balance.assetId]: asset } })
      )
    jest
      .spyOn(balancesData, 'useAllBalances')
      .mockReturnValue(
        generateInfiniteQueryResult({ map: { testId: balance } })
      )

    render(
      <Form defaultValues={{ memo: undefined, amount: dsWithdrawal.amount }}>
        <Summary />
      </Form>
    )

    expect(GenericPreview).toHaveBeenCalledWith({ items }, {})
  })
})

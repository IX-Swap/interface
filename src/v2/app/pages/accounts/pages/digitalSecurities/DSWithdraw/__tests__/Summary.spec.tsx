/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Summary } from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/Summary'

import { QueryStatus } from 'react-query'
import * as reactHookForm from 'react-hook-form'
import * as assetsData from 'v2/hooks/asset/useAssetsData'
import * as balancesData from 'v2/hooks/balance/useAllBalances'
import { INVESTAX_BANK } from 'v2/config'
import { balance } from '__fixtures__/balance'
import { asset, dsWithdrawal } from '__fixtures__/authorizer'
import { GenericPreview } from 'v2/app/components/GenericPreview/GenericPreview'
import { formatMoney } from 'v2/helpers/numbers'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ balanceId: 'testId' })
}))

jest.mock('v2/app/components/GenericPreview/GenericPreview', () => ({
  GenericPreview: jest.fn(() => null)
}))

describe('Summary', () => {
  const balances = { map: { testId: balance } }
  const assets = { map: { [balance.assetId]: asset } }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    jest.spyOn(reactHookForm, 'useFormContext').mockReturnValue({
      getValues () {
        return { memo: '', amount: dsWithdrawal.amount }
      }
    })
    jest.spyOn(assetsData, 'useAssetsData').mockImplementation(() => ({
      data: assets,
      status: QueryStatus.Success
    }))
    jest.spyOn(balancesData, 'useAllBalances').mockImplementation(() => ({
      data: balances,
      status: QueryStatus.Success
    }))

    render(<Summary />)
  })

  it('renders nothing if balancesStatus is loading', () => {
    jest.spyOn(reactHookForm, 'useFormContext').mockReturnValue({
      getValues () {
        return { memo: '', amount: dsWithdrawal.amount }
      }
    })
    jest.spyOn(assetsData, 'useAssetsData').mockImplementation(() => ({
      data: assets,
      status: QueryStatus.Loading
    }))
    jest.spyOn(balancesData, 'useAllBalances').mockImplementation(() => ({
      data: balances,
      status: QueryStatus.Success
    }))

    const { container } = render(<Summary />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing if assetsStatus is loading', () => {
    jest.spyOn(reactHookForm, 'useFormContext').mockReturnValue({
      getValues () {
        return { memo: '', amount: dsWithdrawal.amount }
      }
    })
    jest.spyOn(assetsData, 'useAssetsData').mockImplementation(() => ({
      data: assets,
      status: QueryStatus.Success
    }))
    jest.spyOn(balancesData, 'useAllBalances').mockImplementation(() => ({
      data: balances,
      status: QueryStatus.Loading
    }))

    const { container } = render(<Summary />)
    expect(container).toBeEmptyDOMElement()
  })

  it('GenericPreview is rendered with correct props', () => {
    jest.spyOn(reactHookForm, 'useFormContext').mockReturnValue({
      getValues () {
        return { memo: '', amount: dsWithdrawal.amount }
      }
    })
    const items = [
      {
        label: 'Name of Token',
        value: asset.name
      },
      {
        label: 'Withdrawal Amount',
        value: formatMoney(dsWithdrawal.amount, asset.numberFormat.currency)
      },
      {
        label: 'Account Number',
        value: INVESTAX_BANK.bankAccountNumber ?? ''
      },
      {
        label: 'Memo',
        value: ''
      }
    ]
    jest.spyOn(assetsData, 'useAssetsData').mockImplementation(() => ({
      data: assets,
      status: QueryStatus.Success
    }))
    jest.spyOn(balancesData, 'useAllBalances').mockImplementation(() => ({
      data: balances,
      status: QueryStatus.Success
    }))

    render(<Summary />)

    expect(GenericPreview).toHaveBeenCalledTimes(1)
    expect(GenericPreview).toHaveBeenCalledWith({ items }, {})
  })

  it('GenericPreview is rendered with correct props if memo is undefined', () => {
    jest.spyOn(reactHookForm, 'useFormContext').mockReturnValue({
      getValues () {
        return { memo: undefined, amount: dsWithdrawal.amount }
      }
    })
    const items = [
      {
        label: 'Name of Token',
        value: asset.name
      },
      {
        label: 'Withdrawal Amount',
        value: formatMoney(dsWithdrawal.amount, asset.numberFormat.currency)
      },
      {
        label: 'Account Number',
        value: INVESTAX_BANK.bankAccountNumber ?? ''
      }
    ]
    jest.spyOn(assetsData, 'useAssetsData').mockImplementation(() => ({
      data: assets,
      status: QueryStatus.Success
    }))
    jest.spyOn(balancesData, 'useAllBalances').mockImplementation(() => ({
      data: balances,
      status: QueryStatus.Success
    }))

    render(<Summary />)

    expect(GenericPreview).toHaveBeenCalledTimes(1)
    expect(GenericPreview).toHaveBeenCalledWith({ items }, {})
  })
})

import { NewDistributionFormFields } from 'app/pages/issuance/components/ManageDistributions/NewDistributionFormFields'
import { Form } from 'components/form/Form'
import * as useBalancesByType from 'hooks/balance/useBalancesByType'
import * as useDSOById from 'app/pages/invest/hooks/useDSOById'

import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  generateInfiniteQueryResult,
  generateQueryResult
} from '__fixtures__/useQuery'
import { dso } from '__fixtures__/authorizer'

describe('NewDistributionFormFields', () => {
  const asset = {
    _id: '5f732c538a568b50914d8372',
    symbol: 'SGD',
    available: 120000000
  }

  beforeEach(() => {
    const useDSOByIdResponse = generateQueryResult({ data: dso })
    jest
      .spyOn(useDSOById, 'useDSOById')
      .mockImplementation(() => useDSOByIdResponse as any)

    const objResponse = generateInfiniteQueryResult({
      map: { [asset.symbol]: asset },
      isLoading: false
    })

    jest
      .spyOn(useBalancesByType, 'useBalancesByType')
      .mockImplementation(() => objResponse as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <NewDistributionFormFields
          currency='SGD'
          showOtp={false}
          showOTPForm={() => {}}
          closeOTPForm={() => {}}
        />
      </Form>
    )
  })

  it('returns null when isLoading', () => {
    const useDSOByIdResponse = generateQueryResult({
      data: dso,
      isLoading: true
    })
    jest
      .spyOn(useDSOById, 'useDSOById')
      .mockImplementation(() => useDSOByIdResponse as any)

    const { container } = render(
      <Form>
        <NewDistributionFormFields
          currency='SGD'
          showOtp={false}
          showOTPForm={() => {}}
          closeOTPForm={() => {}}
        />
      </Form>
    )

    expect(container.firstElementChild).toBeEmptyDOMElement()
  })

  it('returns null when isLoading', () => {
    const objResponse = generateInfiniteQueryResult({
      map: { [asset.symbol]: asset },
      isLoading: true
    })

    jest
      .spyOn(useBalancesByType, 'useBalancesByType')
      .mockImplementation(() => objResponse as any)

    const { container } = render(
      <Form>
        <NewDistributionFormFields
          currency='SGD'
          showOtp={false}
          showOTPForm={() => {}}
          closeOTPForm={() => {}}
        />
      </Form>
    )

    expect(container.firstElementChild).toBeEmptyDOMElement()
  })

  it('renders warning text if not enough balance', () => {
    const assetInsufficent = {
      _id: '5f732c538a568b50914d8372',
      symbol: 'SGD',
      available: 0
    }

    const objResponse = generateInfiniteQueryResult({
      map: { [asset.symbol]: assetInsufficent },
      isLoading: false
    })

    jest
      .spyOn(useBalancesByType, 'useBalancesByType')
      .mockImplementation(() => objResponse as any)

    const { queryByText } = render(
      <Form defaultValues={{ amountPerToken: 100 }}>
        <NewDistributionFormFields
          currency='SGD'
          showOtp={false}
          showOTPForm={() => {}}
          closeOTPForm={() => {}}
        />
      </Form>
    )

    expect(
      queryByText(
        /Distribution will not be complete because of insufficient balance. Please fund your account./i
      )
    ).toBeTruthy()
  })
})

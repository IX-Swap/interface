import React from 'react'
import { render } from 'test-utils'
import {
  CommitmentHeader,
  CommitmentHeaderProps
} from 'app/pages/invest/components/CommitmentHeader'
import { dso } from '__fixtures__/authorizer'
import { DSOTitle } from 'app/components/DSO/components/DSOTitle'
import { Form } from 'components/form/Form'
import { EstimatedValue } from 'app/pages/invest/components/EstimatedValue'
import { AssetBalance } from 'app/pages/invest/components/AssetBalance'

jest.mock('app/components/DSO/components/DSOTitle', () => ({
  DSOTitle: jest.fn(() => null)
}))
jest.mock('app/pages/invest/components/EstimatedValue', () => ({
  EstimatedValue: jest.fn(() => null)
}))
jest.mock('app/pages/invest/components/AssetBalance', () => ({
  AssetBalance: jest.fn(() => null)
}))

describe('CommitmentHeader', () => {
  const props: CommitmentHeaderProps = { dso }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(
      <Form>
        <CommitmentHeader {...props} />
      </Form>
    )
  })

  it('renders DSOTitle with correct props', () => {
    render(
      <Form>
        <CommitmentHeader {...props} />
      </Form>
    )

    expect(DSOTitle).toHaveBeenCalledWith({ dso: dso }, {})
  })

  it('renders EstimatedValue with correct props', () => {
    render(
      <Form>
        <CommitmentHeader {...props} />
      </Form>
    )

    expect(EstimatedValue).toHaveBeenCalledWith(
      { symbol: dso.currency.symbol },
      {}
    )
  })

  it('renders AssetBalance with correct props', () => {
    render(
      <Form>
        <CommitmentHeader {...props} />
      </Form>
    )

    expect(AssetBalance).toHaveBeenCalledWith(
      { assetId: dso.currency._id, symbol: dso.currency.symbol },
      {}
    )
  })
})

/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  CommitmentHeader,
  CommitmentHeaderProps
} from 'v2/app/pages/invest/components/CommitmentHeader'
import { dso } from '__fixtures__/authorizer'
import { DSOTitle } from 'v2/app/components/DSO/components/DSOTitle'
import { Form } from 'v2/components/form/Form'
import { EstimatedValue } from 'v2/app/pages/invest/components/EstimatedValue'
import { AssetBalance } from 'v2/app/pages/invest/components/AssetBalance'

jest.mock('v2/app/components/DSO/components/DSOTitle', () => ({
  DSOTitle: jest.fn(() => null)
}))
jest.mock('v2/app/pages/invest/components/EstimatedValue', () => ({
  EstimatedValue: jest.fn(() => null)
}))
jest.mock('v2/app/pages/invest/components/AssetBalance', () => ({
  AssetBalance: jest.fn(() => null)
}))

describe('CommitmentHeader', () => {
  const props: CommitmentHeaderProps = { dso: dso }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
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

    expect(AssetBalance).toHaveBeenCalledWith({ assetId: dso.currency._id }, {})
  })
})

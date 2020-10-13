/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  BalanceDetails,
  BalanceDetailsProps
} from 'v2/app/components/BalanceDetails'
import { balance } from '__fixtures__/balance'

describe('BalanceDetails', () => {
  const props: BalanceDetailsProps = { data: balance }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<BalanceDetails {...props} />)
  })
})

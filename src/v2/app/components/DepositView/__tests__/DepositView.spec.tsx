/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DepositView,
  DepositViewProps
} from 'v2/app/components/DepositView/DepositView'
import { cashDeposit } from '__fixtures__/authorizer'

describe('DepositView', () => {
  const props: DepositViewProps = { data: cashDeposit }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DepositView {...props} />)
  })
})

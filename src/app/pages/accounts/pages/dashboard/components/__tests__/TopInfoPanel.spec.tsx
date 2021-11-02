import React from 'react'
import { render, cleanup } from 'test-utils'
import { TopInfoPanel } from 'app/pages/accounts/pages/dashboard/components/TopInfoPanel/TopInfoPanel'
import {
  fakeBalancesInfo,
  fakeVirtualAccountInfo
} from '__fixtures__/portfolio'

describe('TopInfoPanel', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <TopInfoPanel
        accounts={[fakeVirtualAccountInfo]}
        balances={fakeBalancesInfo}
      />
    )
  })

  it('renders empty container when accounts is undefined', () => {
    const { container } = render(
      <TopInfoPanel accounts={undefined} balances={fakeBalancesInfo} />
    )

    expect(container).toBeEmptyDOMElement()
  })

  it('renders empty container when balances is undefined', () => {
    const { container } = render(
      <TopInfoPanel accounts={undefined} balances={fakeBalancesInfo} />
    )

    expect(container).toBeEmptyDOMElement()
  })

  it('renders empty container when accounts and balances is undefined', () => {
    const { container } = render(
      <TopInfoPanel accounts={undefined} balances={fakeBalancesInfo} />
    )

    expect(container).toBeEmptyDOMElement()
  })
})

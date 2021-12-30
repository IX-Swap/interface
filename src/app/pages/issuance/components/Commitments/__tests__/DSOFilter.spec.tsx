import React from 'react'
import { render } from 'test-utils'
import { DSOFilter } from 'app/pages/issuance/components/Commitments/DSOFilter'
import * as useDSOFilterHook from 'app/pages/issuance/hooks/useDSOFilter'
import { dso } from '__fixtures__/authorizer'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { DSOSelect } from 'app/pages/issuance/components/IssuanceLanding/DSOSelect'
import { NoDeals } from 'app/pages/issuance/components/IssuanceLanding/NoDeals'

jest.mock('app/pages/issuance/components/IssuanceLanding/NoDeals', () => ({
  NoDeals: jest.fn(() => null)
}))
jest.mock('app/pages/issuance/components/IssuanceLanding/DSOSelect', () => ({
  DSOSelect: jest.fn(() => null)
}))

describe('DSOFilter', () => {
  const handleChange = jest.fn()
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders DSOSelect correctly', () => {
    jest.spyOn(useDSOFilterHook, 'useDSOFilter').mockReturnValue({
      ...generateInfiniteQueryResult({ list: [dso] }),
      handleChange,
      selected: null
    })

    render(<DSOFilter />)

    expect(DSOSelect).toHaveBeenCalledTimes(1)
    expect(DSOSelect).toHaveBeenCalledWith(
      {
        fullWidth: true,
        onChange: handleChange,
        options: [dso],
        value: null
      },
      {}
    )
  })

  it('renders NoDeals if no dsos exist', () => {
    jest.spyOn(useDSOFilterHook, 'useDSOFilter').mockReturnValue({
      ...generateInfiniteQueryResult({}),
      handleChange,
      selected: null
    })

    render(<DSOFilter />)

    expect(NoDeals).toHaveBeenCalledTimes(1)
  })

  it('renders nothing if loading', () => {
    jest.spyOn(useDSOFilterHook, 'useDSOFilter').mockReturnValue({
      ...generateInfiniteQueryResult({ isLoading: true }),
      handleChange,
      selected: null
    })

    const { container } = render(<DSOFilter />)

    expect(container).toBeEmptyDOMElement()
  })
})

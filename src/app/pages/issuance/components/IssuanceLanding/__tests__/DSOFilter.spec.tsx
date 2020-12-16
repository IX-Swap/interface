import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSOFilter } from 'app/pages/issuance/components/IssuanceLanding/DSOFilter'
import * as useIssuanceRouterHook from 'app/pages/issuance/router'
import * as useDSOsByUserIdHook from 'app/pages/issuance/hooks/useDSOsByUserId'
import { dso } from '__fixtures__/authorizer'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { DSOSelect } from 'app/pages/issuance/components/IssuanceLanding/DSOSelect'

jest.mock('app/pages/issuance/components/IssuanceLanding/DSOSelect', () => ({
  DSOSelect: jest.fn(() => null)
}))

describe('DSOFilter', () => {
  const replace = jest.fn()
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    jest
      .spyOn(useIssuanceRouterHook, 'useIssuanceRouter')
      .mockReturnValue({ replace, params: { dsoId: dso._id } } as any)
    jest
      .spyOn(useDSOsByUserIdHook, 'useDSOsByUserId')
      .mockReturnValue(generateInfiniteQueryResult({ list: [] }))

    render(<DSOFilter />)
  })

  it('renders DSOSelect correctly', () => {
    jest
      .spyOn(useIssuanceRouterHook, 'useIssuanceRouter')
      .mockReturnValue({ replace, params: { dsoId: dso._id } } as any)
    jest
      .spyOn(useDSOsByUserIdHook, 'useDSOsByUserId')
      .mockReturnValue(generateInfiniteQueryResult({ list: [dso] }))

    render(<DSOFilter />)

    expect(DSOSelect).toHaveBeenCalledTimes(1)
    expect(DSOSelect).toHaveBeenCalledWith(
      {
        fullWidth: true,
        onChange: expect.any(Function)
      },
      {}
    )
  })

  it('replaces url if dsoId does not exist in url', () => {
    jest
      .spyOn(useIssuanceRouterHook, 'useIssuanceRouter')
      .mockReturnValue({ replace, params: { dsoId: undefined } } as any)
    jest
      .spyOn(useDSOsByUserIdHook, 'useDSOsByUserId')
      .mockReturnValue(generateInfiniteQueryResult({ list: [dso] }))

    render(<DSOFilter />)

    expect(replace).toHaveBeenCalledTimes(1)
    expect(replace).toHaveBeenCalledWith('insight', { dsoId: dso._id })
  })

  it('renders null if loading', () => {
    jest
      .spyOn(useIssuanceRouterHook, 'useIssuanceRouter')
      .mockReturnValue({ replace, params: { dsoId: dso._id } } as any)
    jest
      .spyOn(useDSOsByUserIdHook, 'useDSOsByUserId')
      .mockReturnValue(generateInfiniteQueryResult({ isLoading: true }))

    const { container } = render(<DSOFilter />)

    expect(container).toBeEmptyDOMElement()
  })
})

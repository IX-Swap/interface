import React from 'react'
import { render, cleanup } from 'test-utils'
import * as useDSOsByUserIdHook from 'app/pages/issuance/hooks/useDSOsByUserId'
import { DSOSelect } from 'app/pages/issuance/components/IssuanceLanding/DSOSelect'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import * as useIssuanceRouterHook from 'app/pages/issuance/router'
import { dso } from '__fixtures__/authorizer'

describe('DSOSelect', () => {
  beforeEach(() => {
    jest
      .spyOn(useIssuanceRouterHook, 'useIssuanceRouter')
      .mockReturnValue({ params: { dsoId: dso._id } } as any)
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    jest
      .spyOn(useDSOsByUserIdHook, 'useDSOsByUserId')
      .mockReturnValue(generateInfiniteQueryResult({ list: [dso] }))

    render(<DSOSelect />)
  })

  it('renders null if dsos does not exist', () => {
    jest
      .spyOn(useDSOsByUserIdHook, 'useDSOsByUserId')
      .mockReturnValue(generateInfiniteQueryResult({}))

    const { container } = render(<DSOSelect />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders null if loading', () => {
    jest
      .spyOn(useDSOsByUserIdHook, 'useDSOsByUserId')
      .mockReturnValue(generateInfiniteQueryResult({ isLoading: true }))

    const { container } = render(<DSOSelect />)

    expect(container).toBeEmptyDOMElement()
  })
})

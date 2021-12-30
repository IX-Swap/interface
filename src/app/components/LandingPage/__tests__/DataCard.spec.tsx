import { DataCard } from 'app/components/LandingPage/DataCard'
import React from 'react'
import { render } from 'test-utils'
import { InternalRouteProps } from 'types/util'
import * as useAuthorizerPendingItems from 'app/pages/authorizer/hooks/useAuthorizerPendingItems'

describe('DataCard', () => {
  const link: InternalRouteProps = {
    path: 'path/',
    label: 'Path'
  }

  beforeEach(() => {
    const objResponse = {
      total: 100,
      status: undefined
    }

    jest
      .spyOn(useAuthorizerPendingItems, 'useAuthorizerPendingItems')
      .mockImplementation(() => objResponse as any)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<DataCard link={link} variant={0} />)
  })

  it('does not render render number when status is loading', () => {
    const objResponse = {
      total: 100,
      status: 'loading'
    }

    jest
      .spyOn(useAuthorizerPendingItems, 'useAuthorizerPendingItems')
      .mockImplementation(() => objResponse as any)

    const { queryByText } = render(<DataCard link={link} variant={0} />)
    expect(queryByText('100')).toBeFalsy()
  })

  it('renders 999 when total is greater than 999', () => {
    const objResponse = {
      total: 1000000,
      status: undefined
    }

    jest
      .spyOn(useAuthorizerPendingItems, 'useAuthorizerPendingItems')
      .mockImplementation(() => objResponse as any)

    const { getByText } = render(<DataCard link={link} variant={0} />)
    expect(getByText('999')).toBeTruthy()
  })
})

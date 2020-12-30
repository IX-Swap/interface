import React from 'react'
import { render, cleanup } from 'test-utils'
import { CountdownTimer } from '../CountdownTimer'
import * as useIssuanceRouterHook from 'app/pages/issuance/router'
import * as useDSOByIdHook from 'app/pages/invest/hooks/useDSOById'
import { dso } from '__fixtures__/authorizer'

describe('CountdownTimer', () => {
  const dateNowSpy = jest
    .spyOn(Date, 'now')
    .mockImplementation(() => 1607672045419)

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  afterAll(() => {
    dateNowSpy.mockRestore()
  })

  it('renders without errors', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: dso } as any)

    jest.spyOn(useIssuanceRouterHook, 'useIssuanceRouter').mockReturnValue({
      params: { dsoId: dso._id },
      paths: useIssuanceRouterHook.IssuanceRoute
    } as any)

    render(<CountdownTimer />)
  })
})

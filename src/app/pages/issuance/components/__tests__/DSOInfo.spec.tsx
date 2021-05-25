import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSOInfo } from '../DSOInfo'
import * as useDSOByIdHook from 'app/pages/invest/hooks/useDSOById'
import { dso } from '__fixtures__/authorizer'

jest.mock('app/__tests__/DSO/__tests__/DSOLogo', () => ({
  DSOLogo: jest.fn(() => null)
}))

describe('DSOInfo', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: dso } as any)

    render(<DSOInfo />)
  })
})

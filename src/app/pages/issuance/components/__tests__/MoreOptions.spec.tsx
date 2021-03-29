import React from 'react'
import { render, cleanup } from 'test-utils'
import { MoreOptions } from '../MoreOptions'
import * as useDSOByIdHook from 'app/pages/invest/hooks/useDSOById'
import { dso } from '__fixtures__/authorizer'

jest.mock('use', () => ({
  Chart: jest.fn(() => 'Chart')
}))

describe('More Options', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: dso } as any)

    render(<MoreOptions />)
  })
})

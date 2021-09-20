import { ClosedDSOSelect } from 'app/pages/authorizer/components/ClosedDSOSelect'
import * as useDSOList from 'app/pages/authorizer/hooks/useDSOList'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { dso } from '__fixtures__/authorizer'

describe('ClosedDSOSelect', () => {
  beforeEach(() => {
    const objResponse = {
      data: {
        list: [dso]
      }
    }

    jest
      .spyOn(useDSOList, 'useDSOList')
      .mockImplementation(() => objResponse as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<ClosedDSOSelect />)
  })
})

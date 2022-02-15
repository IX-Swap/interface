import * as useDSOById from 'app/pages/invest/hooks/useDSOById'
import { LaunchDate } from 'app/pages/issuance/components/UploadReportForm/LaunchDate'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { dso } from '__fixtures__/authorizer'
import { generateQueryResult } from '__fixtures__/useQuery'

describe('LaunchDate', () => {
  beforeEach(() => {
    const objResponse = generateQueryResult({ data: dso })

    jest
      .spyOn(useDSOById, 'useDSOById')
      .mockImplementation(() => objResponse as any)
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<LaunchDate />)
  })
})

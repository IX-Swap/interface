import { UploadReportButton } from 'app/pages/issuance/components/UploadReportButton'
import * as useDSOsByUserId from 'app/pages/issuance/hooks/useDSOsByUserId'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { dso } from '__fixtures__/authorizer'
import { generateQueryResult } from '__fixtures__/useQuery'

describe('UploadReportButton', () => {
  beforeEach(() => {
    const objResponse = generateQueryResult({
      data: {
        list: [dso]
      }
    })

    jest
      .spyOn(useDSOsByUserId, 'useDSOsByUserId')
      .mockImplementation(() => objResponse as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<UploadReportButton />)
  })
})

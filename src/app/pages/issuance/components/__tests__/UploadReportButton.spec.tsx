import { UploadReportButton } from 'app/pages/issuance/components/UploadReportButton'
import * as useDSOsByUserId from 'app/pages/issuance/hooks/useDSOsByUserId'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { generateQueryResult } from '__fixtures__/useQuery'

describe('UploadReportButton', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders the button as disabled when there is no dso', () => {
    const objResponse = generateQueryResult({
      data: {
        list: []
      }
    })

    jest
      .spyOn(useDSOsByUserId, 'useDSOsByUserId')
      .mockImplementation(() => objResponse as any)

    const { getAllByTestId } = render(<UploadReportButton />)
    expect(getAllByTestId('upload-report-button')[0]).toHaveAttribute(
      'aria-disabled',
      'true'
    )
  })
})

import { FinancialReportDSOSelect } from 'app/pages/issuance/components/UploadReportForm/FinancialReportDSOSelect'
import * as useDSOsByUserId from 'app/pages/issuance/hooks/useDSOsByUserId'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { generateQueryResult } from '__fixtures__/useQuery'

describe('FinancialReportDSOSelect', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders null when dso is undefined', () => {
    const objResponse = generateQueryResult({ data: { list: [] } })

    jest
      .spyOn(useDSOsByUserId, 'useDSOsByUserId')
      .mockImplementation(() => objResponse as any)
    const { container } = render(<FinancialReportDSOSelect />)
    expect(container).toBeEmptyDOMElement()
  })
})

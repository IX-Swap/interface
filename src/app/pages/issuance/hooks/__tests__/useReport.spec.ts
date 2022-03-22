import { useReport } from 'app/pages/issuance/hooks/useReport'
import {
  renderHookWithServiceProvider,
  apiServiceMock,
  waitFor
} from 'test-utils'
import { issuanceURL } from 'config/apiURL'
import { successfulResponse } from '__fixtures__/api'

describe('useReport', () => {
  const sampleId = 'sample_id'
  apiServiceMock.get.mockResolvedValue(successfulResponse)

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('expects request with correct parameters and correct response', async () => {
    const { result } = renderHookWithServiceProvider(() => useReport(sampleId))

    await waitFor(() => result.current.data)

    expect(result.current.data).toEqual(successfulResponse.data)
    expect(apiServiceMock.get).toBeCalledWith(
      issuanceURL.financialReports.getReport(sampleId)
    )
  })
})

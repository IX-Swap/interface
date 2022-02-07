import { act } from '@testing-library/react-hooks'
import { useUploadReportFile } from 'app/pages/issuance/hooks/useUploadReportFile'
import { issuanceURL } from 'config/apiURL'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { successfulResponse } from '__fixtures__/api'

describe('useUploadReportFile', () => {
  const sampleReport = {
    nav: 1,
    dateFrom: 'Mon Feb 28 2022 13:05:00 GMT+0800 (Philippine Standard Time)',
    dateTo: 'Mon Feb 28 2022 13:05:00 GMT+0800 (Philippine Standard Time)',
    dso: '613850890b74f77881f84135',
    reportDocuments: ['61fcb42023f48709b125fabf', '61fcb42023f48709b125fac1']
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('calls correct api endpoint', async () => {
    await act(async () => {
      const apiFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { post: apiFn }

      const { result } = renderHookWithServiceProvider(
        () => useUploadReportFile(),
        {
          apiService: apiObj,
          snackbarService: { showSnackbar }
        }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate(sampleReport)

          expect(apiFn).toHaveBeenCalledWith(
            issuanceURL.financialReports.uploadFile,
            sampleReport
          )
          expect(showSnackbar).toHaveBeenCalledWith('Success', 'success')
        },
        { timeout: 1000 }
      )
    })
  })
})

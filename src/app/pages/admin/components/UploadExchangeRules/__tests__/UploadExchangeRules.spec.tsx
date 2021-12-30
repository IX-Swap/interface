import { UploadExchangeRules } from 'app/pages/admin/components/UploadExchangeRules/UploadExchangeRules'
import React from 'react'
import { render } from 'test-utils'
import { DataroomUploader } from 'components/dataroom/DataroomUploader'
import { generateQueryResult } from '__fixtures__/useQuery'
import * as useGetExchangeRules from 'app/pages/admin/hooks/useGetExchangeRules'
import { LOADING_TEXT } from 'components/form/renderUtils'

jest.mock('components/dataroom/DataroomUploader', () => ({
  DataroomUploader: jest.fn(() => null)
}))

describe('UploadExchangeRules', () => {
  beforeEach(() => {
    const objResponse = generateQueryResult({
      data: document,
      isLoading: false
    })

    jest
      .spyOn(useGetExchangeRules, 'useGetExchangeRules')
      .mockImplementation(() => objResponse as any)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<UploadExchangeRules />)
  })

  it('returns LOADING_TEXT when isLoading', () => {
    const objResponse = generateQueryResult({
      data: document,
      isLoading: true
    })

    jest
      .spyOn(useGetExchangeRules, 'useGetExchangeRules')
      .mockImplementation(() => objResponse as any)

    const { getByText } = render(<UploadExchangeRules />)

    expect(getByText(LOADING_TEXT)).toBeTruthy()
  })

  it('renders DataroomUploader component correctly', () => {
    const { getByText } = render(<UploadExchangeRules />)
    expect(getByText('Exchange Rule')).toBeTruthy()
    expect(DataroomUploader).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'exchangeRules',
        label: 'Exchange Rules',
        value: document,
        documentInfo: document,
        feature: 'authorization/exchangeRules'
      }),
      {}
    )
  })
})

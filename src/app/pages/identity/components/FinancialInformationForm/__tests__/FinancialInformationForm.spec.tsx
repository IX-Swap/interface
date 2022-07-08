import { FinancialInformationForm } from 'app/pages/identity/components/FinancialInformationForm/FinancialInformationForm'
import React from 'react'
import { render } from 'test-utils'
import { EmploymentField } from 'app/pages/identity/components/FinancialInformationForm/EmploymentFields'
import { FundSource } from 'app/pages/identity/components/FinancialInformationForm/FundSource'
import { NoticeOfAssesment } from 'app/pages/identity/components/FinancialInformationForm/NoticeOfAssesment/NoticeOfAssesment'
import * as useIsSingPass from 'app/pages/identity/hooks/useIsSingPass'

jest.mock(
  'app/pages/identity/components/FinancialInformationForm/EmploymentFields',
  () => ({
    EmploymentField: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/identity/components/FinancialInformationForm/FundSource',
  () => ({
    FundSource: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/identity/components/FinancialInformationForm/NoticeOfAssesment/NoticeOfAssesment',
  () => ({
    NoticeOfAssesment: jest.fn(() => null)
  })
)

describe('FinancialInformationForm', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders components without errors', () => {
    render(<FinancialInformationForm />)

    expect(EmploymentField).toHaveBeenCalled()
  })

  it('does not render NoticeOfAssesment if singpass data is missing', () => {
    const objResponse = {
      isSingPass: false
    }

    jest
      .spyOn(useIsSingPass, 'useIsSingPass')
      .mockImplementation(() => objResponse as any)

    render(<FinancialInformationForm />)

    expect(NoticeOfAssesment).not.toHaveBeenCalled()
  })

  it('renders NoticeOfAssesment if singpass data is present', () => {
    const objResponse = {
      isSingPass: true,
      singPassData: {
        noahistory: {
          noa: []
        }
      }
    }

    jest
      .spyOn(useIsSingPass, 'useIsSingPass')
      .mockImplementation(() => objResponse as any)

    render(<FinancialInformationForm />)

    expect(NoticeOfAssesment).toHaveBeenCalled()
  })
})

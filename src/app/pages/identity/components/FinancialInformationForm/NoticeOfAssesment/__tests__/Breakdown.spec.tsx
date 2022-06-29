import { Breakdown } from 'app/pages/identity/components/FinancialInformationForm/NoticeOfAssesment/Breakdown'
import React from 'react'
import { render, cleanup } from 'test-utils'
import * as useIsSingPass from 'app/pages/identity/hooks/useIsSingPass'
import { Divider } from 'ui/Divider'

jest.mock('ui/Divider', () => ({
  Divider: jest.fn(() => null)
}))

describe('Breakdown', () => {
  const objResponse = {
    singPassData: {
      noahistory: {
        noas: [
          {
            amount: { value: 1000 },
            category: { value: 'Original' },
            employment: { value: 100 },
            interest: { value: 100 },
            rent: { value: 0 },
            taxclearance: { value: 'Y' },
            trade: { value: 100 },
            yearofassessment: { value: '2022' }
          },
          {
            amount: { value: 2000 },
            category: { value: 'Other Category' },
            employment: { value: 200 },
            interest: { value: 200 },
            rent: { value: 1 },
            taxclearance: { value: 'N' },
            trade: { value: 200 },
            yearofassessment: { value: '2021' }
          }
        ]
      }
    }
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('displays list of noas', async () => {
    jest
      .spyOn(useIsSingPass, 'useIsSingPass')
      .mockImplementation(() => objResponse as any)

    const { findAllByLabelText } = render(<Breakdown />)
    const yoaInputs = await findAllByLabelText('Year of Assessment')
    const typeInputs = await findAllByLabelText('Type')
    const assessableIncomeInputs = await findAllByLabelText('Assessable Income')
    const employmentInputs = await findAllByLabelText('Employment')
    const tradeInputs = await findAllByLabelText('Trade')
    const rentInputs = await findAllByLabelText('Rent')
    const interestInputs = await findAllByLabelText('Interest')

    expect(yoaInputs[0]).toHaveValue('2022')
    expect(yoaInputs[1]).toHaveValue('2021')

    expect(typeInputs[0]).toHaveValue('Original(Clearance)')
    expect(typeInputs[1]).toHaveValue('Other Category')

    expect(assessableIncomeInputs[0]).toHaveValue('SGD 1,000.00')
    expect(assessableIncomeInputs[1]).toHaveValue('SGD 2,000.00')

    expect(employmentInputs[0]).toHaveValue('SGD 100.00')
    expect(employmentInputs[1]).toHaveValue('SGD 200.00')

    expect(tradeInputs[0]).toHaveValue('SGD 100.00')
    expect(tradeInputs[1]).toHaveValue('SGD 200.00')

    expect(rentInputs[0]).toHaveValue('SGD 0.00')
    expect(rentInputs[1]).toHaveValue('SGD 1.00')

    expect(interestInputs[0]).toHaveValue('SGD 100.00')
    expect(interestInputs[1]).toHaveValue('SGD 200.00')

    expect(Divider).toHaveBeenCalledTimes(1)
  })

  it('returns null if there no noas', () => {
    jest.spyOn(useIsSingPass, 'useIsSingPass').mockImplementation(
      () =>
        ({
          singPassData: {
            noahistory: { noas: [] }
          }
        } as any)
    )

    const { container } = render(<Breakdown />)

    expect(container).toBeEmptyDOMElement()
  })
})

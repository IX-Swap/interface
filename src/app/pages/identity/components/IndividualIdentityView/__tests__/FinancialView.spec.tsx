import { FinancialView } from 'app/pages/identity/components/IndividualIdentityView/FinancialView/FinancialView'
import React from 'react'
import { render } from 'test-utils'
import { individual } from '__fixtures__/identity'

describe('FinancialView', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders fundsource correctly when it is checked', () => {
    const fundSource = individual?.sourceOfFund?.[0]
    const { getByText } = render(<FinancialView data={individual} />)

    expect(
      getByText(`${fundSource?.name ?? ''} (${fundSource?.value ?? ''}%)`)
    ).toBeTruthy()
  })

  it('does not render fundsource not checked', () => {
    const { queryByText } = render(
      <FinancialView
        data={{
          ...individual,
          sourceOfFund: [
            {
              name: 'Inheritance/Gifts',
              checked: false,
              value: 20
            }
          ]
        }}
      />
    )

    expect(queryByText('Inheritance/Gifts 20%')).toBeFalsy()
  })
})

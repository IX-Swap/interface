import React from 'react'
import { render, cleanup } from 'test-utils'
import { MinimumInvesmentField } from 'components/form/MinimumInvestmentField'
import { NumericInputProps } from 'components/form/NumericInput'
import { moneyNumberFormat } from 'config/numberFormat'
import { Form } from 'components/form/Form'

describe('MinimumInvestmentField', () => {
  const minimumInvestmentFieldProps: NumericInputProps = {
    numberFormat: moneyNumberFormat
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <MinimumInvesmentField {...minimumInvestmentFieldProps} />
      </Form>
    )
  })
})

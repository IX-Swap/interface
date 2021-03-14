import { InternationalFields } from 'app/pages/_identity/components/TaxDeclarationForm/TaxResidencyFields/InternationalFields'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Form } from 'components/form/Form'
import { TaxResidencyField } from 'app/pages/_identity/components/TaxDeclarationForm/TaxResidencyFields/TaxResidencyField'
import { MAX_TAX_RESIDENCIES } from 'app/pages/identity/utils'

jest.mock(
  'app/pages/identity/components/TaxDeclarationForm/TaxResidencyFields/TaxResidencyField',
  () => ({
    TaxResidencyField: jest.fn(() => null)
  })
)

describe('InternationalFields', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <InternationalFields />
      </Form>
    )
  })

  it('renders components correctly', () => {
    render(
      <Form
        defaultValues={{
          taxResidencies: [
            {
              countryOfResidence: 'Singapore',
              taxIdentificationNumber: '1234567890'
            },
            {
              countryOfResidence: 'United States of America',
              taxIdentificationNumber: '0987654321'
            }
          ]
        }}
      >
        <InternationalFields />
      </Form>
    )

    expect(TaxResidencyField).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        field: expect.objectContaining({
          countryOfResidence: 'Singapore',
          taxIdentificationNumber: '1234567890'
        }),
        max: MAX_TAX_RESIDENCIES,
        index: 0,
        total: 2
      }),
      {}
    )

    expect(TaxResidencyField).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        field: expect.objectContaining({
          countryOfResidence: 'United States of America',
          taxIdentificationNumber: '0987654321'
        }),
        max: MAX_TAX_RESIDENCIES,
        index: 1,
        total: 2
      }),
      {}
    )
  })
})

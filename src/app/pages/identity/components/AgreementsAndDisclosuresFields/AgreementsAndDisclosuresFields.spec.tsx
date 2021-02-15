import React from 'react'
import { cleanup, render } from 'test-utils'
import { Form } from 'components/form/Form'
import { TypedField } from 'components/form/TypedField'
import { AgreementsAndDisclosuresFields } from './AgreementsAndDisclosuresFields'


jest.mock('components/form/TypedField', () => ({
  TypedField: jest.fn(() => null)
}))

describe('AgreementsAndDisclosuresFields', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <AgreementsAndDisclosuresFields />
      </Form>
    )
  })

  it('renders AgreementsAndDisclosuresFields is correct', () => {
    render(
      <Form>
        <AgreementsAndDisclosuresFields />
      </Form>
    )

    expect(TypedField).toHaveBeenCalledTimes(3)
    expect(TypedField).toHaveBeenNthCalledWith(1,
      expect.objectContaining({
        name: 'investorAgreement'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(2,
      expect.objectContaining({
        name: 'custodyAgreement'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(3,
      expect.objectContaining({
        name: 'disclosures'
      }),
      {}
    )
  })
})
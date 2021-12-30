import React from 'react'
import { render } from 'test-utils'
import { Form } from 'components/form/Form'
import { TypedField } from 'components/form/TypedField'
import { AgreementsAndDisclosuresFields } from './AgreementsAndDisclosuresFields'

jest.mock('components/form/TypedField', () => ({
  TypedField: jest.fn(() => null)
}))

describe('AgreementsAndDisclosuresFields', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(
      <Form>
        <AgreementsAndDisclosuresFields />
      </Form>
    )
  })

  it('renders fields correctly', () => {
    render(
      <Form>
        <AgreementsAndDisclosuresFields />
      </Form>
    )

    expect(TypedField).toHaveBeenCalledTimes(3)
    expect(TypedField).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        name: 'investor'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        name: 'custody'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        name: 'disclosure'
      }),
      {}
    )
  })
})

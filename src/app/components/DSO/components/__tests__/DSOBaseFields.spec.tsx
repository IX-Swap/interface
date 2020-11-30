import React from 'react'
import { cleanup, render } from 'test-utils'
import {
  DSOBaseFields,
  DSOBaseFieldsProps
} from 'app/components/DSO/components/DSOBaseFields'
import { TypedField } from 'components/form/TypedField'
import { Form } from 'components/form/Form'

jest.mock('components/form/TypedField', () => ({
  TypedField: jest.fn(() => <input />)
}))

describe('DSOBaseFields', () => {
  const props: DSOBaseFieldsProps = {
    isNew: false,
    isLive: false
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <DSOBaseFields {...props} />
      </Form>
    )
  })

  it('renders EditableField with correct props', () => {
    render(
      <Form>
        <DSOBaseFields {...props} />
      </Form>
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        label: 'Logo',
        name: 'logo'
      }),
      {}
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        label: 'Token Name',
        name: 'tokenName'
      }),
      {}
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        label: 'Symbol',
        name: 'tokenSymbol'
      }),
      {}
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        label: 'Launch Date',
        name: 'launchDate'
      }),
      {}
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      5,
      expect.objectContaining({
        label: 'Corporate',
        name: 'corporate'
      }),
      {}
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      6,
      expect.objectContaining({
        label: 'Issuer Name',
        name: 'issuerName'
      }),
      {}
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      7,
      expect.objectContaining({
        label: 'Currency',
        assetType: 'Currency',
        name: 'currency'
      }),
      {}
    )
  })
})

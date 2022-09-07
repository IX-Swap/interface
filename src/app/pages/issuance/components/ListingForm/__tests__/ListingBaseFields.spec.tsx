import React from 'react'
import { render } from 'test-utils'
import { TypedField } from 'components/form/TypedField'
import { Form } from 'components/form/Form'
import {
  ListingBaseFields,
  ListingBaseFieldsProps
} from 'app/pages/issuance/components/ListingForm/ListingBaseFields'
import * as useFormContext from 'react-hook-form'
import { initialListingFormValues } from 'app/pages/issuance/consts/listing'

jest.mock('components/form/TypedField', () => ({
  TypedField: jest.fn(() => <input />)
}))

describe('ListingBaseFields', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    const objResponse = {
      watch: () => ({
        capitalStructure: initialListingFormValues.capitalStructure,
        corporate: initialListingFormValues.corporate,
        tokenName: initialListingFormValues.tokenName,
        network: initialListingFormValues.network,
        tokenSymbol: initialListingFormValues.tokenSymbol,
        launchDate: null
      })
    }

    jest
      .spyOn(useFormContext, 'useFormContext')
      .mockImplementation(() => objResponse as any)
  })

  it('renders fields with correct props', () => {
    const props: ListingBaseFieldsProps = {
      isNew: false,
      isLive: false,
      isDataFromDSO: true
    }

    render(
      <Form>
        <ListingBaseFields {...props} />
      </Form>
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        label: 'Capital Structure',
        name: 'capitalStructure',
        displayEmpty: true,
        disabled: true
      }),
      {}
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        label: 'Corporate Name',
        name: 'corporate',
        disabled: true
      }),
      {}
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        label: 'Launch Date',
        name: 'launchDate'
      }),
      {}
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        label: 'Token Name',
        name: 'tokenName'
      }),
      {}
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      5,
      expect.objectContaining({
        label: 'Network',
        name: 'network'
      }),
      {}
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      6,
      expect.objectContaining({
        name: 'tokenSymbol',
        disabled: true
      }),
      {}
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      7,
      expect.objectContaining({
        label: 'Decimal Places',
        name: 'decimals'
      }),
      {}
    )
  })

  it('renders fields with correct props with different props', () => {
    const otherProps: ListingBaseFieldsProps = {
      isNew: true,
      isLive: true,
      isDataFromDSO: false
    }

    render(
      <Form>
        <ListingBaseFields {...otherProps} />
      </Form>
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        label: 'Capital Structure',
        name: 'capitalStructure',
        displayEmpty: true,
        disabled: false
      }),
      {}
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        label: 'Corporate Name',
        name: 'corporate',
        disabled: false
      }),
      {}
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        label: 'Launch Date',
        name: 'launchDate',
        disabled: true
      }),
      {}
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        label: 'Token Name',
        name: 'tokenName',
        disabled: true
      }),
      {}
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      5,
      expect.objectContaining({
        label: 'Network',
        name: 'network'
      }),
      {}
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      6,
      expect.objectContaining({
        name: 'tokenSymbol'
      }),
      {}
    )
  })
})

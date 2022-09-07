import React from 'react'
import { render } from 'test-utils'
import { Form } from 'components/form/Form'
import * as useFormContext from 'react-hook-form'
import { ListingMarketInfo } from 'app/pages/issuance/components/ListingForm/ListingMarketInfo'
import { asset } from '__fixtures__/authorizer'
import * as useAssetsDataHook from 'hooks/asset/useAssetsData'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { fireEvent, waitFor } from '@testing-library/dom'

describe('ListingMarketInfo>', () => {
  const objResponse = {
    watch: () => ({
      currency: 'USD'
    }),
    setValue: jest.fn()
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    jest
      .spyOn(useFormContext, 'useFormContext')
      .mockImplementation(() => objResponse as any)

    jest
      .spyOn(useAssetsDataHook, 'useAssetsData')
      .mockReturnValue(generateInfiniteQueryResult({ list: [asset] }))
  })

  it('renders correct radio buttons count, invokes setValue on radio button click', async () => {
    jest
      .spyOn(useAssetsDataHook, 'useAssetsData')
      .mockReturnValue(generateInfiniteQueryResult({ list: [asset] }))

    const { getAllByTestId } = render(
      <Form>
        <ListingMarketInfo />
      </Form>
    )

    const buttons = getAllByTestId('radioWrapper')
    expect(buttons.length).toBe(1)

    fireEvent.click(buttons[0])

    await waitFor(() => {
      expect(objResponse.setValue).toHaveBeenCalledWith('currency', asset._id)
    })
  })

  it('renders correct radio buttons count', () => {
    jest
      .spyOn(useAssetsDataHook, 'useAssetsData')
      .mockReturnValue(generateInfiniteQueryResult({ list: [asset, asset] }))

    const { getAllByTestId } = render(
      <Form>
        <ListingMarketInfo />
      </Form>
    )

    const buttons = getAllByTestId('radioWrapper')
    expect(buttons.length).toBe(2)
  })
})

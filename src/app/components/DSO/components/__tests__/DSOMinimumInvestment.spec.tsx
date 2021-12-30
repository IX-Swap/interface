import React from 'react'
import { render } from 'test-utils'
import { DSOMinimumInvestment } from 'app/components/DSO/components/DSOMinimumInvestment'
import { Form } from 'components/form/Form'
import { dso, asset } from '__fixtures__/authorizer'
import { transformDSOToFormValues } from 'app/components/DSO/utils'
import * as useAssetsDataHook from 'hooks/asset/useAssetsData'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'

jest
  .spyOn(useAssetsDataHook, 'useAssetsData')
  .mockReturnValue(generateInfiniteQueryResult({ map: { [asset._id]: asset } }))

describe('DSOMinimumInvestment', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <Form defaultValues={transformDSOToFormValues({ ...dso })}>
        <DSOMinimumInvestment />
      </Form>
    )
  })

  it('renders correct data when minimumInvestment and pricePerUnit have value more than 0', () => {
    const { getByText } = render(
      <Form
        defaultValues={transformDSOToFormValues({
          ...dso,
          minimumInvestment: 100,
          pricePerUnit: 5
        })}
      >
        <DSOMinimumInvestment />
      </Form>
    )

    expect(getByText(/minimum invesment/i)).toBeInTheDocument()
    expect(getByText('500 SGD')).toBeInTheDocument()
  })

  it('renders null when minimumUnitInvestment or pricePerUnit is 0', () => {
    const { container } = render(
      <Form
        defaultValues={transformDSOToFormValues({
          ...dso,
          minimumInvestment: 0,
          pricePerUnit: 0
        })}
      >
        <DSOMinimumInvestment />
      </Form>
    )

    expect(container.querySelector('form')).toBeEmptyDOMElement()
  })
})

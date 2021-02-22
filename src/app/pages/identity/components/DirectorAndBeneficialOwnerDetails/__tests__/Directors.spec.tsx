import { Directors } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/Directors'
import { Fields } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/Fields'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'

jest.mock(
  'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/Fields',
  () => ({
    Fields: jest.fn(() => null)
  })
)

describe('Directors', () => {
  const defaultValues = {
    directors: [
      {
        fullName: 'Oranges Lemons'
      },
      {
        fullName: 'Apples Bananas'
      }
    ]
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <Directors />
      </Form>
    )
  })

  it('renders components correctly', () => {
    render(
      <Form defaultValues={defaultValues}>
        <Directors />
      </Form>
    )

    expect(Fields).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        rootName: 'directors',
        index: 0,
        isLast: false
      }),
      {}
    )
    expect(Fields).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        rootName: 'directors',
        index: 1,
        isLast: true
      }),
      {}
    )
  })
})

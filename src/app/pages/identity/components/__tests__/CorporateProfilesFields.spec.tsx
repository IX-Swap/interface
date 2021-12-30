import React from 'react'
import { render } from 'test-utils'
import { IndividualInfoFields } from 'app/pages/identity/components/IndividualInfoFields/IndividualInfoFields'
import {
  CorporateProfilesFields,
  CorporateProfilesFieldsProps
} from 'app/pages/identity/components/CorporateProfilesFields'
import { Form } from 'components/form/Form'

jest.mock(
  'app/pages/identity/components/IndividualInfoFields/IndividualInfoFields',
  () => ({
    IndividualInfoFields: jest.fn(() => null)
  })
)

describe('CorporateProfiles', () => {
  const props: CorporateProfilesFieldsProps = {
    title: 'Test title',
    type: 'representatives'
  }
  const defaultValues = { [props.type]: [] }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders IndividualInfoFields for every element in field array', () => {
    const values = { [props.type]: [{}, {}, {}] }
    render(
      <Form defaultValues={values}>
        <CorporateProfilesFields {...props} />
      </Form>
    )

    expect(IndividualInfoFields).toHaveBeenCalledTimes(3)
    values[props.type].forEach((item, n) => {
      expect(IndividualInfoFields).toHaveBeenNthCalledWith(
        n + 1,
        {
          rootName: `${props.type}[${n}]`
        },
        {}
      )
    })
  })

  it('renders IndividualInfoFields once by inserting empty element if array is empty', () => {
    render(
      <Form defaultValues={defaultValues}>
        <CorporateProfilesFields {...props} />
      </Form>
    )

    expect(IndividualInfoFields).toHaveBeenCalledTimes(1)
    expect(IndividualInfoFields).toHaveBeenCalledWith(
      {
        rootName: `${props.type}[0]`
      },
      {}
    )
  })
})

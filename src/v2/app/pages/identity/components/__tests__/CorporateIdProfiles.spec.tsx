/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import UserInfoComponent from 'v2/app/pages/identity/components/UserInfo'
import {
  CorporateProfiles,
  CorporateProfilesProps
} from 'v2/app/pages/identity/components/CorporateIdProfiles'
import { Form } from 'v2/components/form/Form'

jest.mock('v2/app/pages/identity/components/UserInfo', () =>
  jest.fn(() => null)
)

describe('CorporateProfiles', () => {
  const props: CorporateProfilesProps = {
    title: 'Test title',
    type: 'representatives',
    isEditing: false
  }
  const defaultValues = { [props.type]: [] }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form defaultValues={defaultValues}>
        <CorporateProfiles {...props} />
      </Form>
    )
  })

  it('renders UserInfoComponent for every element in field array', () => {
    const values = { [props.type]: [{}, {}, {}] }
    render(
      <Form defaultValues={values}>
        <CorporateProfiles {...props} />
      </Form>
    )

    expect(UserInfoComponent).toHaveBeenCalledTimes(3)
    values[props.type].forEach((item, n) => {
      expect(UserInfoComponent).toHaveBeenNthCalledWith(
        n + 1,
        {
          rootPath: `${props.type}[${n}]`,
          useOwnEmail: false,
          isEditing: props.isEditing
        },
        {}
      )
    })
  })

  it('renders UserInfoComponent once by inserting empty element if array is empty', () => {
    render(
      <Form defaultValues={defaultValues}>
        <CorporateProfiles {...props} />
      </Form>
    )

    expect(UserInfoComponent).toHaveBeenCalledTimes(1)
    expect(UserInfoComponent).toHaveBeenCalledWith(
      {
        rootPath: `${props.type}[0]`,
        useOwnEmail: false,
        isEditing: props.isEditing
      },
      {}
    )
  })
})

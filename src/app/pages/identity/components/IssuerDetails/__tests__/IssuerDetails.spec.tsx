import { IssuerDetails } from 'app/pages/identity/components/IssuerDetails/IssuerDetails'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'

describe('IssuerDetails', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <Form>
        <IssuerDetails />
      </Form>
    )
  })

  it('renders correct fields', () => {
    const { getByLabelText } = render(
      <Form>
        <IssuerDetails />
      </Form>
    )

    expect(getByLabelText('Full Name')).toBeTruthy()
    expect(getByLabelText('Company Name')).toBeTruthy()
    expect(getByLabelText('Registration Number / UEN')).toBeTruthy()
    expect(getByLabelText('Contact Number - (optional)')).toBeTruthy()
    expect(getByLabelText('Email Address')).toBeTruthy()
    expect(getByLabelText('Industry')).toBeTruthy()
    expect(getByLabelText('Fundraising Amount')).toBeTruthy()
    expect(getByLabelText('Details of Issuance')).toBeTruthy()
  })
})

import { IssuerDetails } from 'app/pages/_identity/components/IssuerDetails/IssuerDetails'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('IssuerDetails', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
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
    expect(getByLabelText('Detail of Issuance')).toBeTruthy()
  })
})

/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  SupportingDocuments,
  SupportingDocumentsProps
} from 'v2/app/components/SupportingDocuments'
import { documents } from '__fixtures__/identity'
import { AuthorizationDocument } from 'v2/app/pages/authorizer/components/AuthorizationDocument'

jest.mock('v2/app/pages/authorizer/components/AuthorizationDocument', () => ({
  AuthorizationDocument: jest.fn(() => null)
}))

describe('SupportingDocuments', () => {
  const props: SupportingDocumentsProps = { data: documents }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<SupportingDocuments {...props} />)
  })

  it('renders AuthorizationDocument with correct props', () => {
    render(<SupportingDocuments {...props} />)

    expect(AuthorizationDocument).toHaveBeenCalledTimes(props.data.length)
    props.data.forEach((item, index) => {
      expect(AuthorizationDocument).toHaveBeenNthCalledWith(
        index + 1,
        {
          value: item
        },
        {}
      )
    })
  })
})

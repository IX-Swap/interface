import { fireEvent } from '@testing-library/react'
import {
  AuthorizedPersonnel,
  AuthorizedPersonnelProps
} from 'app/pages/identity/components/CorporateInformationForm/AuthorizedPersonnel/AuthorizedPersonnel'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'

describe('AuthorizedPersonnel', () => {
  const appendMock = jest.fn()
  const removeMock = jest.fn()

  const props: AuthorizedPersonnelProps = {
    fieldId: '123',
    rootName: 'representatives',
    index: 0,
    append: appendMock,
    remove: removeMock,
    isLast: true,
    total: 1,
    max: 5,
    defaultValue: {} as any
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <Form>
        <AuthorizedPersonnel {...props} />
      </Form>
    )
  })

  it('handles append buttons correctly', () => {
    const { getByText } = render(
      <Form>
        <AuthorizedPersonnel {...props} />
      </Form>
    )

    const addMoreButton = getByText('Add more') as HTMLButtonElement
    fireEvent.click(addMoreButton, { cancellable: true, bubbles: true })
    expect(appendMock).toHaveBeenCalled()
  })

  it('handles remove buttons correctly', () => {
    props.total = 2

    const { getByText } = render(
      <Form>
        <AuthorizedPersonnel {...props} />
      </Form>
    )

    const deleteButton = getByText('Delete') as HTMLButtonElement
    fireEvent.click(deleteButton, { cancellable: true, bubbles: true })
    expect(removeMock).toHaveBeenCalled()
  })
})

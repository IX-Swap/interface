import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DirectorsFields,
  DirectorsFieldsProps
} from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/DirectorsFields'
import { Form } from 'components/form/Form'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { fireEvent } from '@testing-library/react'

jest.mock(
  'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/DocumentsFields',
  () => ({
    DocumentFields: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/DirectorsInformationFields',
  () => ({
    DirectorsInformationFields: jest.fn(() => null)
  })
)

jest.mock('app/pages/identity/components/FormSectionHeader', () => ({
  FormSectionHeader: jest.fn(() => null)
}))

describe('DirectorsFields', () => {
  const mockAppend = jest.fn()
  const mockRemove = jest.fn()

  const props: DirectorsFieldsProps = {
    rootName: 'directors',
    index: 0,
    fieldId: '123',
    append: mockAppend,
    remove: mockRemove,
    isLast: true,
    total: 1,
    max: 5
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <DirectorsFields {...props} />
      </Form>
    )
  })

  it('does not render FormSectionHeader when index = 0', () => {
    render(
      <Form>
        <DirectorsFields {...props} />
      </Form>
    )

    expect(FormSectionHeader).not.toHaveBeenCalled()
  })

  it('render FormSectionHeader when index > 0', () => {
    render(
      <Form>
        <DirectorsFields {...props} index={1} />
      </Form>
    )

    expect(FormSectionHeader).toHaveBeenCalledWith(
      {
        title: '(2) Directors/Partners/People with Executive Authority',
        variant: 'subsection'
      },
      {}
    )
  })

  it('handle Add more button correctly', () => {
    const { getByText } = render(
      <Form>
        <DirectorsFields {...props} />
      </Form>
    )

    const addMoreButton = getByText('Add more') as HTMLButtonElement
    fireEvent.click(addMoreButton, { bubbles: true, cancellable: true })

    expect(mockAppend).toHaveBeenCalled()
  })

  it('handles Delete button correctly', () => {
    const { getByText } = render(
      <Form>
        <DirectorsFields {...props} index={1} isLast={false} total={5} />
      </Form>
    )

    const deleteButton = getByText('Delete') as HTMLButtonElement
    expect(deleteButton).toBeInTheDocument()

    fireEvent.click(deleteButton, { bubbles: true, cancellable: true })
    expect(mockRemove).toHaveBeenCalledWith(1)
  })
})

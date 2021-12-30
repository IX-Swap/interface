import React from 'react'
import { render } from 'test-utils'
import { Form } from 'components/form/Form'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { fireEvent } from '@testing-library/react'
import {
  Fields,
  FieldsProps
} from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/Fields'

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

describe('Fields', () => {
  const mockAppend = jest.fn()
  const mockRemove = jest.fn()

  const props: FieldsProps = {
    rootName: 'directors',
    index: 0,
    fieldId: '123',
    append: mockAppend,
    remove: mockRemove,
    isLast: true,
    total: 1,
    max: 5,
    sectionTitle: 'Directors',
    informationFields: <></>,
    defaultValue: {} as any
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <Form>
        <Fields {...props} />
      </Form>
    )
  })

  it('render FormSectionHeader when index > 0', () => {
    render(
      <Form>
        <Fields {...props} index={1} />
      </Form>
    )

    expect(FormSectionHeader).toHaveBeenCalledWith(
      {
        title: '(2) Directors',
        variant: 'subsection'
      },
      {}
    )
  })

  it('handle Add more button correctly', () => {
    const { getByText } = render(
      <Form>
        <Fields {...props} />
      </Form>
    )

    const addMoreButton = getByText('Add more') as HTMLButtonElement
    fireEvent.click(addMoreButton, { bubbles: true, cancellable: true })

    expect(mockAppend).toHaveBeenCalled()
  })

  it('handles Delete button correctly', () => {
    const { getByText } = render(
      <Form>
        <Fields {...props} index={1} isLast={false} total={5} />
      </Form>
    )

    const deleteButton = getByText('Delete') as HTMLButtonElement
    expect(deleteButton).toBeInTheDocument()

    fireEvent.click(deleteButton, { bubbles: true, cancellable: true })
    expect(mockRemove).toHaveBeenCalledWith(1)
  })
})

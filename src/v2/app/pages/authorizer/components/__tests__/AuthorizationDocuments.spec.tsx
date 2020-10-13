/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  AuthorizationDocuments,
  AuthorizationDocumentsProps
} from 'v2/app/pages/authorizer/components/AuthorizationDocuments'
import { document } from '__fixtures__/identity'
import { DataroomFeature } from 'v2/types/authorizer'
import * as useTypedFormHook from 'v2/components/form/useTypedForm'
import { useTypedForm } from '__fixtures__/createTypedForm'
import { Dataroom } from 'v2/app/pages/identity/components/dataroom/Dataroom'
import { DataroomFileType } from 'v2/components/form/DataroomFileTypeSelect'

jest.mock('v2/app/pages/identity/components/dataroom/Dataroom', () => ({
  Dataroom: jest.fn(({ children }) =>
    children({
      items: [<div data-testid='item1' />],
      addButton: <div data-testid='addButton' />
    })
  )
}))

describe('AuthorizationDocuments', () => {
  const props: AuthorizationDocumentsProps = {
    documents: [document],
    feature: DataroomFeature['bank-accounts'],
    resourceId: 'testResourceId'
  }
  const DataroomFileTypeSelect = jest.fn(() => null)
  const FormValue = jest.fn(({ children }) => children())
  const Form = jest.fn(({ children }) => children)

  beforeEach(() => {
    jest.spyOn(useTypedFormHook, 'useTypedForm').mockReturnValue({
      ...useTypedForm(),
      DataroomFileTypeSelect,
      FormValue,
      Form
    })
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<AuthorizationDocuments {...props} />)
  })

  it('renders DataroomFileTypeSelect with correct props', () => {
    render(<AuthorizationDocuments {...props} />)

    expect(DataroomFileTypeSelect).toHaveBeenCalledTimes(1)
    expect(DataroomFileTypeSelect).toHaveBeenCalledWith(
      {
        formControlProps: {
          style: {
            minWidth: 200
          }
        },
        label: 'Document type',
        name: 'documentType'
      },
      {}
    )
  })

  it('renders FormValue with correct props ', () => {
    render(<AuthorizationDocuments {...props} />)

    expect(FormValue).toHaveBeenCalledTimes(1)
    expect(FormValue).toHaveBeenCalledWith(
      { children: expect.any(Function), name: 'documentType' },
      {}
    )
  })

  it('renders Form with correct props  ', () => {
    render(<AuthorizationDocuments {...props} />)

    expect(Form).toHaveBeenCalledTimes(1)
    expect(Form).toHaveBeenCalledWith(
      {
        children: expect.anything(),
        defaultValues: {
          documentType: DataroomFileType.SupportingDocument,
          documents: [
            {
              document,
              label: '',
              title: '',
              type: ''
            }
          ]
        }
      },
      {}
    )
  })

  it('renders Dataroom with correct props ', () => {
    render(<AuthorizationDocuments {...props} />)

    expect(Dataroom).toHaveBeenCalledTimes(1)
    expect(Dataroom).toHaveBeenCalledWith(
      expect.objectContaining({
        children: expect.any(Function),
        editable: true,
        multiple: true,
        isEditing: true,
        direction: 'row'
      }),
      {}
    )
  })
})

/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DSOSubscriptionAndDocuments,
  DSOSubscriptionAndDocumentsProps
} from 'v2/app/components/DSO/components/DSOSubscriptionAndDocuments'
import { Form } from 'v2/components/form/Form'
import { useTypedForm } from '__fixtures__/createTypedForm'
import * as dsoForm from 'v2/app/components/DSO/DSOForm'
import { documentValueExtractor } from 'v2/app/components/DSO/utils'

describe('DSOSubscriptionAndDocuments', () => {
  const props: DSOSubscriptionAndDocumentsProps = {
    isEditing: false,
    dsoOwnerId: '',
    dsoId: ''
  }
  const EditableField = jest.fn(() => <div />)

  beforeEach(() => {
    jest
      .spyOn(dsoForm, 'useDSOForm')
      .mockReturnValue({ ...useTypedForm(), EditableField } as any)
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <DSOSubscriptionAndDocuments {...props} />
      </Form>
    )
  })

  it('renders EditableField with correct props', () => {
    render(
      <Form>
        <DSOSubscriptionAndDocuments {...props} />
      </Form>
    )

    expect(EditableField).toHaveBeenCalledTimes(1)
    expect(EditableField).toHaveBeenCalledWith(
      {
        fieldType: 'DataroomDocument',
        isEditing: props.isEditing,
        label: 'Subscription & Documents',
        name: 'subscriptionDocument',
        documentInfo: {
          title: 'Subscription Document',
          type: 'Subscription Document'
        },
        canDelete: false,
        valueExtractor: documentValueExtractor,
        viewRenderer: expect.anything()
      },
      {}
    )
  })
})

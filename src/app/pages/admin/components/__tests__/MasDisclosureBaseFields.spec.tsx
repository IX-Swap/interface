import * as React from 'react'
import { render, cleanup } from 'test-utils'
import { TypedField } from 'components/form/TypedField'
import { MasDisclosureBaseFields } from 'app/pages/admin/components/MasDisclosureBaseFields'
import { RichTextEditor } from 'components/form/RichTextEditor'
import { wysiwygValueExtractor } from 'helpers/forms'
import { Form } from 'components/form/Form'
import { fireEvent, waitFor } from '@testing-library/dom'
import * as useFormContext from 'react-hook-form'
import * as useGetSiteConfig from 'app/pages/exchange/hooks/useGetSiteConfig'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'

jest.mock('components/form/TypedField', () => ({
  TypedField: jest.fn(() => <input />)
}))

jest.mock('app/components/LoadingIndicator/LoadingIndicator', () => ({
  LoadingIndicator: jest.fn(() => <input />)
}))

describe('MasDisclosureBaseFields', () => {
  const setIsDialogOpen = jest.fn()
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <MasDisclosureBaseFields />
      </Form>
    )
  })

  it('renders when useGetSiteConfig isLoading is true', async () => {
    jest
      .spyOn(useGetSiteConfig, 'useGetSiteConfig')
      .mockImplementation(() => ({ isLoading: true } as any))
    render(
      <Form>
        <MasDisclosureBaseFields />
      </Form>
    )

    expect(LoadingIndicator).toHaveBeenCalledTimes(1)
  })

  it('renders editable field correctly', () => {
    jest.spyOn(useGetSiteConfig, 'useGetSiteConfig').mockImplementation(
      () =>
        ({
          masDisclosure: 'test',
          hasReadMasDisclosure: true
        } as any)
    )
    render(
      <Form>
        <MasDisclosureBaseFields />
      </Form>
    )

    expect(TypedField).toHaveBeenCalledTimes(1)
    expect(TypedField).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'content',
        component: RichTextEditor,
        customRenderer: true,
        valueExtractor: wysiwygValueExtractor
      }),
      {}
    )
  })

  it('calls setIsDialogOpen hook on update button click', async () => {
    const control = jest.fn()
    const watch = jest.fn().mockImplementation(() => 'test')
    jest
      .spyOn(useGetSiteConfig, 'useGetSiteConfig')
      .mockImplementation(
        () => ({ masDisclosure: 'test', hasReadMasDisclosure: true } as any)
      )
    jest
      .spyOn(useFormContext, 'useFormContext')
      .mockImplementation(() => ({ control: control, watch: watch } as any))
    jest
      .spyOn(React, 'useState')
      .mockImplementation(() => [false, setIsDialogOpen])
    const { getByText } = render(
      <Form>
        <MasDisclosureBaseFields />
      </Form>
    )

    const updateButton = getByText('Update')
    fireEvent.click(updateButton)
    await waitFor(() => {
      expect(setIsDialogOpen).toBeCalledWith(true)
    })
  })
})

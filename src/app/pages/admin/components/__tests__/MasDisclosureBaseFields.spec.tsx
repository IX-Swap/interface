import * as React from 'react'
import { render } from 'test-utils'
import { TypedField } from 'components/form/TypedField'
import { MasDisclosureBaseFields } from 'app/pages/admin/components/MasDisclosureBaseFields'
import { RichTextEditor } from 'components/form/RichTextEditor'
import { wysiwygValueExtractor } from 'helpers/forms'
import { Form } from 'components/form/Form'
import { fireEvent } from '@testing-library/dom'
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
  afterEach(async () => {
    jest.clearAllMocks()
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

  it('opens dialog when the button is clicked', async () => {
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

    const { getByText, getByTestId } = render(
      <Form>
        <MasDisclosureBaseFields />
      </Form>
    )

    const updateButton = getByText('Update')
    fireEvent.click(updateButton)

    expect(getByTestId('mas-disclosure-dialog')).toBeInTheDocument()
  })
})

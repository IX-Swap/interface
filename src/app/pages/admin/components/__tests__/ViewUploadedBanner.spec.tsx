import { fireEvent } from '@testing-library/react'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'
import { document } from '__fixtures__/identity'
import { generateMutationResult } from '__fixtures__/useQuery'
import * as useDownloadRawBanner from 'app/pages/admin/hooks/useDownloadRawBanner'
import { ViewUploadedBanner } from 'app/pages/admin/components/ViewUploadedBanner'

describe('ViewUploadedBanner', () => {
  const mutateFn = jest.fn()

  beforeEach(() => {
    jest
      .spyOn(useDownloadRawBanner, 'useDownloadRawBanner')
      .mockImplementation(
        () =>
          [
            mutateFn,
            generateMutationResult({ data: {}, isLoading: false })
          ] as any
      )
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <Form>
        <ViewUploadedBanner bannerId={document._id} />
      </Form>
    )
  })

  it('handles download correctly', () => {
    const { container } = render(
      <Form>
        <ViewUploadedBanner bannerId={document._id} />
      </Form>
    )

    const downloadButton = container.querySelector(
      'button'
    ) as HTMLButtonElement
    fireEvent.click(downloadButton, { bubbles: true, cancellable: true })
    expect(mutateFn).toHaveBeenCalled()
  })
})

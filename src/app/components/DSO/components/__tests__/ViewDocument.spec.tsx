import React from 'react'
import { render } from 'test-utils'
import {
  ViewDocument,
  ViewDocumentProps
} from 'app/components/DSO/components/ViewDocument'
import * as rawDocumentHook from 'hooks/useRawDocument'
import * as utils from 'hooks/utils'
import { generateQueryResult } from '__fixtures__/useQuery'

describe('ViewDocument', () => {
  const props: ViewDocumentProps = {
    children: jest.fn(() => <div />),
    documentId: '',
    ownerId: ''
  }
  const convertBlobToFile = jest.fn()
  const createObjectURLFromFile = jest.fn()
  const revokeObjectURL = jest.fn()

  beforeEach(() => {
    jest.spyOn(utils, 'convertBlobToFile').mockImplementation(convertBlobToFile)
    jest
      .spyOn(utils, 'createObjectURLFromFile')
      .mockImplementation(createObjectURLFromFile)
    jest.spyOn(utils, 'revokeObjectURL').mockImplementation(revokeObjectURL)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<ViewDocument {...props}>{props.children}</ViewDocument>)
  })

  it('invokes convertBlobToFile if data is defined', () => {
    jest.spyOn(rawDocumentHook, 'useRawDocument').mockReturnValue(
      generateQueryResult({
        data: { data: {} }
      })
    )
    render(<ViewDocument {...props}>{props.children}</ViewDocument>)

    expect(convertBlobToFile).toHaveBeenCalledTimes(1)
    expect(convertBlobToFile).toHaveBeenCalledWith({}, '')
  })
})

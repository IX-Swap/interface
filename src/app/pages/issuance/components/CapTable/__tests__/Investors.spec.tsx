import { Investors } from 'app/pages/issuance/components/CapTable/Investors'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { generateQueryResult } from '__fixtures__/useQuery'
import * as useDSOById from 'app/pages/invest/hooks/useDSOById'
import { dso } from '__fixtures__/authorizer'

jest.mock('components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => null)
}))

describe('Investors', () => {
  beforeEach(() => {
    const objResponse = generateQueryResult({ data: dso })
    jest
      .spyOn(useDSOById, 'useDSOById')
      .mockImplementation(() => objResponse as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', async () => {
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useParams: () => ({
        dsoId: '1',
        issuerId: '2'
      })
    }))

    render(<Investors />)
  })

  it('renders null when data is undefined', () => {
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useParams: () => ({
        dsoId: '1',
        issuerId: '2'
      })
    }))

    const objResponse = generateQueryResult({ data: undefined })
    jest
      .spyOn(useDSOById, 'useDSOById')
      .mockImplementation(() => objResponse as any)

    const { container } = render(<Investors />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders null when isLoading', () => {
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useParams: () => ({
        dsoId: '1',
        issuerId: '2'
      })
    }))

    const objResponse = generateQueryResult({ data: dso, isLoading: true })
    jest
      .spyOn(useDSOById, 'useDSOById')
      .mockImplementation(() => objResponse as any)

    const { container } = render(<Investors />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders null when dsoid is undefined', () => {
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useParams: () => ({
        dsoId: undefined,
        issuerId: '2'
      })
    }))

    const objResponse = generateQueryResult({ data: dso, isLoading: true })
    jest
      .spyOn(useDSOById, 'useDSOById')
      .mockImplementation(() => objResponse as any)

    const { container } = render(<Investors />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders null when issuerId is undefined', () => {
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useParams: () => ({
        dsoId: '1',
        issuerId: undefined
      })
    }))

    const objResponse = generateQueryResult({ data: dso, isLoading: true })
    jest
      .spyOn(useDSOById, 'useDSOById')
      .mockImplementation(() => objResponse as any)

    const { container } = render(<Investors />)
    expect(container).toBeEmptyDOMElement()
  })
})

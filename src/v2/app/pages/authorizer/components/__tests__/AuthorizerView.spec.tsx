/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { AuthorizerView } from 'v2/app/pages/authorizer/components/AuthorizerView'
import {
  useAuthorizerView,
  AuthorizerViewReturnValue
} from 'v2/app/pages/authorizer/hooks/useAuthorizerView'
import { Filters } from 'v2/app/pages/authorizer/components/Filters'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import { Preview } from 'v2/app/pages/authorizer/components/Preview'
import { withExtraActions } from 'v2/app/pages/authorizer/components/withExtraActions'

jest.mock('v2/components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => null)
}))
jest.mock('v2/app/pages/authorizer/components/withExtraActions', () => ({
  withExtraActions: jest.fn(() => null)
}))
jest.mock('v2/app/pages/authorizer/components/Filters', () => ({
  Filters: jest.fn(() => null)
}))
jest.mock('v2/app/pages/authorizer/components/Preview', () => ({
  Preview: jest.fn(() => null)
}))
jest.mock('v2/app/pages/authorizer/hooks/useAuthorizerView')

const useBaseViewMock = useAuthorizerView as jest.Mock<
  Partial<ReturnType<typeof useAuthorizerView>>
>

const useBaseViewMockReturnValue: AuthorizerViewReturnValue<any> = {
  filter: {
    status: ''
  },
  setFilter: jest.fn(),
  isViewing: false,
  item: {},
  setItem: jest.fn(),
  getColumns: jest.fn(() => []),
  onBack: jest.fn()
}

describe('AuthorizerView', () => {
  const props = {
    title: 'Banks',
    name: 'Bank Account(s)',
    uri: '/some/uri',
    columns: [],
    renderView: jest.fn()
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders preview if in viewing mode', async () => {
    useBaseViewMock.mockReturnValueOnce({
      ...useBaseViewMockReturnValue,
      isViewing: true
    })

    render(<AuthorizerView {...props} />)

    expect(Preview).toHaveBeenCalledTimes(1)
    expect(props.renderView).toHaveBeenCalledTimes(1)
    expect(props.renderView).toHaveBeenCalledWith(
      useBaseViewMockReturnValue.item
    )
  })

  it('renders as expected in normal mode', async () => {
    useBaseViewMock.mockReturnValueOnce(useBaseViewMockReturnValue)

    const { getByText } = render(<AuthorizerView {...props} />)
    const title = getByText(props.title)

    expect(title).toBeTruthy
    expect(Filters).toHaveBeenCalledTimes(1)
    expect(TableView).toHaveBeenCalledTimes(1)
  })

  it('passes result of calling withExtraActions to the table', async () => {
    useBaseViewMock.mockReturnValueOnce(useBaseViewMockReturnValue)

    render(<AuthorizerView {...props} />)

    expect(withExtraActions).toHaveBeenCalledTimes(1)
    expect(withExtraActions).toHaveBeenCalledWith({
      onView: useBaseViewMockReturnValue.setItem
    })
    expect(TableView).toHaveBeenCalledWith(
      {
        name: props.name,
        uri: props.uri,
        columns: props.columns,
        filter: useBaseViewMockReturnValue.filter,
        actions: null,
        hasActions: true
      },
      {}
    )
  })
})

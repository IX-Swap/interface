import React from 'react'
import { renderHook, cleanup, act } from '@testing-library/react-hooks'
import {
  initialFilterValue,
  renderStatusColumn,
  statusColumn,
  useAuthorizerView
} from 'v2/app/authorizer/hooks/useAuthorizerView'
import { AuthorizerTableStoreProvider } from 'v2/app/authorizer/context'
import { BaseFilter } from 'v2/types/util'
import { StatusColumn } from 'v2/app/authorizer/components/StatusColumn'

describe('useAuthorizerView', () => {
  const hookArgs = { columns: [], idKey: '__', uri: '/uri/' }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('has correct default values', () => {
    const {
      result: { current }
    } = renderHook(() => useAuthorizerView(hookArgs))

    expect(current.item).toBeUndefined()
    expect(current.isViewing).toBeFalsy()
    expect(current.onBack).toBeDefined()
    expect(current.getColumns).toBeDefined()
    expect(current.setFilter).toBeDefined()
    expect(current.setItem).toBeDefined()
    expect(current.filter).toEqual(initialFilterValue)
  })

  it('calls setUri and setIdKeu on the AuthorizerTableStore with provided values', () => {
    const actions = {
      setUri: jest.fn(),
      setIdKey: jest.fn()
    }

    renderHook(() => useAuthorizerView(hookArgs), {
      wrapper: AuthorizerTableStoreProvider,
      initialProps: {
        value: actions
      }
    })

    expect(actions.setIdKey).toHaveBeenCalledTimes(1)
    expect(actions.setIdKey).toHaveBeenCalledWith(hookArgs.idKey)

    expect(actions.setUri).toHaveBeenCalledTimes(1)
    expect(actions.setUri).toHaveBeenCalledWith(hookArgs.uri)
  })

  it('sets item to provided payload and to undefined if called with no arguments and updates isViewing state accordingly', () => {
    const item = { id: 1 }
    const { result } = renderHook(() => useAuthorizerView(hookArgs))

    // eslint-disable-next-line no-void
    void act(() => {
      result.current.setItem(item)
    })

    expect(result.current.item).toEqual(item)
    expect(result.current.isViewing).toBeTruthy

    // eslint-disable-next-line no-void
    void act(() => {
      result.current.setItem()
    })

    expect(result.current.item).toEqual(undefined)
    expect(result.current.isViewing).toBeFalsy()
  })

  it('sets filter to provided payload', () => {
    const { result } = renderHook(() => useAuthorizerView(hookArgs))
    const filter: Partial<BaseFilter> = {
      from: '13-04-1999',
      to: '10-08-2011'
    }

    // eslint-disable-next-line no-void
    void act(() => {
      result.current.setFilter(filter)
    })

    expect(result.current.filter).toEqual({ ...initialFilterValue, ...filter })
  })

  it('return columns and additional statusColumn if status is "Submitted"', () => {
    const { result } = renderHook(() => useAuthorizerView(hookArgs))
    let columns = result.current.getColumns()

    expect(columns).toEqual(hookArgs.columns)

    // eslint-disable-next-line no-void
    void act(() => {
      result.current.setFilter({ status: 'Submitted' })
    })

    columns = result.current.getColumns()
    expect(columns).toEqual([...hookArgs.columns, statusColumn])
  })

  it('sets viewing status to false after onBack has been called', () => {
    const item = { id: 1 }
    const { result } = renderHook(() => useAuthorizerView(hookArgs))

    // eslint-disable-next-line no-void
    void act(() => {
      result.current.setItem(item)
    })

    // eslint-disable-next-line no-void
    void act(() => {
      result.current.onBack()
    })

    expect(result.current.isViewing).toBeFalsy()
  })

  it('renders StatusColumn component as expected', () => {
    const status = 'Approved'
    const statusColumn = renderStatusColumn(status)

    expect(statusColumn).toEqual(<StatusColumn status={status} />)
  })
})

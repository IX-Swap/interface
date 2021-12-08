import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import generateStoreHookAndProvider from 'helpers/generateStoreHookAndProvider'

describe('generateStoreHookAndProvider', () => {
  it('generates useStore hook and Provider correctly so that generated hook consumes correct context value', () => {
    const store = { action: jest.fn(), value: true }
    const { useStore: useMyStore, Provider: MyProvider } =
      generateStoreHookAndProvider(store)
    const wrapper: React.FC = ({ children }) => (
      <MyProvider>{children}</MyProvider>
    )
    const {
      result: { current: myStore }
    } = renderHook(() => useMyStore(), { wrapper })

    expect(myStore.action).toBeDefined()
    expect(myStore.value).toBeDefined()
  })
})

import React, { createContext, useContext } from 'react'
import { DeepPartial } from '../types/util'
import merge from 'lodash/merge'

export interface ProviderProps<T> {
  value?: DeepPartial<T>
}

interface GeneratedStoreHookAndProvider<T> {
  Provider: React.FC<ProviderProps<T>>
  useStore: () => T
}

function generateStoreHookAndProvider<T>(
  store: T,
  hookEnhancer?: (context: T) => void
): GeneratedStoreHookAndProvider<T> {
  const StoreContext = createContext<T>(store)

  return {
    Provider: ({ children, value }) => {
      let storeValue = store

      if (value !== undefined) {
        if (
          Object.values(value).some(
            v => typeof v === 'object' || Array.isArray(v)
          )
        ) {
          storeValue = merge(storeValue, { ...value })
        }

        storeValue = { ...storeValue, ...value }
      }

      return (
        <StoreContext.Provider value={storeValue}>
          {children}
        </StoreContext.Provider>
      )
    },
    useStore: () => {
      const context = useContext(StoreContext)

      if (context === undefined) {
        throw new Error(
          'Error'
          // `use${StoreContext.displayName} must be used inside of ${StoreContext.displayName} provider`
        )
      }

      if (typeof hookEnhancer === 'function') {
        hookEnhancer(context)
      }

      return context
    }
  }
}

export default generateStoreHookAndProvider

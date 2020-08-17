import React, { createContext, useContext } from 'react'

interface ProviderProps<T> {
  value?: Partial<T>
}

interface GeneratedStoreHookAndProvider<T> {
  Provider: React.FC<ProviderProps<T>>
  useStore: () => T
}

function generateStoreHookAndProvider<T> (
  store: T,
  hookEnhancer?: (context: T) => void
): GeneratedStoreHookAndProvider<T> {
  const StoreContext = createContext<T>(store)

  return {
    Provider: ({ children, value }) => {
      let storeValue = store

      if (value !== undefined) {
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

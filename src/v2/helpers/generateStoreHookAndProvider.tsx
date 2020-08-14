import React, { createContext, useContext } from 'react'

function generateStoreHookAndProvider<T> (
  store: T,
  hookEnhancer?: (context: T) => void
) {
  const StoreContext = createContext<T>(store)
  const Provider: React.FC = ({ children }) => (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  )
  const useStore = () => {
    const context = useContext(StoreContext)

    if (context === undefined) {
      throw new Error(
        `use${StoreContext.displayName} must be used inside of ${StoreContext.displayName} provider`
      )
    }

    if (hookEnhancer) {
      hookEnhancer(context)
    }

    return context
  }

  return {
    Provider,
    useStore
  }
}

export default generateStoreHookAndProvider

import React, {
  createContext,
  PropsWithChildren,
  Reducer,
  useContext,
  useReducer
} from 'react'

export interface OnboardingDialog {
  message: string[]
  title: string
  action?: string
  actionLabel?: string
  closeLabel?: string
  closeArrow?: boolean
}

interface OnboardingDialogState {
  onboardingNotification?: OnboardingDialog
}

interface OnboardingDialogActionTypes {
  type: 'setOnboardingNotification'
  payload: OnboardingDialogState['onboardingNotification']
}

const OnboardingDialogStateContext = createContext<OnboardingDialogState | null>(
  null
)

interface OnboardingDialogActions {
  setOnboardingNotification: (OnboardingNotification?: OnboardingDialog) => void
}

const OnboardingDialogActionsContext = createContext<OnboardingDialogActions | null>(
  null
)

const initialState: OnboardingDialogState = {
  onboardingNotification: undefined
}

const actionReducer = (
  state: OnboardingDialogState,
  action: OnboardingDialogActionTypes
) => {
  switch (action.type) {
    case 'setOnboardingNotification':
      return {
        ...state,
        onboardingNotification: action.payload
      }

    default:
      throw new Error('Unsupported action')
  }
}

export const OnboardingDialogStateProvider = (
  props: PropsWithChildren<any>
) => {
  const [state, dispatch] = useReducer<
    Reducer<OnboardingDialogState, OnboardingDialogActionTypes>
  >(actionReducer, initialState)
  const actions = {
    setOnboardingNotification: (onboardingNotification?: OnboardingDialog) => {
      dispatch({
        type: 'setOnboardingNotification',
        payload: onboardingNotification
      })
    }
  }

  return (
    <OnboardingDialogStateContext.Provider value={state}>
      <OnboardingDialogActionsContext.Provider value={actions}>
        {props.children}
      </OnboardingDialogActionsContext.Provider>
    </OnboardingDialogStateContext.Provider>
  )
}

export const useOnboardingDialogState = () => {
  const state = useContext(OnboardingDialogStateContext)

  if (state === undefined || state === null) {
    throw new Error(
      'useOnboardingDialogState must be used inside of useOnboardingDialogState'
    )
  }

  return state
}

export const useOnboardingDialogActions = () => {
  const actions = useContext(OnboardingDialogActionsContext)

  if (actions === undefined || actions === null) {
    throw new Error(
      'useOnboardingDialogActions must be used inside of useOnboardingDialogActions'
    )
  }

  return actions
}

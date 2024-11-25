import React, { useEffect, useMemo, useState } from 'react'

import { TransactionActionInfo, TransactionActionState } from 'pages/DexV2/types/transactions'
import { Step, StepState, TransactionAction } from 'pages/DexV2/types'
import HorizSteps from './HorizSteps'
import { BackButton, NavigationButtons, NextButton } from '../Create'

type BalStepAction = {
  label: string
  loadingLabel: string
  pending: boolean
  step: Step
  promise: () => Promise<void>
  isSignAction?: boolean
}

interface ActionStepsProps {
  requiredActions: TransactionActionInfo[]
  primaryActionType: TransactionAction
  disabled?: boolean
  // override action state loading prop and show
  // loading for all steps
  isLoading?: boolean
  // override action state loading label
  // for all steps
  loadingLabel?: string
  goBack: () => void
}

type StepAction = {
  label: string
  loadingLabel: string
  pending: boolean
  step: Step
  promise: () => Promise<void>
  isSignAction?: boolean
}

const defaultActionState: TransactionActionState = {
  init: false,
  confirming: false,
  confirmed: false,
  confirmedAt: '',
}

const ActionSteps: React.FC<ActionStepsProps> = ({
  disabled = false,
  isLoading = false,
  loadingLabel = '',
  requiredActions,
  goBack,
}) => {
  const [currentActionIndex, setCurrentActionIndex] = useState(0)
  const [actionStates, setActionStates] = useState<TransactionActionState[]>([])
  const [actions, setActions] = useState<BalStepAction[]>([])

  function getStepState(actionState: TransactionActionState, index: number): StepState {
    if (currentActionIndex < index) return StepState.Todo
    else if (actionState.confirming) return StepState.Pending
    else if (actionState.init) return StepState.WalletOpen
    else if (actionState.confirmed) return StepState.Success
    return StepState.Active
  }

  async function submit(actionInfo: TransactionActionInfo, state: TransactionActionState): Promise<void> {
    const { action } = actionInfo;
    await action();
    debugger
    // try {
    //   state.init = true;
    //   state.error = null;
    //   const tx = await action();
    //   state.init = false;
    //   state.confirming = true;
    //   if (currentAction.value?.isSignAction) {
    //     handleSignAction(state);
    //     return;
    //   }
    //   if (tx) handleTransaction(tx, state, actionInfo);
    // } catch (error) {
    //   state.init = false;
    //   state.confirming = false;
    //   state.error = formatErrorMsg(error);
    //   captureBalancerException({
    //     error: (error as Error)?.cause || error,
    //     action: props.primaryActionType,
    //     context: { level: 'fatal' },
    //   });
    // }
  }

  const steps = useMemo((): Step[] => actions.map((action) => action.step), [JSON.stringify(actions)])

  const currentAction = useMemo(
    (): BalStepAction | undefined => actions[currentActionIndex],
    [currentActionIndex, JSON.stringify(actions)]
  )

  useEffect(() => {
    const newActionStates = requiredActions.map(() => ({
      ...defaultActionState,
    }))

    const newActions = requiredActions.map((actionInfo, idx) => {
      const actionState = newActionStates[idx]

      return {
        label: actionInfo.label,
        loadingLabel: actionState.init ? actionInfo.loadingLabel : actionInfo.confirmingLabel,
        pending: actionState.init || actionState.confirming,
        isSignAction: actionInfo.isSignAction,
        promise: submit.bind(null, actionInfo, actionState),
        step: {
          tooltip: actionInfo.stepTooltip,
          state: getStepState(actionState, idx),
        },
      }
    })
    setActionStates(newActionStates)
    setActions(newActions)
  }, [JSON.stringify(requiredActions)])

  console.log('steps', steps)
  return (
    <div className="action-steps">
      {actions.length > 1 ? <HorizSteps steps={steps} /> : null}{' '}
      <NavigationButtons>
        <NextButton onClick={() => currentAction?.promise()}>{currentAction?.label}</NextButton>
      </NavigationButtons>
    </div>
  )
}

export default ActionSteps
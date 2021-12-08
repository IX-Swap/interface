import React from 'react'
import { Actions, ActionsProps } from 'app/pages/authorizer/components/Actions'

export type WithExtraActionsProps<T> = ActionsProps<T>

export const withExtraActions =
  <T,>() =>
  (actionsProps: ActionsProps<T>): JSX.Element =>
    <Actions<T> {...actionsProps} />

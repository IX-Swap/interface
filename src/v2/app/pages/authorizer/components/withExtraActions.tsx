import React from 'react'
import {
  Actions,
  ActionsProps
} from 'v2/app/pages/authorizer/components/Actions'

export type WithExtraActionsProps<T> = Pick<ActionsProps<T>, 'onView'>

export const withExtraActions = <T,>(props: WithExtraActionsProps<T>) => (
  actionsProps: ActionsProps<T>
): JSX.Element => <Actions<T> {...actionsProps} {...props} />

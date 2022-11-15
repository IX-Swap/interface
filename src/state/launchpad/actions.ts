import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit'

export const toggleKYCDialog = createAction<{ open: boolean }>('launchpad/toggleKYCDialog')
export const setAllowOnlyAccredited = createAction<{ allowOnlyAccredited: boolean }>('launchpad/setAllowOnlyAccredited')


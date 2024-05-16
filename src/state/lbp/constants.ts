import { LbpStatus } from "components/LBP/types"

export const LBP_ACTION_TYPES = {
  save: 'save',
  submit: 'submit',
}

export const LBP_STAGE_LABELS = [
  { label: 'Coming Soon', value: LbpStatus.pending },
  { label: 'Live', value: LbpStatus.live },
  { label: 'Paused', value: LbpStatus.paused },
  { label: 'Closed', value: LbpStatus.closed },
  { label: 'Ended', value: LbpStatus.ended },
]
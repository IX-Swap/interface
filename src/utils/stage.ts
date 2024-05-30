import { LBP_STAGE_LABELS } from 'state/lbp/constants'

export const getStageLabel = (stage: any) => {
  return LBP_STAGE_LABELS.find((x) => x.value === stage)?.label ?? ''
}
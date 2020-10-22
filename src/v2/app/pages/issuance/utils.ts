import { DSOFormValues, DSORequestArgs } from 'v2/types/dso'
import omit from 'lodash/omit'
import { wysiwygToHtml } from 'v2/helpers/rendering'

export const transformDSOFormValuesToRequestArgs = (
  values: DSOFormValues,
  isUpdating = false
): DSORequestArgs => {
  let dso = omit(values, ['status'])

  if (isUpdating) {
    dso = omit(dso, ['tokenName', 'tokenSymbol', 'issuerName']) as any
  }

  return {
    ...dso,
    businessModel: wysiwygToHtml(dso.businessModel),
    introduction: wysiwygToHtml(dso.introduction),
    useOfProceeds: wysiwygToHtml(dso.useOfProceeds),
    fundraisingMilestone: wysiwygToHtml(dso.fundraisingMilestone),
    team:
      dso.team?.map(({ about, ...rest }) => ({
        ...rest,
        about: wysiwygToHtml(about)
      })) ?? [],
    documents: (dso.documents
      ?.map(d => d.document?._id ?? null)
      .filter(d => d !== null) ?? []) as string[]
  }
}

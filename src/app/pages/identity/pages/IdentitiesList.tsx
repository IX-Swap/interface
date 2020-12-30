import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { IndividualPreview } from 'app/pages/identity/components/IndividualPreview'
import { CorporatePreview } from 'app/pages/identity/components/CorporatePreview'
import { useIndividualIdentity } from 'hooks/identity/useIndividualIdentity'
import { useAllCorporateIdentities } from 'hooks/identity/useAllCorporateIdentities'
import { IdentityDialog } from 'app/pages/identity/components/IdentityDialog'
import { VSpacer } from 'components/VSpacer'

export const IdentityRoot: React.FC = () => {
  const [hasIdentities, setHasIdentities] = useState(true)
  const individualData = useIndividualIdentity()
  const corporatesData = useAllCorporateIdentities()

  useEffect(() => {
    if (
      individualData.status !== 'loading' &&
      individualData.data === undefined &&
      corporatesData.status !== 'loading' &&
      corporatesData.data.list.length === 0
    ) {
      setHasIdentities(false)
    } else {
      setHasIdentities(true)
    }
  }, [
    corporatesData.data,
    corporatesData.status,
    individualData.data,
    individualData.status
  ])

  return (
    <>
      <Grid container direction='column' alignItems='flex-start' spacing={2}>
        <IndividualPreview />
        <VSpacer size='medium' />
        <CorporatePreview />
      </Grid>
      <IdentityDialog
        isOpen={!hasIdentities}
        closeFn={() => setHasIdentities(true)}
      />
    </>
  )
}

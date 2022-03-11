import { Button, Card, CardContent, Grid } from '@mui/material'
import React, { useState } from 'react'
import { TypedField } from 'components/form/TypedField'
import { RichTextEditor } from 'components/form/RichTextEditor'
import { wysiwygValueExtractor } from 'helpers/forms'
import { useFormContext } from 'react-hook-form'
import { VSpacer } from 'components/VSpacer'
import { useGetSiteConfig } from 'app/pages/exchange/hooks/useGetSiteConfig'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { MasDisclosureConfirmDialog } from 'app/pages/admin/components/MasDisclosureConfirmDialog'

export const MasDisclosureBaseFields = () => {
  const { control, watch } = useFormContext()
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const content = watch('content')
  const { data, isLoading } = useGetSiteConfig()
  const isUpdateButtonDisabled = content === data?.masDisclosure

  if (isLoading) {
    return <LoadingIndicator />
  }

  return (
    <Grid item container alignItems={'flex-end'} direction={'column'}>
      <Grid item xs={12} style={{ width: '100%' }}>
        <Card
          variant='outlined'
          style={{ height: 487, width: '100%', overflowY: 'scroll' }}
        >
          <CardContent style={{ width: '100%' }}>
            {/* @ts-expect-error */}
            <TypedField
              control={control}
              component={RichTextEditor}
              customRenderer
              defaultValue={data?.masDisclosure}
              name='content'
              valueExtractor={wysiwygValueExtractor}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <VSpacer size={'small'} />
        <Button
          type={'button'}
          color={'primary'}
          variant={'contained'}
          disabled={isUpdateButtonDisabled}
          onClick={() => setIsDialogOpen(true)}
        >
          Update
        </Button>
      </Grid>
      <MasDisclosureConfirmDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </Grid>
  )
}

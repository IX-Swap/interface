import React from 'react'
import styled from 'styled-components'

import { Plus } from 'react-feather'
import { FieldArray, FormikErrors } from 'formik'

import { ReactComponent as Trash } from 'assets/launchpad/svg/trash-icon.svg'

import { Column, Separator } from 'components/LaunchpadMisc/styled'

import { useGetFieldArrayId } from 'state/launchpad/hooks'

import { AddButton, DeleteButton } from '../../shared/styled'
import { FormField } from '../../shared/fields/FormField'
import { FileField } from '../../shared/fields/FileField'
import { FormGrid } from '../../shared/FormGrid'

import { AdditionalDocument, InformationFormValues } from '../types'

interface Props {
  documents: AdditionalDocument[]
  errors: FormikErrors<InformationFormValues>
  setter: (field: string, value: any) => void
}

export const UploadDocuments: React.FC<Props> = (props) => {
  const getId = useGetFieldArrayId()

  const documents = React.useMemo(() => props.documents as (AdditionalDocument & { id: number })[], [props.documents])

  return (
    <FormGrid title="Upload Documents"> 
      <FieldArray name="additionalDocuments">
        {({ push, handleRemove }) => (
          <>
            {documents.map((document, idx) => (
              <FieldContainer key={`additional-document-${document.id}`}>
                <FormField  
                  borderless 
                  label="Document Name"
                  placeholder='Name'
                  field={`additionalDocuments[${idx}].name`} 
                  setter={props.setter}
                  error={
                    ((props.errors.additionalDocuments?.length ?? 0) > idx &&
                    (props.errors.additionalDocuments?.[idx] as FormikErrors<AdditionalDocument>)?.name) as string
                  }
                  trailing={documents.length > 1 && (
                    <RemoveButton onClick={handleRemove(idx)}>
                      <Trash />
                    </RemoveButton>
                  )}
                />

                <Separator />

                <FileField 
                  borderless
                  label={''} 
                  field={`additionalDocuments[${idx}].file`} 
                  setter={props.setter} 
                  error={
                    ((props.errors.additionalDocuments?.length ?? 0) > idx &&
                    (props.errors.additionalDocuments?.[idx] as FormikErrors<AdditionalDocument>)?.file) as string
                  }
                />
              </FieldContainer>
            ))}

            <AddButton onClick={() => push({ id: getId()})}>
              <Plus /> Add Document
            </AddButton>
          </>
        )}
      </FieldArray>
    </FormGrid>
  )
}

const FieldContainer = styled(Column)`
  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 6px;

  grid-column: span 2;
`

const RemoveButton = styled(DeleteButton)`
  position: absolute;

  right: 1rem;
`
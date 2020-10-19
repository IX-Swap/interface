import React from 'react'
import { DataroomHeader } from 'v2/app/pages/identity/components/dataroom/DataroomHeader'
import { DataroomItem } from 'v2/app/pages/identity/components/dataroom/DataroomItem'
import {
  DataroomAddDocument,
  DataroomAddDocumentInfoProps
} from 'v2/app/pages/identity/components/dataroom/DataroomAddDocument'
import { useTypedForm } from 'v2/components/form/useTypedForm'
import { Maybe } from 'v2/types/util'
import { DataroomViewRow, DataroomViewRowProps } from './DataroomViewRow'
import { DataroomEditRow, DataroomEditRowProps } from './DataroomEditRow'
import { DataroomDocumentProps } from 'v2/components/form/DataroomDocument'
import { Grid, GridDirection } from '@material-ui/core'
import { FieldsArrayRendererProps } from 'v2/components/form/createTypedForm'

export type DataroomViewComponent = (
  props: DataroomViewRowProps
) => Maybe<JSX.Element>

export type DataroomEditComponent = (
  props: DataroomEditRowProps
) => Maybe<JSX.Element>

export interface DataroomProps {
  isEditing: boolean
  name?: string
  editable?: boolean
  multiple?: boolean
  ContainerComponent?: React.ComponentType
  HeaderComponent?: React.ComponentType
  ViewComponent?: DataroomViewComponent
  EditComponent?: DataroomEditComponent
  uploadButton?: JSX.Element
  dataroomDocumentProps?: DataroomDocumentProps
  dataroomAddDocumentProps?: DataroomAddDocumentInfoProps
  direction?: GridDirection
  children?: (
    props: FieldsArrayRendererProps & {
      items: JSX.Element[]
      addButton: JSX.Element
    }
  ) => JSX.Element
}

export const noop = () => {}
export const Noop = () => null

export const Dataroom = (props: DataroomProps): JSX.Element => {
  const {
    isEditing,
    name = 'documents',
    editable = false,
    HeaderComponent = DataroomHeader,
    EditComponent = DataroomEditRow,
    ViewComponent = DataroomViewRow,
    uploadButton,
    direction = 'column',
    dataroomDocumentProps,
    dataroomAddDocumentProps,
    children
  } = props
  const { FieldsArray } = useTypedForm()
  const showAddButton = editable && isEditing

  return (
    <Grid container direction={direction}>
      <FieldsArray name={name}>
        {({ fields, remove, append }) => {
          const items = fields.map((field, index) => (
            <DataroomItem
              name={name}
              key={field.id}
              index={index}
              ViewComponent={ViewComponent}
              EditComponent={EditComponent}
              isEditing={isEditing}
              document={fields[index]}
              removeItem={editable ? remove : noop}
              dataroomDocumentProps={dataroomDocumentProps}
            />
          ))
          const addButton = (
            <DataroomAddDocument
              {...dataroomAddDocumentProps}
              button={uploadButton}
              append={append}
            />
          )

          if (children !== undefined) {
            return children({ fields, append, remove, items, addButton })
          }

          return (
            <>
              {fields.length > 0 && <HeaderComponent />}
              {items}
              {showAddButton && addButton}
            </>
          )
        }}
      </FieldsArray>
    </Grid>
  )
}

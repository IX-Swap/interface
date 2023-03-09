import React from 'react'
import styled, { useTheme } from 'styled-components'
import { Plus, Image } from 'react-feather'
import { ReactComponent as Trash } from 'assets/launchpad/svg/trash-icon.svg'
import { FieldArray, Field, FieldProps } from 'formik'
import { FormGrid } from '../../shared/FormGrid'
import { FileField } from '../../shared/fields/FileField'
import { FormField } from '../../shared/fields/FormField'
import { AddButton, DeleteButton } from '../../shared/styled'
import { TextareaField } from '../../shared/fields/TextareaField'
import { TeamMember } from '../types'
import { getSetter } from '../util'

interface Props {
  members: TeamMember[]
}

export const TeamMembersBlock: React.FC<Props> = ({ members }) => {
  const theme = useTheme()

  return (
    <FormGrid title="Team Members">
      <FieldArray name="members">
        {({ push, remove }) => (
          <>
            {members.map((member, idx) => {
              return (
                <MemberEntry key={idx}>
                  {(members.length > 1 || idx > 0) && (
                    <RemoveButton onClick={() => remove(idx)}>
                      <Trash color={theme.launchpad.colors.text.bodyAlt} />
                    </RemoveButton>
                  )}

                  <Field name={`members.${idx}.photo`}>
                    {({ field: { name, value, onChange }, meta }: FieldProps) => (
                      <FileField
                        field={name}
                        setter={getSetter(onChange)}
                        value={value}
                        error={meta.touched ? meta.error : ''}
                        label="Upload Photo"
                        icon={<Image color={theme.launchpad.colors.text.bodyAlt} size="22" />}
                        optional
                        span={2}
                        showLabelInside
                      />
                    )}
                  </Field>

                  <Field name={`members.${idx}.name`}>
                    {({ field: { name, value, onChange }, meta }: FieldProps) => (
                      <FormField
                        field={name}
                        setter={getSetter(onChange)}
                        value={value}
                        error={meta.touched ? meta.error : ''}
                        label="Full Name"
                        placeholder="Team Member's Name"
                      />
                    )}
                  </Field>

                  <Field name={`members.${idx}.role`}>
                    {({ field: { name, value, onChange }, meta }: FieldProps) => (
                      <FormField
                        field={name}
                        setter={getSetter(onChange)}
                        value={value}
                        error={meta.touched ? meta.error : ''}
                        label="Position"
                        placeholder="Team Member's Position"
                      />
                    )}
                  </Field>

                  <Field name={`members.${idx}.about`}>
                    {({ field: { name, value, onChange }, meta }: FieldProps) => (
                      <TextareaField
                        field={name}
                        setter={getSetter(onChange)}
                        value={value}
                        error={meta.touched ? meta.error : ''}
                        span={2}
                        label="About"
                        placeholder="Short Introduction about your team member"
                      />
                    )}
                  </Field>
                </MemberEntry>
              )
            })}

            {members.length < 6 && (
              <AddButton onClick={() => push({ name: '', role: '', about: '', photo: null })}>
                <Plus color={theme.launchpad.colors.primary} /> Add Member
              </AddButton>
            )}
          </>
        )}
      </FieldArray>
    </FormGrid>
  )
}

const MemberEntry = styled(FormGrid)`
  position: relative;
  grid-column: span 2;
`
const RemoveButton = styled(DeleteButton)`
  position: absolute;
  top: -1rem;
  right: 0;
`

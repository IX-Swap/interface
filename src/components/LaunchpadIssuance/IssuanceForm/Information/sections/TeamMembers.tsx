import React from 'react'
import styled, { useTheme } from 'styled-components'

import { Plus, Image } from 'react-feather'
import { ReactComponent as Trash } from 'assets/launchpad/svg/trash-icon.svg'

import { FieldArray, FormikErrors, FormikTouched} from 'formik'

import { FormGrid } from '../../shared/FormGrid'
import { FileField } from '../../shared/fields/FileField'
import { FormField } from '../../shared/fields/FormField'
import { AddButton, DeleteButton } from '../../shared/styled'
import { TextareaField } from '../../shared/fields/TextareaField'

import { InformationFormValues, TeamMember } from '../types'

import { useGetFieldArrayId } from 'state/launchpad/hooks'

interface Props {
  members: TeamMember[]

  errors: FormikErrors<InformationFormValues>
  touched: FormikTouched<InformationFormValues>

  setter: (field: string, value: any) => void
  touch: (field: string, touched: boolean) => void
}

export const TeamMembersBlock: React.FC<Props> = (props) => {
  const theme = useTheme()
  const getId = useGetFieldArrayId()

  const members = React.useMemo(() => props.members as (TeamMember & { id: number })[], [props.members])

  return (
    <FormGrid title="Team Members">
      <FieldArray name="members">
        {({ push, handleRemove, form }) => (
          <>
            {members.map((member, idx) => (
              <MemberEntry key={`member-${member.id}`}>
                {(members.length > 1 || idx > 0) && (
                  <RemoveButton onClick={handleRemove(idx)}>
                    <Trash color={theme.launchpad.colors.text.bodyAlt} />
                  </RemoveButton>
                )}

                <FileField 
                  field={`members[${idx}].photo`}
                  setter={props.setter} 
                  touch={props.touch}
                  label="Upload Photo" 
                  icon={<Image color={theme.launchpad.colors.text.bodyAlt} size="22" />}
                  optional
                  span={2} 
                  showLabelInside
                  value={member.photo}
                  error={(
                    (props.touched.members?.[idx] as FormikTouched<TeamMember> | undefined)?.photo &&
                    (props.errors.members?.[idx] as FormikErrors<TeamMember> | undefined)?.photo
                  ) as string}
                />

                <FormField 
                  field={`members.${idx}.name`}
                  setter={props.setter}
                  touch={props.touch}
                  label="Full Name"
                  placeholder="Team Member’s Name" 
                  value={member.name}
                  error={(
                    (props.touched.members?.[idx] as FormikTouched<TeamMember> | undefined)?.name &&
                    (props.errors.members?.[idx] as FormikErrors<TeamMember> | undefined)?.name
                  ) as string}
                />

                <FormField 
                  field={`members[${idx}].role`}
                  setter={props.setter}
                  touch={props.touch}
                  label="Position"
                  placeholder="Team Member’s Position"
                  value={member.role}
                  error={(
                    (props.touched.members?.[idx] as FormikTouched<TeamMember> | undefined)?.role &&
                    (props.errors.members?.[idx] as FormikErrors<TeamMember> | undefined)?.role
                  ) as string}
                />

                <TextareaField 
                  span={2}
                  field={`members[${idx}].about`}
                  setter={props.setter}
                  touch={props.touch}
                  label="About"
                  placeholder="Short Introduction about your team member" 
                  value={member.about}
                  error={(
                    (props.touched.members?.[idx] as FormikTouched<TeamMember> | undefined)?.about &&
                    (props.errors.members?.[idx] as FormikErrors<TeamMember> | undefined)?.about
                  ) as string}
                />
              </MemberEntry>
            ))}

            {members.length < 6 && (
              <AddButton onClick={() => push({ id: getId() })}>
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

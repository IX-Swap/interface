import React from 'react'
import { PersonalProfile } from 'v2/types/identity'
import { IndividualInfoView } from 'v2/app/pages/identity/components/IndividualInfoView'
import User from 'v2/types/user'

export interface CorporateProfilesViewProps {
  data: PersonalProfile[]
  user: User
}

export const CorporateProfilesView = (props: CorporateProfilesViewProps) => {
  const { data, user } = props

  return (
    <>
      {data.map((profile, index) => (
        <IndividualInfoView key={index} data={{ ...profile, user }} />
      ))}
    </>
  )
}

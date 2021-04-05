import React from 'react'
import { IndividualInfoView } from 'app/pages/identity/components/IndividualInfoView'
import User from 'types/user'
import { PersonalProfile } from 'app/pages/_identity/types/forms'

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

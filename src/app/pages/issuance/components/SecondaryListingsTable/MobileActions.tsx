import { NewAction } from 'app/pages/authorizer/components/NewAction'
import React from 'react'
import { generatePath, useHistory } from 'react-router-dom'
import { ActionsProps } from './Actions/Actions'
import { ReactComponent as EditIcon } from 'app/pages/issuance/components/SecondaryListingsTable/icons/edit.svg'
import { ReactComponent as LaunchIcon } from 'app/pages/issuance/components/SecondaryListingsTable/icons/view.svg'
import { IssuanceRoute as paths } from 'app/pages/issuance/router/config'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'

export const MobileActions = ({ item }: ActionsProps) => {
  const { user } = useAuth()
  const { push } = useHistory()
  const listingId = item._id
  const issuerId = getIdFromObj(user)

  return (
    <>
      <NewAction
        label='Edit'
        icon={<EditIcon />}
        onClick={() =>
          push({
            pathname: generatePath(paths.editListing, {
              listingId: listingId,
              issuerId: issuerId
            })
          })
        }
      />
      <NewAction
        label='View'
        icon={<LaunchIcon color='disabled' />}
        onClick={() =>
          push({
            pathname: generatePath(paths.viewListing, {
              listingId: listingId
            })
          })
        }
      />
    </>
  )
}

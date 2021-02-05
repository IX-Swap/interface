import { getActivityUserInfo } from '../utils'
import { activity } from '__fixtures__/issuance'
import { getPersonName } from 'helpers/strings'
import { getCorporateLegalName } from 'helpers/tables'

describe('getActivityUserInfo', () => {
  it('returns photo and name of the person if individual identity is present', () => {
    expect(getActivityUserInfo(activity)).toEqual({
      imageId: activity.identity.individual.photo,
      name: getPersonName(activity.identity.individual)
    })
  })

  it('returns company logo and company name of the first corporate identity if corporate identity is present', () => {
    expect(
      getActivityUserInfo({
        ...activity,
        identity: {
          ...activity.identity,
          individual: undefined as any
        }
      })
    ).toEqual({
      imageId: activity.identity.corporates[0].logo,
      name: getCorporateLegalName(activity.identity.corporates[0])
    })
  })

  it('returns imageId and name as empty strings if nor individual nor corporate identity is present', () => {
    expect(
      getActivityUserInfo({
        ...activity,
        identity: {
          individual: undefined as any,
          corporates: []
        }
      })
    ).toEqual({
      imageId: '',
      name: ''
    })
  })
})

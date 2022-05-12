export const useSingPassAuthorise = () => {
  const url = process.env.SING_PASS_AUTH_URL ?? ''
  const clientId = process.env.SING_PASS_CLIENT_ID ?? ''
  const purpose = 'form filling'
  const state = encodeURIComponent('individual')
  const redirectUrl = process.env.SING_PASS_REDIRECT_URL ?? ''
  const attributes =
    'uinfin,name,sex,race,nationality,dob,email,mobileno,regadd,housingtype,hdbtype,marital,edulevel,noa-basic,ownerprivate,cpfcontributions,cpfbalances'

  const authoriseUrl = `${url}?client_id=${clientId}&attributes=${attributes}&purpose=${purpose}&state=${state}&redirect_uri=${redirectUrl}`

  return {
    authoriseUrl
  }
}

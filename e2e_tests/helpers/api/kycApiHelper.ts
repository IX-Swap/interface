const request = require('request');

const apiUrl = `https://api.dev.ixswap.io`;

export const createKycRequest = async (authToken, kycRequestBody) => {
  const options = {
    'method': 'POST',
    'url': `${apiUrl}/v1/newkyc/individual`,
    'headers': {
      'Authorization': `Bearer ${authToken}`
    },
    formData: kycRequestBody
  };
  const res = await request(options, function (error, response) {
    if (error) {
      throw new Error(`Kyc request isn't created - ${response.error}`);
    }
    return response.body
  })
  return res
};

export const approveKycRequest = async (authToken: string, individualKycId, userKycId) => {
  const options = {
    'method': 'POST',
    'url': `${apiUrl}/v1/newkyc/approve/${userKycId}?riskReportId=${individualKycId}&jwt=${authToken}`,
  };
  request(options, function (error, response) {
    if (error){
      throw new Error(`Kyc request isn't approved - ${response.body}`);
    }
  });
};

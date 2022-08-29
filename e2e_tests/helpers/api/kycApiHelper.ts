const { request } = require('@playwright/test');

const apiUrl = `https://api.dev.ixswap.io`;

export const deleteUser = async (userId, authToken) => {
  const requestContext = await request.newContext();
  const deleteUser = await requestContext.delete(`${apiUrl}/v1/users/${userId}?jwt=${authToken}`);
  const responseBody = await deleteUser.json();

  if (!deleteUser.ok()) {
    throw new Error(`Delete user is failed - ${responseBody.error}`);
  }

  await requestContext.dispose();
  return responseBody;
};

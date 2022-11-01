const {request} = require('@playwright/test');

const apiUrl = `https://api.dev.ixswap.io`;

export const deleteUser = async (userId: string, authToken: string) => {
  const requestContext = await request.newContext();
  const deleteUser = await requestContext.delete(`${apiUrl}/v1/users/${userId}?jwt=${authToken}`);
  if (!deleteUser.ok()) {
    throw new Error(`Deleting user is failed`);
  }
  await requestContext.dispose();
};

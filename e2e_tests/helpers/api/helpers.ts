import fetch from 'node-fetch';

const apiUrl: String = `https://reqres.in`;

export const getUsersList = async () => {
  const response = await fetch(`${apiUrl}/api/users?page=2`);

  if (!response.ok) throw new Error(`Getting users list is failed - ${response.status} ${response.statusText}`);

  return await response.text();
};

export const addUser = async (user) => {
  const body = {
    name: user.name,
    job: user.job
  };

  const response = await fetch(`${apiUrl}/api/users`,{
    method: 'post',
    body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json'}
  });

  if (!response.ok) throw new Error(`Adding user is failed - ${response.status} ${response.statusText}`);

  return await response.text();
};

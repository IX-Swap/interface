import { postRequest } from 'services/httpRequests';

export async function uploadFile(payload: {
  title: string,
  type: string,
  file: any,
}) {
  const { title, file, type } = payload;
  try {
    const formData = new FormData();

    formData.append('title', title);
    formData.append('documents', file);
    formData.append('type', type);

    const uri = '/dataroom';
    const result = await postRequest(uri, formData);

    const response = await result.json();
    if (result.status === 200) {
      const data = response.data[0];

      return data;
    }

    return undefined;
  } catch (err) {
    return undefined;
  }
}

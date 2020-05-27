// @flow
import { getRequest } from 'services/httpRequests';
import type { Document } from 'context/dso/types';

// TODO: Move to another place for reusability
export const downloadFile = async (document: Document) => {
  const { user, _id } = document;

  const uri = `/dataroom/raw/${user}/${_id}`;
  const result = await getRequest(uri);

  if (result.status === 200) {
    result.blob().then((blob) => {
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  } else {
    throw new Error('Download Failed.');
  }
};

import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function RedirectHashToPath() {
  const history = useHistory();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#/')) {
      const path = hash.replace('#', '');
      history.replace(path);
    }
  }, [history]);

  return null;
}

export default RedirectHashToPath;

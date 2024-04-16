import React, { useState, useEffect } from 'react';
import Background from 'components/LBP/PublicDetails/Background';
import MiddleSection from 'components/LBP/PublicDetails/MiddleSection';
import { useGetLbp } from 'state/lbp/hooks';
import { LbpFormValues } from 'components/LBP/types';

export default function PublicDetails() {
  const getLbps = useGetLbp();
  const [lbpData, setLbpData] = useState<LbpFormValues | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = extractIdFromUrl(window.location.href);
        const data = await getLbps(id);
        setLbpData(data);
        console.log(data, 'result');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [getLbps]);

  const extractIdFromUrl = (url: string): number => {
    const match = url.match(/\/lbp\/(\d+)/);
    if (match && match[1]) {
      return parseInt(match[1]);
    } else {
      throw new Error('Unable to extract id from URL');
    }
  };

  return (
    <>
      <Background lbpData={lbpData}  />
      <MiddleSection  lbpData={lbpData}  />
    </>
  );
}

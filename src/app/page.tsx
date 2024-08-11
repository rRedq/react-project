'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { DEFAULT_CATEGORY } from 'shared/consts';
import { Paths } from 'shared/types';
import { getLocalState } from 'shared/utils/localState';

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    const category = getLocalState('category') || DEFAULT_CATEGORY;
    const search: string | undefined = getLocalState('search');
    if (search) router.replace(`${Paths.MAIN}${category}?search=${search}`);
    else router.replace(`${Paths.MAIN}${category}`);
  }, []);
  return <></>;
};

export default Home;

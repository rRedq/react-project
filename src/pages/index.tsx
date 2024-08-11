import { DEFAULT_CATEGORY } from 'shared/consts';
import { useEffect } from 'react';
import { getLocalState } from 'shared/utils/localState';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    const category = getLocalState('category') || DEFAULT_CATEGORY;
    const search = getLocalState('search');
    if (search) router.replace(`${category}?search=${search}`);
    else router.replace(category);
  }, []);
  return <></>;
};

export default Home;

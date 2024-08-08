'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { DEFAULT_CATEGORY } from 'shared/consts';
import { Paths } from 'shared/types';
import { getLocalState } from 'shared/utils/localState';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const category = getLocalState('category') || DEFAULT_CATEGORY;
    router.replace(`${Paths.MAIN}${category}`);
  }, []);
  return <></>;
}

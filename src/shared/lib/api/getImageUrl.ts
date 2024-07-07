import { IMAGE_URL } from 'shared/consts';

export const getImageUrl = (value: string): string => {
  const imageIndex = 2;
  const categoryIndex = 3;
  const param: string[] = value.split('/');
  const imageNumber: string = param[param.length - imageIndex];
  const category: string = param[param.length - categoryIndex];

  return `${IMAGE_URL}${category}/${imageNumber}.jpg`;
};

import { IMAGE_URL } from 'shared/consts';

export const getImageUrl = (value: string): string => {
  const param: string[] = value.split('/');
  const imageNumber: string = param[param.length - 2];
  const category: string = param[param.length - 3];

  return `${IMAGE_URL}${category}/${imageNumber}.jpg`;
};

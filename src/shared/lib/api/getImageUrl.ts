import { IMAGE_URL } from '../../consts/urls';

export const getImageUrl = (value: string): string => {
  const param: string[] = value.split('/');
  const imageNumber: string = param[param.length - 2];

  return `${IMAGE_URL}${imageNumber}.jpg`;
};

export const convertUrlToLabel = (url: string): string => {
  const splitedUrl: string[] = url.split('/');
  const lastElem: string = splitedUrl[splitedUrl.length - 1];
  const resultWithExt: string = lastElem.split('?')[0];
  const resultWithoutExt: string = resultWithExt.split('.')[0];

  return resultWithoutExt;
};

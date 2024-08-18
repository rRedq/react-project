export const convertImage = (file: File | undefined): Promise<string> => {
  return new Promise((resolve) => {
    if (!file) return resolve('');
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result?.toString() || '');
    };
  });
};

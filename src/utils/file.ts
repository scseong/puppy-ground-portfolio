export const getImagePreview = (file: File | string) => {
  if (!file) return;
  if (typeof file === 'string') return file;
  return URL.createObjectURL(file);
};

export const isFileSizeExceeded = (file: File, limit: number) => {
  if (file.size > limit) return true;
  return false;
};

export const isDuplicateImage = (files: (File | string)[], newFile: File) => {
  return files.some((file) => {
    if (typeof file === 'string') return false;
    return file.name === newFile.name;
  });
};

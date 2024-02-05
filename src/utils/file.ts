export const getImagePreview = (file: File) => {
  if (!file) return;
  return URL.createObjectURL(file);
};

export const isFileSizeExceeded = (file: File, limit: number) => {
  if (file.size > limit) return true;
  return false;
};

export const isDuplicateImage = (files: File[], newFile: File) => {
  return files.some((file) => file.name === newFile.name);
};

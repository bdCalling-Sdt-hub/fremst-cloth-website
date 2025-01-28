export const getImageUrl = (src: string) => {
  if (src?.startsWith("http")) {
    return src;
  }
  return `${process.env.NEXT_PUBLIC_BASE_URL}/${src}`;
};

export const usePrice = (value) => {
  return value?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

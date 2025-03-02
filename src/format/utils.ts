import dayjs from "dayjs";

export const numberWithComma = (num: number): string => {
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const formatUpdatedAt = (isoString: string): string => {
  return dayjs(isoString).format("DD/MM/YYYY HH:mm:ss");
};

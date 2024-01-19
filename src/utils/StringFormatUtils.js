import dayjs from "dayjs";

const formatDate = (millis) => {
  const dateTime = dayjs(millis);
  return dateTime.format("DD-MM-YYYY hh:mma");
};

const formatTemp = (value, isCelsius = true) => {
  return `${Math.round(value)}\u00b0${isCelsius ? "C" : "F"}`;
};

const formatToPascalCase = (string) => {
  return string.replace(/(\w)(\w*)/g, (_g0, g1, g2) => {
    return g1.toUpperCase() + g2.toLowerCase();
  });
};

const formatToPercent = (value) => {
  return `${Math.round(value)}\u0025`;
};

export { formatDate, formatTemp, formatToPascalCase, formatToPercent };

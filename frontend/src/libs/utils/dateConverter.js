export function convertGMTDate(data) {
   const timestamp = data;
   const date = new Date(timestamp);
   const humanReadableTime = date.toLocaleString();

   return humanReadableTime;
}

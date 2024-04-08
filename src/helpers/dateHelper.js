const days = ["sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function getDay(dateStr) {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr.split("")[0]);
  const day = days[date.getDate()];
  return day;
}

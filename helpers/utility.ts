
export function DateDiff(d1: Date, d2: Date) : { diffDays: number, diffHours: number } {
  const date1 = new Date(d1);
  const date2 = new Date(d2);
  // @ts-ignore
  const diffTime = Math.abs(date2 - date1);
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  console.log(diffDays + " days");
  
  return { diffDays, diffHours }
}


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


export function getDateString(d: Date): string {
  if (!d) return ''

  if (typeof d == 'string') {
    d = new Date(d)
  }

  let month, hours;
  month = d.getMonth() + 1 < 10 ? `0${d.getMonth()+1}` : `${d.getMonth()+1}`
  hours = d.getHours() < 10 ? `0${d.getHours()}` :  `${d.getHours()}`

  const v = `${d.getFullYear()}-${month}-${d.getDate()}T${hours}:${d.getMinutes()}`

  return v
}
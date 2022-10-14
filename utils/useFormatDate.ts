export const formatDate = (date: string) => {
  const d = new Date(date)
  return  d.toLocaleDateString('us', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

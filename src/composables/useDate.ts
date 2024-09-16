type FormatDateType = 'YYYY-MM-DD' | 'YYYY-MM' | 'MM-DD' | 'YYYY/MM/DD' | 'YYYY/MM' | 'MM/DD'

export const useDate = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const formatDate = (date: Date = new Date(), type: FormatDateType = 'YYYY-MM-DD') => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const monthStr = month < 10 ? `0${month}` : month
    const dayStr = day < 10 ? `0${day}` : day
    switch (type) {
      case 'YYYY-MM-DD':
        return `${year}-${monthStr}-${dayStr}`
      case 'YYYY-MM':
        return `${year}-${monthStr}`
      case 'MM-DD':
        return `${monthStr}-${dayStr}`
      case 'YYYY/MM/DD':
        return `${year}/${monthStr}/${dayStr}`
      case 'YYYY/MM':
        return `${year}/${monthStr}`
      case 'MM/DD':
        return `${monthStr}/${dayStr}`
      default:
        return ''
    }
  }

  const today = () => {
    return formatDate()
  }

  return {
    year,
    month,
    day,
    formatDate,
    today
  }
}

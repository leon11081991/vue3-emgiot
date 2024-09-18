import dayjs from 'dayjs'

type FormatDateType = 'YYYY-MM-DD' | 'YYYY-MM' | 'MM-DD' | 'YYYY/MM/DD' | 'YYYY/MM' | 'MM/DD'
type Direction = 'forward' | 'backward'

export const useDate = () => {
  // Get the current date using dayjs
  const date = dayjs()
  const year = date.year()
  const month = date.month() + 1 // `month()` is zero-indexed in dayjs
  const day = date.date()

  const formatDate = (
    inputDate: string = dayjs().format(),
    type: FormatDateType = 'YYYY-MM-DD'
  ) => {
    const date = dayjs(inputDate)

    if (!date.isValid()) {
      throw new Error('Invalid date provided')
    }

    // Use the `format` method from dayjs to format the date
    switch (type) {
      case 'YYYY-MM-DD':
        return date.format('YYYY-MM-DD')
      case 'YYYY-MM':
        return date.format('YYYY-MM')
      case 'MM-DD':
        return date.format('MM-DD')
      case 'YYYY/MM/DD':
        return date.format('YYYY/MM/DD')
      case 'YYYY/MM':
        return date.format('YYYY/MM')
      case 'MM/DD':
        return date.format('MM/DD')
      default:
        return ''
    }
  }

  // A generalized function to calculate the date forward or backward using dayjs
  const calculateDate = (
    startDate: string | dayjs.Dayjs,
    direction: Direction = 'backward',
    days: number,
    type: FormatDateType = 'YYYY-MM-DD'
  ) => {
    // Parse startDate to dayjs object if it's a string, and validate it
    let date = typeof startDate === 'string' ? dayjs(startDate) : startDate

    // Check if the date is valid
    if (!date.isValid()) {
      throw new Error('Invalid date provided')
    }

    // Calculate the new date using dayjs
    date = direction === 'backward' ? date.subtract(days, 'day') : date.add(days, 'day')

    // Format and return the new date
    return date.format(type)
  }

  const today = () => {
    return formatDate()
  }

  return {
    year,
    month,
    day,
    formatDate,
    calculateDate,
    today
  }
}

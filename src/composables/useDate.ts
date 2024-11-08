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
    let date = typeof startDate === 'string' ? dayjs(startDate) : startDate

    if (!date.isValid()) {
      throw new Error('Invalid date provided')
    }

    // Include the start date in the calculation
    date = direction === 'backward' ? date.subtract(days - 1, 'day') : date.add(days - 1, 'day')

    return date.format(type)
  }

  const today = () => {
    return formatDate()
  }

  /**
   * Retrieves the current date and time formatted as 'YYYY-MM-DD HH:mm:ss'.
   * @returns {string} The current date and time in the specified format.
   */
  function getCurrentDateTime(): string {
    return dayjs().format('YYYY-MM-DD HH:mm:ss')
  }

  function getTargetDateTime(time: string): string {
    return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
  }

  const getDaysInTwoMonths = (): number => {
    return new Date(year, month - 1, 0).getDate() // 以startDate月分為主
  }

  /**
   * Calculate the date for three months ago, considering different month lengths.
   * @returns {string} The date formatted as 'YYYY-MM-DD'
   */
  const getThreeMonthsAgo = (): string => {
    return dayjs().subtract(3, 'month').format('YYYY-MM-DD')
  }

  const getMonth = (date: string | null) => {
    if (!date) return ''
    return dayjs(date).format('MM')
  }

  return {
    year,
    month,
    day,
    formatDate,
    calculateDate,
    today,
    getCurrentDateTime,
    getTargetDateTime,
    getDaysInTwoMonths,
    getThreeMonthsAgo,
    getMonth
  }
}

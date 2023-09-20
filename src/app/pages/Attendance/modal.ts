interface MyAttendanceCalenderData {
  title: string 
  backgroundColor: string
  start: string
  display?: string
  textColor?: string
  color?: string
  duration?: number
}
export interface MyAttendanceCalenderProps {
  data: MyAttendanceCalenderData[]
  userId?: string
  onDateSelected?: (path: string) => void
  onNextOrPrevClick?: (month: number, year: number) => void
  initialDate?: string
}

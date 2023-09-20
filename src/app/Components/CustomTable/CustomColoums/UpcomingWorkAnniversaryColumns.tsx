import { PATHS } from "config/paths/paths"
import { CustomHeader } from "../CustomHeader/CustomHeader"
import { Strings } from "app/resource/Strings"
import Logo from "../Logo/Logo"
import { CustomDefaultTitle } from "../CustomRowTitle/CustomRowTitle"
import moment from "moment"
export const convertToReadeFormat  = (date: string): string => {
  return (moment((date)).format("Do MMMM"))
}
const UpcomingWorkAnniversaryColumns = [
    {
      Header: (props: any) => <CustomHeader tableProps={props} title={Strings.name}  className='min-w-125px' />,
      accessor: 'name',
      Cell: (props: any) => (
        <Logo
          src={props.data[props.row.index].image_url as string}
          name={props.data[props.row.index].name}
          technologies={props.data[props.row.index].technology}
        />
      ),
    },
    {
      Header: (props: any) => (
        <CustomHeader tableProps={props} title={Strings.date} className='text-end min-w-100' />
      ),
      accessor: 'next_anniversary',
      Cell: ({ ...props }) => <CustomDefaultTitle isCapitalizeFirstLetterRequired ={false} className="d-flex justify-content-end" title={`${convertToReadeFormat(props.data[props.row.index]?.next_anniversary)}`} />,
    },
  ]
export { UpcomingWorkAnniversaryColumns }
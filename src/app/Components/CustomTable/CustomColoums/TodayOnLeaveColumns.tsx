import { PATHS } from "config/paths/paths"
import { CustomHeader } from "../CustomHeader/CustomHeader"
import { Strings } from "app/resource/Strings"
import Logo from "../Logo/Logo"
import { CustomDefaultTitle } from "../CustomRowTitle/CustomRowTitle"

const TodayOnLeaveColumns = [
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
  ]
export { TodayOnLeaveColumns }
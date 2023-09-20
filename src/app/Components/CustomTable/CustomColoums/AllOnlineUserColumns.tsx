import { PATHS } from "config/paths/paths"
import { CustomHeader } from "../CustomHeader/CustomHeader"
import { Strings } from "app/resource/Strings"
import Logo from "../Logo/Logo"
import { CustomDefaultTitle } from "../CustomRowTitle/CustomRowTitle"

const AllOnlineUserColumns = [
    {
      Header: (props: any) => <CustomHeader tableProps={props} title={Strings.name}  className='min-w-125px' />,
      accessor: 'name',
      Cell: (props: any) => (
        <Logo
          src={props.data[props.row.index].image_url as string}
          name={props.data[props.row.index].name}
          technologies={props.data[props.row.index].technology}
          project={(props.data[props.row.index].project_name + " - " + props.data[props.row.index].task_name )}
        />
      ),
    },
    {
      Header: (props: any) => (
        <CustomHeader tableProps={props} title={Strings.time} className='text-end min-w-100' />
      ),
      accessor: 'start_time',
      Cell: ({ ...props }) => <CustomDefaultTitle className="d-flex justify-content-end" title={props.data[props.row.index]?.start_time} />,
    },
  ]
export { AllOnlineUserColumns }
import { PATHS } from "config/paths/paths"
import { CustomHeader } from "../CustomHeader/CustomHeader"
import { Strings } from "app/resource/Strings"
import Logo from "../Logo/Logo"
import { CustomDefaultTitle, CustomRowTitle } from "../CustomRowTitle/CustomRowTitle"
import { convertToReadeFormat } from "./UpcomingWorkAnniversaryColumns"

const UpcomingBirthdayColumns = [
    {
    Header: (props: any) => <CustomHeader tableProps={props} title={Strings.name} className='min-w-125px' />,
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
    accessor: 'birth_date',
    Cell: ({ ...props }) => <CustomDefaultTitle className="d-flex justify-content-end" isCapitalizeFirstLetterRequired = {false} title={convertToReadeFormat(props.data[props.row.index]?.birth_date)} />,
    },
    ]
export {UpcomingBirthdayColumns}
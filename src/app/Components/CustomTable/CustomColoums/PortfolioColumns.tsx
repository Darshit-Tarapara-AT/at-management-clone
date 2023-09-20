import { HeaderProps } from "react-table";
import { CustomHeader } from "../CustomHeader/CustomHeader";
import CustomActionCell from "../CustomActionCell/CustomActionCell";
import { PropsWithChildren } from "react";
import { Strings } from "app/resource/Strings";
import { generateEditPagePath } from "app/utils/helper";
import { CustomDefaultTitle } from "../CustomRowTitle/CustomRowTitle";
import { convertKeyToLabel } from "./ProjectColoums";


const PortfolioColumns=  [
    {
      Header: (props: any) => <CustomHeader tableProps={props} title={Strings.name} className='min-w-125px' />,
      accessor: 'project_name',
    },
    {
      Header: (props: any) => <CustomHeader tableProps={props} title={Strings.technologies} className='min-w-125px' />,
      accessor: 'technologies',
      
      Cell:(props: any) => (
        <CustomDefaultTitle
        title={convertKeyToLabel(props.data[props.row.index].technologies?.split(','))}
        isCapitalizeFirstLetterRequired={false}
      />
      )
    },
    {
      Header: (props: any) => <CustomHeader tableProps={props} title={Strings.industries} className='min-w-125px' />,
      accessor: 'industries',
      Cell:(props:any) => (
        <CustomDefaultTitle
        title={convertKeyToLabel(props.data[props.row.index]?.industries)}
        />
      )
    },
    {
      Header: (props: PropsWithChildren<HeaderProps<any>>) => (
        <CustomHeader
          tableProps={props}
          title={Strings.actions}
          className='p-0 pb-3 text-end min-w-150px'
        />
      ),
      id: 'actions',
      Cell: ({...props}) => {
        const {deleteItem, editItem, viewItem} = props.data[props.row.index]
        return  (
          <CustomActionCell  deleteItem = {deleteItem} editItem ={editItem} viewItem ={viewItem}  id={props.data[props.row.index].id} path ={generateEditPagePath(props.data[props.row.index].id, Strings.projectPathKey)} />
        )
      }
    }
    ]

export {PortfolioColumns}
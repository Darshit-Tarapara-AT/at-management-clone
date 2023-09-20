import { PATHS } from "config/paths/paths"
import CustomActionCell from "../CustomActionCell/CustomActionCell"
import { CustomHeader } from "../CustomHeader/CustomHeader"
import { Strings } from "app/resource/Strings"

const credentialsColumns = [
    {
      Header: (props: any) => <CustomHeader tableProps={props} title='No' className='min-w-125px' />,
      accessor: 'index',
    },
    {
      Header: (props: any) => (
        <CustomHeader tableProps={props} title={Strings.name} className='min-w-125px' />
      ),
      accessor: 'name',
    },
    {
      Header: (props: any) => (
        <CustomHeader tableProps={props} title={Strings.actions} className='text-end min-w-100px' />
      ),
      id: 'actions',
      Cell: ({ ...props }) => {
        const { deleteItem, editItem, viewItem } = props.data[props.row.index]
        const currentCredentialId = props.data[props.row.index].id
        const path = PATHS.credential.edit.replaceAll(":id", `${currentCredentialId}`)
        return (<CustomActionCell
          deleteItem={deleteItem}
          editItem={editItem}
          viewItem={viewItem}
          id={currentCredentialId}
          path={path} />)
      }
    },
  ]
export {credentialsColumns}
import { PATHS } from "config/paths/paths"
import { CustomHeader } from "../CustomHeader/CustomHeader"
import { Strings } from "app/resource/Strings"

import Logo from "../Logo/Logo"
import TaskTracker from "app/pages/Tasks/Components/TaskTracker/TaskTracker"

const RecentTasksColumns = [
    {
      Header: (props: any) => <CustomHeader tableProps={props} title={Strings.tasks}  />,
      accessor: 'task',
      Cell: (props: any) => (
        <Logo
          src={props.data[props.row.index].project_logo as string}
          name={props.data[props.row.index].project_name}
          path={PATHS.task.view.replace(":id", props.data[props.row.index]?.project_id)?.replace(":taskId", props.data[props.row.index]?.id)}
          technologies={props.data[props.row.index].project_name}
          project={(props.data[props.row.index].task_name )}
          hasTooltipNeed = {true}
        />
      ),
    },
    {
      Header: (props: any) => (
        <CustomHeader tableProps={props} title={Strings.actions} className="text-end min  min-w-150px"/>
      ),
      id: 'actions',
      Cell: ({...props}) => {
        return  ( <TaskTracker hasTaskStart={props.data[props.row.index].isTaskRunning} onUpdateTask={props.onUpdateTask} taskId={props.data[props.row.index].id} hasListingPage={false} userId={1} />)
      }
    },
  ]
export {RecentTasksColumns}
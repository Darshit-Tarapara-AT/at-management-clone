const paths = {
    "project" : {
        'list': "/projects",
        "add": "project/add",
        "edit": "/project/:id/edit",
        "details": "/project/:id/details",
        "activity": "/project/:id/activaty",
        "users": "/project/:id/users",
        "tasks": "/project/:id/tasks",
        "files": "/project/:id/files",
        "privateDetails" : "/project/:id/private-details",
        "view": "/project/:id/view"
    },
    "client" : {
        'list': "/clients",
        "add": "client/add",
        "edit": "/client/:id/edit",
        "view": "/client/:id/view"
    }
}
export {paths}
import React from "react";
import ManageRequest from "./features/manageRequest/ManageRequest";
import Report from "./features/report/Report";

const Home = React.lazy(() => import("./features/home/Home"));

const UserManager = React.lazy(() =>
  import("./features/usermanager/UserManager")
);

const AssignmentManager = React.lazy(() =>
  import("./features/manageAssignment/AssignmentManager")
);

const ManageAsset = React.lazy(() =>
  import("./features/manageAsset/ManageAsset")
);

const routes = [
  { path: "/home", exact: true, name: "Home", component: Home },
  { path: "/manageuser", exact: true, name: "ManageUser", component: UserManager },
  { path: "/manageassignment", exact: true, name: "ManageAssignment", component: AssignmentManager },
  {
    path: "/manageasset",
    exact: true,
    name: "ManageAsset",
    component: ManageAsset,
  },
  {
    path: "/request_returning",
    exact: true,
    name: "request_returning",
    component: ManageRequest,
  },
  {
    path: "/report",
    exact: true,
    name: "report",
    component: Report,
  },
];

export default routes;

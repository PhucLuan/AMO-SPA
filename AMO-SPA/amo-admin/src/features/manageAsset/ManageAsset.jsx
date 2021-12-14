import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import AddEdit from "./view/AddEdit";
import Main from "./view/Main";

const ManageAsset = () => {
  const match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={match.url} component={Main} />

        <Route path={`${match.url}/add`} component={AddEdit} />
        <Route path={`${match.url}/:assetId`} component={AddEdit} />
      </Switch>
    </div>
  );
};

export default ManageAsset;

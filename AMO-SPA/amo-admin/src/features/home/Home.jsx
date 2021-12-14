import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import Main from './view/Main';

const Home = () => {
    const match = useRouteMatch();

    return (
        <div>
            <Switch>
                <Route exact path={match.url} component={Main} />
            </Switch>
        </div>
    )
}

export default Home

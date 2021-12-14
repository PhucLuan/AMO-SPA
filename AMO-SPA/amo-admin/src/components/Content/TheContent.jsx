import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router'
// routes config
import routes from '../../routes';

const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
)



const TheContent = () => {
    return (
        <div>
            <Suspense fallback={loading}>
                <Switch>
                    {routes.map((route, idx) => {
                        return route.component && (
                            <Route
                                key={idx}
                                path={route.path}
                                name={route.name}
                                component={props => (
                                    <div>
                                        <route.component {...props} />
                                    </div>
                                )} />
                        )
                    })}
                    {/* <Redirect from="/" to="/dashboard" /> */}
                </Switch>
            </Suspense>
        </div>
    )
}

export default TheContent

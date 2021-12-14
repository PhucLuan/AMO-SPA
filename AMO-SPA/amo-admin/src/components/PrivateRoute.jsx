import { Redirect, Route } from "react-router";

export function PrivateRoute(props) {
    // Check if user is logged in
    // If yes, show route
    // Otherwise, redirect to login page
    const isLoggedIn = Boolean(localStorage.getItem('user'));
    if (!isLoggedIn) return <Redirect to="/welcome" />;
  
    return <Route {...props} />;
}
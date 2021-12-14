import React from 'react';
import { useHistory } from 'react-router';
import { CallbackComponent } from 'redux-oidc';
import userManager from '../../utils/userManager';

const CallbackPage = () => {

    const history = useHistory();

    const handleLoginSuccess = (user) => {
      localStorage.setItem('user', JSON.stringify(user));
      history.push('/home');
    }

    return (
        <CallbackComponent
        userManager={userManager}
        successCallback={handleLoginSuccess}
        errorCallback={error => {
            history.push('/accessdenied');
          //this.props.dispatch(push('/'));
          console.error(error);
        }}
      >
        <div>Redirecting...</div>
      </CallbackComponent>
    )
}

export default CallbackPage

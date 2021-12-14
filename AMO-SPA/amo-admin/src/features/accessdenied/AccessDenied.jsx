import React, { useEffect } from 'react';
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Container } from 'reactstrap';
import Logo_lk2 from '../../assets/images/Logo_lk.png';
import userManager from '../../utils/userManager';
import '../welcome/welcome.css';

const AccessDenied = () => {
    const handleLogin = () => {
        userManager.signinRedirect();
    }
    useEffect(() => {
        const isLoggedIn = Boolean(localStorage.getItem('user'));
        if (isLoggedIn)
        {
            const user = JSON.parse(localStorage.getItem("user"));
            localStorage.removeItem('user');
            userManager.signoutRedirect({ id_token_hint: user.id_token });
            userManager.removeUser();
        }
      });

    return (
        <div>
            <div className="welcomeheader">
                <Container className="namepage">welcome</Container>
            </div>
            <div className="welcomecard">
                <Card
                >
                    <CardBody>
                        <CardTitle tag="h5">
                        <img src={Logo_lk2} alt="NashTech" />

                        </CardTitle>
                        <CardSubtitle
                            className="mb-2 welcometitle"
                            tag="h6"
                        >
                            AccessDenied - Login error - User is disable
                        </CardSubtitle>
                        <CardText>
                           Contact the Admin to enable your account and try to log in again.
                        </CardText>
                        <Button className="welcomebtn" onClick={() => handleLogin()}>Login</Button>
                    </CardBody>
                </Card>


            </div>
        </div>
    )
}

export default AccessDenied

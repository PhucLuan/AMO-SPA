import React, { useEffect } from 'react';
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Container } from 'reactstrap';
import Logo_lk2 from '../../assets/images/Logo_lk.png';
import userManager from '../../utils/userManager';
import './welcome.css';

const handleLogin = () => {
    userManager.signinRedirect();
}

const Welcome = () => {
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
                            Welcome to Online Asset Management
                        </CardSubtitle>
                        <CardText>
                            Please log in.
                        </CardText>
                        <Button className="welcomebtn" onClick={() => handleLogin()}>Login</Button>
                    </CardBody>
                </Card>


            </div>
        </div>
    )
}

export default Welcome

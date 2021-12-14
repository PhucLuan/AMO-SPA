import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Button, Card, CardBody, CardText, CardTitle, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import './Header.css';
import userManager from '../../utils/userManager';
import Modal from 'react-modal';


Modal.setAppElement('#root');

const TheHeader = () => {

    const user = JSON.parse(localStorage.getItem("user"));
    //const isAuthenticated = user && !user.expired
    //const isAdmin = isAuthenticated && user.profile['role'] === 'Admin';
    const onLogoutButtonClick = event => {
        event.preventDefault();
        localStorage.removeItem('user');
        userManager.signoutRedirect({ id_token_hint: user.id_token });
        userManager.removeUser(); // removes the user data from sessionStorage
    };

    const HandleChangePassword = event => {
        window.location.replace(process.env.REACT_APP_IDENTITY_URL_CHANGE_PASSWORD);
    }

    const [isToggle, setisToggle] = useState(false)
    const pagename = useSelector(state => state.home.namepage)

    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }


    function closeModal() {
        setIsOpen(false);
    }
    const customStyles = {
        content: {
            top: '30%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    return (
        <div className="narbav">
            <Container id="narbav_mid">
                <div id="Home_mif">
                    <span>{pagename}</span>
                </div>
                <Dropdown
                    isOpen={isToggle}
                    toggle={function noRefCheck() { setisToggle(!isToggle) }}
                    className="user-dropdown"
                >
                    <DropdownToggle caret color="btn-primary">
                        {user.profile['name']}
                    </DropdownToggle>
                    <DropdownMenu
                    >
                        <DropdownItem onClick={HandleChangePassword}>Change Password</DropdownItem>
                        <DropdownItem onClick={openModal}>Sign out</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </Container>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <Card className="rookiecard"
                >
                    <CardBody className="rookiecard-body">
                        <CardTitle className="rookiecard-body__title">
                            Are you sure
                        </CardTitle>
                        <div className="rookiecard-body-content">
                        <CardText className="rookiecard-body-content__text">
                            Do you want to logout?
                        </CardText>
                        <div className="rookiecard-body-content__group-btn" >
                        <Button className="rookiecard-body-content__btn--active" onClick={onLogoutButtonClick}>
                            Log out
                        </Button>
                        {'  '}
                        <Button outline className="rookiecard-body-content__btn--cancel" onClick={closeModal}>
                            Cancel
                        </Button>
                        </div>
                        </div>
                    </CardBody>
                </Card>
            </Modal>
        </div>
    )
}

export default TheHeader

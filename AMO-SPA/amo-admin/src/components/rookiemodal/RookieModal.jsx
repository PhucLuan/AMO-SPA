import React from "react";
import { Card, CardBody, CardTitle, Modal } from "reactstrap";
import Xsquarebtn from "../Button/Xsquarebtn";

const RookieModal = ({
  title,
  modalIsOpen,
  closeModal,
  customStyles,
  children,
}) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <Card className="rookiemodal">
        <CardBody className="rookiemodal-body">
          <CardTitle className="rookiemodal-body__title">
            <div className="rookiemodal-body__title__content">{title}</div>
            <div className="rookiemodal-body__title__content">
              <Xsquarebtn onClick={() => closeModal()}>Close</Xsquarebtn>
            </div>
          </CardTitle>
          <div className="rookiemodal-body-content">{children}</div>
        </CardBody>
      </Card>
    </Modal>
  );
};

export default RookieModal;

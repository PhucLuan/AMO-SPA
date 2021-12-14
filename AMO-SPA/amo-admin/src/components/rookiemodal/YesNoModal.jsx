import React from "react";
import { Card, CardBody, CardTitle, Modal } from "reactstrap";

const YesNoModal = ({
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
          </CardTitle>
          <div className="rookiemodal-body-content">{children}</div>
        </CardBody>
      </Card>
    </Modal>
  );
};

export default YesNoModal;

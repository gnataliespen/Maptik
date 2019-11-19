import React, { Fragment, useState } from "react";
import { Image, Modal } from "semantic-ui-react";

const ShowModal = ({ Component, ...rest }) => {
  const [modalOpen, setModalOpen] = useState("");
  const mBool = modalOpen ? true : false;

  const closeModal = () => {
    setModalOpen("");
  };
  const openModal = event => {
    setModalOpen(event.target.src);
  };

  return (
    <Fragment>
      <Modal open={mBool} basic closeIcon onClose={closeModal}>
        <Image wrapped size="large" src={modalOpen} />
      </Modal>
      <Component {...rest} openModal={openModal} />
    </Fragment>
  );
};

export default ShowModal;

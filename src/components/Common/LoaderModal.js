import React from "react"
import { Modal, ModalBody, Progress, Spinner } from "reactstrap"
import Typewriter from "typewriter-effect"
const LoaderModal = ({ modal, setModal, progressBar }) => {
  return (
    <Modal isOpen={modal} onClosed={setModal} centered={true}>
      <ModalBody className="d-flex align-items-center justify-content-center mt-5">
        <Spinner
          color="primary"
          style={{
            height: "3rem",
            width: "3rem",
          }}
          type="grow"
        />
      </ModalBody>
      {progressBar && (
        <Progress
          animated
          color="success"
          striped
          value={progressBar}
          className="my-2"
        >
          {progressBar}%
        </Progress>
      )}
      <div className="d-flex align-items-center justify-content-center mb-5 mt-3">
        <h1>
          <Typewriter
            options={{
              wrapperClassName: "typewrite color-linear",
              strings: ["Уншиж байна.....", "Уншиж байна....."],
              autoStart: true,
              loop: true,
            }}
          />
        </h1>
      </div>
    </Modal>
  )
}

export default LoaderModal

import React from "react"
import { Modal, ModalHeader, ModalBody } from "reactstrap"

const IssueModal = ({ isOpen, toggle, issue }) => {
  return (
    <div>
      <Modal centered isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle} charCode="X">
          {issue.title}
        </ModalHeader>
        <ModalBody>{issue.body}</ModalBody>
      </Modal>
    </div>
  )
}

export default IssueModal

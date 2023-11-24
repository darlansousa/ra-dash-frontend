import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import CloseForm from '../Forms/CloseForm'
import Button from 'react-bootstrap/Button';

class ModalForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  render() {
    const closeBtn = <Button variant="danger" className="close" onClick={this.toggle}>&times;</Button>

    const label = this.props.buttonLabel

    let button = <Button variant="warning" onClick={this.toggle}>{label}</Button>
    let title = this.props.title
    return (
      <>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} close={closeBtn}>{title}</ModalHeader>
          <ModalBody>
            <CloseForm item={this.props.item} toggle={this.toggle} updateState={this.props.updateState} />
          </ModalBody>
        </Modal>
        {button}

      </>
    )
  }
}

export default ModalForm
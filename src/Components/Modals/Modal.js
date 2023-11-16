import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import CloseForm from '../Forms/CloseForm'

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
    const closeBtn = <Button color="danger" className="close" onClick={this.toggle}>&times;</Button>

    const label = this.props.buttonLabel

    let button = ''
    let title = this.props.title

    if (label === 'Editar') {
      button = <Button
        color="warning"
        onClick={this.toggle}
        style={{ float: "left", marginRight: "10px" }}>{label}
      </Button>
    } else if (label === 'Adicionar') {
      button = <Button
        color="success"
        onClick={this.toggle}
        style={{ float: "left", marginRight: "10px" }}>{label}
      </Button>
    } else {
      button = <Button
        color="success"
        onClick={this.toggle}
        style={{ float: "left", marginRight: "10px" }}>{label}
      </Button>
    }


    return (
      <div>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} close={closeBtn}>{title}</ModalHeader>
          <ModalBody>
              <CloseForm item={this.props.item} toggle={this.toggle} updateState={this.props.updateState}/>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default ModalForm
import React from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

class CloseForm extends React.Component {
  failure = false
  state = {
    id: 0,
    id_occurrence: '',
    close_date: '',
    system_sub_reason: '',
    complainer_note: '',
    negotiate_again: 'Sim'
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch(`${process.env.REACT_APP_API_HOST}/complaints/${this.state.id}/close`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.id,
        id_occurrence: this.state.id_occurrence,
        close_date: this.state.close_date,
        system_sub_reason: this.state.system_sub_reason,
        complainer_note: this.state.complainer_note,
        negotiate_again: this.state.negotiate_again
      })
    })
      .then(response => response.json())
      .then(item => {
        if(item.dbError == null) {
          this.props.updateState(item)
          this.props.toggle()
        }else {
          this.failure = true
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    if (this.props.item) {
      const { id, id_occurrence, close_date, system_sub_reason, complainer_note, negotiate_again } = this.props.item
      const default_negotiate_again = negotiate_again === null ? 'Sim' : negotiate_again
      this.setState({ id, id_occurrence, close_date, system_sub_reason, complainer_note, default_negotiate_again })
    }
  }

  render() {
    return (
      <Form onSubmit={this.submitFormEdit}>

        {this.failure ? (<Alert color="danger">
          Falha ao salvar dados!
        </Alert>) : ('')}

        <FormGroup>
          <Label for="id_occurrence">Número da ocorrência</Label>
          <Input type="text" name="id_occurrence" id="id_occurrence" onChange={this.onChange} value={this.state.id_occurrence === null ? '' : this.state.id_occurrence} />
        </FormGroup>
        <FormGroup>
          <Label for="system_sub_reason">Sub-motivo</Label>
          <Input type="text" name="system_sub_reason" id="system_sub_reason" onChange={this.onChange} value={this.state.system_sub_reason === null ? '' : this.state.system_sub_reason} />
        </FormGroup>
        <FormGroup>
          <Label for="close_date">Data do fechamento</Label>
          <Input type="date" placeholder="date placeholder" name="close_date" id="close_date" onChange={this.onChange} value={this.state.close_date === null ? '' : this.state.close_date.split('T')[0]} />
        </FormGroup>
        <FormGroup>
          <Label for="complainer_note">Nota</Label>
          <Input type="text" name="complainer_note" id="complainer_note" onChange={this.onChange} value={this.state.complainer_note === null ? '' : this.state.complainer_note} />
        </FormGroup>
        <FormGroup>
          <Label for="negotiate_again">Faria negócio novamente?</Label>
          <Input type="select" name="negotiate_again" id="negotiate_again" onChange={this.onChange} value={this.state.negotiate_again === null ? 'Sim' : this.state.negotiate_again}>
            <option value="Sim">Sim</option>
            <option value="Não">Não</option>
          </Input>
        </FormGroup>
        <Button>Fechar reclamação</Button>
      </Form>
    );
  }
}

export default CloseForm
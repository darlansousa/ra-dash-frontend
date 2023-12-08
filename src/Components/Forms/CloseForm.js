import React from 'react';
import { Button, Form, FormGroup, Label, Input, Alert, Badge } from 'reactstrap';

class CloseForm extends React.Component {
  failure = false
  state = {
    classifications: [],
    item: {
      id: 0,
      id_occurrence: '',
      close_date: '',
      system_sub_reason: '',
      complainer_note: '',
      negotiate_again: 'Sim'
    }
  }

  onChange = e => {
    this.setState({ item: { ...this.state.item, [e.target.id]: e.target.value } })
  }

  getClassifications() {

    fetch(`${process.env.REACT_APP_API_HOST}/classifications`)
      .then(response => response.json())
      .then(classifications => {
        this.setState({ classifications })
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch(`${process.env.REACT_APP_API_HOST}/complaints/${this.state.item.id}/close`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.item.id,
        id_occurrence: this.state.item.id_occurrence,
        close_date: this.state.item.close_date,
        system_sub_reason: this.state.item.system_sub_reason,
        complainer_note: this.state.item.complainer_note,
        negotiate_again: this.state.item.negotiate_again
      })
    })
      .then(response => response.json())
      .then(item => {
        if (item.dbError == null) {
          this.props.updateState(item)
          this.props.toggle()
        } else {
          this.failure = true
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    if (this.props.item) {
      const { id, id_occurrence, close_date, system_sub_reason, complainer_note, negotiate_again } = this.props.item
      const default_negotiate_again = negotiate_again === null ? 'Sim' : negotiate_again
      this.setState({item: { id, id_occurrence, close_date, system_sub_reason, complainer_note, negotiate_again: default_negotiate_again }})
      this.getClassifications()
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
          <Input type="text" name="id_occurrence" id="id_occurrence" onChange={this.onChange} value={this.state.item.id_occurrence === null ? '' : this.state.item.id_occurrence} required />
        </FormGroup>
        <FormGroup>
        <Alert color='light'>
        {this.props.item.ai_classification ? `Sub-motivo recomendado pela IA:`: '' } <Badge color="primary">{this.props.item.ai_classification}</Badge>
        </Alert>
          <Label for="system_sub_reason">Sub-motivo</Label>
          <Input type="select" name="system_sub_reason" id="system_sub_reason" onChange={this.onChange} value={this.state.item.system_sub_reason === null ? 'Sim' : this.state.item.system_sub_reason}>
            {
              this.state.classifications.map(reason => {
                return (<option key={reason.id} value={reason.description}>{reason.description}</option>)
              })
            }
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="close_date">Data do fechamento</Label>
          <Input type="date" placeholder="date placeholder" name="close_date" id="close_date" onChange={this.onChange} value={this.state.item.close_date === null ? '' : this.state.item.close_date.split('T')[0]} required />
        </FormGroup>
        <FormGroup>
          <Label for="complainer_note">Nota</Label>
          <Input type="text" name="complainer_note" id="complainer_note" onChange={this.onChange} value={this.state.item.complainer_note === null ? '' : this.state.item.complainer_note} required pattern="[0-9]|10" />
        </FormGroup>
        <FormGroup>
          <Label for="negotiate_again">Faria negócio novamente?</Label>
          <Input type="select" name="negotiate_again" id="negotiate_again" onChange={this.onChange} value={this.state.item.negotiate_again === null ? 'Sim' : this.state.item.negotiate_again}>
            <option value="Sim">Sim</option>
            <option value="Não">Não</option>
          </Input>
        </FormGroup>
        <Button color="primary">Fechar reclamação</Button>
      </Form>
    );
  }
}

export default CloseForm
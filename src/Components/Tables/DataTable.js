import React, { Component } from 'react'
import { Table } from 'reactstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import ModalForm from '../Modals/Modal'

class DataTable extends Component {

  deleteItem = id => {
    let confirmDelete = window.confirm('Deseja deletar o item?')
    if (confirmDelete) {
      fetch('http://localhost:3000/complaints', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id
        })
      })
        .then(response => response.json())
        .then(item => {
          this.props.deleteItemFromState(id)
        })
        .catch(err => console.log(err))
    }

  }

  render() {

    const items = this.props.items.map(item => {
      return (
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.ra_id}</td>
          <td>{item.title}</td>
          <td>{item.date_description}</td>
          <td>{item.chanel}</td>
          <td>{item.reason}</td>
          <td>{item.name}</td>
          <td>
            <div style={{ width: "150px" }}>
            <ButtonGroup size="sm">
              <ModalForm buttonLabel="Fechar" title="Fechar reclamação" item={item} updateState={this.props.updateState} /> 
              <DropdownButton title="Mais" id="bg-nested-dropdown">
                  <Dropdown.Item eventKey="1" href={('https://www.reclameaqui.com.br/area-da-empresa/reclamacoes/' + item.ra_cod)} target="_blank">Acessar no RA</Dropdown.Item>
                  <Dropdown.Item eventKey="2" href={('complaints/' + item.id)}>Editar</Dropdown.Item>
                  <Dropdown.Item eventKey="3" color="danger" onClick={() => this.deleteItem(item.id)}>Deletar</Dropdown.Item>
                </DropdownButton>
            </ButtonGroup>
            </div>
          </td>
        </tr>
      )
    })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>RA ID</th>
            <th>Título</th>
            <th>Data</th>
            <th>Canal</th>
            <th>Motivo</th>
            <th>Reclamador</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}

export default DataTable
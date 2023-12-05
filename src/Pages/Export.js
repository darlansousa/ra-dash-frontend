import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { CSVLink } from "react-csv"

class Export extends Component {

  now = new Date()
  file_name = "RA_"
    + this.now.getDay()
    + this.now.getMonth()
    + this.now.getFullYear()
    + this.now.getHours()
    + this.now.getMinutes()
    + this.now.getSeconds()
    + ".csv"

  state = {
    items: []
  }

  getItems() {
    fetch(`${process.env.REACT_APP_API_HOST}/complaints/export`)
      .then(response => response.json())
      .then(items => this.setState({ items }))
      .catch(err => console.log(err))
  }

  postExports(items) {
    fetch(`${process.env.REACT_APP_API_HOST}/exports`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(items
        .map(item => {
          return { ra_id : item["ID RECLAME AQUI"]}
        }))
    })
      .then(response => {
        if (response.status === 201) {
          this.getItems()
        } else {
          window.alert(`Erro: ${response.json().dbError}`)
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getItems()
  }

  render() {
    return (
      <Container className="Export">
        <Row>
          <Col>
            <h1 style={{ margin: "20px 0" }}>Exportar</h1>
            <p>Existem {this.state.items.length} para exportação </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <CSVLink
              filename={this.file_name}
              color="primary"
              style={{ float: "left", marginRight: "10px" }}
              className="btn btn-primary"
              data={this.state.items}
              onClick={() => this.postExports(this.state.items)}>
              Download CSV
            </CSVLink>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Export
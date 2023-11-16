import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { CSVLink } from "react-csv"

class Export extends Component {

  state = {
    items: []
  }

  getItems(){
    fetch('http://localhost:3000/complaints')
      .then(response => response.json())
      .then(items => this.setState({items}))
      .catch(err => console.log(err))
  }

  componentDidMount(){
    this.getItems()
  }

  render() {
    return (
      <Container className="Export">
        <Row>
          <Col>
            <h1 style={{margin: "20px 0"}}>Exportar</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <CSVLink
              filename={"db.csv"}
              color="primary"
              style={{float: "left", marginRight: "10px"}}
              className="btn btn-primary"
              data={this.state.items}>
              Download CSV
            </CSVLink>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Export
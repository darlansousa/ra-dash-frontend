import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
class App extends Component {
  
  state = {
    "all": 47,
    "closed": 7,
    "pending": 40,
    "ia_review": 0,
    "pending_process": 7
}

  getInfo() {
    fetch('http://localhost:3000/complaints/info')
      .then(response => response.json())
      .then(item => this.setState(item))
      .catch(err => console.log(err))
  }


  componentDidMount() {
    this.getInfo()
  }

  render() {
    const renderTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        Solicite no coletor
      </Tooltip>
    );
    return (
      <Container fluid className='App'>
        <Row>
          <Col>
            <Card style={{ width: '18rem', margin: '20px' }}>
              <Card.Body>
                <Card.Title>Reclamações registradas</Card.Title>
                <Card.Text>
                  <h2>{this.state.all}</h2>
                </Card.Text>
                <Button variant="primary" href='/complaints'>Ir para reclamações</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: '18rem', margin: '20px' }}>
              <Card.Body>
                <Card.Title>Reclamações respondidas</Card.Title>
                <Card.Text>
                  <h2>{this.state.closed}</h2>
                </Card.Text>
                <Button variant="primary" href='/complaints?status=closed'>Ir para reclamações</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: '18rem', margin: '20px' }}>
              <Card.Body>
                <Card.Title>Avaliações da IA</Card.Title>
                <Card.Text>
                  <h2>{this.state.ai_review}</h2>
                </Card.Text>
                <Button variant="primary">Ir para avaliações</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: '18rem', margin: '20px' }}>
              <Card.Body>
                <Card.Title>Reclamações pendentes</Card.Title>
                <Card.Text>
                  <h2>{this.state.pending_process}</h2>
                </Card.Text>
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}>
                  <Button variant="success">Solicitar processamento</Button>
                </OverlayTrigger>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App
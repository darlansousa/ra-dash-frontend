import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
class App extends Component {

  state = {
    item: {
      "all": 0,
      "closed": 0,
      "pending": 0,
      "ai_review": 0,
      "pending_process": 0
    },
    ai_classifications: []
  }

  getInfo() {
    fetch(`${process.env.REACT_APP_API_HOST}/complaints/info`)
      .then(response => response.json())
      .then(item => this.setState({ item }))
      .catch(err => console.log(err))
  }

  getAiClassifications() {
    fetch(`${process.env.REACT_APP_API_HOST}/complaints/ai`)
      .then(response => response.json())
      .then(ai_classifications => this.setState({ ai_classifications }))
      .catch(err => console.log(err))
  }



  componentDidMount() {
    this.getInfo()
    this.getAiClassifications()
  }

  render() {
    const renderTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        Solicite no coletor
      </Tooltip>
    );

    const items = this.state.ai_classifications.map(item => {
      return (
        <ListGroup.Item key={item.classification}
          as="li"
          className="d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold"><Button variant='link' href={"/complaints?ai_classification=" + item.classification}>{item.classification}</Button></div>
          </div>
          <Badge bg="primary" pill>
          {item.count}
          </Badge>
        </ListGroup.Item>
      )

    })
    return (
      <Container fluid className='App'>
        <Row>
          <Col>
            <Card style={{ width: '18rem', margin: '20px' }}>
              <Card.Body>
                <Card.Title>Reclamações registradas</Card.Title>
                <Card.Text>
                  <h2>{this.state.item.all}</h2>
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
                  <h2>{this.state.item.closed}</h2>
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
                  <h2>{this.state.item.ai_review}</h2>
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
                  <h2>{this.state.item.pending_process}</h2>
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
        <Row>
          <h4>Avaliações por IA <img src='../stars-4-48.png' alt='IA'></img></h4>
        </Row>
        <Row>
          <ListGroup style={{ padding: "20px" }}>
            {items}
          </ListGroup>
        </Row>
      </Container>
    )
  }
}

export default App
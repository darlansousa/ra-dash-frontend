import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import Badge from 'react-bootstrap/Badge';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DataTable from '../Components/Tables/DataTable'
import Form from 'react-bootstrap/Form';
import withRouter from '../withRouter'

class Complaints extends Component {
    state = {
        items: [],
        input: '',
        reasons: ['Economia',
            'Consumo - Baixa injeção',
            'Multa/Cancelamento',
            'Atendimento',
            'Inocnsistência na venda',
            'Portal/App',
            'Points',
            'Cobrança indevida',
            'Prazo conexão',
            'Outros']
    }

    onChangeHandler(e) {
        this.setState({
            input: e.target.value,
        })
    }

    getItems() {
        console.log()
        fetch(`http://localhost:3000/complaints?${this.props.query.toString()}`)
            .then(response => response.json())
            .then(items => this.setState({ items }))
            .catch(err => console.log(err))
    }

    addItemToState = (item) => {
        this.setState(prevState => ({
            items: [...prevState.items, item]
        }))
    }

    updateState = (item) => {
        const itemIndex = this.state.items.findIndex(data => data.id === item.id)
        const newArray = [
            ...this.state.items.slice(0, itemIndex),
            item,
            ...this.state.items.slice(itemIndex + 1)
        ]
        this.setState({ items: newArray })
    }

    deleteItemFromState = (id) => {
        const updatedItems = this.state.items.filter(item => item.id !== id)
        this.setState({ items: updatedItems })
    }

    componentDidMount() {
        this.getItems()
    }

    render() {
        const filteredList = this.state.items
            .filter(item => this.state.input === '' || JSON.stringify(item).toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1);
        return (
            <Container className="App">
                <Row>
                    <Col>
                        <h5 style={{ margin: "20px 0" }}>Reclamações <Badge bg="secondary">{this.state.items.length}</Badge></h5>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ButtonGroup>
                            <Button variant="secondary" href="/complaints">Todas</Button>
                            <DropdownButton as={ButtonGroup} title="Filtrar por status" id="bg-nested-dropdown">
                                <Dropdown.Item eventKey="1" href="?status=pending">Não Respondidas</Dropdown.Item>
                                <Dropdown.Item eventKey="2" href="?status=closed">Respondidas</Dropdown.Item>
                            </DropdownButton>
                            <DropdownButton as={ButtonGroup} title="Filtrar por sub-motivo" id="bg-nested-dropdown">
                                {
                                    this.state.reasons.map(reason => {
                                        return (<Dropdown.Item key={reason} eventKey={reason} href={"?sys_reason=" + reason} >{reason}</Dropdown.Item>)
                                    })
                                }
                            </DropdownButton>
                            <DropdownButton as={ButtonGroup} title="Filtrar por avaliação da IA" id="bg-nested-dropdown">
                                {
                                    this.state.reasons.map(reason => {
                                        return (<Dropdown.Item key={'AI_'+reason} eventKey={reason} href={"?ai_classification=" + reason} >{reason}</Dropdown.Item>)
                                    })
                                }
                            </DropdownButton>
                        </ButtonGroup>

                    </Col>
                    <Col>
                        <Form>
                            <Form.Group as={Row} className="mb-3">
                                <Col sm="10">
                                    <Form.Control type="text" value={this.state.input} placeholder="Pesquisar por..." onChange={this.onChangeHandler.bind(this)} />
                                </Col>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <DataTable items={filteredList} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default withRouter(Complaints)
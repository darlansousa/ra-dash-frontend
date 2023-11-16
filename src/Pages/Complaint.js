import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Accordion from 'react-bootstrap/Accordion';
import withRouter from '../withRouter'


class Complaint extends Component {
    error = false
    state = {
        "id": 0,
        "ra_cod": "",
        "ra_id": "",
        "title": "",
        "date_description": "",
        "chanel": "",
        "reason": "",
        "description": "",
        "complainer_id": 0,
        "id_occurrence": "",
        "close_date": "",
        "system_sub_reason": "",
        "complainer_note": "",
        "complaints_status": "",
        "ai_classification": null,
        "negotiate_again": "",
        "name": "",
        "cpf": "",
        "uc": "",
        "city": "",
        "email": "",
        "phone": "",
        "is_client": ""
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    getItem() {
        fetch(`http://localhost:3000/complaints/${this.props.params.id}`)
            .then(response => response.json())
            .then(item => this.setState(item))
            .catch(err => console.log(err))
    }

    submitFormEdit = e => {
        e.preventDefault()
        fetch(`http://localhost:3000/complaints/${this.props.params.id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.id,
                ra_cod: this.state.ra_cod,
                ra_id: this.state.ra_id,
                title: this.state.title,
                date_description: this.state.date_description,
                chanel: this.state.chanel,
                reason: this.state.reason,
                description: this.state.description,
                complainer_id: this.state.complainer_id,
                id_occurrence: this.state.id_occurrence,
                close_date: this.state.close_date,
                system_sub_reason: this.state.system_sub_reason,
                complainer_note: this.state.complainer_note,
                complaints_status: this.state.complaints_status,
                ai_classification: this.state.ai_classification,
                negotiate_again: this.state.negotiate_again,
                name: this.state.name,
                cpf: this.state.cpf,
                uc: this.state.uc,
                city: this.state.city,
                email: this.state.email,
                phone: this.state.phone,
                is_client: this.state.is_client
            })
        })
            .then(response => response.json())
            .then(item => {
                if (item.dbError == null) {
                    window.alert(`Salvo com sucesso`)
                } else {
                    window.alert(`Erro: ${item.dbError}`)
                }
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.getItem()
    }

    render() {
        return (
            <Container className="Complaint">
                <Form onSubmit={this.submitFormEdit}>
                    <Row>
                        <p></p>
                    </Row>
                    <Row>
                        <Stack direction="horizontal" gap={2}>
                            <Button variant="primary">Status: {this.state.complaints_status ? this.state.complaints_status : 'Peendente'}</Button>{' '}
                            <Button variant="primary">Acessar no reclame aqui</Button>{' '}
                            <Button variant="primary">Data da reclamação: {this.state.date_description}</Button>{' '}
                            <Button variant="primary" onClick={() => { navigator.clipboard.writeText(this.state.uc) }}>UC: {this.state.uc}</Button>{' '}
                            <Button variant="primary">Nota: {this.state.complainer_note}</Button>{' '}
                            <Button variant="success" type='submit'>Salvar</Button>{' '}
                        </Stack>
                    </Row>
                    <Row>
                        <Col>
                            <hr></hr>

                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Dados da reclamação </Accordion.Header>
                                    <Accordion.Body>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>RA ID</Form.Label>
                                            <Form.Control type="text" id="ra_id" className="ra_id" value={this.state.ra_id} onChange={this.onChange} />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Título</Form.Label>
                                            <Form.Control type="text" id="title" className="title" value={this.state.title} onChange={this.onChange} />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Descrição</Form.Label>
                                            <Form.Control as="textarea" id="description" className="description" rows={5} value={this.state.description} onChange={this.onChange} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Data</Form.Label>
                                            <Form.Control type="text" id="date_description" className="date_description" value={this.state.date_description} onChange={this.onChange} />
                                        </Form.Group>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            <hr></hr>
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Dados do fechamento da reclamação</Accordion.Header>
                                    <Accordion.Body>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>ID da Ocorrência</Form.Label>
                                            <Form.Control type="text" id="id_occurrence" className="id_occurrence" value={this.state.id_occurrence} onChange={this.onChange} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Sub-motivo</Form.Label>
                                            <Form.Control type="text" id="system_sub_reason" className="system_sub_reason" value={this.state.system_sub_reason} onChange={this.onChange} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Nota</Form.Label>
                                            <Form.Control type="text" id="complainer_note" className="complainer_note" value={this.state.complainer_note} onChange={this.onChange} />
                                        </Form.Group>

                                        <Form.Group className="mb-3" >
                                            <Form.Label>Faria negócio novamente?</Form.Label>
                                            <Form.Select id="negotiate_again" className="negotiate_again" value={this.state.negotiate_again} onChange={this.onChange}>
                                                <option value="Sim">Sim</option>
                                                <option value="Não">Não</option>
                                            </Form.Select>
                                        </Form.Group>

                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            <hr></hr>
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Dados do reclamador</Accordion.Header>
                                    <Accordion.Body>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Nome</Form.Label>
                                            <Form.Control type="text" id="name" className="name" value={this.state.name} onChange={this.onChange} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>CPF</Form.Label>
                                            <Form.Control type="text" id="cpf" className="cpf" value={this.state.cpf} onChange={this.onChange} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>UC</Form.Label>
                                            <Form.Control type="text" id="uc" className="uc" value={this.state.uc} onChange={this.onChange} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Cidade</Form.Label>
                                            <Form.Control type="text" id="city" className="city" value={this.state.city} onChange={this.onChange} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>E-mail</Form.Label>
                                            <Form.Control type="email" id="email" className="email" value={this.state.email} onChange={this.onChange} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Telefone</Form.Label>
                                            <Form.Control type="text" id="phone" className="phone" value={this.state.phone} onChange={this.onChange} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>É cliente?</Form.Label>
                                            <Form.Select id="negotiate_again" className="negotiate_again" value={this.state.negotiate_again} onChange={this.onChange}>
                                                <option value="Sim">Sim</option>
                                                <option value="Não">Não</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>

                            <hr></hr>
                        </Col>
                    </Row>
                    <Row>
                        <Col>

                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        </Col>
                    </Row>
                </Form>
            </Container>
        )
    }
}

export default withRouter(Complaint);
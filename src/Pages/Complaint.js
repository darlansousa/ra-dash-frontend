import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Accordion from 'react-bootstrap/Accordion';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import withRouter from '../withRouter'


class Complaint extends Component {
    error = false
    state = {
        classifications: [],
        item: {
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
            "ai_classification": "",
            "negotiate_again": "",
            "name": "",
            "cpf": "",
            "uc": "",
            "city": "",
            "email": "",
            "phone": "",
            "is_client": ""
        }
    }

    save(item) {
        fetch(`${process.env.REACT_APP_API_HOST}/complaints/${this.props.params.id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: item.id,
                ra_cod: item.ra_cod,
                ra_id: item.ra_id,
                title: item.title,
                date_description: item.date_description,
                chanel: item.chanel,
                reason: item.reason,
                description: item.description,
                complainer_id: item.complainer_id,
                id_occurrence: item.id_occurrence,
                close_date: item.close_date,
                system_sub_reason: item.system_sub_reason,
                complainer_note: item.complainer_note,
                complaints_status: item.complaints_status,
                ai_classification: item.ai_classification,
                negotiate_again: item.negotiate_again,
                name: item.name,
                cpf: item.cpf,
                uc: item.uc,
                city: item.city,
                email: item.email,
                phone: item.phone,
                is_client: item.is_client
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

    saveComplaint() {
        fetch(`${process.env.REACT_APP_API_HOST}/complaints/${this.props.params.id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.item.id,
                ra_cod: this.state.item.ra_cod,
                ra_id: this.state.item.ra_id,
                title: this.state.item.title,
                date_description: this.state.item.date_description,
                chanel: this.state.item.chanel,
                reason: this.state.item.reason,
                description: this.state.item.description,
                complainer_id: this.state.item.complainer_id,
                id_occurrence: this.state.item.id_occurrence,
                close_date: this.state.item.close_date,
                system_sub_reason: this.state.item.system_sub_reason,
                complainer_note: this.state.item.complainer_note,
                complaints_status: this.state.item.complaints_status,
                ai_classification: this.state.item.ai_classification,
                negotiate_again: this.state.item.negotiate_again,
                name: this.state.item.name,
                cpf: this.state.item.cpf,
                uc: this.state.item.uc,
                city: this.state.item.city,
                email: this.state.item.email,
                phone: this.state.item.phone,
                is_client: this.state.item.is_client
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

    onChange = e => {
        this.setState({ item: { ...this.state.item, [e.target.id]: e.target.value } })
    }

    getItem() {
        fetch(`${process.env.REACT_APP_API_HOST}/complaints/${this.props.params.id}`)
            .then(response => response.json())
            .then(item => this.setState({ item: item }))
            .catch(err => console.log(err))
    }

    classifyWithAI(item) {
        fetch(`${process.env.REACT_APP_API_AI_HOST}/classify/valentini`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: item.ra_id,
                title: item.title,
                description: item.description
            })
        })
            .then(response => response.json())
            .then(json => {
                let property = 'ai_classification'
                if (json.category !== undefined) {
                    this.setState({ item: { ...this.state.item, [property]: json.category.description } })
                    this.save({ ...this.state.item, [property]: json.category.description })
                } else {
                    window.alert(`Houve um erro ao classificar`)
                }
            })
            .catch(err => console.log(err))
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
        this.saveComplaint()
    }

    componentDidMount() {
        this.getItem()
        this.getClassifications()
    }

    render() {
        return (
            <Container className="Complaint">
                <Form onSubmit={this.submitFormEdit} validated>
                    <Row>
                        <p></p>
                    </Row>
                    <Row>
                        <Stack direction="horizontal" gap={2}>
                            <ButtonGroup aria-label="Basic example">
                                <Button variant="info" href="/complaints">Voltar</Button>
                                <Button variant="primary">{this.state.item.complaints_status === 'closed' ? 'Respondida' : 'Resposta pendente'}</Button>
                                <Button variant="primary" target='_blank' href={(`${process.env.REACT_APP_COMPLAINTS_LINK}` + this.state.item.ra_cod)}>Acessar no reclame aqui</Button>
                                <Button variant="primary" onClick={() => { navigator.clipboard.writeText(this.state.item.uc) }}> Copiar UC {this.state.item.uc}</Button>
                                <Button variant="primary">Nota: {this.state.item.complainer_note ? this.state.item.complainer_note : 'Pendente'}</Button>
                                {this.state.item.ai_classification ? ('') : (
                                    <DropdownButton as={ButtonGroup} title="IA" id="bg-nested-dropdown">
                                        <Dropdown.Item eventKey="1" onClick={() => this.classifyWithAI(this.state.item)}>Classificar esta reclamação com IA</Dropdown.Item>
                                    </DropdownButton>
                                )}
                                <Button variant="success" type='submit'>Salvar</Button>
                            </ButtonGroup>
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
                                            <Form.Control type="text" id="ra_id" className="ra_id" value={this.state.item.ra_id} onChange={this.onChange} required />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Título</Form.Label>
                                            <Form.Control type="text" id="title" className="title" value={this.state.item.title} onChange={this.onChange} required />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Descrição</Form.Label>
                                            <Form.Control as="textarea" id="description" className="description" rows={5} value={this.state.item.description} onChange={this.onChange} required />
                                        </Form.Group>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Data</Form.Label>
                                            <Form.Control type="text" id="date_description" className="date_description" value={this.state.item.date_description} onChange={this.onChange} required />
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
                                            <Form.Control type="text" id="id_occurrence" className="id_occurrence" value={this.state.item.id_occurrence} onChange={this.onChange} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Sub-motivo</Form.Label>
                                            {this.state.item.ai_classification === null ? <Button onClick={() => this.classifyWithAI(this.state.item)} variant="link">Classifique essa reclamação com IA</Button> : <p>Reclamação classificada como: {this.state.item.ai_classification}</p>}

                                            <Form.Select id="system_sub_reason" className="system_sub_reason" value={this.state.item.system_sub_reason} onChange={this.onChange}>
                                                {
                                                    this.state.classifications.map(reason => {
                                                        return (<option key={reason.id} value={reason.description}>{reason.description}</option>)
                                                    })
                                                }
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Nota</Form.Label>
                                            <Form.Control type="text" id="complainer_note" className="complainer_note" value={this.state.item.complainer_note} onChange={this.onChange} pattern="[0-9]|10" />
                                        </Form.Group>

                                        <Form.Group className="mb-3" >
                                            <Form.Label>Faria negócio novamente?</Form.Label>
                                            <Form.Select id="negotiate_again" className="negotiate_again" value={this.state.item.negotiate_again} onChange={this.onChange}>
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
                                            <Form.Control type="text" id="name" className="name" value={this.state.item.name} onChange={this.onChange} required />
                                        </Form.Group>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>CPF</Form.Label>
                                            <Form.Control type="text" id="cpf" className="cpf" value={this.state.item.cpf} onChange={this.onChange} required />
                                        </Form.Group>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>UC</Form.Label>
                                            <Form.Control type="text" id="uc" className="uc" value={this.state.item.uc} onChange={this.onChange} required />
                                        </Form.Group>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Cidade</Form.Label>
                                            <Form.Control type="text" id="city" className="city" value={this.state.item.city} onChange={this.onChange} required />
                                        </Form.Group>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>E-mail</Form.Label>
                                            <Form.Control type="email" id="email" className="email" value={this.state.item.email} onChange={this.onChange} required />
                                        </Form.Group>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Telefone</Form.Label>
                                            <Form.Control type="text" id="phone" className="phone" value={this.state.item.phone} onChange={this.onChange} required />
                                        </Form.Group>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>É cliente?</Form.Label>
                                            <Form.Select id="negotiate_again" className="negotiate_again" value={this.state.item.negotiate_again} onChange={this.onChange}>
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
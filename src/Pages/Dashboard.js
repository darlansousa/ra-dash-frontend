import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, AreaChart, Area, RadialBarChart, RadialBar } from 'recharts';
import Card from 'react-bootstrap/Card';



class Dashboard extends Component {
    date = new Date()
    state = {}

    getRandomColor() {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }

    getDash() {
        fetch(`${process.env.REACT_APP_API_HOST}/dash`)
            .then(response => response.json())
            .then(item => {
                this.setState(item)
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.getDash()
    }

    render() {

        const renderBarChartCountByMonth = (
            <BarChart width={475} height={300} data={this.state.count_by_month}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill={this.getRandomColor()} name='Número de reclamações'/>
            </BarChart>
        );

        const renderBarChartReason = (
            <BarChart width={1200} height={300} data={this.state.count_by_reason}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="reason" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill={this.getRandomColor()} name='Número de reclamações'/>
            </BarChart>
        );


        const renderBarChartNotesByMonth = (
            <BarChart width={475} height={300} data={this.state.notes_by_month}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="avg" fill={this.getRandomColor()} name='Média de nota'/>
            </BarChart>
        );

        const renderAreaChartTimeService = (
            <AreaChart width={475} height={300} data={this.state.service_time_by_month}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="month" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="avg" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" name='Tempo médio até a resposta'/>
            </AreaChart>
        )

        const renderRadialChartStateCount = (
            <RadialBarChart
                width={575}
                height={300}
                innerRadius="10%"
                outerRadius="80%"
                data={this.state.count_by_state}
                startAngle={180}
                endAngle={0}
            >
                <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey='count' name='Número de reclamações' />
                <Legend iconSize={10} width={120} height={140} layout='horizontal' verticalAlign='middle' align="lefit" />
                <Tooltip />
            </RadialBarChart>
        )

        return (
            <Container className="Dashboard">
                <p></p>
                <Row>
                    <h2>Dashboard RA</h2>
                    <p>Ultima atualização: {this.date.toLocaleDateString() +" " + this.date.toLocaleTimeString()} </p>
                </Row>
                <Row>
                    <Col>
                        <Card style={{ width: '15rem', margin: '10px', textAlign: 'center' }}>
                            <Card.Body>
                                <Card.Title>Total de reclamações</Card.Title>
                                <Card.Text>
                                    <h2>{this.state.total}</h2>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '15rem', margin: '10px', textAlign: 'center' }}>
                            <Card.Body>
                                <Card.Title>Total Respondidas</Card.Title>
                                <Card.Text>
                                    <h2>{this.state.closed}</h2>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '15rem', margin: '10px', textAlign: 'center' }}>
                            <Card.Body>
                                <Card.Title>Nota RA</Card.Title>
                                <Card.Text>
                                    <h2>7.1</h2>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '15rem', margin: '10px', textAlign: 'center' }}>
                            <Card.Body>
                                <Card.Title>NPS</Card.Title>
                                <Card.Text>
                                    <h2>{this.state.nps}</h2>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <Card style={{ margin: '10px', textAlign: 'center' }}>
                            <Card.Body>
                                <Card.Title>Reclamações registradas por mês</Card.Title>
                                {renderBarChartCountByMonth}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ margin: '10px', textAlign: 'center' }}>
                            <Card.Body>
                                <Card.Title>Média de notas de reclamações respondidas por mês</Card.Title>
                                {renderBarChartNotesByMonth}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ margin: '10px', textAlign: 'center' }}>
                            <Card.Body>
                                <Card.Title>Tempo médio de resposta por mês</Card.Title>
                                {renderAreaChartTimeService}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ margin: '10px', textAlign: 'center' }}>
                            <Card.Body>
                                <Card.Title>Reclamações por estado</Card.Title>
                                {renderRadialChartStateCount}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ margin: '10px', textAlign: 'center' }}>
                            <Card.Body>
                                <Card.Title>Top 10 motivos de reclamações</Card.Title>
                                {renderBarChartReason}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Dashboard
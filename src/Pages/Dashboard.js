import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Pie, Cell, PieChart, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, AreaChart, Area, RadialBarChart, RadialBar } from 'recharts';
import Card from 'react-bootstrap/Card';



class Dashboard extends Component {
    date = new Date()
    state = {

    }

    getRandomColor() {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }

    buildBarChart(data, title, label, width, height) {
        return (
            <Card style={{ margin: '10px', textAlign: 'center' }}>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <BarChart width={width} height={height} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill={this.getRandomColor()} name={label} />
                    </BarChart>
                </Card.Body>
            </Card>
        )
    }

    buildRadialChart(data, title, label, width, height) {
        const dataWithFill = data.map( item => {
            return {'fill' : this.getRandomColor(), 'name' : item.name, 'value': item.value}
        })
        return (
            <Card style={{ margin: '10px', textAlign: 'center' }}>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <RadialBarChart
                        width={width}
                        height={height}
                        innerRadius="10%"
                        outerRadius="80%"
                        data={dataWithFill}
                        startAngle={180}
                        endAngle={0}
                    >
                        <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey='value' name={label} />
                        <Legend iconSize={10} width={120} height={140} layout='horizontal' verticalAlign='middle' align="lefit" />
                        <Tooltip />
                    </RadialBarChart>
                </Card.Body>
            </Card>
        )
    }

    builAreaChart(data, title, label, width, height) {
        return (
            <Card style={{ margin: '10px', textAlign: 'center' }}>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <AreaChart width={width} height={height} data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" name={label} />
                    </AreaChart>
                </Card.Body>
            </Card>
        )
    }

    buildPieChart(data, title, width, height) {
        data = data.map(item => {
            return {name: item.name, value: parseFloat(item.value)}
        })
        const COLORS = ['#90DF39', '#D7341C', '#FCBE00'];

        const RADIAN = Math.PI / 180;
        const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
                <text x={x} y={y} fill='#000000' textAnchor={x > cx ? 'start' : 'end'}>
                    {`${data[index].name} - ${(percent * 100).toFixed(0)}%`}
                </text>
            );
        };
        return (
            <Card style={{ margin: '10px', textAlign: 'center' }}>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <PieChart width={width} height={height}>
                        <Pie
                            data={data}
                            cx={250}
                            cy={150}
                            labelLine={false}
                            innerRadius={50}
                            outerRadius={100}
                            label={renderCustomizedLabel}
                            fill="#8884d8"
                            paddingAngle={0}
                            dataKey="value">
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} label={entry.name} />
                            ))}
                        </Pie>
                    </PieChart>
                </Card.Body>
            </Card>

        )
    }

    getDashItem(type) {
        const options = {
            headers: new Headers({ 'chart_type': type }),
        };
        fetch(`${process.env.REACT_APP_API_HOST}/dash`, options)
            .then(response => response.json())
            .then(item => {
                this.setState({ [type]: item })
                console.log(type)
                console.log(this.state)
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {

        const items = ['big_numbers',
            'count_by_month',
            'notes_by_month',
            'service_time_by_month',
            'count_by_state',
            'count_by_reason',
            'percentage_nps']

        items.forEach(item => {
            this.getDashItem(item)
        })

    }

    render() {
        return (
            <Container className="Dashboard">
                <p></p>
                <Row>
                    <h2>Dashboard RA</h2>
                    <p>Ultima atualização: {this.date.toLocaleDateString() + " " + this.date.toLocaleTimeString()} </p>
                </Row>
                <Row>
                    <Col>
                        <Card style={{ width: '15rem', margin: '10px', textAlign: 'center' }}>
                            <Card.Body>
                                <Card.Title>Total de reclamações</Card.Title>
                                <Card.Text>
                                    <h2>{this.state.big_numbers ? this.state.big_numbers[0].total : 0}</h2>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '15rem', margin: '10px', textAlign: 'center' }}>
                            <Card.Body>
                                <Card.Title>Total Respondidas</Card.Title>
                                <Card.Text>
                                    <h2>{this.state.big_numbers ? this.state.big_numbers[0].closed : 0}</h2>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '15rem', margin: '10px', textAlign: 'center' }}>
                            <Card.Body>
                                <Card.Title>Aguradando resposta</Card.Title>
                                <Card.Text>
                                    <h2>{this.state.big_numbers ? this.state.big_numbers[0].pending : 0}</h2>
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

                </Row>
                <Row>
                    <h4>NPS</h4>
                    <Col>
                        <Card
                            bg={'info'}
                            key={'info'}
                            style={{ width: '100%', margin: '10px', textAlign: 'center' }}
                            className="mb-1"
                        >
                            <Card.Body>
                                <Card.Title>Score NPS</Card.Title>
                                <Card.Text>
                                    <p style={{ 'fontSize': "20px" }}>{this.state.big_numbers ? this.state.big_numbers[0].nps : 0}</p>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        {this.state.percentage_nps ? this.buildPieChart(this.state.percentage_nps, 'Percentuais por perfil', 475, 300) : ''}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.state.count_by_month ? this.buildBarChart(this.state.count_by_month, 'Reclamações registradas por mês', 'Número de reclamações', 475, 300) : ''}
                    </Col>
                    <Col>
                        {this.state.notes_by_month ? this.buildBarChart(this.state.notes_by_month, 'Média de notas de reclamações respondidas por mês', 'Nota média', 475, 300) : ''}
                    </Col>
                    <Col>
                        {this.state.service_time_by_month ? this.buildBarChart(this.state.service_time_by_month, 'Tempo médio de resposta por mês', 'Temo médio em dias', 475, 300) : ''}
                    </Col>
                    <Col>
                        <Card style={{ margin: '10px', textAlign: 'center' }}>
                            <Card.Body>
                                <Card.Title>Reclamações por estado</Card.Title>

                            </Card.Body>
                        </Card>
                        {this.state.count_by_state ? this.buildRadialChart(this.state.count_by_state, 'Tempo médio de resposta por mês', 'Temo médio em dias', 475, 300) : ''}
                    </Col>
                    <Col>
                        {this.state.count_by_reason ? this.buildBarChart(this.state.count_by_reason, 'Top 10 motivos de reclamações', 'Número de relamações', 1000, 300) : ''}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Dashboard
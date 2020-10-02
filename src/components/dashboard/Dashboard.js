//React
import React from 'react'

//Ant Design
import { Row, Col, Card, Statistic, Typography } from 'antd'

import { ArrowUpOutlined, ArrowDownOutlined
 } from '@ant-design/icons'

//Components
import { Chart, Tooltip, Axis, Bar,
        Legend, Line, Point } from 'viser-react';



const { Title, Text } = Typography

const Dashboard = () =>{
    
    const DataSet = require('@antv/data-set')

    const dataCaudal = [
        { dia: 'Lunes', 'litros/segundos': 10 },
        { dia: 'Martes', 'litros/segundos': 5 },
        { dia: 'Miercoles', 'litros/segundos': 20 },
        { dia: 'Jueves', 'litros/segundos': 15 },
        { dia: 'Viernes', 'litros/segundos': 25 },        
    ]

    const dataFreatico = [
        { dia: 'Lunes', metros: 15 },
        { dia: 'Martes', metros: 18 },
        { dia: 'Miercoles', metros: 10 },
        { dia: 'Jueves', metros: 13 },
        { dia: 'Viernes', metros: 8 },        
    ]

    const sourceData = [
        { month: 'Lunes', 'Caudal(litros/segundos)': 10, 'Nivel Freático(metros)': 15 },
        { month: 'Martes', 'Caudal(litros/segundos)': 5, 'Nivel Freático(metros)': 18 },
        { month: 'Miercoles', 'Caudal(litros/segundos)': 20, 'Nivel Freático(metros)': 10 },
        { month: 'Jueves', 'Caudal(litros/segundos)': 15, 'Nivel Freático(metros)': 13 },
        { month: 'Viernes', 'Caudal(litros/segundos)': 25, 'Nivel Freático(metros)': 8 },        
      ]

      const dv = new DataSet.View().source(sourceData);
      dv.transform({
        type: 'fold',
        fields: ['Caudal(litros/segundos)', 'Nivel Freático(metros)'],
        key: 'city',
        value: 'temperature',
      });
      const data = dv.rows;
      
      const scale = [{
        dataKey: 'month',
        min: 0,
        max: 1,
      }];
    
    
    return(
        
            <>          
            <Row>
                <Col span={24}>
                    <Card>
                        <Card.Grid>
                            <Row>                                
                                <Col>                                    
                                    <Statistic
                                        title="Caudal(litros/segundos)"
                                        value={11.28}
                                        precision={2}
                                        valueStyle={{ color: '#3f8600' }}
                                        prefix={<ArrowUpOutlined />}
                                        
                                    />
                                </Col>                               
                            </Row>
                        </Card.Grid >
                        <Card.Grid>
                            <Row>
                            <Col>                                    
                                <Statistic
                                    title="Nivel Freático(metros)"
                                    value={9.3}
                                    precision={2}
                                    valueStyle={{ color: '#cf1322' }}
                                    prefix={<ArrowDownOutlined />}
                                    
                                />
                            </Col>
                            </Row>
                        </Card.Grid>
                        <Card.Grid>
                            <Row>
                            <Col>                                    
                                <Statistic
                                    title="Ultima Actualización de datos"
                                    value={'10/10/2020 12:00:45 hrs'}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}                             
                                />
                            </Col>
                            </Row>
                        </Card.Grid>
                    </Card>
                </Col>
            </Row>            
            <Row style={{marginTop:'80px'}}> 
                <Col span={12}>
                    <Title level={4} style={{textAlign:'center'}}>Caudal</Title>
                    <Chart autoFill width={600} height={400} data={dataCaudal}>
                        <Tooltip shared = {true} />
                        <Axis />
                        <Bar position="dia*litros/segundos" />
                    </Chart>
                </Col>

                <Col span={12} >
                    <Title level={4} style={{textAlign:'center'}}>Nivel Freático</Title>
                    <Chart width={600} height={400} data={dataFreatico}>
                        <Tooltip />
                        <Axis />
                        <Bar position="dia*metros" />
                    </Chart>
                    
                </Col>
            </Row>
            <Row style={{marginTop:'80px'}}> 
                <Col span={24}>
                    <Title level={4} style={{textAlign:'center'}}>Caudal - Nivel Freático</Title>
                    <Chart width={1100} height={500} data={data} scale={scale}>
                        <Tooltip />
                        <Axis />
                        <Legend />
                        <Line position="month*temperature" color="city" />
                        <Point position="month*temperature" color="city" size={4} style={{ stroke: '#fff', lineWidth: 1 }} shape="circle"/>
                    </Chart>
                </Col>

               
            </Row>
            <Row>
            <Col span={24}>
                    <Card>
                        <Card.Grid>
                            <Row>                                
                                <Col>                                                                        
                                    <Title level={5}>Consumo máximo por hora</Title>
                                    <Text style={{color:'#1890ff', fontSize:'20px'}}>8520 Litros</Text>
                                </Col>                               
                            </Row>
                        </Card.Grid >
                        <Card.Grid>
                            <Row>                                
                                <Col>                                                                        
                                    <Title level={5}>Cantidad de estanques llenados, ultimas 24hrs</Title>
                                    <Text style={{color:'#1890ff', fontSize:'20px'}}>4,87</Text>
                                </Col>                               
                            </Row>
                        </Card.Grid >
                        <Card.Grid>
                            <Row>                                
                                <Col>                                                                        
                                    <Title level={5}>Tiempo máximo recuperación pozo</Title>
                                    <Text style={{color:'#1890ff', fontSize:'20px'}}>192 Segundos</Text>
                                </Col>                               
                            </Row>
                        </Card.Grid >

                        
                    </Card>
                </Col>
            </Row>
            </>
        
        )
}

export default Dashboard
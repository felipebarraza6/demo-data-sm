//React
import React, { useState} from 'react'

//Ant Design
import { Row, Col, Card, Statistic, Typography } from 'antd'

import { ArrowUpOutlined, ArrowDownOutlined
 } from '@ant-design/icons'

//Components
import { Chart, Tooltip, Axis, Bar,
        Legend, Line, Point } from 'viser-react';

const { Countdown } = Statistic


const { Title, Text } = Typography
let deadline = Date.now() + 1 * 60 * 60 * 24 * 24 + 1000 * 30; 
function onFinish() {
    window.location.reload()
  }
  
const Dashboard = () =>{
    
    const caudal_init = 2.28
    const colorc_init = 'green'
    

    const nivel_init = 9.30
    const colorn_init = 'green'

    const [caudal, setCaudal] = useState(caudal_init)
    const [nivel, setNivel] = useState(nivel_init)

    const [colorCaudal, setColorCaudal] = useState(colorc_init)
    const [colorNivel, setColorNivel] = useState(colorn_init)

    function setValues(){
    
        setTimeout(() => {
            if(caudal < 0.10){
                setCaudal(2.28)
                setColorCaudal('green')
            }else{
                setCaudal(caudal-0.01)
                setColorCaudal('red')
                
            }                        
        }, 1000)

        setTimeout(() => {
            if(nivel > 12.09){
                setNivel(9.30)
                setColorNivel('red')

            }else{
                setNivel(nivel+0.01)
                setColorNivel('green')
            }                        
        }, 2000)

        
    }
    setValues()
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
                                        value={caudal}
                                        precision={2}
                                        valueStyle={{ color: colorCaudal }}
                                        prefix={caudal > 2.28 ? <ArrowUpOutlined />:<ArrowDownOutlined />}
                                        
                                    />
                                </Col>                               
                            </Row>
                        </Card.Grid >
                        <Card.Grid>
                            <Row>
                            <Col>                                    
                                <Statistic
                                    title="Nivel Freático(metros)"
                                    value={nivel}
                                    precision={2}
                                    valueStyle={{ color: colorNivel }}
                                    prefix={nivel === 9.30 ? <ArrowDownOutlined />:<ArrowUpOutlined />}
                                    
                                />
                            </Col>
                            </Row>
                        </Card.Grid>
                        <Card.Grid>
                            <Row>
                            <Col>                                                                    
                                <Countdown title="Proxima validacion de datos en:" value={deadline} format="HH:mm:ss:SSS" onFinish={onFinish} />
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
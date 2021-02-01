//React
import React, { useState, useEffect} from 'react'

//Ant Design
import { Row, Col, Card, Statistic, Typography } from 'antd'

//Components
import { Chart, Tooltip, Axis, Bar,
        Legend, Line, Point } from 'viser-react';

import {getting_list} from '../../novus_toga/endpoints'
const DataSet = require('@antv/data-set')


const { Countdown } = Statistic
const { Title } = Typography

let deadline = Date.now() + 0 * 60 * 60 * 24 * 24 + 1000 * 30; 

function onFinish() {
    window.location.reload()
  }
  
const Dashboard = () =>{
    
    var date_7_days = new Date() 
    date_7_days.setDate(date_7_days.getDate() -7)  
    let day = date_7_days.getDate()
    let month = date_7_days.getMonth() + 1
    let year= date_7_days.getFullYear()
    let string_date = `${year}-${month}-${day}`
    if(month < 10){
      string_date = `${year}-0${month}-${day}`
    }  
    
    var date_today = new Date()
    let day_t = date_today.getDate()
    let month_t = date_today.getMonth() + 1
    let year_t = date_today.getFullYear()
    let string_date_today = `${year_t}-${month_t}-${day_t}`
    if(month_t < 10){
      string_date_today = `${year_t}-0${month_t}-${day_t}`
    }


    const initialFreatic = {
      'values': null,
      'start_date': string_date,
      'end_date': string_date_today,
      'prom':0,
      'last_values': null
    }  
    
    const initialFlow = {
      'values': null,
      'start_date': string_date,
      'end_date': string_date_today,
      'prom': 0,
      'last_values': null  
      }

    const [freatic, setFreatic] = useState(initialFreatic)
    const [flow, setFlow] = useState(initialFlow)  
    
    const last_freatic = freatic.last_values
    const last_flow = flow.last_values

    useEffect(()=> {
        
      const get_freatic = async() => {
          var values = []
          var prom = 0
          var last_values = []

          const request_all = await  getting_list(
              '3grecuc1v',
              freatic.start_date,
              freatic.end_date,
              '999'
          ).then((response)=> {
              if(response.status === 200){
                  const values_freatic = response.data.result
                  let calc = 0
                  values_freatic.map((element)=>{
                    calc+=element.value
                  })
                  calc = calc / values_freatic.length
                  values = response.data.result
                  prom = calc
              }
          })
          const request_last = await getting_list(
              '3grecuc1v',
              freatic.start_date,
              freatic.end_date,
              '7'
          ).then((response)=>{
              if(response.status === 200){
                  last_values = response.data.result
              }
          })

            last_values.map((element, index)=>{
                last_values[index] = {
                  ...last_values[index],
                  'date_format':`${element.time.slice(5,10)} / ${element.time.slice(12,20)}Hrs`,
                  'MTRS': element.value
                }
            })
            setFreatic({
                ...freatic,
                values: values,
                prom: prom,
                last_values: last_values
            })
            return {
                request_all,
                request_last
            }
        }

        const get_flow = async() => {
          var values = []
          var prom = 0
          var last_values = []

          const request_all = await getting_list(
              '3grecuc2v',
              flow.start_date,
              flow.end_date,
              '999'
          ).then((response)=>{
              if(response.status === 200){
                  const values_flow = response.data.result
                  let calc = 0
                  values_flow.map((element)=>calc+=element.value)
                  calc = calc / values_flow.length
                  values = response.data.result
                  prom = calc
             }

          })
          const request_last = await getting_list(
              '3grecuc2v',
              flow.start_date,
              flow.end_date,
              '7'
          ).then((response)=>{
              if(response.status === 200){
                last_values=response.data.result  
              }
          })
          last_values.map((element, index)=> {
                last_values[index] = {
                    ...last_values[index],
                    'date_format':`${element.time.slice(5,10)} / ${element.time.slice(12,20)}Hrs`,
                    'LTRS': element.value
                }
          })
          setFlow({
              ...flow,
              values: values,
              prom: prom,
              last_values: last_values

          })
          return {
              request_all,
              request_last
          }
        }
        get_flow()
        get_freatic()
    
    },[])
    
   
    return(
            <>          
            <Row>
                <Col span={24}>
                    <Card>
                        <Card.Grid>
                            <Row>                                
                                <Col>                                    
                                    <Statistic
                                        title="Nivel Freatico / Metros"
                                        value={freatic.prom}
                                       // valueStyle={{ color: colorCaudal }}
                                    />
                                </Col>                               
                            </Row>
                        </Card.Grid >
                        <Card.Grid>
                            <Row>
                            <Col>                                    
                                <Statistic
                                    title="Flujo / Litros"
                                    value={flow.prom}
                                   // valueStyle={{ color: colorNivel }}
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
            <Row style={{marginTop:'40px'}}> 
                <Col span={24}>
                    <Title level={4} style={{textAlign:'center'}}>Nivel Freático / Metros</Title>
                    <Chart autoFill width={1100} height={400} data={freatic.last_values}>
                        <Tooltip shared = {true} />
                        <Axis />
                        <Bar position="date_format*MTRS" />
                    </Chart>
                </Col>

                <Col span={24} >
                    <Title level={4} style={{textAlign:'center'}}>Flujo / Litros</Title>
                    <Chart width={1100} height={400} data={flow.last_values}>
                        <Tooltip />
                        <Axis />
                        <Bar position="date_format*LTRS" />
                    </Chart>
                    
                </Col>
            </Row>
            </>
        
        )
}

export default Dashboard

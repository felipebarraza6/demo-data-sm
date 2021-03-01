import React, { useState, useEffect} from 'react'
import { Steps, Row, Typography } from 'antd'
import Polykarpo from './Polykarpo'
import Diteco from './Diteco'


let { Step  } = Steps


const Dashboard = () =>{
    const [current, setCurrent] = useState(0)
      
       return(
            <>
             <Row>
              <Steps current={current}  type='navigation' onChange={(current)=> setCurrent(current)}>
                <Step title={'Polykarpo'}  />
                <Step title={'Diteco'}  />
              </Steps>
            </Row>       
            <Row align='center'>
              {current === 0 && 
                <Polykarpo />                  
              }
              {current === 1 && 
                <Diteco />
              }
            </Row>
            
            
            </>
        
        )
}

export default Dashboard

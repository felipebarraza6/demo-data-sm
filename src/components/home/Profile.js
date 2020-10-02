import React, {useReducer, useEffect, useState } from 'react'

import {Button, Modal, Table, Drawer, Row, Col, Divider } from 'antd'
import {BorderlessTableOutlined, UserOutlined} from '@ant-design/icons'

import { reducer } from '../../reducers/profile.js'
import api from '../../api/endpoints'



export const Profile = () =>{

    const initialState = {
        loading: true,
        data:  null,
        error: null        
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Caudal(ltrs/seg)',
            dataIndex: 'client',
            key: 'client'
        },
        {
            title: 'Nivel Freático(mtrs)',
            dataIndex: 'employee',
            key: 'employee'
        }       
        
    ]

    const ModalTask = () =>{
        const dataTest=[]
        Modal.success({
            content: <Table columns={columns} dataSource={dataTest} pagination={{ pageSize: 3, simple:true}} rowKey='id'></Table>,
            title: `Datos asignados a @comiteaprelchacay@gmail.com`,
            width: '1220px'
        })
    }


    const [profile, setProfile] = useState({visible:false})

    const Profile = () =>{
        setProfile({
            visible:true
        })
    }

    const closeProfile = () => {
        setProfile({
            visible: false
        })
    }

    useEffect(() => {

        let isCalled = false

        const fetchData = async() => {

            try{
                const response = await api.user.profile()

                if(!isCalled){
                    dispatch({
                        type: 'GET_PROFILE',
                        loading: false,
                        payload: response
                    })
                }
            }catch(error){
                dispatch({
                    loading: false,
                    error:error.message
                })
            }
        }

        fetchData()

        return () => {
            isCalled = true
        }

    }, [])
    
    return (
        <React.Fragment>

            {!state.loading &&
                <Drawer
                    width='400px'
                    visible={profile.visible}
                    onClose={closeProfile}
                    closable={false}
                    title={<><UserOutlined/> {state.data.data.user.email}</>}
                >
                    <Row style={{marginTop:'50px'}}>
                        <Col flex={2}>
                            <p>Usuario</p>
                            <p>Nombre</p>
                            <p>Apellido</p>
                            <p>Email</p>
                        </Col>
                        <Col flex={3}>
                            <p>{state.data.data.user.username}</p>
                            <p>{state.data.data.user.first_name}</p>
                            <p>{state.data.data.user.last_name}</p>
                            <p>{state.data.data.user.email}</p>
                        </Col>
                        <Divider />
                    </Row>

                </Drawer>
            }
            

            <Button onClick={ModalTask} type='primary' style={{marginRight:'15px'}}>
                <BorderlessTableOutlined style={{marginRight:'3px'}} />
                0
                <i style={{paddingLeft:'15px'}}>Notificaciones</i>
            </Button>

            <Button onClick={Profile} type='link' style={{color:'white'}}>
            <UserOutlined style={{fontSize:'20px', paddingRight:'5px'}} />
                comiteaprelchacay@gmail.com
            </Button>
        </React.Fragment>
    )
}

export default Profile
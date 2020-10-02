//React 
import React from 'react'

//Antd
import { Layout, Menu  } from 'antd'

// Antd Icons
import { DashboardOutlined } from '@ant-design/icons'

//Build
import logo from '../build/images/logo-white.png'

//Components
import MenuHeader from '../components/home/MenuHeader'
import Dashboard from '../components/dashboard/Dashboard'
import NotFound from '../components/errors/NotFound'

// React Router
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

const { Header, Content, Sider } = Layout


const Home = () =>{
        return(
          <BrowserRouter>
            <Layout style={{ minHeight: '100vh' }}>            
            <Sider style={{padding:'20px'}}>
              <div style={{alignItems:'center'}}>
                  <img alt='logo' style={{width:'90%', marginRight:'50px', marginTop:'40px', marginBottom:'40px'}} src={logo} />
              </div>
              
              <Menu theme="dark" mode="inline">
                <Menu.Item key="1">
                    <Link to="/">
                    <DashboardOutlined style={{marginRight:'5px'}}/>
                     Panel de Datos
                     </Link>
                </Menu.Item>                 
              </Menu>
              
            </Sider>

            <Layout>              
            <Header >
                <MenuHeader />                                        
            </Header>
              <Content>
                
                <div style={{ padding: 24, minHeight: 360, textAlign:'left' }}>
                  <Switch>                
                    <Route exact path='/' component={Dashboard} />
                    <Route path="*" component={NotFound} />
                 </Switch>
                </div>
                
              </Content>              
            </Layout>

          </Layout>
          </BrowserRouter>

                            
        )
    }


export default Home
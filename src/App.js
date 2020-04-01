import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Layout } from 'antd'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  NavLink
} from "react-router-dom";
import { withRouter } from "react-router";
import { Provider } from 'react-redux'
import configureStore from './store'
import { setA } from './actions/setting';

import { Home } from './router/Home'
import { About } from './router/About'
import { WrappedDemo } from './router/User'
import { Row, Col } from 'antd';
import { ThemeContext, themes } from './services';
import { ErrorBoundary } from './components/ErrorBoundary';
const { Header, Footer, Content } = Layout;

const store = configureStore()
// store.dispatch(setA(103))


// const { Home } = lazy(() => import('./router/Home'));
// const { About } = lazy(() => import('./router/About'));
// const { User } = lazy(() => import('./router/User'));
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      theme: themes.light,
    }

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };
  }
  
  handleClick = () => {
    this.setState({show: true})
  }
  render() {
    return (

      <Provider store={store}>
        <ErrorBoundary>
          <ThemeContext.Provider value={this.state.theme}>
            <div className="App">
              <Layout>
                <Header>
                  <nav>
                    <Row>
                      <Col span={6}>
                        <NavLink to="/">Home</NavLink>
                      </Col>
                      <Col span={6}>
                        <NavLink to="/about">About</NavLink>
                      </Col>
                      <Col span={6}>
                        <NavLink to={{pathname: '/user', state: {id: 90909099}}}>Users</NavLink>
                      </Col>
                      <Col span={6}>
                        <span style={{color: '#fff'}} onClick={this.toggleTheme}>点击</span>
                      </Col>
                    </Row>
                  </nav>
                </Header>
                <Content>
                  <Switch>
                    <Route path="/about" component={About}>
                      {/* <About /> */}
                    </Route>
                    <Route path="/user">
                      <WrappedDemo />
                    </Route>
                    <Route exact path="/">
                      <Home/>
                    </Route>

                    {/* <Route
                      render={({ location }) =>
                        false ? (
                          <About/>
                        ) : (
                          <Redirect
                            to={{
                              pathname: "/",
                            }}
                          />
                        )
                      }
                    /> */}
                    <Redirect
                      to={{
                        pathname: "/",
                      }}
                    />
                  </Switch>
                </Content>
                <Footer>
                  Footer
                </Footer>
              </Layout>
            </div>
          </ThemeContext.Provider>
        </ErrorBoundary>
      </Provider>
    )
  }
}

export default withRouter(App);

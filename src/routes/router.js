import React from 'react';
// import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
// TODO 是否使用hashRouter
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from '../views/noFound/NoFound';
import Login from '../views/login/Login';
import MyLayout from '../components/layout';

export default class CRouter extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" render={() => <Redirect to="/app/dashboard" push/>}/>
                    <Route path="/app" component={MyLayout}/>
                    <Route path="/404" component={NotFound}/>
                    <Route path="/login" component={Login}/>
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        )
    }
}

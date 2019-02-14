import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import routesConfig from './config';
import AllComponents from '../components/index'


class CRouter extends Component {
    render() {
        return (
            <Switch>
                {
                    Object.keys(routesConfig).map(key => {
                        routesConfig[key].map(r => {
                            
                            const route = r => {
                                const Comp = AllComponents[r.component]
                                console.log(r.key);
                                
                                return (
                                    <Route 
                                    key={r.key }
                                    exact
                                    path={r.key}
                                    component={props => <Comp {...props}></Comp>}
                                    />
                                )
                            }
                            return r.component ? route(r) : r.subs.map(r => route(r));
                        })
                    })
                }
            </Switch>
        );
    }
}

export default CRouter;
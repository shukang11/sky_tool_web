import { Redirect, Route } from 'react-router-dom';

import React from 'react';
import Authorized from './Authorized';
import { IAuthorityType } from './CheckPermissions';

interface AuthorizedRoutePops {
  currentAuthority: string;
  component: React.ComponentClass<any, any>;
  render: (props: any) => React.ReactNode;
  redirectPath: string;
  authority: IAuthorityType;
}

class AuthorizedRoute extends React.Component<AuthorizedRoutePops, {}> {
    render() {
        const {
            component: Component,
            render,
            authority,
            redirectPath,
            ...rest
          } = this.props;
        return (
            <Authorized
              authority={authority}
              noMatch={<Route {...rest} render={() => <Redirect to={{ pathname: redirectPath }} />} />}
            >
              <Route
                {...rest}
                render={(props: any) => (Component ? <Component {...props} /> : render(props))}
              />
            </Authorized>
          );
    }
};

export default AuthorizedRoute;

import * as React from 'react';
import { Button, Input, Form } from 'antd';

interface ILoginProps {

}

interface ILoginState {
    name: string;
    password: string;
}

class LoginComp extends React.Component<ILoginProps, ILoginState> {
    render() {
        return (
            <div>
                <Input placeholder='请输入用户名'></Input>
                <Input placeholder='密码' required={true} ></Input>
            </div>
        );
    }
}

export default LoginComp;
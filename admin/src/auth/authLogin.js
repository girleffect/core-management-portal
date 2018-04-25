import React, { Component } from 'react';
import { connect } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import LockIcon from 'material-ui/svg-icons/action/lock-outline';
import { pink500, pink300 } from 'material-ui/styles/colors';

import { userLogin } from 'admin-on-rest';

import { muiTheme, styles } from '../Theme'
import { GenerateQueryString } from '../utils';

const OIDC_PROVIDER_URL = process.env.REACT_APP_AUTHORIZATION_ENDPOINT;
const OIDC_PROVIDER_SCOPE = 'openid profile roles';
const OIDC_PROVIDER_CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const OIDC_PROVIDER_REDIRECT_URI = process.env.REACT_APP_PORTAL_URL + process.env.REACT_APP_PORTAL_LOGIN_CALLBACK
const OIDC_PROVIDER_STATE = btoa(new Date());
const OIDC_PROVIDER_NONCE = btoa(OIDC_PROVIDER_STATE);

const oidc_query_arguments = {
    scope: `${OIDC_PROVIDER_SCOPE}`,
    response_type: `id_token token`,
    client_id: `${OIDC_PROVIDER_CLIENT_ID}`,
    redirect_uri: `${OIDC_PROVIDER_REDIRECT_URI}`,
    state: `${OIDC_PROVIDER_STATE}`,
    nonce: `${OIDC_PROVIDER_NONCE}`
}

const oidc_query_string = GenerateQueryString(oidc_query_arguments);

const login_url = `${OIDC_PROVIDER_URL}?${oidc_query_string}`;

class AuthLoginPage extends Component {
    render() {
        localStorage.setItem('auth_state', OIDC_PROVIDER_STATE);
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={{ ...styles.main, backgroundColor: pink500 }}>
                    <Card style={styles.card}>
                        <div style={styles.avatar}>
                            <Avatar
                                backgroundColor={pink300}
                                icon={<LockIcon />}
                                size={60}
                            />
                        </div>
                        <CardActions>
                        <p>Login with Girl Effect OIDC Provider</p>
                            <RaisedButton
                                type='button'
                                href={login_url}
                                primary
                                label='Login'
                                fullWidth
                            />
                        </CardActions>
                    </Card>
                </div>
            </MuiThemeProvider>
        );
    }
};

export default connect(undefined, { userLogin })(AuthLoginPage);
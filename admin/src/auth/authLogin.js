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

const OIDC_QUERY_ARGUMENTS = {
    scope: `${OIDC_PROVIDER_SCOPE}`,
    response_type: `id_token token`,
    client_id: `${OIDC_PROVIDER_CLIENT_ID}`,
    redirect_uri: `${OIDC_PROVIDER_REDIRECT_URI}`,
}

/* The following link describes the difference between the state and nonce parameters nicely:
https://stackoverflow.com/questions/46844285/difference-between-oauth-2-0-state-and-openid-nonce-parameter-why-state-cou

To summarise:
* the `state` parameter is used to protect against CSRF attacks
* the `nonce` parameter is a token validation parameter, since the nonce will be contained in the token returned

*/

function generateNonce() {
    const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._~'
    const result = [];
    window.crypto.getRandomValues(new Uint8Array(32)).forEach(c =>
        result.push(charset[c % charset.length]));
    return result.join('');
}

class AuthLoginPage extends Component {
    render() {
        let query_arguments = {};

        Object.keys(OIDC_QUERY_ARGUMENTS).forEach(function(key) {
             query_arguments[ key ] = OIDC_QUERY_ARGUMENTS[ key ];
        });
        query_arguments.state = btoa(new Date());
        query_arguments.nonce = generateNonce();

        // Store values so that they can be used for validation in OIDCCallback.js
        localStorage.setItem('auth_state', query_arguments.state);
        localStorage.setItem("auth_nonce", query_arguments.nonce);

        const query_string = GenerateQueryString(query_arguments);
        const login_url = `${OIDC_PROVIDER_URL}?${query_string}`;
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

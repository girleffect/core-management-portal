import jwtDecode from 'jwt-decode';
import queryString from 'query-string';
import React, { Component } from 'react';
import { Redirect } from 'react-router';

import PermissionsStore from '../auth/PermissionsStore';
import {
    base64urlDecode,
    errorNotificationAnt,
    apiErrorHandler,
    createTreeFromContexts,
    loadGMPUserSettings
} from '../utils';
import WaitingPage from '../pages/WaitingPage';

class OIDCCallback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginComplete: false,
            failure: false
        };
        this.getTokenAndPermissions = this.getTokenAndPermissions.bind(this);
        this.handleLoginError = this.handleLoginError.bind(this);
    }
    componentWillMount() {
        this.getTokenAndPermissions();
    }
    getTokenAndPermissions() {
        const parsedQuery = queryString.parse(this.props.location.search);
        // Quick check if a token is retrieved.
        if (!parsedQuery.id_token) {
            this.handleLoginError('No token received.');
            return null;
        }
        // Check that the state returned in the URL matches the one stored.
        const authState = localStorage.getItem('auth_state');
        const incorrectState = authState !== parsedQuery.state;
        // Check that the nonce returned in the id token matches the one stored.
        const segments = parsedQuery.id_token.split('.');
        const incorrectSegmentAmount = segments.length !== 3;
        // All segment are base64 encoded
        const payloadSeg = segments[1];
        const payload = JSON.parse(base64urlDecode(payloadSeg));
        // Check that the nonce returned is correct.
        const authNonce = localStorage.getItem('auth_nonce');
        const incorrectNonce = authNonce !== payload.nonce;
        // Check if none of all the above checks failed.
        if (incorrectState || incorrectSegmentAmount || incorrectNonce) {
            const error = incorrectSegmentAmount
                ? `Token contains ${segments.length} segments, but it should have 3.`
                : incorrectNonce
                    ? `Nonce mismatch: ${authNonce} ${payload.nonce}`
                    : `State mismatch: ${authState} ${parsedQuery.state}`;
            this.handleLoginError(error);
        } else {
            // Everything checked out. Store the id token.
            localStorage.setItem('id_token', parsedQuery.id_token);
            const userID = jwtDecode(parsedQuery.id_token).sub;
            PermissionsStore.getAllUserRoles(userID)
                .then(contexts => {
                    createTreeFromContexts(contexts)
                        .then(treeData => {
                            PermissionsStore.getAndLoadPermissions({ userID, contexts, treeData })
                                .then(() => {
                                    // Load user settings. This may fail and login can continue.
                                    loadGMPUserSettings(parsedQuery.access_token).then(() => {
                                        // Because of rendering happening before the server returns in React Admin,
                                        // a simple unmounting of the Admin component will no longer work to reset
                                        // the permissions. Here we redirect the window now to the portal.
                                        window.location.href = process.env.REACT_APP_PORTAL_URL;
                                    });
                                })
                                .catch(error => {
                                    this.handleLoginError(error);
                                });
                        })
                        .catch(error => {
                            this.handleLoginError(error);
                        });
                })
                .catch(error => {
                    this.handleLoginError(error);
                });
        }
    }
    handleLoginError(error) {
        localStorage.clear();
        this.setState({ failure: true });
        apiErrorHandler(error);
        errorNotificationAnt(
            'Something went wrong with your login, please notify us of this issue.'
        );
    }
    render() {
        return !this.state.failure ? <WaitingPage /> : <Redirect push to="/login" />;
    }
}

export default OIDCCallback;

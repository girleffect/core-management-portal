import jwtDecode from 'jwt-decode';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ViewTitle } from 'admin-on-rest/lib/mui';
import Card from 'material-ui/Card/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardText from 'material-ui/Card/CardText';
import CircularProgress from 'material-ui/CircularProgress';
import DropDownMenu from 'material-ui/DropDownMenu/DropDownMenu';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { pink500 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';

import { muiTheme, styles } from '../Theme';
import { contextChangeGMPContext, contextDomainsAndSitesAdd } from '../actions/context';
import PermissionsStore from '../auth/PermissionsStore';
import restClient, { OPERATIONAL, GET_ONE } from '../swaggerRestServer';
import { makeIDMapping, getUntilDone } from '../utils';

const mapStateToProps = state => {
    return {
        domainsAndSites: state.context.domainsAndSites,
        GMPContext: state.context.GMPContext
    };
};

const mapDispatchToProps = dispatch => {
    return {
        domainsAndSitesAdd: domainsAndSites => dispatch(contextDomainsAndSitesAdd(domainsAndSites)),
        changeContext: newContext => dispatch(contextChangeGMPContext(newContext))
    };
};

class ContextChanger extends Component {
    constructor(props) {
        super(props);
        const permissions = PermissionsStore.getPermissionFlags();
        this.state = {
            changing: false,
            value:
                (this.props.GMPContext && this.props.GMPContext.key) ||
                permissions.currentContext.key,
            redirect: false,
            validToken: true,
            domains: null,
            sites: null
        };
        if (!this.props.GMPContext) {
            this.props.domainsAndSitesAdd(permissions.contexts);
            this.props.changeContext(permissions.currentContext);
        }
        this.getPlaces = this.getPlaces.bind(this);
        this.getPlaces('domain', this.props.domainsAndSites || permissions.contexts);
        this.getPlaces('site', this.props.domainsAndSites || permissions.contexts);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
        this.handleAPIError = this.handleAPIError.bind(this);
    }

    async getPlaces(placeName, domainsAndSites) {
        const ids = Object.keys(domainsAndSites).reduce((array, place) => {
            if (place.indexOf(placeName[0]) >= 0) {
                array.push(parseInt(place.split(':')[1], 10));
            }
            return array;
        }, []);
        if (ids.length > 0) {
            try {
                const queryArg = ids.join(',');
                let allPlaces = await getUntilDone(`${placeName}s`, {
                    [`${placeName}_ids`]: queryArg
                });
                this.setState({ [`${placeName}s`]: makeIDMapping(allPlaces) });
            } catch (error) {
                this.handleAPIError(error);
            }
        }
    }

    handleChange(event, index, value) {
        this.setState({ value });
    }

    async handleSelection() {
        this.setState({ changing: true });
        if (this.state.value !== this.props.GMPContext.key) {
            const { value } = this.state;
            const [contextType, contextID] = value.split(':');
            const place = await restClient(GET_ONE, contextType === 'd' ? 'domains' : 'sites', {
                id: contextID
            });
            const newContext = { key: value, obj: place.data };
            this.props.changeContext(newContext);
            const userID = jwtDecode(localStorage.getItem('id_token')).sub;
            try {
                const permissions = await restClient(
                    OPERATIONAL,
                    contextType === 'd' ? 'user_domain_permissions' : 'user_site_permissions',
                    {
                        pathParameters: [userID, contextID]
                    }
                );
                PermissionsStore.loadPermissions(
                    permissions.data,
                    this.props.domainsAndSites,
                    newContext
                );
            } catch (error) {
                this.handleAPIError(error);
            }
        }
        this.setState({ redirect: true });
    }

    handleAPIError(error) {
        if (error.message === 'Token expired') {
            localStorage.removeItem('id_token');
            localStorage.removeItem('permissions');
            this.setState({ validToken: false });
        }
        throw new Error(error);
    }

    render() {
        const { domainsAndSites } = this.props;
        const { changing, redirect, value, domains, sites } = this.state;
        return redirect ? (
            <Redirect push to="/" />
        ) : (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={{ ...styles.main, backgroundColor: pink500 }}>
                    <Card style={styles.cardCentered}>
                        {changing ? (
                            <CardText>
                                <CircularProgress style={{ margin: '7rem' }} />
                            </CardText>
                        ) : (
                            <div>
                                <ViewTitle title="Context Changer" />
                                <CardText>Select the Domain or Site.</CardText>
                                <CardText>
                                    {domains && sites ? (
                                        <DropDownMenu value={value} onChange={this.handleChange}>
                                            {domainsAndSites &&
                                                Object.keys(domainsAndSites).map(place => {
                                                    const [contextType, contextID] = place.split(
                                                        ':'
                                                    );
                                                    const text =
                                                        contextType === 'd'
                                                            ? domains
                                                                ? domains[parseInt(contextID, 10)]
                                                                      .name
                                                                : place
                                                            : sites
                                                                ? sites[parseInt(contextID, 10)]
                                                                      .name
                                                                : place;
                                                    return (
                                                        <MenuItem
                                                            key={place}
                                                            value={place}
                                                            primaryText={text}
                                                        />
                                                    );
                                                })}
                                        </DropDownMenu>
                                    ) : (
                                        <CircularProgress />
                                    )}
                                </CardText>
                                <CardActions>
                                    <FlatButton
                                        label="Back"
                                        onClick={() => this.handleSelection()}
                                    />
                                    <RaisedButton
                                        label="Confirm"
                                        primary={true}
                                        onClick={() => this.handleSelection()}
                                    />
                                </CardActions>
                            </div>
                        )}
                    </Card>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContextChanger);

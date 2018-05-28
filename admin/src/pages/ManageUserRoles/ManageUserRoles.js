import { Restricted } from 'admin-on-rest';
import jwtDecode from 'jwt-decode';
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import Card from 'material-ui/Card/Card';
import CardText from 'material-ui/Card/CardText';
import CardTitle from 'material-ui/Card/CardTitle';
import TextField from 'material-ui/TextField';
import restClient, { CREATE, GET_LIST, GET_MANY, DELETE } from '../../swaggerRestServer';
import TableField from '../../fields/TableField';

import UserCard from './UserCard';
import AssignRoleCard from './AssignRoleCard';
import ConfirmDialog from './ConfirmDialog';

class ManageUserRoles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            userResults: null,
            userRoles: null,
            selectedUser: -1,
            userdomains: {},
            userdomainroles: {},
            usersites: {},
            usersiteroles: {},
            selectedDomainSite: null,
            roleSelections: null,
            rolesMapping: null,
            readyToAssign: 0,
            open: false,
            roleToDelete: null,
            validToken: true
        };
        this.getWhereUserHasRoles = this.getWhereUserHasRoles.bind(this);
        this.getWhereUserHasRoles('userdomainroles', 'domain_id');
        this.getWhereUserHasRoles('usersiteroles', 'site_id');
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDomainSiteChange = this.handleDomainSiteChange.bind(this);
        this.handleRoleSelection = this.handleRoleSelection.bind(this);
        this.handleAssign = this.handleAssign.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleAPIError = this.handleAPIError.bind(this);
    }

    async getWhereUserHasRoles(resource, key) {
        const userID = jwtDecode(localStorage.getItem('id_token')).sub;
        try {
            let roles = this.state.rolesMapping;
            if (!roles) {
                roles = await restClient(GET_MANY, 'roles', {});
                roles = roles.data.reduce((obj, role) => {
                    obj[role.id] = role;
                    return obj;
                }, {});
            }
            let placeRoles = await restClient(GET_LIST, resource, {
                filter: { user_id: userID }
            });
            const ids = placeRoles.data.reduce((ids, placeRole) => {
                if (ids.indexOf(placeRole[key]) < 0) {
                    ids.push(placeRole[key]);
                }
                return ids;
            }, []);
            placeRoles = placeRoles.data.reduce((obj, placeRole) => {
                if (obj[placeRole[key]]) {
                    obj[placeRole[key]].push(roles[placeRole.role_id]);
                } else {
                    obj[placeRole[key]] = [roles[placeRole.role_id]];
                }
                return obj;
            }, {});

            let places = [];

            if (ids.length > 0) {
                places = await restClient(
                    GET_LIST,
                    resource.split('domain').length > 1 ? 'domains' : 'sites',
                    {
                        filter: {
                            [`${key}s`]: ids.join(',')
                        }
                    }
                );
                places = places.data.reduce((obj, place) => {
                    obj[place.id] = place;
                    return obj;
                }, {});
            }
            const placeName = resource.split('roles')[0] + 's';
            this.setState({ [resource]: placeRoles, [placeName]: places, rolesMapping: roles });
        } catch (error) {
            this.handleAPIError(error);
        }
    }

    handleSearch(event) {
        const input = event.target.value;
        if (input.length > 2) {
            restClient(GET_LIST, 'users', {
                filter: { q: input, tfa_enabled: true }
            })
                .then(response => {
                    const userResults = response.data.map(obj => ({
                        id: obj.id,
                        username: obj.username
                    }));
                    this.setState({
                        search: input,
                        userResults: userResults
                    });
                })
                .catch(error => {
                    this.handleAPIError(error);
                });
        } else {
            this.setState({
                search: input,
                userResults: null,
                selectedUser: -1,
                userRoles: null,
                selectedDomainSite: null
            });
        }
    }

    async handleSelect(rows) {
        if (rows.length > 0) {
            try {
                let ids = {};
                let roles = this.state.rolesMapping;
                if (!roles) {
                    roles = await restClient(GET_MANY, 'roles', {});
                    roles = roles.data.reduce((obj, role) => {
                        obj[role.id] = role;
                        return obj;
                    }, {});
                }
                const user = this.state.userResults[rows[0]];
                // GET USERDOMAINROLES FOR SELECTED USER.
                let domainRoles = await restClient(GET_LIST, 'userdomainroles', {
                    filter: { user_id: user.id }
                });
                domainRoles = domainRoles.data;
                if (domainRoles.length > 0) {
                    // GET THE IDS AND REPLACE THEM WITH THE ACTUAL OBJECTS.
                    ids = domainRoles.reduce((ids, domainRole) => {
                        if (ids.indexOf(domainRole.domain_id) < 0) {
                            ids.push(domainRole.domain_id);
                        }
                        return ids;
                    }, []);
                    let domains = await restClient(GET_MANY, 'domains', {
                        ids: ids
                    });
                    domains = domains.data.reduce((obj, domain) => {
                        obj[domain.id] = domain;
                        return obj;
                    }, {});

                    domainRoles = domainRoles.reduce((obj, domainRole) => {
                        obj[`${domainRole.domain_id}:${domainRole.role_id}`] = {
                            domain: domains[domainRole.domain_id],
                            role: roles[domainRole.role_id]
                        };
                        return obj;
                    }, {});
                }

                // GET USERSITEROLES FOR SELECTED USER.
                let siteRoles = await restClient(GET_LIST, 'usersiteroles', {
                    filter: { user_id: user.id }
                });
                siteRoles = siteRoles.data;
                if (siteRoles.length > 0) {
                    // GET THE IDS AND REPLACE THEM WITH THE ACTUAL OBJECTS.
                    ids = siteRoles.reduce((ids, siteRole) => {
                        if (ids.indexOf(siteRole.site_id) < 0) {
                            ids.push(siteRole.site_id);
                        }
                        return ids;
                    }, []);
                    let sites = await restClient(GET_MANY, 'sites', {
                        ids: ids
                    });
                    sites = sites.data.reduce((obj, site) => {
                        obj[site.id] = site;
                        return obj;
                    }, {});

                    siteRoles = siteRoles.reduce((obj, siteRole) => {
                        obj[`${siteRole.site_id}:${siteRole.role_id}`] = {
                            site: sites[siteRole.site_id],
                            role: roles[siteRole.role_id]
                        };
                        return obj;
                    }, {});
                }
                // SET THE STATE WITH THE SELECTED USER AND ALL ROLES FOUND.
                this.setState({
                    selectedUser: rows[0],
                    userRoles: {
                        domainRoles: domainRoles,
                        siteRoles: siteRoles
                    }
                });
            } catch (error) {
                this.handleAPIError(error);
            }
        }
    }

    handleDelete(data) {
        const { userResults, selectedUser, userRoles } = this.state;
        const user = selectedUser >= 0 ? userResults[selectedUser] : null;
        restClient(DELETE, data.resource, {
            id: `${user.id}/${data.id}/${data.role_id}`
        })
            .then(response => {
                let newUserRoles = userRoles;
                if (data.resource.split('domain').length > 1) {
                    delete newUserRoles.domainRoles[`${data.id}:${data.role_id}`];
                } else {
                    delete newUserRoles.siteRoles[`${data.id}:${data.role_id}`];
                }
                this.setState({ userRoles: newUserRoles });
            })
            .catch(error => {
                this.handleAPIError(error);
            });
    }

    handleDomainSiteChange(event, index, value) {
        const splitValue = value.split(':');
        let roles = [];
        if (splitValue[1] === 'domain') {
            roles = this.state.userdomainroles[splitValue[0]];
        } else {
            roles = this.state.usersiteroles[splitValue[0]];
        }
        this.setState({
            selectedDomainSite: value,
            roleSelections: roles.reduce((obj, role) => {
                obj[role.id] = {
                    ...role,
                    selected: false
                };
                return obj;
            }, {})
        });
    }

    handleRoleSelection(value) {
        const { roleSelections, readyToAssign } = this.state;
        this.setState({
            readyToAssign: !roleSelections[value].selected ? readyToAssign + 1 : readyToAssign - 1,
            roleSelections: {
                ...roleSelections,
                [value]: {
                    ...roleSelections[value],
                    selected: !roleSelections[value].selected
                }
            }
        });
    }

    handleAssign() {
        const {
            userResults,
            selectedUser,
            userRoles,
            userdomains,
            usersites,
            selectedDomainSite,
            rolesMapping,
            roleSelections
        } = this.state;
        const placeSplit = selectedDomainSite.split(':');
        Object.values(roleSelections).map(roleSelection => {
            if (roleSelection.selected) {
                restClient(CREATE, `user${placeSplit[1]}roles`, {
                    data: {
                        user_id: userResults[selectedUser].id,
                        [`${placeSplit[1]}_id`]: parseInt(placeSplit[0], 10),
                        role_id: roleSelection.id
                    }
                })
                    .then(response => {
                        let newUserRoles = userRoles;
                        newUserRoles[`${placeSplit[1]}Roles`][
                            `${placeSplit[0]}:${roleSelection.id}`
                        ] = {
                            [placeSplit[1]]:
                                placeSplit[1] === 'domain'
                                    ? userdomains[placeSplit[0]]
                                    : usersites[placeSplit[0]],
                            role: rolesMapping[roleSelection.id]
                        };
                        this.setState({ userRoles: newUserRoles });
                    })
                    .catch(error => {
                        this.handleAPIError(error);
                    });
            }
            return null;
        });
        this.setState({
            readyToAssign: 0,
            roleSelections: null,
            selectedDomainSite: null
        });
    }

    handleOpen(data) {
        this.setState({ open: true, roleToDelete: data });
    }

    handleClose(action) {
        switch (action) {
            case 'submit':
                this.handleDelete(this.state.roleToDelete);
                this.setState({ open: false });
                break;
            default:
                this.setState({ open: false });
        }
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
        const {
            search,
            userResults,
            selectedUser,
            userRoles,
            userdomains,
            usersites,
            selectedDomainSite,
            roleSelections,
            readyToAssign,
            open,
            validToken
        } = this.state;
        const user = selectedUser >= 0 ? userResults[selectedUser] : null;
        return validToken ? (
            <Restricted location={this.props.location}>
                <Card>
                    <CardTitle title="Manage User Roles" />
                    <CardText>
                        <TextField
                            name="UserSearch"
                            placeholder="Search for User"
                            value={search}
                            onChange={this.handleSearch}
                        />
                    </CardText>
                    <CardText>
                        {userResults && userResults.length > 0 ? (
                            <TableField
                                label="Users Found"
                                data={userResults}
                                selectable={true}
                                selected={selectedUser}
                                onRowSelection={this.handleSelect}
                            />
                        ) : (
                            'No Users found.'
                        )}
                    </CardText>
                    {selectedUser >= 0 ? (
                        <CardText>
                            <UserCard
                                user={user}
                                userRoles={userRoles}
                                handleDelete={this.handleOpen}
                            />
                            <AssignRoleCard
                                selectedDomainSite={selectedDomainSite}
                                handleDomainSiteChange={this.handleDomainSiteChange}
                                userdomains={userdomains}
                                usersites={usersites}
                                handleRoleSelection={this.handleRoleSelection}
                                roleSelections={roleSelections}
                                handleAssign={this.handleAssign}
                                readyToAssign={readyToAssign}
                            />
                        </CardText>
                    ) : (
                        ''
                    )}
                    <ConfirmDialog
                        open={open}
                        handleClose={this.handleClose}
                        cancelLabel="No"
                        submitLabel="Delete"
                        text="Are you sure you want to delete this role?"
                    />
                </Card>
            </Restricted>
        ) : (
            <Redirect to="/login" />
        );
    }
}

export default withRouter(ManageUserRoles);

import React, { Component } from 'react';
import { CreateButton, RefreshButton } from 'react-admin';
import { CardActions } from 'material-ui/Card';

import PermissionsStore from '../auth/PermissionsStore';

class RoleListActions extends Component {
    render() {
        const {
            resource,
            filters,
            displayedFilters,
            filterValues,
            basePath,
            showFilter
        } = this.props;
        return (
            <CardActions>
                {filters &&
                    React.cloneElement(filters, {
                        resource,
                        showFilter,
                        displayedFilters,
                        filterValues,
                        context: 'button'
                    })}
                {PermissionsStore.getResourcePermission('roles', 'create') && (
                    <CreateButton basePath={basePath} />
                )}
                <RefreshButton />
            </CardActions>
        );
    }
}

export default RoleListActions;

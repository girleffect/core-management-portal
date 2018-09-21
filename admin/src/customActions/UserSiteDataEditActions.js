import React, { Component } from 'react';
import { DeleteButton, ListButton, RefreshButton, ShowButton } from 'react-admin';
import CardActions from '@material-ui/core/CardActions';

import PermissionsStore from '../auth/PermissionsStore';

class UserSiteDataEditActions extends Component {
    render() {
        const { basePath, data } = this.props;
        return (
            <CardActions>
                <ShowButton basePath={basePath} record={data} />
                <ListButton basePath={basePath} />
                {PermissionsStore.getResourcePermission('usersitedata', 'remove') && (
                    <DeleteButton basePath={basePath} record={data} />
                )}
                <RefreshButton />
            </CardActions>
        );
    }
}

export default UserSiteDataEditActions;

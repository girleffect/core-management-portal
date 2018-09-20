import React, { Component } from 'react';
import { DeleteButton, ListButton, RefreshButton, ShowButton } from 'react-admin';
import { CardActions } from 'material-ui/Card';

import PermissionsStore from '../auth/PermissionsStore';

class DeletedUserEditActions extends Component {
    render() {
        const { basePath, data } = this.props;
        return (
            <CardActions>
                <ShowButton basePath={basePath} record={data} />
                <ListButton basePath={basePath} />
                {PermissionsStore.getResourcePermission('deletedusers', 'remove') && (
                    <DeleteButton basePath={basePath} record={data} />
                )}
                <RefreshButton />
            </CardActions>
        );
    }
}

export default DeletedUserShowActions;

import React, { Component } from 'react';
import { CreateButton, RefreshButton } from 'react-admin';
import { CardActions } from 'material-ui/Card';

import PermissionsStore from '../auth/PermissionsStore';

class CountryListActions extends Component {
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
                <RefreshButton />
            </CardActions>
        );
    }
}

export default CountryListActions;

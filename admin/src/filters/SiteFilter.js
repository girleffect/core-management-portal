/**
 * Generated Filters.js code. Edit at own risk.
 * When regenerated the changes will be lost.
 **/
import React from 'react';
import { TextInput, NumberInput, Filter } from 'react-admin';

const parseSiteIds = value => value.replace(/[^\w]/gi, ',');

const validateSiteIds = value => {
    if (value) {
        const valid = value
            .replace(/[^\w]/gi, ',')
            .split(',')
            .every(item => !isNaN(item));
        if (!valid) {
            return 'Site Ids are not all numbers.';
        }
    }
};

const SiteFilter = props => (
    <Filter {...props}>
        <TextInput
            label="Site Ids"
            source="site_ids"
            parse={parseSiteIds}
            validate={validateSiteIds}
        />
        <NumberInput label="Client Id" source="client_id" />
    </Filter>
);

export default SiteFilter;
/** End of Generated Code **/

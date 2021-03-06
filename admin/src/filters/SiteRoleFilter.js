/**
 * Generated Filters.js code. Edit at own risk.
 * When regenerated the changes will be lost.
 **/
import React from 'react';
import { SelectInput, ReferenceInput, Filter } from 'react-admin';

import UnlimitedDropdownInput from '../inputs/UnlimitedDropdownInput';

const SiteRoleFilter = props => (
    <Filter {...props}>
        <UnlimitedDropdownInput label="Site" source="site_id" reference="sites" optionText="name" />
        <ReferenceInput label="Role" source="role_id" reference="roles" allowEmpty>
            <SelectInput optionText="label" />
        </ReferenceInput>
    </Filter>
);

export default SiteRoleFilter;
/** End of Generated Code **/

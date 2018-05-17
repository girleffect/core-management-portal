/** 
 * Generated Filters.js code. Edit at own risk.
 * When regenerated the changes will be lost.
**/
import React from 'react';
import {
    TextInput,
    Filter
} from 'admin-on-rest';

const AdminNoteFilter = props => (
    <Filter {...props}>
        <TextInput label="User Id" source="user_id" />
        <TextInput label="Creator Id" source="creator_id" />
    </Filter>
);

export default AdminNoteFilter;
/** End of Generated Code **/
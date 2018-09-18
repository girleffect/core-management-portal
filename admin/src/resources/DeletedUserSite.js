/**
 * Generated DeletedUserSite.js code. Edit at own risk.
 * When regenerated the changes will be lost.
 **/
import React from 'react';
import {
    List,
    ReferenceField,
    TextField,
    NumberField,
    DateField,
    SimpleForm,
    Create,
    ReferenceInput,
    SelectInput,
    TextInput,
    Show,
    SimpleShowLayout,
    Edit,
    DeleteButton,
    EditButton,
    ShowButton
} from 'admin-on-rest';
import PermissionsStore from '../auth/PermissionsStore';
import EmptyField from '../fields/EmptyField';
import DateTimeInput from 'aor-datetime-input';
import DeletedUserSiteFilter from '../filters/DeletedUserSiteFilter';
import FieldSelectDatagrid from '../grids/FieldSelectDatagrid';

const timezoneOffset = new Date().getTimezoneOffset();

const dateTimeFormatter = value => {
    // Value received is a date object in the DateTimeInput.
    if (timezoneOffset !== 0 && value) {
        value = new Date(value);
        value = new Date(value.valueOf() + timezoneOffset * 60000);
    }
    return value;
};

const dateTimeParser = value => {
    // Value received is a date object in the DateTimeInput.
    if (timezoneOffset !== 0 && value) {
        value = new Date(value.valueOf() - timezoneOffset * 60000);
    }
    return value;
};

const validationCreateDeletedUserSite = values => {
    const errors = {};
    if (!values.deleted_user_id) {
        errors.deleted_user_id = ['deleted_user_id is required'];
    }
    if (!values.site_id) {
        errors.site_id = ['site_id is required'];
    }
    return errors;
};

const validationEditDeletedUserSite = values => {
    const errors = {};
    return errors;
};

export const DeletedUserSiteList = props => (
    <List {...props} title="DeletedUserSite List" filters={<DeletedUserSiteFilter />}>
        <FieldSelectDatagrid bodyOptions={{ showRowHover: true }}>
            {PermissionsStore.getResourcePermission('deletedusers', 'list') ? (
                <ReferenceField
                    label="Deleted User"
                    source="deleted_user_id"
                    reference="deletedusers"
                    sortable={false}
                    linkType="show"
                    allowEmpty
                >
                    <TextField source="username" />
                </ReferenceField>
            ) : (
                <EmptyField />
            )}
            {PermissionsStore.getResourcePermission('sites', 'list') ? (
                <ReferenceField
                    label="Site"
                    source="site_id"
                    reference="sites"
                    sortable={false}
                    linkType="show"
                    allowEmpty
                >
                    <NumberField source="name" />
                </ReferenceField>
            ) : (
                <EmptyField />
            )}
            <DateField source="created_at" sortable={false} />
            <DateField source="updated_at" sortable={false} />
            <DateField source="deletion_requested_at" sortable={false} />
            <TextField source="deletion_requested_via" sortable={false} />
            <DateField source="deletion_confirmed_at" sortable={false} />
            <TextField source="deletion_confirmed_via" sortable={false} />
            {PermissionsStore.getResourcePermission('deletedusersites', 'edit') ? (
                <EditButton />
            ) : null}
            <ShowButton />
            {PermissionsStore.getResourcePermission('deletedusersites', 'remove') ? (
                <DeleteButton />
            ) : null}
        </FieldSelectDatagrid>
    </List>
);

export const DeletedUserSiteCreate = props => (
    <Create {...props} title="DeletedUserSite Create">
        <SimpleForm validate={validationCreateDeletedUserSite} redirect="show">
            {PermissionsStore.getResourcePermission('deletedusers', 'list') && (
                <ReferenceInput
                    label="Deleted User"
                    source="deleted_user_id"
                    reference="deletedusers"
                    perPage={0}
                    allowEmpty
                >
                    <SelectInput optionText="username" />
                </ReferenceInput>
            )}
            {PermissionsStore.getResourcePermission('sites', 'list') && (
                <ReferenceInput
                    label="Site"
                    source="site_id"
                    reference="sites"
                    perPage={0}
                    allowEmpty
                >
                    <SelectInput optionText="name" />
                </ReferenceInput>
            )}
            <DateTimeInput
                source="deletion_requested_at"
                format={dateTimeFormatter}
                parse={dateTimeParser}
            />
            <TextInput source="deletion_requested_via" />
            <DateTimeInput
                source="deletion_confirmed_at"
                format={dateTimeFormatter}
                parse={dateTimeParser}
            />
            <TextInput source="deletion_confirmed_via" />
        </SimpleForm>
    </Create>
);

export const DeletedUserSiteShow = props => (
    <Show {...props} title="DeletedUserSite Show">
        <SimpleShowLayout>
            {PermissionsStore.getResourcePermission('deletedusers', 'list') ? (
                <ReferenceField
                    label="Deleted User"
                    source="deleted_user_id"
                    reference="deletedusers"
                    linkType="show"
                    allowEmpty
                >
                    <TextField source="username" />
                </ReferenceField>
            ) : (
                <EmptyField />
            )}
            {PermissionsStore.getResourcePermission('sites', 'list') ? (
                <ReferenceField
                    label="Site"
                    source="site_id"
                    reference="sites"
                    linkType="show"
                    allowEmpty
                >
                    <NumberField source="name" />
                </ReferenceField>
            ) : (
                <EmptyField />
            )}
            <DateField source="created_at" />
            <DateField source="updated_at" />
            <DateField source="deletion_requested_at" />
            <TextField source="deletion_requested_via" />
            <DateField source="deletion_confirmed_at" />
            <TextField source="deletion_confirmed_via" />
        </SimpleShowLayout>
    </Show>
);

export const DeletedUserSiteEdit = props => (
    <Edit {...props} title="DeletedUserSite Edit">
        <SimpleForm validate={validationEditDeletedUserSite}>
            <DateTimeInput
                source="deletion_requested_at"
                format={dateTimeFormatter}
                parse={dateTimeParser}
            />
            <TextInput source="deletion_requested_via" />
            <DateTimeInput
                source="deletion_confirmed_at"
                format={dateTimeFormatter}
                parse={dateTimeParser}
            />
            <TextInput source="deletion_confirmed_via" />
        </SimpleForm>
    </Edit>
);

/** End of Generated Code **/

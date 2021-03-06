/**
 * Generated Resource.js code. Edit at own risk.
 * When regenerated the changes will be lost.
 **/
import React from 'react';
import {
    SimpleList,
    Show,
    NumberField,
    SimpleForm,
    DateField,
    Create,
    Responsive,
    UrlField,
    SimpleShowLayout,
    TextInput,
    TextField,
    Edit,
    List,
    EditButton,
    ShowButton,
    DeleteButton
} from 'react-admin';
import PermissionsStore from '../auth/PermissionsStore';

import ResourceEditToolbar from '../customActions/ResourceEditToolbar';
import ResourceListActions from '../customActions/ResourceListActions';

import ResourceFilter from '../filters/ResourceFilter';

import FieldSelectDatagrid from '../grids/FieldSelectDatagrid';

const validationCreateResource = values => {
    const errors = {};
    if (!values.urn) {
        errors.urn = ['urn is required'];
    }
    return errors;
};

const validationEditResource = values => {
    const errors = {};
    return errors;
};

export const ResourceList = props => (
    <List
        {...props}
        title="Resource List"
        filters={<ResourceFilter />}
        actions={<ResourceListActions />}
        bulkActionButtons={false}
    >
        <Responsive
            small={
                <SimpleList
                    primaryText={record => `Urn: ${record.urn}`}
                    secondaryText={record => `Description: ${record.description}`}
                />
            }
            medium={
                <FieldSelectDatagrid>
                    <NumberField source="id" sortable={false} />
                    <UrlField source="urn" sortable={false} />
                    <TextField source="description" sortable={false} />
                    <DateField source="created_at" sortable={false} />
                    <DateField source="updated_at" sortable={false} />
                    {PermissionsStore.getResourcePermission('resources', 'edit') ? (
                        <EditButton />
                    ) : null}
                    <ShowButton />
                    {PermissionsStore.getResourcePermission('resources', 'remove') ? (
                        <DeleteButton />
                    ) : null}
                </FieldSelectDatagrid>
            }
        />
    </List>
);

export const ResourceCreate = props => (
    <Create {...props} title="Resource Create">
        <SimpleForm validate={validationCreateResource} redirect="show">
            <TextInput source="urn" />
            <TextInput source="description" />
        </SimpleForm>
    </Create>
);

export const ResourceShow = props => (
    <Show {...props} title="Resource Show">
        <SimpleShowLayout>
            <NumberField source="id" />
            <UrlField source="urn" />
            <TextField source="description" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
        </SimpleShowLayout>
    </Show>
);

export const ResourceEdit = props => (
    <Edit {...props} title="Resource Edit">
        <SimpleForm validate={validationEditResource} toolbar={<ResourceEditToolbar />}>
            <TextInput source="urn" />
            <TextInput source="description" />
        </SimpleForm>
    </Edit>
);

/** End of Generated Code **/

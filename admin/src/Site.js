/**
 * Generated Site.js code. Edit at own risk.
 * When regenerated the changes will be lost.
**/
import React from 'react';
import {
    List,
    Datagrid,
    NumberField,
    ReferenceField,
    TextField,
    BooleanField,
    DateField,
    SimpleForm,
    Create,
    ReferenceInput,
    SelectInput,
    TextInput,
    BooleanInput,
    Show,
    SimpleShowLayout,
    ReferenceManyField,
    Edit,
    DeleteButton,
    EditButton,
    ShowButton
} from 'admin-on-rest';

const validationCreateSite = values => {
    const errors = {};
    if (!values.domain_id) {
        errors.domain_id = ["domain_id is required"];
    }
    if (!values.name) {
        errors.name = ["name is required"];
    }
    return errors;
}

const validationEditSite = values => {
    const errors = {};
    return errors;
}

export const SiteList = props => (
    <List {...props} title="Site List">
        <Datagrid>
            <NumberField source="id" />
            <ReferenceField label="Client" source="client_id" reference="clients" linkType="show" allowEmpty>
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField label="Domain" source="domain_id" reference="domains" linkType="show" allowEmpty>
                <NumberField source="name" />
            </ReferenceField>
            <TextField source="name" />
            <TextField source="description" />
            <BooleanField source="is_active" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
            <EditButton />
            <ShowButton />
            <DeleteButton />
        </Datagrid>
    </List>
)

export const SiteCreate = props => (
    <Create {...props} title="Site Create">
        <SimpleForm validate={validationCreateSite}>
            <ReferenceInput label="Client" source="client_id" reference="clients" allowEmpty>
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput label="Domain" source="domain_id" reference="domains" allowEmpty>
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="name" />
            <BooleanInput source="is_active" />
            <TextInput source="description" />
        </SimpleForm>
    </Create>
)

export const SiteShow = props => (
    <Show {...props} title="Site Show">
        <SimpleShowLayout>
            <NumberField source="id" />
            <ReferenceField label="Client" source="client_id" reference="clients" linkType="show" allowEmpty>
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField label="Domain" source="domain_id" reference="domains" linkType="show" allowEmpty>
                <NumberField source="name" />
            </ReferenceField>
            <TextField source="name" />
            <TextField source="description" />
            <BooleanField source="is_active" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
            <ReferenceManyField label="Roles" reference="siteroles" target="site_id">
                <Datagrid>
                    <ReferenceField label="Role" source="role_id" reference="roles" linkType="show" allowEmpty>
                        <NumberField source="label" />
                    </ReferenceField>
                    <DateField source="created_at" />
                    <DateField source="updated_at" />
                </Datagrid>
            </ReferenceManyField>
        </SimpleShowLayout>
    </Show>
)

export const SiteEdit = props => (
    <Edit {...props} title="Site Edit">
        <SimpleForm validate={validationEditSite}>
            <ReferenceInput label="Client" source="client_id" reference="clients" allowEmpty>
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput label="Domain" source="domain_id" reference="domains" allowEmpty>
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="name" />
            <TextInput source="description" />
            <BooleanInput source="is_active" />
            <ReferenceManyField label="Roles" reference="siteroles" target="site_id">
                <Datagrid>
                    <ReferenceField label="Role" source="role_id" reference="roles" linkType="show" allowEmpty>
                        <NumberField source="label" />
                    </ReferenceField>
                    <DateField source="created_at" />
                    <DateField source="updated_at" />
                    <EditButton />
                </Datagrid>
            </ReferenceManyField>
        </SimpleForm>
    </Edit>
)

/** End of Generated Code **/
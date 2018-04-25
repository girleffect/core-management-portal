/**
 * Generated User.js code. Edit at own risk.
 * When regenerated the changes will be lost.
**/
import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    BooleanField,
    DateField,
    Show,
    SimpleShowLayout,
    ReferenceManyField,
    ReferenceField,
    NumberField,
    SimpleForm,
    Edit,
    TextInput,
    BooleanInput,
    DateInput,
    DeleteButton,
    EditButton,
    ShowButton
} from 'admin-on-rest';
import {
    ObjectField
} from '../fields/ObjectField';
import {
    UserFilter
} from '../filters/UserFilter';

const validationEditUser = values => {
    const errors = {};
    return errors;
}

export const UserList = props => (
    <List {...props} title="User List" filters={<UserFilter />}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="username" />
            <TextField source="first_name" />
            <TextField source="last_name" />
            <TextField source="email" />
            <BooleanField source="is_active" />
            <DateField source="date_joined" />
            <DateField source="last_login" />
            <BooleanField source="email_verified" />
            <BooleanField source="msisdn_verified" />
            <TextField source="msisdn" />
            <TextField source="gender" />
            <DateField source="birth_date" />
            <TextField source="avatar" />
            <TextField source="country_code" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
            <EditButton />
            <ShowButton />
            <DeleteButton />
        </Datagrid>
    </List>
)

export const UserShow = props => (
    <Show {...props} title="User Show">
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="username" />
            <TextField source="first_name" />
            <TextField source="last_name" />
            <TextField source="email" />
            <BooleanField source="is_active" />
            <DateField source="date_joined" />
            <DateField source="last_login" />
            <BooleanField source="email_verified" />
            <BooleanField source="msisdn_verified" />
            <TextField source="msisdn" />
            <TextField source="gender" />
            <DateField source="birth_date" />
            <TextField source="avatar" />
            <TextField source="country_code" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
            <ReferenceManyField label="Domain Roles" reference="userdomainroles" target="user_id">
                <Datagrid>
                    <ReferenceField label="Domain" source="domain_id" reference="domains" linkType="show" allowEmpty>
                        <NumberField source="name" />
                    </ReferenceField>
                    <ReferenceField label="Role" source="role_id" reference="roles" linkType="show" allowEmpty>
                        <NumberField source="label" />
                    </ReferenceField>
                    <DateField source="created_at" />
                    <DateField source="updated_at" />
                </Datagrid>
            </ReferenceManyField>
            <ReferenceManyField label="Site Data" reference="usersitedata" target="user_id">
                <Datagrid>
                    <ReferenceField label="Site" source="site_id" reference="sites" linkType="show" allowEmpty>
                        <NumberField source="name" />
                    </ReferenceField>
                    <DateField source="consented_at" />
                    <ObjectField source="data" addLabel />
                    <BooleanField source="blocked" />
                    <DateField source="created_at" />
                    <DateField source="updated_at" />
                </Datagrid>
            </ReferenceManyField>
            <ReferenceManyField label="Site Roles" reference="usersiteroles" target="user_id">
                <Datagrid>
                    <ReferenceField label="Site" source="site_id" reference="sites" linkType="show" allowEmpty>
                        <NumberField source="name" />
                    </ReferenceField>
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

export const UserEdit = props => (
    <Edit {...props} title="User Edit">
        <SimpleForm validate={validationEditUser}>
            <TextInput source="first_name" />
            <TextInput source="last_name" />
            <TextInput source="email" />
            <BooleanInput source="is_active" />
            <BooleanInput source="email_verified" />
            <BooleanInput source="msisdn_verified" />
            <TextInput source="msisdn" />
            <TextInput source="gender" />
            <DateInput source="birth_date" />
            <TextInput source="avatar" />
            <TextInput source="country_code" />
            <ReferenceManyField label="Domain Roles" reference="userdomainroles" target="user_id">
                <Datagrid>
                    <ReferenceField label="Domain" source="domain_id" reference="domains" linkType="show" allowEmpty>
                        <NumberField source="name" />
                    </ReferenceField>
                    <ReferenceField label="Role" source="role_id" reference="roles" linkType="show" allowEmpty>
                        <NumberField source="label" />
                    </ReferenceField>
                    <DateField source="created_at" />
                    <DateField source="updated_at" />
                    <EditButton />
                </Datagrid>
            </ReferenceManyField>
            <ReferenceManyField label="Site Data" reference="usersitedata" target="user_id">
                <Datagrid>
                    <ReferenceField label="Site" source="site_id" reference="sites" linkType="show" allowEmpty>
                        <NumberField source="name" />
                    </ReferenceField>
                    <DateField source="consented_at" />
                    <ObjectField source="data" addLabel />
                    <BooleanField source="blocked" />
                    <DateField source="created_at" />
                    <DateField source="updated_at" />
                    <EditButton />
                </Datagrid>
            </ReferenceManyField>
            <ReferenceManyField label="Site Roles" reference="usersiteroles" target="user_id">
                <Datagrid>
                    <ReferenceField label="Site" source="site_id" reference="sites" linkType="show" allowEmpty>
                        <NumberField source="name" />
                    </ReferenceField>
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
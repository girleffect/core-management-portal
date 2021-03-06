/**
 * Generated Invitation.js code. Edit at own risk.
 * When regenerated the changes will be lost.
 **/
import React from 'react';
import {
    SimpleList,
    SimpleForm,
    Create,
    ReferenceInput,
    ReferenceManyField,
    TextField,
    SelectInput,
    Show,
    List,
    ReferenceField,
    DateField,
    Datagrid,
    Responsive,
    SimpleShowLayout,
    TextInput,
    Edit,
    NumberField,
    EditButton,
    ShowButton,
    DeleteButton
} from 'react-admin';
import EmptyField from '../fields/EmptyField';
import DateTimeInput from '../inputs/DateTimeInput';
import PermissionsStore from '../auth/PermissionsStore';

import InvitationEditToolbar from '../customActions/InvitationEditToolbar';

import InvitationFilter from '../filters/InvitationFilter';

import InvitationListActions from '../customActions/InvitationList';
import InvitationShowActions from '../customActions/InvitationShow';

import IdenticonField from '../fields/IdenticonField';
import FieldSelectDatagrid from '../grids/FieldSelectDatagrid';

const validationCreateInvitation = values => {
    const errors = {};
    if (!values.first_name) {
        errors.first_name = ['first_name is required'];
    }
    if (!values.last_name) {
        errors.last_name = ['last_name is required'];
    }
    if (!values.email) {
        errors.email = ['email is required'];
    }
    if (!values.organisation_id) {
        errors.organisation_id = ['organisation_id is required'];
    }
    return errors;
};

const validationEditInvitation = values => {
    const errors = {};
    return errors;
};

export const InvitationList = props => (
    <List
        {...props}
        title="Invitation List"
        filters={<InvitationFilter />}
        actions={<InvitationListActions />}
        bulkActionButtons={false}
    >
        <Responsive
            small={
                <SimpleList
                    primaryText={record => `First Name: ${record.first_name}`}
                    secondaryText={record => `Email: ${record.email}`}
                />
            }
            medium={
                <FieldSelectDatagrid>
                    <IdenticonField source="id" sortable={false} />
                    {PermissionsStore.getResourcePermission('users', 'list') ? (
                        <ReferenceField
                            label="User"
                            source="invitor_id"
                            reference="users"
                            sortable={false}
                            linkType="show"
                            allowEmpty
                        >
                            <TextField source="username" />
                        </ReferenceField>
                    ) : (
                        <EmptyField />
                    )}
                    <TextField source="first_name" sortable={false} />
                    <TextField source="last_name" sortable={false} />
                    <TextField source="email" sortable={false} />
                    {PermissionsStore.getResourcePermission('organisations', 'list') ? (
                        <ReferenceField
                            label="Organisation"
                            source="organisation_id"
                            reference="organisations"
                            sortable={false}
                            linkType="show"
                            allowEmpty
                        >
                            <NumberField source="name" />
                        </ReferenceField>
                    ) : (
                        <EmptyField />
                    )}
                    <DateField source="expires_at" sortable={false} />
                    <DateField source="created_at" sortable={false} />
                    {PermissionsStore.getResourcePermission('invitationredirecturls', 'list') ? (
                        <ReferenceField
                            label="Invitation Redirect Url"
                            source="invitation_redirect_url_id"
                            reference="invitationredirecturls"
                            sortable={false}
                            linkType="show"
                            allowEmpty
                        >
                            <NumberField source="url" />
                        </ReferenceField>
                    ) : (
                        <EmptyField />
                    )}
                    <DateField source="updated_at" sortable={false} />
                    {PermissionsStore.getResourcePermission('invitations', 'edit') ? (
                        <EditButton />
                    ) : null}
                    <ShowButton />
                    {PermissionsStore.getResourcePermission('invitations', 'remove') ? (
                        <DeleteButton />
                    ) : null}
                </FieldSelectDatagrid>
            }
        />
    </List>
);

export const InvitationCreate = props => (
    <Create {...props} title="Invitation Create">
        <SimpleForm validate={validationCreateInvitation} redirect="show">
            <TextInput source="first_name" />
            <TextInput source="last_name" />
            <TextInput source="email" />
            {PermissionsStore.getResourcePermission('organisations', 'list') && (
                <ReferenceInput
                    label="Organisation"
                    source="organisation_id"
                    reference="organisations"
                    perPage={0}
                    allowEmpty
                >
                    <SelectInput optionText="name" />
                </ReferenceInput>
            )}
            <DateTimeInput source="expires_at" />
            {PermissionsStore.getResourcePermission('invitationredirecturls', 'list') && (
                <ReferenceInput
                    label="Invitation Redirect Url"
                    source="invitation_redirect_url_id"
                    reference="invitationredirecturls"
                    perPage={0}
                    allowEmpty
                >
                    <SelectInput optionText="url" />
                </ReferenceInput>
            )}
        </SimpleForm>
    </Create>
);

export const InvitationShow = props => (
    <Show {...props} title="Invitation Show" actions={<InvitationShowActions />}>
        <SimpleShowLayout>
            <TextField source="id" />
            {PermissionsStore.getResourcePermission('users', 'list') ? (
                <ReferenceField
                    label="User"
                    source="invitor_id"
                    reference="users"
                    linkType="show"
                    allowEmpty
                >
                    <TextField source="username" />
                </ReferenceField>
            ) : (
                <EmptyField />
            )}
            <TextField source="first_name" />
            <TextField source="last_name" />
            <TextField source="email" />
            {PermissionsStore.getResourcePermission('organisations', 'list') ? (
                <ReferenceField
                    label="Organisation"
                    source="organisation_id"
                    reference="organisations"
                    linkType="show"
                    allowEmpty
                >
                    <NumberField source="name" />
                </ReferenceField>
            ) : (
                <EmptyField />
            )}
            <DateField source="expires_at" />
            <DateField source="created_at" />
            {PermissionsStore.getResourcePermission('invitationredirecturls', 'list') ? (
                <ReferenceField
                    label="Invitation Redirect Url"
                    source="invitation_redirect_url_id"
                    reference="invitationredirecturls"
                    linkType="show"
                    allowEmpty
                >
                    <NumberField source="url" />
                </ReferenceField>
            ) : (
                <EmptyField />
            )}
            <DateField source="updated_at" />
            {PermissionsStore.getResourcePermission('invitationdomainroles', 'list') ? (
                <ReferenceManyField
                    label="Domain Roles"
                    reference="invitationdomainroles"
                    target="invitation_id"
                >
                    <Datagrid>
                        {PermissionsStore.getResourcePermission('domains', 'list') ? (
                            <ReferenceField
                                label="Domain"
                                source="domain_id"
                                reference="domains"
                                sortable={false}
                                linkType="show"
                                allowEmpty
                            >
                                <NumberField source="name" />
                            </ReferenceField>
                        ) : (
                            <EmptyField />
                        )}
                        {PermissionsStore.getResourcePermission('roles', 'list') ? (
                            <ReferenceField
                                label="Role"
                                source="role_id"
                                reference="roles"
                                sortable={false}
                                linkType="show"
                                allowEmpty
                            >
                                <NumberField source="label" />
                            </ReferenceField>
                        ) : (
                            <EmptyField />
                        )}
                        <DateField source="created_at" sortable={false} />
                        <DateField source="updated_at" sortable={false} />
                    </Datagrid>
                </ReferenceManyField>
            ) : (
                <EmptyField />
            )}
            {PermissionsStore.getResourcePermission('invitationsiteroles', 'list') ? (
                <ReferenceManyField
                    label="Site Roles"
                    reference="invitationsiteroles"
                    target="invitation_id"
                >
                    <Datagrid>
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
                        {PermissionsStore.getResourcePermission('roles', 'list') ? (
                            <ReferenceField
                                label="Role"
                                source="role_id"
                                reference="roles"
                                sortable={false}
                                linkType="show"
                                allowEmpty
                            >
                                <NumberField source="label" />
                            </ReferenceField>
                        ) : (
                            <EmptyField />
                        )}
                        <DateField source="created_at" sortable={false} />
                        <DateField source="updated_at" sortable={false} />
                    </Datagrid>
                </ReferenceManyField>
            ) : (
                <EmptyField />
            )}
        </SimpleShowLayout>
    </Show>
);

export const InvitationEdit = props => (
    <Edit {...props} title="Invitation Edit">
        <SimpleForm validate={validationEditInvitation} toolbar={<InvitationEditToolbar />}>
            <TextInput source="first_name" />
            <TextInput source="last_name" />
            <TextInput source="email" />
            {PermissionsStore.getResourcePermission('organisations', 'list') && (
                <ReferenceInput
                    label="Organisation"
                    source="organisation_id"
                    reference="organisations"
                    perPage={0}
                    allowEmpty
                >
                    <SelectInput optionText="name" />
                </ReferenceInput>
            )}
            <DateTimeInput source="expires_at" />
            {PermissionsStore.getResourcePermission('invitationredirecturls', 'list') && (
                <ReferenceInput
                    label="Invitation Redirect Url"
                    source="invitation_redirect_url_id"
                    reference="invitationredirecturls"
                    perPage={0}
                    allowEmpty
                >
                    <SelectInput optionText="url" />
                </ReferenceInput>
            )}
            {PermissionsStore.getResourcePermission('invitationdomainroles', 'list') ? (
                <ReferenceManyField
                    label="Domain Roles"
                    reference="invitationdomainroles"
                    target="invitation_id"
                >
                    <Datagrid>
                        {PermissionsStore.getResourcePermission('domains', 'list') ? (
                            <ReferenceField
                                label="Domain"
                                source="domain_id"
                                reference="domains"
                                sortable={false}
                                linkType="show"
                                allowEmpty
                            >
                                <NumberField source="name" />
                            </ReferenceField>
                        ) : (
                            <EmptyField />
                        )}
                        {PermissionsStore.getResourcePermission('roles', 'list') ? (
                            <ReferenceField
                                label="Role"
                                source="role_id"
                                reference="roles"
                                sortable={false}
                                linkType="show"
                                allowEmpty
                            >
                                <NumberField source="label" />
                            </ReferenceField>
                        ) : (
                            <EmptyField />
                        )}
                        <DateField source="created_at" sortable={false} />
                        <DateField source="updated_at" sortable={false} />
                    </Datagrid>
                </ReferenceManyField>
            ) : null}
            {PermissionsStore.getResourcePermission('invitationsiteroles', 'list') ? (
                <ReferenceManyField
                    label="Site Roles"
                    reference="invitationsiteroles"
                    target="invitation_id"
                >
                    <Datagrid>
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
                        {PermissionsStore.getResourcePermission('roles', 'list') ? (
                            <ReferenceField
                                label="Role"
                                source="role_id"
                                reference="roles"
                                sortable={false}
                                linkType="show"
                                allowEmpty
                            >
                                <NumberField source="label" />
                            </ReferenceField>
                        ) : (
                            <EmptyField />
                        )}
                        <DateField source="created_at" sortable={false} />
                        <DateField source="updated_at" sortable={false} />
                    </Datagrid>
                </ReferenceManyField>
            ) : null}
        </SimpleForm>
    </Edit>
);

/** End of Generated Code **/

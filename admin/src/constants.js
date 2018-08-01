export const TITLES = {
    domainroles: 'Domain Roles',
    invitationdomainroles: 'Invitation Domain Roles',
    invitationsiteroles: 'Invitiation Site Roles',
    roleresourcepermissions: 'Role Resource Permissions',
    siteroles: 'Site Roles',
    userdomainroles: 'User Domain Roles',
    usersiteroles: 'User Site Roles',
    usersitedata: 'User Site Data',
    deletedusers: 'Deleted Users',
    deletedusersites: 'Deleted User Sites',
    adminnotes: 'Admin Notes',
    sitedataschemas: 'Site Data Schemas',
    organisationalunits: 'Organisations'
};

export const PERMISSIONS = {
    manageuserroles: [
        ['roles', 'list'],
        ['users', 'list'],
        ['sites', 'list'],
        ['siteroles', 'list'],
        ['usersiteroles', 'list'],
        ['usersiteroles', 'create'],
        ['usersiteroles', 'remove'],
        ['domains', 'list'],
        ['domainroles', 'list'],
        ['userdomainroles', 'list'],
        ['userdomainroles', 'create'],
        ['userdomainroles', 'remove']
    ],
    purgeexpiredinvitations: [
        ['invitations', 'remove'],
        ['invitationsiterole', 'remove'],
        ['invitationdomainrole', 'remove']
    ]
};

export const TECH_ADMIN = 'tech_admin';

export const PLACE_MAPPING = {
    d: 'domain',
    s: 'site'
};

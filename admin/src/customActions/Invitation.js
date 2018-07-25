import React, { Component } from 'react';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import SendIcon from 'material-ui/svg-icons/content/send';
import { DeleteButton, ListButton, RefreshButton, EditButton } from 'admin-on-rest';

import { styles } from '../Theme';
import { successNotificationAnt, errorNotificationAnt } from '../utils';

const timezoneOffset = new Date().getTimezoneOffset();

class InvitationShowActions extends Component {
    constructor(props) {
        super(props);
        this.inviteNotExpired = this.inviteNotExpired.bind(this);
        this.sendInvite = this.sendInvite.bind(this);
    }

    inviteNotExpired() {
        if (this.props.data) {
            const expiryDate = new Date(this.props.data.expires_at);
            let now = new Date();
            now = new Date(now.valueOf() - timezoneOffset * 60000);
            return expiryDate > now;
        }
        return false;
    }

    sendInvite() {
        const data = this.props.data;
        const id_token = localStorage.getItem('id_token');
        const permissions = JSON.parse(localStorage.getItem('permissions'));
        fetch(`${process.env.REACT_APP_MANAGEMENT_LAYER}/invitations/${data.id}/send`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${id_token}`,
                'X-GE-Portal-Context': permissions.currentContext.key
            }
        })
            .then(response => {
                successNotificationAnt('An invitation email was successfully queued for sending.');
            })
            .catch(error => {
                console.error(error);
                errorNotificationAnt('Invite not sent.');
            });
    }

    render() {
        const { basePath, data } = this.props;
        return (
            <CardActions style={styles.cardAction}>
                <EditButton basePath={basePath} record={data} />
                <ListButton basePath={basePath} />
                <DeleteButton basePath={basePath} record={data} />
                <RefreshButton />
                {/* Custom Actions */}
                {this.inviteNotExpired() && (
                    <FlatButton
                        primary
                        icon={<SendIcon />}
                        label="Send Invite"
                        onClick={this.sendInvite}
                    />
                )}
            </CardActions>
        );
    }
}

export default InvitationShowActions;

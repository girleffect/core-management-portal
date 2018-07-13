import React, { Component } from 'react';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import SendIcon from 'material-ui/svg-icons/content/send';
import { DeleteButton, ListButton, RefreshButton, ShowButton } from 'admin-on-rest';

import restClient, { OPERATIONAL } from '../swaggerRestServer';
import { styles } from '../Theme';
import { successNotificationAnt, errorNotificationAnt } from '../utils';

class InvitationEditActions extends Component {
    constructor(props) {
        super(props);
        this.inviteNotExpired = this.inviteNotExpired.bind(this);
        this.sendInvite = this.sendInvite.bind(this);
    }
    inviteNotExpired() {
        if (this.props.data) {
            const expiryDate = new Date(this.props.data.expires_at);
            return expiryDate < new Date();
        }
        return false;
    }
    sendInvite() {
        const data = this.props.data;
        restClient(OPERATIONAL, `/invitations/${data.id}/send`, {})
            .then(response => {
                successNotificationAnt('Invite Sent!');
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
                <ShowButton basePath={basePath} record={data} />
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

export default InvitationEditActions;
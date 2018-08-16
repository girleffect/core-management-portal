import React from 'react';
import PropTypes from 'prop-types';
import Card from 'material-ui/Card/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardHeader from 'material-ui/Card/CardHeader';
import CardText from 'material-ui/Card/CardText';
import CardTitle from 'material-ui/Card/CardTitle';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';

import DomainTreeInput from '../inputs/DomainTreeInput';
import { notEmptyObject } from '../utils';

const AssignRoleCard = ({
    amountSelectedToAssign,
    assigning,
    assignmentLocation,
    handleAssign,
    handleChange,
    handleSelect,
    rolesToAssign,
    treeData
}) => (
    <Card style={{ marginTop: 20 }}>
        <CardTitle title="Assign Role" />
        <CardText>
            <CardHeader subtitle="Select a Domain or Site:" />
            <DomainTreeInput
                label="Select Domain/Site"
                source="place"
                treeData={treeData}
                value={assignmentLocation}
                onChange={handleChange}
                onlyDomains={false}
                useReduxFormField={false}
            />
            {assignmentLocation && (
                <div>
                    <CardHeader subtitle="Please choose the roles to add:" />
                    <CardText>
                        {notEmptyObject(rolesToAssign)
                            ? Object.values(rolesToAssign).map(role => (
                                  <Checkbox
                                      key={role.id}
                                      label={role.label}
                                      checked={role.checked}
                                      onCheck={() => handleSelect(role.id)}
                                  />
                              ))
                            : 'No roles to Select on this domain/site.'}
                    </CardText>
                </div>
            )}
            {amountSelectedToAssign > 0 && (
                <CardActions>
                    <RaisedButton
                        label="Assign Roles"
                        secondary={true}
                        onClick={handleAssign}
                        disabled={assigning}
                    />
                </CardActions>
            )}
        </CardText>
    </Card>
);

AssignRoleCard.propTypes = {
    amountSelectedToAssign: PropTypes.number,
    assigning: PropTypes.bool,
    assignmentLocation: PropTypes.string,
    handleAssign: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSelect: PropTypes.func.isRequired,
    rolesToAssign: PropTypes.object,
    treeData: PropTypes.array.isRequired
};

AssignRoleCard.defaultProps = {
    amountSelectedToAssign: 0,
    assigning: false
};

export default AssignRoleCard;
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from 'material-ui/Card/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import CardText from 'material-ui/Card/CardText';
import CircularProgress from 'material-ui/CircularProgress';
import Checkbox from 'material-ui/Checkbox';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';

import { userSettingsLoad, userSettingsHiddenFieldsUpdate } from '../actions/userSettings';
import EditableDatagrid from './EditableDatagrid';
import { styles } from '../Theme';
import { getOrCreateGMPUserSiteData, updateGMPUserSiteData } from '../utils';
import { handleAPIError } from '../manageUtils';

const mapStateToProps = state => ({
    userSettings: state.userSettings
});

const mapDispatchToProps = dispatch => ({
    settingsLoad: (data, site_id) => dispatch(userSettingsLoad(data, site_id)),
    settingsHiddenFieldsUpdate: newSettings => dispatch(userSettingsHiddenFieldsUpdate(newSettings))
});

class FieldSelectDatagrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            children: props.children,
            loading: true
        };
        this.loadFields = this.loadFields.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    componentDidMount() {
        const { userSettings } = this.props;
        getOrCreateGMPUserSiteData(userSettings)
            .then(({ data, site_id }) => {
                this.props.settingsLoad(data, site_id);
                this.loadFields();
            })
            .catch(error => handleAPIError(error));
    }

    loadFields() {
        // Here we setup the state of all checkboxes for showing/hiding each fields.
        const { children, resource, userSettings } = this.props;
        const settings = userSettings.data && userSettings.data.settings;
        const hiddenSet = new Set(
            settings && settings[resource] && settings[resource].hiddenFields
        );
        if (children && !this.state.checkboxes) {
            // Create all checkboxes in state with their default value if given in props.
            let checkboxes = {};
            React.Children.map(children, child => {
                if (child && child.props && child.props.source) {
                    checkboxes[child.props.source] = hiddenSet.has(child.props.source)
                        ? false
                        : true;
                }
            });
            // Check if all are not shown
            const allHidden = Object.values(checkboxes).every(value => !value);
            // Set the state with all the children that have false checkboxes omitted.
            this.setState({
                checkboxes: checkboxes,
                children: React.Children.map(children, child => {
                    return child && child.props && child.props.source
                        ? checkboxes[child.props.source]
                            ? child
                            : null
                        : child;
                }),
                allHidden: allHidden,
                loading: false
            });
        }
    }

    updateCheckbox(name) {
        // Toggle the given checkbox state value.
        const { resource } = this.props;
        updateGMPUserSiteData(this.props, resource, name);
        const nextCheckboxState = {
            ...this.state.checkboxes,
            [name]: !this.state.checkboxes[name]
        };
        // Check if all are not shown
        const allHidden = Object.values(nextCheckboxState).every(value => !value);
        // Set the state with all the children that have false checkboxes omitted.
        this.setState({
            checkboxes: nextCheckboxState,
            children: React.Children.map(this.props.children, child => {
                return child && child.props && child.props.source
                    ? nextCheckboxState[child.props.source]
                        ? child
                        : null
                    : child;
            }),
            allHidden: allHidden
        });
    }

    onDragEnd({ destination, source }) {
        let children = Array.from(this.state.children);
        const [removed] = children.splice(source.index, 1);
        children.splice(destination.index, 0, removed);
        this.setState({
            children
        });
    }

    render() {
        // Render the Hide/Show field card unless allhidden is true.
        return this.state.loading ? (
            <CircularProgress />
        ) : (
            <div>
                <Card style={styles.fieldOptionsCard}>
                    <CardHeader
                        title="Hide/Show Fields"
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                        {Object.entries(this.state.checkboxes).map(([name, value]) => (
                            <Checkbox
                                key={name}
                                label={name}
                                checked={value}
                                onCheck={() => this.updateCheckbox(name)}
                                checkedIcon={<Visibility />}
                                uncheckedIcon={<VisibilityOff />}
                            />
                        ))}
                    </CardText>
                </Card>
                {!this.state.allHidden ? (
                    <EditableDatagrid
                        onDragEnd={this.onDragEnd}
                        managedChildren={this.state.children}
                        {...this.props}
                    />
                ) : (
                    <CardText>Please select at least one field to show.</CardText>
                )}
            </div>
        );
    }
}
FieldSelectDatagrid.propTypes = {
    defaultHiddenFields: PropTypes.array
};
FieldSelectDatagrid.defaultProps = {
    defaultHiddenFields: []
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FieldSelectDatagrid);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import { getUntilDone, makeIDMapping, CreateTreeData } from '../utils';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';
import TreeviewSelect from './TreeviewSelect';

class DomainTreeInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            treeData: props.treeData
        };
        this.parser = this.parser.bind(this);
        this.formatter = this.formatter.bind(this);
        this.loadData = this.loadData.bind(this);
        if (!props.treeData) {
            this.loadData();
        }
    }

    parser(value, name) {
        if (this.props.onlyDomains && value) {
            return parseInt(value.split(':')[1], 10);
        }
        return value;
    }

    formatter(value, name) {
        if (this.props.onlyDomains && value) {
            return `d:${value}`;
        }
        return value;
    }

    loadData() {
        getUntilDone('domains')
            .then(data => {
                const domains = makeIDMapping(data, 'd:');
                if (this.props.onlyDomains) {
                    this.setState({ treeData: CreateTreeData(domains) });
                } else {
                    getUntilDone('sites')
                        .then(data => {
                            const places = {
                                ...domains,
                                ...makeIDMapping(data, 's:')
                            };
                            this.setState({ treeData: CreateTreeData(places, 'domain_id', 's') });
                        })
                        .catch(error => {
                            throw new Error(error);
                        });
                }
            })
            .catch(error => {
                throw new Error(error);
            });
    }

    render() {
        const { useReduxFormField, value, source, label, onChange } = this.props;
        const { treeData } = this.state;
        return treeData ? (
            <span>
                {useReduxFormField ? (
                    <Field
                        name={source}
                        component={TreeviewSelect}
                        label={label}
                        props={{ treeData, label, onChange }}
                        parse={this.parser}
                        format={this.formatter}
                    />
                ) : (
                    <TreeviewSelect
                        treeData={treeData}
                        label={label}
                        onChange={onChange}
                        value={value}
                        input={{}}
                    />
                )}
            </span>
        ) : (
            <CircularProgress />
        );
    }
}
DomainTreeInput.propTypes = {
    useReduxFormField: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onlyDomains: PropTypes.bool,
    treeData: PropTypes.array
};
DomainTreeInput.defaultProps = {
    useReduxFormField: true,
    onlyDomains: true
};

export default DomainTreeInput;
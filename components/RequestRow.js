import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class RequestRow extends Component {
    render() {
        const { Row, Cell } = Table;

        return (
            <Row>
                <Cell>{this.props.id}</Cell>
            </Row>
        );
    }
}

export default RequestRow;
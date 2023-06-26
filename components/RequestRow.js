import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import campaignInstance from '../ethereum/campaign';

class RequestRow extends Component {
    onApprove = async () => {
        const campaign = campaignInstance(this.props.address);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.approveRequest(this.props.id).send({
            from: accounts[0]
        });
    };

    onFinalize = async () => {
        const campaign = campaignInstance(this.props.address);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.finalizeRequest(this.props.id).send({
            from: accounts[0]
        })
    }

    render() {
        const { Row, Cell } = Table;
        const { id, request, approversCount } = this.props;

        return (
            <Row disabled={request.complete}>
                <Cell>{id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>{request.approvalCount}/{approversCount}</Cell>
                <Cell>
                    {/* If request.complete is true then return the value of null, is is false render the button */}
                    {request.complete ? null: (
                        <Button color='green' basic onClick={this.onApprove}>
                            Approve
                        </Button>
                    )}
                </Cell>
                <Cell>
                    {/* If request.complete is true then return the value of null, is is false render the button */}
                    {request.complete ? null: (
                        <Button color='teal' basic onClick={this.onFinalize}>
                            Finalize
                        </Button>
                    )}
                </Cell>
            </Row>
        );
    }
}

export default RequestRow;
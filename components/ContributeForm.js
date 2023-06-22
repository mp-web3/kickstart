import React, { Component } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import campaignInstance from '../ethereum/campaign';
import web3 from '../ethereum/web3';

class ContributeForm extends Component {
    state = {
        value: ''
    };

    onSubmit = async (event) => {
        event.preventDefault();
        const campaign = campaignInstance(this.props.address);

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            });
        } catch (err) {

        }
    };

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input 
                    label="ether" 
                    labelPosition="right"
                    onChange={event => this.setState({ value: event.target.value })}
                    />
                </Form.Field>
                <Button primary>
                Contribute!
                </Button>
            </Form>
        );
    };
}

export default ContributeForm;
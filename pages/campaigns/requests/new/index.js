import React, { Component } from 'react';
import Layout from '../../../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import web3 from '../../../../ethereum/web3';
import campaignInstance from '../../../../ethereum/campaign';

class NewRequest extends Component {
    static async getInitialProps(props) {
        return{
            address: props.query.address
        }
    }

    state = {
        description: '',
        value:'',
        recipient:'',
        loading: false,
        errorMessage: ''
    }

    onSubmit = async (event) => {
        event.preventDefault();

        const campaign = campaignInstance(this.props.address);

        this.setState({ loading: true, errorMessage: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.createRequest(
                this.state.description,
                web3.utils.toWei(this.state.value, 'ether'),
                this.state.recipient
            )
            .send({
                from: accounts[0]
            })

        } catch (err) {
            this.setState({ errorMessage: err.message });
        }
        this.setState({ loading: false, value: '' });
    }

    render() {
        return (
            <Layout>
                <h3>Create a Request</h3>
                <p>{this.props.address}</p>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>
                            Description
                        </label>
                        <Input
                        onChange={event => {this.setState({ description: event.target.value}); console.log(event.target.value)}}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>
                            Amount in Ether
                        </label>
                        <Input
                        onChange={event => this.setState({ value: event.target.value})}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>
                            Recipient
                        </label>
                        <Input
                        onChange={event => this.setState({ recipient: event.target.value})}
                        />
                    </Form.Field>
                    
                    <Message error header='Oops!' content={this.state.errorMessage} />
                    <Button primary loading={this.state.loading}>
                        Create
                    </Button>
                    
                </Form>
            </Layout>
        )
    }
}

export default NewRequest;
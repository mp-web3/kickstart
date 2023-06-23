import React, { Component } from 'react';
import Layout from '../../../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import web3 from '../../../../ethereum/web3';

class NewRequest extends Component {

    state = {
        description: '',
        value:'',
        recipient:'',
        loading: false,
        errorMessage: ''
    }

    render() {
        return (
            <Layout>
                <h3>Create a Request</h3>
                <Form>
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

                    <Button primary>
                        Create
                    </Button>
                    
                </Form>
            </Layout>
        )
    }
}

export default NewRequest;
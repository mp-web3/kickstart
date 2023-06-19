import React, { Component } from "react";
import { Form, Button, Input, Message } from 'semantic-ui-react'
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

class CampaignNew extends Component {
    state = {
        minimumContribution:'',
        errorMessage:'',
        loading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({ loading: true, errorMessage:""});

        try {
            const accounts = await web3.eth.getAccounts();
    
            await factory.methods
            .createCampaign(this.state.minimumContribution)
            .send({
                from: accounts[0]
            });

        } catch (err) {
            this.setState({ errorMessage: err.message })
        }

        this.setState({ loading: false });
    };

    render() {
        return (
            <Layout>
                <h1>Create a Campaign</h1>

                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}> {/* We need to add an error prop to the Form in order to have the error message printed out when we use semantic-ui*/}
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input 
                        label="wei"
                        labelPosition="right"
                        value={this.state.minimumContribution}
                        onChange={event => this.setState({minimumContribution: event.target.value})}
                        />
                    </Form.Field>

                    <Message error header="Oops!" content={this.state.errorMessage} />
                    <Button loading={this.state.loading} primary >Create!</Button>

                </Form>
            </Layout>
        );
    }
}

export default CampaignNew;
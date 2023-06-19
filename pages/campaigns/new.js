import React, { Component } from "react";
import { Form, Button, Input } from 'semantic-ui-react'
import Layout from "../../components/Layout";

class CampaignNew extends Component {
    state = {
        minimumContribution:''
    };
    render() {
        return (
            <Layout>
                <h1>Create a Campaign</h1>

                <Form>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input 
                        label="wei"
                        labelPosition="right"
                        value={this.state.minimumContribution}
                        onChange={event => this.setState({minimumContribution: event.target.value})}
                        />
                    </Form.Field>

                    <Button primary>Create!</Button>
                </Form>
            </Layout>
        );
    }
}

export default CampaignNew;
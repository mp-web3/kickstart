import React, { Component } from 'react';
import Layout from '../../components/Layout';
import campaignInstance from '../../ethereum/campaign';
import { Card, Grid } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';


class CampaignShow extends Component {
    static async getInitialProps(props) {
        // Create an instace of the campaign at (address)
        const campaign = campaignInstance(props.query.address);

        const summary = await campaign.methods.getSummary().call();

        //console.log(summary);
        /* The following is what we get in our terminal if we console.log the summary
        Result {
            '0': '100',
            '1': '0',
            '2': '0',
            '3': '0',
            '4': '0x9c03Ce240E2D6EEB70B7Ebe73B1289EF4ecBF5A6'
        }
        */
       // Now we want to pass down to our components, individual props instead of the entire object summary

        return{
            address: props.query.address, //we need to pass down the address to the ContributeForm component
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };
    }

    renderCards() {

        // Destructure props

        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approversCount
        } = this.props;

        const items = [
            {
                header: manager,
                meta:'Address of the Campaign Manager',
                description: 'The manager created the campaign and can create requests',
                style: { overflowWrap: 'break-word'}
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'You must contribute at least this much wei to become an approver'
            },
            {
                header: requestsCount,
                meta: 'Number of Requests',
                description: 'A request tries to withdraw money from the contract. Requests must be approved by contract manager'
            },
            {
                header: approversCount,
                meta: 'Number of Approvers',
                description: 'Number of people who have already donated to campaign'
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance (ether)',
                description: 'The balance is how much money of this campaign is left to spend'
            }
        ];

        return <Card.Group items={items} />

    }

    render() {
        return (
            <Layout>
                <h3>Campaign Details</h3>
                <Grid>
                    <Grid.Column width={10}>
                        {this.renderCards()}
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <ContributeForm address={this.props.address} />
                    </Grid.Column>
                </Grid>
            </Layout>
        );
    }
}

export default CampaignShow;

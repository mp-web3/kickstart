import React, { Component } from 'react';
import Layout from '../../components/Layout';
import campaignInstance from '../../ethereum/campaign';


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
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };
    }


    render() {
        return (
            <Layout>
                <h3>Campaign Details</h3>

            </Layout>
        );
    }
}

export default CampaignShow;

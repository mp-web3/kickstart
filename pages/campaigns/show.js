import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import Layout from '../../components/Layout';

class CampaignShow extends Component {
    static async getInitialProps(props) {
        const campaignAddress = props.query.address;
        return {campaignAddress};
    }


    render() {
        return (
            <Layout>
                <h3>Campaign Details</h3>
                <p>Address: {this.props.campaignAddress}</p>

            </Layout>
        );
    }
}

export default CampaignShow;
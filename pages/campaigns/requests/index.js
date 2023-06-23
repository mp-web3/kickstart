import React, { Component } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import { Link } from '../../../routes';
import campaignInstance from '../../../ethereum/campaign';

class RequestIndex extends Component {
    static async getInitialProps(props) {
        const { address } = props.query;
        const campaign = campaignInstance(address);

        const requestsCount = await campaign.methods.getRequestsCount().call();

        const requests = await Promise.all(
            Array(parseInt(requestsCount)).fill().map((element, index) => {
                return campaign.methods.requests(index).call();
            })
        );

        return { address, requests, requestsCount };
    }
    
    render() {
        return (
            <Layout>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={12}>
                            <h3>Request List</h3>
                        </Grid.Column>

                        <Grid.Column width={4}>
                            <Link route={`/campaigns/${this.props.address}/requests/new`}>
                                <Button primary>
                                    Add Request
                                </Button>        
                            </Link>
                        </Grid.Column>
                    </Grid.Row>

                </Grid>
    
            </Layout>

        )
    }
}

export default RequestIndex;
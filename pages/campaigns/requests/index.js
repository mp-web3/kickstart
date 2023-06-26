import React, { Component } from 'react';
import { Button, Grid, Table } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import { Link } from '../../../routes';
import campaignInstance from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

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

    renderRow() {
        return this.props.requests.map((request, index) => {
            return <RequestRow 
                key={index}
                request={request}
                address={this.props.address}
            />;
        });
    }
    
    render() {

        // destructuring properties of Tabl
        const { Header, Row, HeaderCell, Body } = Table;

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

                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>

                </Table>
    
            </Layout>

        )
    }
}

export default RequestIndex;
import React, { Component } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import Layout from '../../../components/Layout';

class RequestIndex extends Component {
    render() {
        return (
            <Layout>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={12}>
                            <h3>Request List</h3>
                        </Grid.Column>

                        <Grid.Column width={4}>
                            <Button primary>
                                Add Request
                            </Button>        
                        </Grid.Column>
                    </Grid.Row>

                </Grid>
    
            </Layout>

        )
    }
}

export default RequestIndex;
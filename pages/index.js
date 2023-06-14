import React, { useEffect, useState } from "react";
import instance from "../ethereum/factory";

function CampaignIndex() {
  const [campaigns, setCampaigns] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const factory = await instance;
      const campaigns = await factory.methods.getDeployedCampaigns().call();
      setCampaigns(campaigns);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Campaigns Index</h1>
      {campaigns.map((campaign, i) => (
        <p key={i}>{campaign}</p>
      ))}  
    </div>
  );

};



/*
class CampaignIndex extends Component {
  async componentDidMount() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    console.log(campaigns);
  }

  render() {
    return <div>Campaigns Index!</div>;
  }
}
*/

export default CampaignIndex;
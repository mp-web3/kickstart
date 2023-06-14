import React, { useEffect, useState } from 'react';
import getInstance from '../ethereum/factory';

function App() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const factory = await getInstance();
      const campaigns = await factory.methods.getDeployedCampaigns().call();
      setCampaigns(campaigns);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Campaigns Index!</h1>
      {campaigns.map((campaign, i) => (
        <p key={i}>{campaign}</p>
      ))}
    </div>
  );
}

export default App; //Next always expect a component to render
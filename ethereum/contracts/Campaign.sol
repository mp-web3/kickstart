pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    /*'Request' is not an instance of Request but a definition, like a class that we can use to create instances */
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    /*'restricted()' when added to a function requires that whoever is calling the funtion has the same address of the manager */
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    /* 'requests' is an array made of Request type structs */
    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    /* Constructor function 'Campaign' is executed during contract deployement */
    function Campaign(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        if (!approvers[msg.sender]) {
            /* Allow to contribute more than once, but increase the approversCount only the first time */
            approvers[msg.sender] = true;
            approversCount++;
        }
    }

    /* The purpose of 'createRequest' function is to create a new Struct of type Request and add it to requests */
    function createRequest(
        string description,
        uint value,
        address recipient
    ) public restricted {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });

        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[
            index
        ]; /* refactor by declaring a Request object which is equal to the request contained in the requests object at the index passed by the user;*/

        require(
            approvers[msg.sender]
        ); /* if the sender is not in the approvers mapping this will return false and exit the function */
        require(
            !request.approvals[msg.sender]
        ); /* return false if the user has already voted */

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[
            index
        ]; /* Since we are using several times requests[index], this makes it more coincise */
        /*
        require(!requests[index].complete); 
        requests[index].complete = true;
        */
        require(
            request.approvalCount > (approversCount / 2)
        ); /* to be finilized it needs at leat 50% of contributors approval */
        require(
            !request.complete
        ); /* make sure the request has not been finilized yet */

        request.recipient.transfer(request.value);
        request.complete = true;
    }
}

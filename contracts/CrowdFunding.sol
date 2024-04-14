// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public numberOfCampaigns = 0;

    // Events
    event CampaignCreated(uint256 indexed campaignId);
    event DonationReceived(uint256 indexed campaignId, address donor, uint256 amount);
    event DonationSent(address to, uint256 amount);

    // Modifier to check if the caller is the campaign owner
    modifier isOwner(uint256 campaignId) {
        require(msg.sender == campaigns[campaignId].owner, "Caller is not the campaign owner");
        _;
    }

    // Function to create a new campaign
    function createCampaign(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline) public {
        require(_deadline > block.timestamp, "The deadline should be a date in the future.");

        Campaign storage newCampaign = campaigns[numberOfCampaigns];
        newCampaign.owner = _owner;
        newCampaign.title = _title;
        newCampaign.description = _description;
        newCampaign.target = _target;
        newCampaign.deadline = _deadline;
        newCampaign.amountCollected = 0;

        emit CampaignCreated(numberOfCampaigns);
        numberOfCampaigns++;
    }

    // Function to donate to a campaign
    function donateToCampaign(uint256 _id) public payable {
        require(_id < numberOfCampaigns, "Campaign does not exist");
        require(block.timestamp < campaigns[_id].deadline, "The campaign deadline has passed");
        require(msg.value > 0, "Donation must be greater than 0");

        Campaign storage campaign = campaigns[_id];
        campaign.donators.push(msg.sender);
        campaign.donations.push(msg.value);
        campaign.amountCollected += msg.value;

        emit DonationReceived(_id, msg.sender, msg.value);

        // Transfer the donation to the owner
        (bool sent,) = payable(campaign.owner).call{value: msg.value}("");
        require(sent, "Failed to send Ether to the campaign owner");
        emit DonationSent(campaign.owner, msg.value);
    }

    // Function to get donators and donations for a campaign
    function getDonators(uint256 _id) public view returns (address[] memory, uint256[] memory) {
        require(_id < numberOfCampaigns, "Campaign does not exist");
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    // Function to get all campaigns
    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);
        for (uint i = 0; i < numberOfCampaigns; i++) {
            allCampaigns[i] = campaigns[i];
        }
        return allCampaigns;
    }

    // Testing utility function (for external use only)
    function send(address to, uint256 amount) external payable {
        require(msg.value >= amount, "Not enough Ether provided");
        (bool success,) = to.call{value: amount}("");
        require(success, "Failed to send Ether");
        emit DonationSent(to, amount);
    }
}

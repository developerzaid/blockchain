const CrowdFunding = artifacts.require("CrowdFunding");

contract("CrowdFunding", (accounts) => {
  let crowdFundingInstance;

  const owner = accounts[0];
  const donor = accounts[1];

  let campaignId;

  before(async () => {
    crowdFundingInstance = await CrowdFunding.new({ from: owner });
  });

  describe("Create Campaign", () => {
    it("should create a new campaign successfully", async () => {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const futureDeadline = currentTimestamp + 86400; // 1 day from now

      const tx = await crowdFundingInstance.createCampaign(
        owner,
        "Save the Rainforests",
        "Help us protect the rainforests by contributing to our fund.",
        web3.utils.toWei("10", "ether"),
        futureDeadline,
        { from: owner }
      );

      assert(tx.receipt.status, "Campaign creation should be successful");

      // Check if the event was emitted and capture the campaignId from it
      assert.equal(tx.logs.length, 1, "Should emit one event.");
      const event = tx.logs[0];
      assert.equal(
        event.event,
        "CampaignCreated",
        "Event should be CampaignCreated"
      );
      campaignId = event.args.campaignId.toNumber();
      assert.equal(
        campaignId,
        0,
        "Campaign ID should be 0 for the first campaign"
      );
    });
  });

  describe("Donate to Campaign", () => {
    it("should accept donations", async () => {
      const donationAmount = web3.utils.toWei("1", "ether");
      await crowdFundingInstance.donateToCampaign(campaignId, {
        from: donor,
        value: donationAmount,
      });

      const campaign = await crowdFundingInstance.campaigns(campaignId);
      assert.equal(
        campaign.amountCollected.toString(),
        donationAmount,
        "Campaign's collected amount should match the donated amount."
      );
    });
  });

  describe("Fetch Campaigns", () => {
    it("should fetch all campaigns", async () => {
      const campaigns = await crowdFundingInstance.getCampaigns({
        from: owner,
      });
      assert.equal(campaigns.length, 1, "There should be one campaign.");
    });
  });

  describe("Security and Validation Checks", () => {
    it("should not allow creating a campaign with past deadline", async () => {
      const pastDeadline = Math.floor(Date.now() / 1000) - 100; // 100 seconds in the past
      try {
        await crowdFundingInstance.createCampaign(
          owner,
          "Invalid Campaign",
          "This campaign should fail.",
          web3.utils.toWei("5", "ether"),
          pastDeadline,
          { from: owner }
        );
        assert.fail("The transaction should have failed.");
      } catch (error) {
        assert.include(
          error.message,
          "revert",
          "The transaction should revert due to past deadline."
        );
      }
    });
  });
});

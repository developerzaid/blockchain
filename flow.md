# Transaction Flow for CrowdFunding Smart Contract

## Create Campaign

1. **Action:** Owner creates a new campaign by calling the `createCampaign` function.
2. **Parameters:**
   - `owner`: Address of the campaign owner.
   - `name`: Name of the campaign ("Save the Rainforests").
   - `description`: Description of the campaign.
   - `goalAmount`: Target fundraising goal (10 ether).
   - `deadline`: Deadline for the campaign (1 day from now).
3. **Result:**
   - A new campaign is created successfully.
   - Event `CampaignCreated` is emitted with campaign details.
   - Campaign ID is captured for further reference.

## Donate to Campaign

1. **Action:** Donor donates to the campaign by calling the `donateToCampaign` function.
2. **Parameters:**
   - `campaignId`: ID of the campaign to donate to.
   - `value`: Amount of ether to donate (1 ether).
3. **Result:**
   - Donation is made successfully.
   - The donated amount is added to the campaign's total collected amount.

import { SMART_CONTRACT_STRATEGIES } from "components/LaunchpadIssuance/types";

export const offeringData = [
    {
      option: SMART_CONTRACT_STRATEGIES.original,
      text: "IX Swap Originated \n Primary Offering",
      tooltipContent: "The smart contract was created by IX Swap and grants complete accessibility to the smart contract."
    },
    {
      option: SMART_CONTRACT_STRATEGIES.nonOriginalWithAccess,
      text: "Non-IXS Originated Primary Offering with Smart Contract Minting & Whitelisting Access",
      tooltipContent: "The smart contract was created by an external party and grants partial accessibility to the smart contract to whitelist and to mint tokens."
    },
    {
      option: SMART_CONTRACT_STRATEGIES.nonOriginalWithNoAccess,
      text: "Non-IXS Originated Primary Offering with NO access to Token Smart Contract",
      tooltipContent: "The smart contract was created by an external party and does NOT grant. accessibility to the smart contract."
    }
  ];
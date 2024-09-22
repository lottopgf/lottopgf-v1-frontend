import { APP_URL } from "@/lib/host";
import { type Address } from "viem";
import { scroll } from "viem/chains";

// Project metadata
export const METADATA = {
  name: "LottoPGF Test Lottery",
  title: null,
  description: "This is a Test!",
  url: APP_URL,
  icon: `${APP_URL}/images/icon.svg`,
  logo: `/images/logo.svg`,
  bannerImage: "/images/banner.png",
  longDescription: (
    <p>
      This is a test lottery to show how LottoPGF can be used to fund public
      goods, community and other causes!
    </p>
  ),
};

// The chain where your lottery contract is deployed
export const CHAIN = scroll;

// The ticker of the prize token. Will be used when rendering prizes.
export const PRIZE_TOKEN_TICKER = "ETH";
export const PRIZE_TOKEN_DECIMALS = 18;
// If true the user will pay with native tokens via the ETH adapter,
// otherwise they will pay with the ERC20 token directly
export const PRIZE_TOKEN_IS_NATIVE = true;

// The contract address of the lottery
export const CONTRACT_ADDRESS: Address =
  "0x09BFa081ad54C0EfdAC38CE0c6681A9B8618C432";

// The address of the ETH adapter contract
export const LOOTERY_ETH_ADAPTER_ADDRESS: Address =
  "0xB95C75a28019be64e62863E2C9dc48D0dea8b5cc";

// The URL of the GraphQL API to get ticket data
export const GRAPHQL_API =
  "https://zuzalotto-indexer-production.up.railway.app";

// The amount of money you're trying to raise.
// It will show a progress bar inside of the "funds raised" card.
// Set to null to disable the progress bar
export const FUNDRAISE_TARGET: bigint | null = null;

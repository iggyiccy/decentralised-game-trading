# Decentralised Game Trading Marketplace

![](https://media.giphy.com/media/TL0oXBlykdF7ekXI9w/giphy.gif)

## Idea

I recently bought a Nintendo Switch game console and found that it is a common
struggle for console owners to buy and sell pre-owned games. This project aims
to provide a decentralised solution for the game trading space.

Features:

- Smart contract lock-in deposit for shipping related trade
- Smart contract lock-in deposit for F2F trading
- Smart contract for local business owners to register become a trading site
- Smart contract to rate selling and buyer
- Use Chainlink Oracle to fetch information from Australia Post shipping details
- Use Chainlink Oracle to fetch Nintendo game price and details
- Organise F2F meetup
- Decentralised chat feature using Status

# Chainlink Hardhat Box
 Implementation of the following 3 Chainlink features using the [Hardhat](https://hardhat.org/) development environment:
 - [Request & Receive data](https://docs.chain.link/docs/request-and-receive-data)
 - [Chainlink Price Feeds](https://docs.chain.link/docs/using-chainlink-reference-contracts)
 - [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf)

 ## Requirements

- [NPM](https://www.npmjs.com/) or [YARN](https://yarnpkg.com/)

## Installation

### Kovan Ethereum Testnet
Set your `KOVAN_RPC_URL` [environment variable.](https://www.twilio.com/blog/2017/01/how-to-set-environment-variables.html). You can get one for free at [Infura's site.](https://infura.io/) You'll also need to set the variable `PRIVATE_KEY`, which is your private key from your wallet, ie MetaMask. This is needed for deploying contracts to public networks. You can optionally set your `MNEMONIC` environment variable instead with some changes to the `hardhat.config.js`.

### Matic Mumbai Testnet
Set your `MUMBAI_RPC_URL` [environment variable](https://www.twilio.com/blog/2017/01/how-to-set-environment-variables.html). You can get one from the [Matic docs](https://docs.matic.network/docs/develop/network-details/network). You'll also need to set the variable `PRIVATE_KEY` which is your private key from your wallet, ie MetaMask. This is needed for deploying contracts to public networks. You can obtain testnet MATIC and LINK via the [MATIC Faucet](https://faucet.matic.network/)

### Setting Environment Variables
You can set these in your `.env` file if you're unfamiliar with how setting environment variables work. Check out our [.env example](https://github.com/smartcontractkit/hardhat-starter-kit/blob/main/.env.example). If you wish to use this method to set these variables, update the values in the .env.example file, and then rename it to '.env'

![WARNING](https://via.placeholder.com/15/f03c15/000000?text=+) **WARNING** ![WARNING](https://via.placeholder.com/15/f03c15/000000?text=+)

Don't commit and push any changes to .env files that may contain sensitive information, such as a private key! If this information reaches a public GitHub repository, someone can use it to check if you have any Mainnet funds in that wallet address, and steal them!

`.env` example:
```
KOVAN_RPC_URL='www.infura.io/asdfadsfafdadf'
PRIVATE_KEY='abcdef'
MAINNET_RPC_URL="https://eth-mainnet.alchemyapi.io/v2/your-api-key"
MUMBAI_RPC_URL='https://rpc-mumbai.maticvigil.com'
POLYGON_MAINNET_RPC_URL='https://rpc-mainnet.maticvigil.com'
```
`bash` example
```
export KOVAN_RPC_URL='www.infura.io/asdfadsfafdadf'
export PRIVATE_KEY='abcdef'
export MAINNET_RPC_URL='https://eth-mainnet.alchemyapi.io/v2/your-api-key'
export MUMBAI_RPC_URL='https://rpc-mumbai.maticvigil.com'
export POLYGON_MAINNET_RPC_URL='https://rpc-mainnet.maticvigil.com'
```

If you plan on deploying to a local [Hardhat network](https://hardhat.org/hardhat-network/) that's a fork of the Ethereum mainnet instead of a public test network like Kovan, you'll also need to set your `MAINNET_RPC_URL` [environment variable.](https://www.twilio.com/blog/2017/01/how-to-set-environment-variables.html) and uncomment the `forking` section in `hardhat.config.js`. You can get one for free at [Alchemy's site.](https://alchemyapi.io/).

You can also use a `PRIVATE_KEY` instead of a `MNEMONIC` environment variable by uncommenting the section in the `hardhat.config.js`, and commenting out the `MNEMONIC` line.

Then you can install all the dependencies

```bash
git clone https://github.com/smartcontractkit/hardhat-starter-kit/
cd hardhat-starter-kit
```
then

```bash
npm install
```

Or

```bash
yarn
```


## Auto-Funding

This Starter Kit is configured by default to attempt to auto-fund any newly deployed contract that uses Any-API or Chainlink VRF, to save having to manually fund them after each deployment. The amount in LINK to send as part of this process can be modified in the [Starter Kit Config](https://github.com/smartcontractkit/chainlink-hardhat-box/blob/main/helper-hardhat-config.js), and are configurable per network.

| Parameter  | Description                                       | Default Value |
| ---------- | :------------------------------------------------ | :------------ |
| fundAmount | Amount of LINK to transfer when funding contracts | 1 LINK        |

If you wish to deploy the smart contracts without performing the auto-funding, run the following command when doing your deployment:

```bash
npx hardhat deploy --tags main
```


## Deploy

Deployment scripts are in the [deploy](https://github.com/smartcontractkit/hardhat-starter-kit/tree/main/deploy) directory. If required, edit the desired environment specific variables or constructor parameters in each script, then run the hardhat deployment plugin as follows. If no network is specified, it will default to the Kovan network.

This will deploy to a local hardhat network

This will deploy to a local hardhat network

```bash
npx hardhat deploy
```

To deploy to testnet:
```bash
npx hardhat deploy --network kovan
```

## Test
Tests are located in the [test](https://github.com/smartcontractkit/hardhat-starter-kit/tree/main/test) directory, and are split between unit tests and integration tests. Unit tests should only be run on local environments, and integration tests should only run on live environments.

To run unit tests:

```bash
yarn test
```

To run integration tests:

```bash
yarn test-integration
```

## Run

The deployment output will give you the contract addresses as they are deployed. You can then use these contract addresses in conjunction with Hardhat tasks to perform operations on each contract


### Chainlink Price Feeds
The Price Feeds consumer contract has one task, to read the latest price of a specified price feed contract

```bash
npx hardhat read-price-feed --contract insert-contract-address-here --network network
```

### Request & Receive Data
The APIConsumer contract has two tasks, one to request external data based on a set of parameters, and one to check to see what the result of the data request is. This contract needs to be funded with link first:

```bash
npx hardhat fund-link --contract insert-contract-address-here --network network
```

Once it's funded, you can request external data by passing in a number of parameters to the request-data task. The contract parameter is mandatory, the rest are optional

```bash
npx hardhat request-data --contract insert-contract-address-here --network network
```

Once you have successfully made a request for external data, you can see the result via the read-data task
```bash
npx hardhat read-data --contract insert-contract-address-here --network network
```


### VRF Get a random number
The VRFConsumer contract has two tasks, one to request a random number, and one to read the result of the random number request. This contract needs to be funded with link first:

```bash
npx hardhat fund-link --contract insert-contract-address-here --network network
```

Once it's funded, you can perform a VRF request with the request-random-number task:

```bash
npx hardhat request-random-number --contract insert-contract-address-here --network network
```

Once you have successfully made a request for a random number, you can see the result via the read-random-number task:

```bash
npx hardhat read-random-number --contract insert-contract-address-here --network network
```

### Keepers
The KeepersCounter contract is a simple Chainlink Keepers enabled contract that simply maintains a counter variable that gets incremented each time the performUpkeep task is performed by a Chainlink Keeper. Once the contract is deployed, you should head to [https://keepers.chain.link/](https://keepers.chain.link/) to register it for upkeeps, then you can use the task below to view the counter variable that gets incremeneted by Chainlink Keepers


```bash
npx hardhat read-keepers-counter --contract insert-contract-address-here --network network
```

## Verify on Etherscan

You'll need an `ETHERSCAN_API_KEY` environment variable. You can get one from the [Etherscan API site.](https://etherscan.io/apis)

```
npx hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
```
example:

```
npx hardhat verify --network kovan 0x9279791897f112a41FfDa267ff7DbBC46b96c296 "0x9326BFA02ADD2366b30bacB125260Af641031331"
```

### Linting

```
yarn lint:fix
```


# A full stack dApp starter built on Ethereum (Solidity) with Next.js (React)

This repo contains boilerplate code for interacting with a simple smart contract
from the client-side using [Solidity](https://soliditylang.org/),
[React](https://reactjs.org/) and [TailwindCSS](https://tailwindcss.com/).

![Solidity + Next.js Starter](/public/screenshot.png)

## Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [MetaMask wallet browser extension](https://metamask.io/download.html).

## Getting Started

### Clone This Repo

Use `git clone https://github.com/tomhirst/solidity-nextjs-starter.git` to get
the files within this repository onto your local machine.

### Environment Setup

Duplicate `.env.example` to `.env` and fill out the `HARDHAT_CHAIN_ID`
environment variable. The port from the example file, if it's free, will be fine
in most cases.

Run `npm install`.

### Running The Smart Contract Locally

Compile the ABI for the smart contract using `npx hardhat compile`.

If you're successful, you'll recieve a confirmation message of:

```
Compilation finished successfully
```

And, a `src/artifacts` folder will be created in your project.

Deploy the smart contract to the local blockchain for testing with
`npx hardhat node`.

If you're successful, you'll be presented with a number of account details in
the CLI. Here's an example:

```
Account #0: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

Then in a new terminal window,
`npx hardhat run scripts/deploy.js --network localhost`.

If you're successful, you'll get something like the following CLI output:

```
Greeter deployed to: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
```

### Adding A Local Account To MetaMask

Open your MetaMask browser extension and change the network to `Localhost 8545`.

Next, import one of the accounts by adding its Private Key (for example,
`0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80` to
MetaMask.

If you're successful, you should see the a balance resembling something like
`10000 ETH` in the wallet.

### Connecting The Front-End

In `.env` set the `NEXT_PUBLIC_GREETER_ADDRESS` environment variable to the
address your smart contract was deployed to. For example,
`0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0`.

In a new terminal window, load the front-end with `npm run dev`. If you want to
use an alternate port from `3000`, use `npm run dev -- --port=1234`, or whatever
port number you prefer.

## Demo'ing The Functionality

Once set up, go to `localhost:3000` (or whatever post number you used), to view
your dApp in the browser.

Clicking `Fetch greeting from the blockchain` should bring back a value of
`Hello world!` in the input above. This is the default string passed to the
smart contract on first deloy.

To update the greeting value, type something in the input with placeholder
`Write a new greeting`, then click `Set new greeting on the blockchain`. If
you're successful, a MetaMask window will open in your browser. From here you
can connect the local account you added earlier and sign the transaction.

Click `Fetch greeting from the blockchain` again to see the changes you've made.

## Editing The Front-End

To modify the front page of your application, edit `pages/index.js`.

All [TailwindCSS classes](https://tailwindcss.com/docs) are available to you.

To lint your front-end code, use `npm run lint`.

## Testing

To test your smart contracts, run `npx hardhat test`.

A sample test can be found in `test/sample-test.js`.

## Deploying To The Ropsten Test Network

_This is a more advanced step after running the smart contract locally._

Up to now, the smart contract has been running on a local blockchain. The next
step, is to test how it works on a live test network. We'll do this by deploying
to Ropsten.

### MetaMask

First, switch your MetaMask network from `Localhost 8545` to
`Ropsten Test Network`.

Then, view the account details of your test account. Click `Export Private Key`.
After entering your password, you'll be given a private key. Copy and paste your
private key (example,
`df57089aefbcaf7ba0bc227dafbffa9fc08a93fdc65e1e42214a14efcf23656e`) as the value
of `ROPSTEN_PRIVATE_KEY` in `.env`.

**Important:** Never expose the private key of an account with real assets
inside. Always add private keys as environment variables. Never commit private
keys to code.

### Infura

[Infura](https://infura.io/) is a service that allows developers to connect to
Ethereum infrastructure through their API. In this boilerplate, we'll be using
Infura to deploy our smart contract to the Ropsten test network.

Sign up for an account if you don't have one already, then
[create a new Ethereum project](https://infura.io/dashboard/ethereum/). Name
your project, then select `Ropsten` from the endpoints drop down. Save changes.

Copy and paste the URL starting with `https` and set it as the `ROPSTEN_URL`
value in your `.env` file.

### Obtaining Test ETH

You'll need some test ETH in your wallet for use on Ropsten. Head over to the
[Ropsten Ethereum Faucet](https://faucet.ropsten.be/), paste in your wallet
account address (for example,
`0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`) and press
`Send me test Ether`.

In a few minutes, you should see your balance update in MetaMask. This is your
test ETH.

### Deploying Your Smart Contract To Ropsten

In your terminal enter, `npx hardhat run scripts/deploy.js --network ropsten`.

If you're successful, you'll get a confirmation message as follows:

```
Greeter deployed to: 0x9045cEc7161f380C224ae95c15EbE96659A53c46
```

This address is where your smart contract is deployed on the Ropsten Test
Network.

Post deployment, you should also see your ETH decrease a little in MetaMask from
the gas transaction fee.

### Etherscan

Because your smart contract is now deployed to a live test network, you'll be
able to view it's details on [Etherscan](https://ropsten.etherscan.io/). Go to
[Ropsten Etherscan](https://ropsten.etherscan.io/) and copy and paste the
address you were given in the previous step (for example,
`0x9045cEc7161f380C224ae95c15EbE96659A53c46`) into the explorer.

You'll be able to see all historical transactions and events here.

### Testing The Functionality

Change the `NEXT_PUBLIC_GREETER_ADDRESS` variable in `.env` to be the smart
contract address on the Ropsten Test Network (for example,
`0x9045cEc7161f380C224ae95c15EbE96659A53c46`).

Start (or restart) the front-end using `npm run dev`.

Fetching the greeting from the blockchain will return `Hello world!` on first
run.

Setting a new greeting may take a little longer than it did locally as we're
using a real test network.

All instance of setting a new greeting will now create a transaction attached to
the smart contract that you can view on
[Ropsten Etherscan](https://ropsten.etherscan.io/)

## Roadmap

- Add a
  [smart contract for minting NFTs](https://docs.openzeppelin.com/contracts/3.x/erc721)
- Create a TypeScript fork

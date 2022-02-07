
# Smart Contracts Integration Module

This module implements the core methods to interact with Webaverse smart contracts. The core features are `mint`, `drop` and `redeem`.

```js
const { NFT } = require('./NFT');
```

## Usage

### `initialization`
```js
const nft = new NFT(provider, NFTContractAddress, WebaverseContractAddress)
```
#### Inputs
* provider: {ethers.providers.Web3Provider}  **[Required]**
The ethers.js provider object with valid wallet configuration.
* NFTContractAddress: {string}  **[Required]**
The evm network address of the Webaverse NFT contract.
* NFTContractAddress: {string}  **[Required]**
The evm network address of the main Webaverse contract.

### `mint`

```js
nft.mint(balance, tokenURI)
```
Mints an NFT on the Blockchain using the Webaverse NFT smart contract with the provided token URI.
#### Inputs
* balance: {ethers.BigNumber | number}  **[Required]**
The balance of the token as per ERC1155 standards to mint the NFT with.
* tokenURI: {string}  **[Required]**
The token URI as per the NFT standards to mint the NFT with.

---

### `drop`

```js
const voucher = nft.dropNFT(tokenId, balance, expiry)
```
Creates a new NFTVoucher object and signs it using signing key provided.
#### Inputs
* tokenId: {ethers.BigNumber | number} **[Required]**
The smart contract generated token ID of the object that is to be dropped.
* balance: {ethers.BigNumber | number} **[Required]**
The balance The balance of the token as per ERC1155 standards to mint the NFT with.
* expiry: {ethers.BigNumber | number} **[Required]**
The expiry of voucher, hence cannot be calaimed after the due limit.

#### Return
* voucher: {NFTVoucher}
A Stringified object signed by the user metamask wallet that contains tokenId, nonce, expiry, and user's wallet signature.

---

### `redeem`

```js
nft.redeemVoucher(voucher)
```
Parses the given stringified voucher object and calls the Webaverse1155 smart contract to verify the voucher. Upon succesful verification, the smart contract transfers the NFT object to the redeemer.
#### Inputs
* voucher: {NFTVoucher | string} **[Required]**
A Stringified object that contains tokenId, nonce, expiry, and NFT object's owner's signature.

---

## Reference implementation
A reference implementation for the developer convenience has been added to this module. You can check it in the file 
> index.html

## Installation

```bash
# install dependencies
$ npm install
```

## Configuration
1. Create a new file `.env` with the given template
```bash
# Mnemonic
MNEMONIC = indoor dish desk flag debris potato excuse depart ticket judge file exit

# Infura project id
INFURA_KEY = 9bbv673y23cn88cnm73hfqwwbf87zonf

# Private key
PRIVATE_KEY = 8407415743ab6f7214df9fce86e7ad87ce5e0cef82822d1e6622d4043623f473

# Moralis node API key
MATIC_API_KEY = e7338nbbabca9930qa
```
## Run 
```bash
# run the example project
$ npm run start
```
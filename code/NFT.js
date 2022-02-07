import { ethers } from "ethers";
import NFTABI from "./artifacts/WebaverseERC1155.json";
import WebaverseABI from "./artifacts/Webaverse.json";
import { ClaimableVoucher } from "./lib";

class NFT {
    /**
     * Contains all the features related to Webaverse NFT i.e mint, drop, redeem.
     *
     * @param {ethers.providers.Web3Provider} provider an ethers Provider object to use for signing transactions
     * @param {string} NFTContractAddress the ethereum network address of the Webaverse NFT contract
     * @param {string} WebaverseContractAddress the ethereum network address of the main Webaverse contract
     */
    constructor(provider, NFTContractAddress, WebaverseContractAddress) {
        this.provider = provider;
        this.chainId = this.provider._network.chainId;
        this.signer = this.provider.getSigner();
        this.NFTContract = new ethers.Contract(NFTContractAddress, NFTABI.abi, this.signer);
        this.WebaverseContract = new ethers.Contract(WebaverseContractAddress, WebaverseABI.abi, this.signer);
    }

    /**
     * Mints a new NFT with the provided token URI.
     *
     * @param {ethers.BigNumber | number} balance The balance of the token as per ERC1155 standards to mint the NFT with.
     * @param {string} tokenURI The token URI as per the NFT standards to mint the NFT with.
     */
    async mint(balance, tokenURI) {
        try {
            const signer = this.signer;
            const WebaverseContract = this.WebaverseContract;
            const signerAddress = await signer.getAddress();
            await WebaverseContract.mint(signerAddress, balance, tokenURI, "0x01");
        } catch (err) {
            return Promise.reject(err);
        }
    }

    /**
     * Creates a new NFTVoucher object and signs it using signing key provided.
     *
     * @param {ethers.BigNumber | number} tokenId The smart contract generated token ID of the object that is to be dropped.
     * @param {ethers.BigNumber | number} balance The balance The balance of the token as per ERC1155 standards to mint the NFT with.
     * @param {ethers.BigNumber | number} expiry The expiry of voucher, hence cannot be calaimed after the due limit.
     *
     * @returns {NFTVoucher}
     */
    async dropNFT(tokenId, balance, expiry) {
        const chainId = this.chainId;
        const signer = this.signer;
        const NFTContract = this.NFTContract;
        const claimableVoucher = new ClaimableVoucher({ contract: NFTContract, signer: signer, chainId: chainId });
        const nonce = ethers.BigNumber.from(ethers.utils.randomBytes(4)).toNumber();
        try {
            const voucher = await claimableVoucher.createVoucher(tokenId, balance, nonce, expiry);
            return voucher;
        } catch (err) {
            return Promise.reject(err);
        }
    }

    /**
     * Parses the given stringified voucher object and calls the Webaverse1155 smart contract to verify the voucher. 
     * Upon succesful verification, the smart contract transfers the NFT object to the redeemer.
     *
     * @param {NFTVoucher} voucher The signed NFT voucher that can be redeemed by an ethereum address.
     */
    async redeemVoucher(voucher) {
        const NFTContract = this.NFTContract;
        const signerAddress = await this.signer.getAddress();
        try {
            await NFTContract.claim(signerAddress, voucher);
            NFTContract.on("TransferSingle", (operator, from, to, tokenId, value) => {
                if (from != ethers.constants.AddressZero)
                    console.log("From : ", from, "To :", to, "Token ID :", tokenId.toString(), "value", value.toString());
            });
        } catch (err) {
            return Promise.reject(err);
        }
    }
}

module.exports = { NFT };
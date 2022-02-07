require("dotenv").config({ path: "./.env" });

module.exports = {
    rinkeby: {
        network: "rinkeby",
        chainId: 4,
        rpc_url: `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`,
        mnemonic: process.env.MNEMONIC,
        priv_key: process.env.PRIVATE_KEY,
        NFTContractAddress: "",
        WebaverseAddress: "",
    },
    sidechain: {
        network: "sidechain",
        chainId: 1338,
        rpc_url: "http://13.57.177.184:8545",
        priv_key: process.env.PRIVATE_KEY,
        NFTContractAddress: "0x33eBCc99c312282AE003Fe9c2c73Fa73CB1baDc3",
        WebaverseAddress: "0x6F8DCf6f55507438FE2320978cAF717EdC50D4Be",
    },
    maticmainnet: {
        network: "maticmainnet",
        chainId: 137,
        rpc_url: `https://speedy-nodes-nyc.moralis.io/${process.env.MATIC_API_KEY}/polygon/mainnet`,
        priv_key: process.env.PRIVATE_KEY,
        NFTContractAddress: "",
        WebaverseAddress: "",
    }
};

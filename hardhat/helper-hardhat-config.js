const { ethers } = require("hardhat")

const constants = {
    developmentChains: ["hardhat", "localhost"],
    testNetChains: ["goerli"],
    NULL_ADDRESS: ethers.constants.AddressZero,
    FRONTEND_FILE_PATH: "",
}

const scriptsConfig = {}

const contractsConfig = {
    Vault: {
        name: "Vault",
        args: {},
    },
    AspanToken: {
        name: "AspanToken",
        args: {},
    },
    PriceOracle: {
        name: "PriceOracle",
        args: {
            usdcAddress: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
            newAggregators: [
                // usdc
                {
                    tokenAddress: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
                    aggregatorAddress: "0xfE4A8cc5b5B2366C1B58Bea3858e81843581b2F7",
                },
                // usdt
                {
                    tokenAddress: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
                    aggregatorAddress: "0x0A6513e40db6EB1b165753AD52E80663aeA50545",
                },
                // dai
                {
                    tokenAddress: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
                    aggregatorAddress: "0x4746DeC9e833A82EC7C2C1356372CcF2cfcD2F3D",
                },
            ],
        },
    },
}
const networkConfig = {
    137: {
        name: "polygon",
        contracts: contractsConfig,
    },
    80001: {
        name: "mumbai",
        contracts: contractsConfig,
    },
    31337: {
        name: "hardhat",
        contracts: contractsConfig,
        forTests: [{ name: "", args: [] }],
    },
}

module.exports = {
    constants,
    scriptsConfig,
    networkConfig,
}

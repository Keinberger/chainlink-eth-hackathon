const { network, ethers } = require("hardhat")
const { scriptsConfig, networkConfig } = require("../helper-hardhat-config")

const main = async () => {
    const chainId = network.config.chainId
    const contractName = networkConfig[chainId].contracts.DemoVault.name
    const contract = await ethers.getContract(contractName)

    const tx = await contract.withdraw(0, "0x", "0x")
    await tx.wait()
}

main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })

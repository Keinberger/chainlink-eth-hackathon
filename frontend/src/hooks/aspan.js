import { useSDK, useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react"
import { abi } from "../constants/Aspan"
import { addresses } from "../constants/Aspan/index"
const aspanAddress = addresses.polygon

export function useRetrieveStrategy() {
    // const sdk = useSDK()
    // const contract = await sdk.getContractFromAbi(address, abi)
    // const data = await contract.call("symbol")
    // return data

    const { contract, error: contractError } = useContract(aspanAddress, abi)
    // contractError && console.log(contractError)

    const { data, error: dataError } = useContractRead(contract, "retrieveStrategy")
    // dataError && console.log(dataError)

    return data
}

export function useDeposit() {
    const { contract, error: contractError } = useContract(aspanAddress, abi)
    // contractError && console.log(contractError)

    const { mutate: deposit } = useContractWrite(contract, "deposit")
    return deposit
}

export function useWithdraw() {
    const { contract, error: contractError } = useContract(aspanAddress, abi)
    // contractError && console.log(contractError)

    const { mutate: withdraw } = useContractWrite(contract, "withdraw")
    return withdraw
}

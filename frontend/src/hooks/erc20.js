import { useContract, useContractWrite } from "@thirdweb-dev/react"
import { abi } from "../constants/ERC20"

export function useApprove(address) {
    const { contract, error: contractError } = useContract(address, abi)
    contractError && console.log(contractError)

    const { mutate: approve } = useContractWrite(contract, "approve")

    return approve
}

import { Address, BigInt } from "@graphprotocol/graph-ts"
import {
    Vault,
    Deposit as DepositEvent,
    Withdraw as WithdrawalEvent
} from "../generated/Vault/Vault"
import { Position, AspanTransaction } from "../generated/schema"

export function handleDeposit(event: DepositEvent): void {
    const posId = event.params.user
    let position = Position.load(posId)
    if (!position) {
        position = new Position(posId)
        position.userAddress = event.params.user
        position.usdcWithdrawn = new BigInt(0)
        position.aspanBalance = new BigInt(0)
        position.usdcProvided = new BigInt(0)
        position.active = true
    }

    position.aspanBalance = position.aspanBalance.plus(event.params.aspanMinted)
    position.usdcProvided = position.usdcProvided.plus(event.params.usdcDeposited)

    position.save()

    const aspanTxId = getIdFromEventParams(
        event.params.user,
        event.block.timestamp,
        event.transaction.nonce
    )
    let aspanTransaction = new AspanTransaction(aspanTxId)
    aspanTransaction.type = "Deposit"
    aspanTransaction.userAddress = event.params.user
    aspanTransaction.usdcChange = event.params.usdcDeposited
    aspanTransaction.tokensChange = event.params.aspanMinted
    aspanTransaction.timestamp = event.block.timestamp
    aspanTransaction.position = posId
    aspanTransaction.save()
}

export function handleWithdrawal(event: WithdrawalEvent): void {
    const posId = event.params.user
    let position = Position.load(posId)

    position!.usdcWithdrawn = position!.usdcWithdrawn.plus(event.params.usdcWithdrawn)
    position!.aspanBalance = position!.aspanBalance.minus(event.params.aspanBurnt)

    if (position!.aspanBalance.isZero()) position!.active = false

    position!.save()

    const aspanTxId = getIdFromEventParams(
        event.params.user,
        event.block.timestamp,
        event.transaction.nonce
    )
    let aspanTransaction = new AspanTransaction(aspanTxId)
    aspanTransaction.type = "Withdrawal"
    aspanTransaction.userAddress = event.params.user
    aspanTransaction.usdcChange = event.params.usdcWithdrawn
    aspanTransaction.tokensChange = event.params.aspanBurnt
    aspanTransaction.timestamp = event.block.timestamp
    aspanTransaction.position = posId
    aspanTransaction.save()
}

function getIdFromEventParams(addr: Address, timestamp: BigInt, nonce: BigInt): string {
    return addr.toHexString() + timestamp.toHexString() + nonce.toHexString()
}

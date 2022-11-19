const qs = require("qs")

export function trimNumber(num, decimals) {
    if (num.split(".")[1] == undefined || num.split(".")[1].length <= decimals) return num

    let formattedNum = String(Number(num).toFixed(decimals))

    if (formattedNum === 0) {
        let wholeNumDecimals = String(num).split(".")[1]
        let numTillChar
        for (let i = 0; i < wholeNumDecimals.length; i++) {
            if (wholeNumDecimals[i] !== "0") {
                numTillChar = i + 1
                break
            }
        }

        if (numTillChar > decimals * 2) return "0"

        return String(Number(num).toFixed(numTillChar))
    }

    let numDecimals = String(formattedNum).split(".")[1]
    for (let i = numDecimals.length - 1; i > 0; i--) {
        if (numDecimals[i] !== "0") break

        formattedNum = formattedNum.slice(0, -1)
    }

    return formattedNum
}

export async function getSwapData(sellToken, buyToken, sellAmount) {
    const params = {
        sellToken: sellToken,
        buyToken: buyToken,
        sellAmount: sellAmount,
        //takerAddress: MumbaiSwap.address, // we cannot use a smart contract addres in this value according to 0x documentation
    }

    // make http get request for USDC to Dai
    // manually inputting https://api.0x.org/swap/v1/quote?buyToken=DAI&sellAmount=2000000&sellToken=USDC

    const response = await fetch(`https://polygon.api.0x.org/swap/v1/quote?${qs.stringify(params)}`)

    const { data, to, value, gas, gasPrice, sellTokenAddress, buyTokenAddress, allowanceTarget } =
        await response.json()

    return data
}

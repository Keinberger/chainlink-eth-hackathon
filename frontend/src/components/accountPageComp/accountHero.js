import React, { useState } from "react"
import tw from "twin.macro"
import DepositPopup from "./depositPopup.js"
import WithdrawPopup from "./withdrawPopup.js"
import LineChart from "./lineChart.js"
import History from "./history.js"
import { ethers } from "ethers"
import { useSDK } from "@thirdweb-dev/react"
import { useQuery, gql } from "@apollo/client"

import { trimNumber, getSwapData } from "../../helpers/helper.js"

const Content = tw.span`items-center justify-center py-10`

const HorizontalPortino = tw.div`flex flex-row items-center justify-center mx-auto`
const SavingsPortion = tw.div`flex flex-col items-start align-top w-1/4`
const SavingsTitle = tw.h1`text-2xl font-normal text-center`
const SavingsAmount = tw.h1`text-6xl font-bold text-center -my-5`
const SavingsChange = tw.h1`text-2xl font-semibold text-center text-punchyBlue`

const ButtonPortion = tw.div`flex flex-row items-center w-1/4`
const Button = tw.a`flex flex-col items-center justify-center px-8 py-3 mb-5 mx-5 font-bold rounded bg-punchyBlue text-gray-100 hocus:bg-lightBlue hocus:text-gray-200 transition duration-300`

const LowerPortion = tw.div`flex flex-col items-center justify-center w-full py-10`
const ChartPortion = tw.div`content-center w-full`
const HistoryPortion = tw.div`flex flex-col items-start align-top w-1/4`

function AccountHero({ account }) {
    const GET_POSITION = gql`
        {
            positions(
                where: {
                    userAddress: "${account}"
                    active: true
                }
            ) {
                usdcProvided
                usdcWithdrawn
                aspanBalance
                history {
                    type
                    usdcChange
                    timestamp
                }
            }
        }
    `

    const { data: graphData, error: graphError } = useQuery(GET_POSITION)
    const position = graphData && graphData.positions[0]

    let formattedBalance, ROI_IN_USD
    if (!graphData || graphData.positions.length == 0) {
        formattedBalance = ethers.utils.parseEther("0")
        ROI_IN_USD = ethers.utils.parseEther("0")
    }

    const aspanTransactionsData = position && position.history

    // TODO: get aspan token price from oracle
    const aspanTokenPrice = ethers.utils.parseEther("1.01")
    const ONE_ETH = ethers.utils.parseEther("1")

    const providedMinWithdrawn = position && String(position.usdcProvided - position.usdcWithdrawn)

    const balance =
        position && ethers.BigNumber.from(position.aspanBalance).mul(aspanTokenPrice).div(ONE_ETH)
    formattedBalance = balance && trimNumber(ethers.utils.formatEther(balance), 3)

    ROI_IN_USD =
        providedMinWithdrawn &&
        balance &&
        trimNumber(ethers.utils.formatEther(String(balance.toString() - providedMinWithdrawn)), 3)

    return (
        <Content>
            <HorizontalPortino>
                <SavingsPortion>
                    <SavingsTitle>SAVINGS</SavingsTitle>
                    <SavingsAmount>${formattedBalance}</SavingsAmount>
                    <SavingsChange>+${ROI_IN_USD}</SavingsChange>
                </SavingsPortion>
                <ButtonPortion>
                    <DepositPopup>Deposit</DepositPopup>
                    <WithdrawPopup>Withdraw</WithdrawPopup>
                </ButtonPortion>
            </HorizontalPortino>

            <LowerPortion>
                <ChartPortion>
                    <LineChart />
                </ChartPortion>

                <HistoryPortion>
                    <SavingsTitle>History</SavingsTitle>
                    {aspanTransactionsData && (
                        <History aspanTransactionsData={aspanTransactionsData} />
                    )}
                </HistoryPortion>
            </LowerPortion>
        </Content>
    )
}

export default AccountHero

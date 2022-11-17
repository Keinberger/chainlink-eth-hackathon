import React from "react";
import tw from "twin.macro";
import DepositPopup from "./depositPopup.js";
import WithdrawPopup from "./withdrawPopup.js";
import LineChart from "./lineChart.js";
import History from "./history.js";


const Content = tw.span `items-center justify-center py-10`;

const HorizontalPortino = tw.div `flex flex-row items-center justify-center mx-auto`;
const SavingsPortion = tw.div `flex flex-col items-start align-top w-1/4`;
const SavingsTitle = tw.h1 `text-2xl font-normal text-center`;
const SavingsAmount = tw.h1 `text-6xl font-bold text-center -my-5`;
const SavingsChange = tw.h1 `text-2xl font-semibold text-center text-punchyBlue`;

const ButtonPortion = tw.div `flex flex-row items-center w-1/4`;
const Button = tw.a`flex flex-col items-center justify-center px-8 py-3 mb-5 mx-5 font-bold rounded bg-punchyBlue text-gray-100 hocus:bg-lightBlue hocus:text-gray-200 transition duration-300`;

const LowerPortion = tw.div `flex flex-col items-center justify-center w-full py-10`;
const ChartPortion = tw.div `content-center w-full`;
const HistoryPortion = tw.div `flex flex-col items-start align-top w-1/4`;

function AccountHero() {
    return (
        <Content>
            <HorizontalPortino>
            <SavingsPortion>
                <SavingsTitle>SAVINGS</SavingsTitle>
                <SavingsAmount>$1,552</SavingsAmount>
                <SavingsChange>+$51</SavingsChange>
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
                <History />
            </HistoryPortion>
            </LowerPortion>


        </Content>
    );

}

export default AccountHero;
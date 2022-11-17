import React from "react";
import tw from "twin.macro";
import logo from "../images/aspanDark.png";


const Content = tw.div ``;
const LogoComponent = tw.img`w-1/6`;
const CenterText = tw.div`items-center flex flex-col justify-center items-center`;
const MainTitle = tw.h1`text-4xl font-semibold text-center `;
const SubTitle = tw.h2`text-xl font-normal text-center `;





function Titles() {
    return (
        <Content>
            <LogoComponent src={logo} alt="aspan logo" />
            <CenterText>
                <MainTitle>Standard Savings</MainTitle>
                <SubTitle>For savers seeking low APY volatility and the least risk of losing their initial deposit. </SubTitle>
            </CenterText>
        </Content>
    );
}
export default Titles;
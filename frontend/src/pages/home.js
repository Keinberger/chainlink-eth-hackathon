import React from "react";
import tw from "twin.macro";

import aspanLogo from "../components/images/aspanDark.png";
import Section1 from "../components/homePageComp/titles.js";
import MrPiggy from "../components/images/piggy.svg";
import AaveLogo from "../components/images/aave.svg";
import DAILogo from "../components/images/dai.svg";
import USDCLogo from "../components/images/usdc.svg";



//Styling goes here
const Container = tw.div`mx-10 my-10 h-screen`;
const Section2 = tw.span`flex flex-row justify-center items-center align-top`;

const Section2Left = tw.div`flex flex-col justify-center items-center align-top w-1/3`;
const Numbers = tw.h1 `text-6xl font-bold text-center -mb-2`;
const BelowNumbers = tw.p `text-xl font-normal text-center text-punchyBlue`;

const Section2Middle = tw.img`w-1/3 align-top`;

const Section2Right = tw.div`flex flex-col align-top w-1/3`;
const Title = tw.h1 `text-2xl font-semibold text-center`;
const Description = tw.p `text-lg font-normal text-left -mb-2 mx-4`;

const Section3 = tw.span`flex flex-row justify-center items-center align-top`;
const Section3Left = tw.div`flex flex-col items-start align-top w-1/2`;

  const UpperCard = tw.div`flex items-center justify-center align-top`;
  const CoinIcon = tw.img`rounded-full w-12`;
  const TextArea = tw.span` flex flex-row text-center mx-4 `;

const Section3Right = tw.div`flex flex-col items-start align-top w-1/2`;

const ButtonContainer = tw.div `flex flex-row justify-center items-center`;
const Button = tw.a`flex flex-col items-center justify-center px-8 py-3 mb-5 font-bold rounded bg-punchyBlue text-gray-100 hocus:bg-lightBlue hocus:text-gray-200 transition duration-300`;


function Home() { //Always here
  return ( //Always here
    <Container>
      <Section1 />
      <Section2>
        <Section2Left>
          <Numbers>1.72%</Numbers>
          <BelowNumbers>Variable APY from top USD lending markets in the blockchain.</BelowNumbers>
        </Section2Left>
        <Section2Middle src={MrPiggy} alt="piggy" />
        <Section2Right>
          <Title>STEPS TO OPEN AN ACCOUNT</Title>
          <Description>1. Create a digital currency wallet</Description>
          <Description>2. Fund your wallet with a credit/debit card or bank transfer</Description>
          <Description>3. Deposit funds</Description>
          <br></br>
          <Description>You can do all of this via Aspan!</Description>
        </Section2Right>        
      </Section2>
      <Section3>
        <Section3Left>
          <Title>USD lending market</Title>
          <UpperCard>
            <CoinIcon src={AaveLogo} alt="aave logo" />
            <TextArea>
              <Title>AAVE</Title>
              <Description>A top DeFi platform that lends to over-collateralized borrowers</Description>
            </TextArea>
          </UpperCard>

          <Title>Market Assets</Title>
          <UpperCard>
            <CoinIcon src={DAILogo} alt="dai logo" />
            <TextArea>
              <Title>DAI </Title>
              <Description>A digital currency (equal to 1 USD) backed by locked  crypto collateral</Description>
            </TextArea>
          </UpperCard>

          <UpperCard>
            <CoinIcon src={USDCLogo} alt="usdc logo" />
            <TextArea>
              <Title>USDC</Title>
              <Description>A digital currency (equal to 1 USD) backed by locked USD collateral.</Description>
            </TextArea>
          </UpperCard>
        </Section3Left>
        <Section3Right>
          <Title>Risk</Title>
          <Description>Interest rates never go below zero. However, you could lose your initial deposit if:</Description>
          <br></br>
          <Description>The USD lending market is hacked<br></br>The USD blockchain currency loses its value  or is hacked</Description>
        </Section3Right>
      </Section3>
      <ButtonContainer>
        <Button href="/account">Open an Account</Button>
      </ButtonContainer>
    </Container>
  );
}

export default Home; //Always here
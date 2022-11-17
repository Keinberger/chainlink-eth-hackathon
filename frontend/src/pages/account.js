import React from "react";
import tw from "twin.macro";
import logo from "../components/images/aspanDark.png";
import Content from "../components/accountPageComp/accountHero.js";



//Styling goes here
const Container = tw.div`mx-10 my-10 h-screen`;
const LogoComponent = tw.img`w-1/6`;


function Account() { //Always here
  return ( //Always here
    <Container>
      <a href = "/">
      <LogoComponent src={logo} alt="aspan logo" />
      </a>
      <br></br>
      <Content />

    </Container>
  );
}

export default Account; //Always here
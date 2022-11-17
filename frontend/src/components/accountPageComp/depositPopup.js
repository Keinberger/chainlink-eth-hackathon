/* eslint-disable import/no-anonymous-default-export */
import React, { useState} from 'react';
import tw from 'twin.macro';
import Popup from 'reactjs-popup';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';

const Container = tw.div `flex flex-col items-center justify-center w-1/2 h-1/2 rounded-lg`;
const OpenButton = tw.button `flex flex-col items-center justify-center px-8 py-3 mb-5 mx-5 font-bold rounded bg-punchyBlue text-gray-100 hocus:bg-lightBlue hocus:text-gray-200 transition duration-300`;
const Modal = tw.div `text-lg flex flex-col items-center justify-center px-10 py-10 bg-offWhite w-full h-full`;
const CloseButton = tw.button ` absolute top-0 right-0 flex flex-col items-center justify-center px-8 py-3 mb-5 mx-5 font-bold rounded bg-punchyBlue text-gray-100 hocus:bg-lightBlue hocus:text-gray-200 transition duration-300`; 
const Header = tw.div ` w-full border-gray-400 text-center text-2xl font-normal p-5`;
const Content = tw.div `w-full p-10 items-center text-center`;
const Actions = tw.div ` w-full p-10 m-auto text-center`;
const Overlay = tw.div `w-full h-full fixed top-0 left-0 z-50 bg-black opacity-50`;

const currencies = [
  {
    value: 'USDC',
    label: 'USDC',
  },

];

export default function DepositPopup() {
  const [currency, setCurrency] = React.useState('EUR');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  
  return (

  <Container>

    <Popup
      trigger={<OpenButton>Deposit</OpenButton>}
      modal
      nested
    >
      {close => (
        <Modal>
          <CloseButton onClick={close}>
            &times;            
          </CloseButton>
          <Header>Confirm Deposit</Header>
          <Content>
            By clicking approve, your deposit will be executed on the blockchain.
            <br></br>
          </Content>


          <TextField
          id="outlined-select-currency"
          select
          label="Deposit Asset"
          value={currency}
          onChange={handleChange}
          helperText="Please select your Deposit Asset"
          width="100%"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <br></br><br></br>
        <TextField id="outlined-basic" label="Deposit Amount" variant="outlined" defaultValue={"1,200.00"} helperText="Please select your Deposit Amount" />



          <Actions>
            <Popup
              trigger={<OpenButton> Approve </OpenButton>}
              position="top center"
              nested
            >


              <span>
              Approved
              </span>
            </Popup>
            {/* <CloseButton
              onClick={() => {
                console.log('modal closed ');
                close();
              }}
            >
              close modal
            </CloseButton> */}
          </Actions>
        </Modal>
      )}
    </Popup>
  </Container>
  );
}
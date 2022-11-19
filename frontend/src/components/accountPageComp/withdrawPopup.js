/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from "react"
import tw from "twin.macro"
import Popup from "reactjs-popup"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import MenuItem from "@mui/material/MenuItem"
import { ethers } from "ethers"
import { useCookies } from "react-cookie"

import { useWithdraw } from "../../hooks/aspan"
import { addresses } from "../../constants/Aspan/index"

const Container = tw.div`flex flex-col items-center justify-center w-1/2 h-1/2 rounded-lg`
const OpenButton = tw.button`flex flex-col items-center justify-center px-8 py-3 mb-5 mx-5 font-bold rounded bg-punchyBlue text-gray-100 hocus:bg-lightBlue hocus:text-gray-200 transition duration-300`
const Modal = tw.div`text-lg flex flex-col items-center justify-center px-10 py-10 bg-offWhite w-full h-full`
const CloseButton = tw.button` absolute top-0 right-0 flex flex-col items-center justify-center px-8 py-3 mb-5 mx-5 font-bold rounded bg-punchyBlue text-gray-100 hocus:bg-lightBlue hocus:text-gray-200 transition duration-300`
const Header = tw.div` w-full border-gray-400 text-center text-2xl font-normal p-5`
const Content = tw.div`w-full p-10 items-center text-center`
const Actions = tw.div` w-full p-10 m-auto text-center`
const Overlay = tw.div`w-full h-full fixed top-0 left-0 z-50 bg-black opacity-50`

const currencies = [
    {
        value: "USDC",
        label: "USDC",
    },
]

export default function WithdrawPopup() {
    const ONE_ETH = ethers.utils.parseEther("1")
    const ZERO_BIG = ethers.BigNumber.from("0")
    const [sendingTx, setSendingTx] = useState(false)
    const [cookies, setCookie] = useCookies(["latestMessage"])

    const [amountInput, setAmountInput] = useState("100")
    const [amount, setAmount] = useState(ethers.BigNumber.from("100"))

    useEffect(() => {
        amountInput ? setAmount(ethers.utils.parseEther(amountInput)) : setAmount(ZERO_BIG)
    }, [amountInput])

    const sendWithdraw = useWithdraw()

    const handleTxError = (e) => {
        setSendingTx(false)
        if (e.code == 4001) return

        console.error(e)
        setCookie("latestMessage", {
            text: "Transaction failed",
            kind: "error",
        })
    }

    const handleTxSuccess = (tx) => {
        setCookie("latestMessage", {
            text: `Transaction (${tx.hash}) complete!`,
            kind: "success",
        })
    }

    return (
        <Container>
            <Popup trigger={<OpenButton>Withdraw</OpenButton>} modal nested>
                {(close) => (
                    <Modal>
                        <CloseButton onClick={close}>&times;</CloseButton>
                        <Header>Confirm Withdraw</Header>
                        <Content>
                            By clicking approve, your Withdraw will be executed on the blockchain.
                            <br></br>
                        </Content>

                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Withdraw Asset"
                            defaultValue={currencies[0].value}
                            helperText="Please select your Withdraw Asset"
                            width="100%"
                        >
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <br></br>
                        <br></br>
                        <TextField
                            id="outlined-basic"
                            label="Deposit Amount"
                            variant="outlined"
                            type="number"
                            defaultValue={amountInput}
                            helperText="Please select your Withdraw Amount"
                            onChange={(props) => {
                                setAmountInput(props.target.value)
                            }}
                        />

                        <Actions>
                            <OpenButton
                                disabled={sendingTx || amount.eq(ZERO_BIG)}
                                onClick={() => {
                                    sendWithdraw([amount], {
                                        onSuccess: (tx) => {
                                            setSendingTx(false)
                                            handleTxSuccess(tx)
                                            window.reload()
                                        },
                                        onError: handleTxError,
                                    })
                                }}
                            >
                                {" "}
                                Withdraw{" "}
                            </OpenButton>
                        </Actions>
                    </Modal>
                )}
            </Popup>
        </Container>
    )
}

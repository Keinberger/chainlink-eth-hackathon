import React from "react"
import tw from "twin.macro"
import { useEffect, useState } from "react"
import { magic } from "../lib/magic"
import { useSDK } from "@thirdweb-dev/react"
import { useCookies } from "react-cookie"
import { useNotification } from "@web3uikit/core"

import logo from "../components/images/aspanDark.png"
import Content from "../components/accountPageComp/accountHero.js"

//Styling goes here
const Container = tw.div`mx-10 my-10 h-screen`
const LogoComponent = tw.img`w-1/6`

function Account({ setSigner, account }) {
    const [cookies, setCookie] = useCookies(["currentSite", "latestMessage"])
    const dispatch = useNotification()

    const sdk = useSDK()

    const disconnect = async () => {
        await magic.connect.disconnect().catch((e) => console.log(e))
        setSigner(undefined)
        sdk.wallet.connect(undefined)
    }

    const showWallet = () => {
        magic.connect.showWallet().catch((e) => console.log(e))
    }

    const latestMessage = cookies.latestMessage
    let lastMessage = ""
    useEffect(() => {
        if (
            latestMessage !== undefined &&
            latestMessage != lastMessage &&
            latestMessage != "undefined"
        ) {
            lastMessage = latestMessage
            dispatch({
                type: latestMessage.kind, // error, info, success, warning (orange)
                message: latestMessage.text,
                title: "Aspan",
                icon: undefined,
                position: "topR",
            })
        }
        setCookie("latestMessage", "undefined")
    }, [latestMessage])

    return (
        //Always here
        <Container>
            <a href="#" onClick={showWallet}>
                <LogoComponent src={logo} alt="aspan logo" />
            </a>
            <br></br>
            <Content account={account} />
        </Container>
    )
}

export default Account //Always here

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState } from "react"
import { ChainId, ThirdwebSDKProvider } from "@thirdweb-dev/react"
import { magic } from "./lib/magic"
import { ethers } from "ethers"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import { CookiesProvider } from "react-cookie"
import { NotificationProvider } from "@web3uikit/core"

import HomePage from "./pages/home.js"
import AccountPage from "./pages/account.js"

function App() {
    const client = new ApolloClient({
        uri: "https://api.thegraph.com/subgraphs/name/keinberger/aspan",
        cache: new InMemoryCache(),
    })

    const [signer, setSigner] = useState(undefined)
    const provider = magic.rpcProvider && new ethers.providers.Web3Provider(magic.rpcProvider)
    const isSignedIn = signer != undefined

    const homeElement = <HomePage setSigner={setSigner} provider={provider} />
    return (
        <CookiesProvider>
            <ThirdwebSDKProvider
                desiredChainId={ChainId.Polygon}
                provider={provider}
                signer={signer}
            >
                <ApolloProvider client={client}>
                    <NotificationProvider>
                        <Router>
                            <Routes>
                                <Route path="/" element={homeElement} />
                                <Route
                                    path="/account"
                                    element={
                                        isSignedIn ? (
                                            <AccountPage setSigner={setSigner} />
                                        ) : (
                                            homeElement
                                        )
                                    }
                                />
                            </Routes>
                        </Router>
                    </NotificationProvider>
                </ApolloProvider>
            </ThirdwebSDKProvider>
        </CookiesProvider>
    )
}

export default App

import { Magic } from "magic-sdk"
import { ConnectExtension } from "@magic-ext/connect"

import { ChainId } from "@thirdweb-dev/sdk"

const polygonRPC = "https://polygon-rpc.com/"
const mumbaiRPC = "https://rpc-mumbai.matic.today"

const createMagic = (apiKey) => {
    return (
        typeof window != "undefined" &&
        new Magic(apiKey, {
            network: {
                rpcUrl: polygonRPC,
                chainId: ChainId.Polygon,
            },
            extensions: [new ConnectExtension()],
        })
    )
}

export const magic = createMagic(process.env.REACT_APP_MAGIC_API_KEY)

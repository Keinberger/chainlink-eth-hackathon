import * as React from "react"
import Box from "@mui/material/Box"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import { FixedSizeList } from "react-window"
import { ethers } from "ethers"

function renderRow(props) {
    const { index, style, data } = props

    const reversedData = [...data].reverse()
    const currentData = reversedData[index]

    const ts = new Date(Number(currentData.timestamp) * 1000)
    const dateString = ts.toLocaleString()

    return (
        <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton>
                <ListItemText primary={currentData.type} />
                <ListItemText
                    primary={
                        currentData.type === "Deposit"
                            ? "+" + ethers.utils.formatEther(currentData.usdcChange) + "$"
                            : "-" + ethers.utils.formatEther(currentData.usdcChange) + "$"
                    }
                    secondary={dateString}
                />
            </ListItemButton>
        </ListItem>
    )
}

export default function VirtualizedList({ aspanTransactionsData }) {
    return (
        <Box sx={{ width: "100%", height: 400, maxWidth: 1000, bgcolor: "background.paper" }}>
            <FixedSizeList
                height={400}
                width={360}
                itemSize={64}
                itemCount={2}
                overscanCount={5}
                itemData={aspanTransactionsData}
            >
                {renderRow}
            </FixedSizeList>
        </Box>
    )
}

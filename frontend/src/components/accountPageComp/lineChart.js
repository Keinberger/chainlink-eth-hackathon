import * as React from "react"
import { LineChart, Line, Tooltip } from "recharts"

// this data field will have to be feed by an Aspan custom API
// retrieving blockchain data on a regular basis
const data = [
    {
        name: "Page A",
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: "Page B",
        uv: 3000,
        pv: 2600,
        amt: 2210,
    },
    {
        name: "Page C",
        uv: 2000,
        pv: 3000,
        amt: 2290,
    },
    {
        name: "Page D",
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: "Page E",
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: "Page F",
        uv: 2390,
        pv: 5000,
        amt: 2500,
    },
    {
        name: "Page G",
        uv: 3490,
        pv: 5300,
        amt: 2100,
    },
]

export default function App() {
    return (
        <LineChart width={1300} height={450} data={data}>
            <Line type="monotone" dataKey="pv" stroke="#0f9cf3" strokeWidth={2} />
            <Tooltip />
        </LineChart>
    )
}

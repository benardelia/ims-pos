import * as React from "react"
import { Chart, useChart } from "@chakra-ui/charts"
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts"

const Chort = ({details}) => {
  const chart = useChart({
    data: details,
    series: [{ name: "sales", color: "green.600" }],
  })

  return (
    <Chart.Root maxH="full" className="bg-black bg-opacity-5 dark:bg-opacity-10 p-4 rounded-lg shadow-sm"  chart={chart}>
      <BarChart barCategoryGap="2" data={chart.data}>
        <CartesianGrid stroke={chart.color("border.muted")} vertical={false} />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey={chart.key("time")}
          tickFormatter={(value) => value}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickFormatter={chart.formatNumber({
            style: "currency",
            currency: "TZS",
            notation: "compact",
          })}
        />
        <Tooltip
          cursor={{ fill: chart.color("bg.muted") }}
          animationDuration={0}
          content={<Chart.Tooltip />}
        />
        {chart.series.map((item) => (
          <Bar
            isAnimationActive={true}
            key={item.name}
            width="1rem"
            dataKey={chart.key(item.name)}
            fill={chart.color(item.color)}
            radius={5}
          />
        ))}
      </BarChart>
    </Chart.Root>
  )
}

export default Chort

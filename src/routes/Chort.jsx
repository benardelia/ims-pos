import * as React from "react"
import { Chart, useChart } from "@chakra-ui/charts"
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts"
import { useSuspenseQuery } from "@tanstack/react-query"
import axiosInstance from "./axiosInstance"
import { useState } from "react"
import { Menu, Button, Portal } from "@chakra-ui/react"
import { MdFilterAlt } from "react-icons/md"

const Chort = () => {
  const [filter, setFilter] = useState("")
  const { data } = useSuspenseQuery({
    queryKey: ['graphs'],
    queryFn: ()=> (axiosInstance.get(`/store/dashboard/?group_by=${filter}`)
    .then((res)=> {
      return res.data
    })),
  })

  
  const chart = useChart({
    data: data.sales_summary?.map(item => ({
                sales: item.total_sales,
                time: item?.period.slice(0,10)
              }),),
    series: [{ name: "sales", color: "yellow.500" }],
  })

  return (
    <div className="h-full w-full">
    <Menu.Root className="">
                            <Menu.Trigger>
                                <Button className="dark:text-gray-100 text-sm" > 
                                   <MdFilterAlt/>
                                </Button>
                            </Menu.Trigger>
                            <Portal>
                                <Menu.Positioner alignContent="end">
                                    <Menu.Content>
                                        <Menu.Item onClick={()=>setFilter("month")}>
                                         month
                  </Menu.Item>
            <Menu.Item onClick={()=>setFilter("week")}> 
                                            weekly
           </Menu.Item>
           <Menu.Item onClick={()=>setFilter("day")}>
                                            day
           </Menu.Item>
           </Menu.Content>
           </Menu.Positioner>
          </Portal>
      </Menu.Root>
    <Chart.Root h="100%" className="bg-black bg-opacity-5 dark:bg-opacity-10 px-4 rounded-lg shadow-sm"  chart={chart}>
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
          cursor={{ fill: chart.color("bg.emphasized") }}
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
    </div>
  )
}

export default Chort

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


function SubmissionChart({ easy, medium, hard , totalSubmission}) {

  const chartData = [
    { browser: "easy", Solved: easy, fill: "var(--color-easy)" },
    { browser: "medium", Solved: medium, fill: "var(--color-medium)" },
    { browser: "hard", Solved: hard, fill: "var(--color-hard)" }
  ]
  
  const chartConfig = {
    Solved: {
      label: "Solved",
    },
    easy: {
      label: "Easy",
      color: "hsl(var(--chart-1))",
    },
    medium: {
      label: "Medium",
      color: "hsl(var(--chart-2))",
    },
    hard: {
      label: "Hard",
      color: "hsl(var(--chart-3))",
    },
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Solved Overview</CardTitle>
        <CardDescription>Total number of questions solved</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="Solved"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalSubmission.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Solved
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total Solved Questions based on difficulty level.
        </div>
      </CardFooter>
    </Card>
  )
}


export default SubmissionChart
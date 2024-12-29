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
    { browser: "easy", Submissions: easy, fill: "var(--color-easy)" },
    { browser: "medium", Submissions: medium, fill: "var(--color-medium)" },
    { browser: "hard", Submissions: hard, fill: "var(--color-hard)" }
  ]
  
  const chartConfig = {
    Submissions: {
      label: "Submissions",
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
        <CardTitle>Submissions Overview</CardTitle>
        <CardDescription>Total Submissions Made</CardDescription>
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
              dataKey="Submissions"
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
          Showing total combined Submissions.
        </div>
      </CardFooter>
    </Card>
  )
}


export default SubmissionChart
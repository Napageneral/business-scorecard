"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function BusinessScorecard() {
  const [businessName, setBusinessName] = useState("")
  const [baselineValues, setBaselineValues] = useState({
    revenue: "",
    ebitda: "",
  })
  const [valueAdders, setValueAdders] = useState({
    revenueGrowth: "",
    revenueRetention: "",
    ebitdaMargin: "",
    ltvCacRatio: "",
  })
  const [valueSubtractors, setValueSubtractors] = useState({
    keyManRisk: "N",
    keyClientRisk: "N",
    singleChannelRisk: "N",
    marketRisk: "N",
    dataRisk: "N",
  })

  const calculateTotal = () => {
    // Implementation of calculation logic
    return 0
  }

  return (
    <div className="p-10">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center border-b">
          <div className="flex items-center gap-4 w-full">
            <CardTitle className="text-2xl font-bold text-[#6200EE]">BUSINESS SCORECARD</CardTitle>
            <div className="flex items-center gap-2">
              <Label>Business Name:</Label>
              <Input
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-[200px]"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-2">
            {/* VAM header */}
            <div className="text-center mb-4">
              <div className="grid grid-cols-[minmax(auto,max-content)_1fr_400px_2fr] gap-1">
                <div></div>
                <div></div>
                <div className="text-center">
                  <h2 className="font-semibold">VAM</h2>
                </div>
                <div></div>
              </div>
            </div>

            {/* Baseline Value section with column headers */}
            <div>
              <div className="grid grid-cols-[max-content_1fr_400px_2fr] gap-1 items-center">
                <div></div>
                <h3 className="font-bold">BASELINE VALUE</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-center font-bold">COLUMN A</div>
                  <div className="text-center font-bold">COLUMN B</div>
                </div>
              </div>
              
              {/* Baseline value rows */}
              <div className="space-y-1">
                <div className="grid grid-cols-[max-content_1fr_400px_2fr] gap-1 items-center">
                  <Label className="font-semibold text-left pl-2">1</Label>
                  <Label className="text-left pl-2">Revenue</Label>
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <Input
                      placeholder="$0"
                      value={baselineValues.revenue}
                      onChange={(e) => setBaselineValues({ ...baselineValues, revenue: e.target.value })}
                      className="w-full"
                    />
                    <Input disabled className="w-full" />
                  </div>
                </div>

                <div className="grid grid-cols-[max-content_1fr_400px_2fr] gap-1 items-center">
                  <Label className="font-semibold text-left pl-2">2</Label>
                  <Label className="text-left pl-2">EBITDA</Label>
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <Input
                      placeholder="$0"
                      value={baselineValues.ebitda}
                      onChange={(e) => setBaselineValues({ ...baselineValues, ebitda: e.target.value })}
                      className="w-full"
                    />
                    <Input disabled className="w-full" />
                  </div>
                  <div className="text-sm text-muted-foreground pl-2">{"<$1M: 1 | $1M-$3M: 2.5 | $5M-10M: 5 | $10M+: 6"}</div>
                </div>
              </div>
            </div>

            {/* Value Adders */}
            <div>
              <h3 className="font-bold text-sm mb-2">VALUE ADDERS</h3>
              <div className="space-y-2">
                <div className="grid grid-cols-[max-content_1fr_400px_2fr] gap-1 items-center">
                  <Label className="font-semibold px-2.5">3</Label>
                  <Label className="px-2.5">Revenue Growth %</Label>
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <Input
                      value={valueAdders.revenueGrowth}
                      onChange={(e) => setValueAdders({ ...valueAdders, revenueGrowth: e.target.value })}
                      className="w-full"
                    />
                    <Input disabled className="w-full" />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    0 - 0-30% | 1 - 30-100% | 2 - 100%+
                  </div>
                </div>
                <div className="grid grid-cols-[max-content_1fr_400px_2fr] gap-1 items-center">
                  <Label className="font-semibold px-2.5">4</Label>
                  <Label>Yrly Revenue Retention %</Label>
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <Input
                      value={valueAdders.revenueRetention}
                      onChange={(e) => setValueAdders({ ...valueAdders, revenueRetention: e.target.value })}
                      className="w-full"
                    />
                    <Input disabled className="w-full" />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    0 - {"<80%"} | 2 - {">80%"}
                  </div>
                </div>
                <div className="grid grid-cols-[max-content_1fr_400px_2fr] gap-1 items-center">
                  <Label className="font-semibold px-2.5">5</Label>
                  <Label>EBITDA Margin</Label>
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <Input
                      value={valueAdders.ebitdaMargin}
                      onChange={(e) => setValueAdders({ ...valueAdders, ebitdaMargin: e.target.value })}
                      className="w-full"
                    />
                    <Input disabled className="w-full" />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    0 - {"<30%"} | .5 - {"(30%+)"}
                  </div>
                </div>
                <div className="grid grid-cols-[max-content_1fr_400px_2fr] gap-1 items-center">
                  <Label className="font-semibold px-2.5">6</Label>
                  <Label>LTV:CAC Ratio</Label>
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <Input
                      value={valueAdders.ltvCacRatio}
                      onChange={(e) => setValueAdders({ ...valueAdders, ltvCacRatio: e.target.value })}
                      className="w-full"
                    />
                    <Input disabled className="w-full" />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    0 - {"<10"} | .5 - {">10"}
                  </div>
                </div>
                <div className="grid grid-cols-[max-content_1fr_400px_2fr] gap-1 items-center">
                  <Label className="font-semibold px-2.5">7</Label>
                  <Label>TOTAL (3B + 4B + 5B + 6B)</Label>
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <div></div>
                    <Input disabled value="2" className="w-full" />
                  </div>
                  <div></div>
                </div>
              </div>
            </div>

            {/* Value Subtractors */}
            <div>
              <h3 className="font-bold text-sm mb-2">VALUE SUBTRACTORS</h3>
              <div className="space-y-2">
                {[
                  { num: 8, label: "Key Man Risk (Y/N)", risk: 3 },
                  { num: 9, label: "Key Client Risk (Y/N)", risk: 2 },
                  { num: 10, label: "Single Channel Risk (Y/N)", risk: 1 },
                  { num: 11, label: "Market Risk (Y/N)", risk: 1 },
                  { num: 12, label: "Data (Y/N)", risk: 1 },
                ].map((item) => (
                  <div key={item.num} className="grid grid-cols-[max-content_1fr_400px_2fr] gap-1 items-center">
                    <Label className="font-semibold px-2.5">{item.num}</Label>
                    <Label className="px-2.5">{item.label}</Label>
                    <div className="grid grid-cols-2 gap-2 w-full">
                      <Select
                        value={valueSubtractors[item.label.toLowerCase().split(" ")[0] as keyof typeof valueSubtractors]}
                        onValueChange={(value) =>
                          setValueSubtractors({
                            ...valueSubtractors,
                            [item.label.toLowerCase().split(" ")[0]]: value,
                          })
                        }
                      >
                        <SelectTrigger className="w-full h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Y">Y</SelectItem>
                          <SelectItem value="N">N</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input disabled className="w-full h-8 bg-gray-100" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Risk ({item.risk}) | No Risk (0)
                    </div>
                  </div>
                ))}
                <div className="grid grid-cols-[max-content_1fr_400px_2fr] gap-1 items-center">
                  <Label className="font-semibold px-2.5">13</Label>
                  <Label>TOTAL (8B + 9B + 10B + 11B + 12B)</Label>
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <div></div>
                    <Input disabled value="6" className="w-full" />
                  </div>
                  <div></div>
                </div>
              </div>
            </div>

            {/* Valuation */}
            <div>
              <h3 className="font-bold mb-2">VALUATION</h3>
              <div className="space-y-2">
                <div className="grid grid-cols-[max-content_1fr_400px_2fr] gap-1 items-center">
                  <Label className="font-semibold px-2.5">14</Label>
                  <Label className="px-2.5">STEP 3: Adjusted Valuation Multiple</Label>
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <div></div>
                    <Input disabled value="0" className="w-full" />
                  </div>
                  <div className="text-sm text-muted-foreground ml-2">= 2B + 7B - 13B</div>
                </div>
                <div className="grid grid-cols-[max-content_1fr_400px_2fr] gap-1 items-center">
                  <Label className="font-semibold px-2.5">15</Label>
                  <Label className="px-2.5">STEP 4: Current Enterprise Value</Label>
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <div></div>
                    <Input disabled value="0" className="w-full" />
                  </div>
                  <div className="text-sm text-muted-foreground ml-2">= 2A * 14B</div>
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-muted-foreground italic">
              *This is for illustration purposes only*
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}




"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { InfoIcon } from "lucide-react"

export default function BusinessScorecard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
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

  const handleLogin = () => {
    if (password === "scorecard2024") {
      setIsAuthenticated(true)
      setError("")
    } else {
      setError("Incorrect password")
      setPassword("")
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-[#6200EE]">BUSINESS SCORECARD</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Password</Label>
              <Input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button className="w-full" onClick={handleLogin}>Enter</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const formatCurrency = (value: number | string): string => {
    if (isNaN(value as number) || value === "") return ""
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value as number)
  }

  const ebitdaPoints = (() => {
    const value = parseFloat(baselineValues.ebitda.replace(/[^0-9.-]+/g,""))
    if (isNaN(value)) return ""
    if (value < 1000000) return 1
    if (value >= 1000000 && value < 5000000) return 2.5
    if (value >= 5000000 && value < 10000000) return 5
    if (value >= 10000000) return 6
    return ""
  })()

  const revenueGrowthPoints = (() => {
    const value = parseFloat(valueAdders.revenueGrowth)
    if (isNaN(value)) return ""
    if (value >= 0 && value < 30) return 0
    if (value >= 30 && value < 100) return 1
    if (value >= 100) return 2
    return ""
  })()

  const revenueRetentionPoints = (() => {
    const value = parseFloat(valueAdders.revenueRetention)
    if (isNaN(value)) return ""
    if (value < 80) return 0
    if (value >= 80) return 2
    return ""
  })()

  const ebitdaMargin = (() => {
    const revenue = parseFloat(baselineValues.revenue.replace(/[^0-9.-]+/g,""))
    const ebitda = parseFloat(baselineValues.ebitda.replace(/[^0-9.-]+/g,""))
    if (isNaN(revenue) || isNaN(ebitda) || revenue === 0) return ""
    return ((ebitda / revenue) * 100).toFixed(1) + "%"
  })()

  const ebitdaMarginPoints = (() => {
    const margin = parseFloat(ebitdaMargin)
    if (isNaN(margin)) return ""
    if (margin < 30) return 0
    return 0.5
  })()

  const ltvCacRatioPoints = (() => {
    const value = parseFloat(valueAdders.ltvCacRatio)
    if (isNaN(value)) return ""
    if (value < 10) return 0
    if (value >= 10) return 0.5
    return ""
  })()

  const valueAddersTotal = (Number(revenueGrowthPoints) || 0) + (Number(revenueRetentionPoints) || 0) + (Number(ebitdaMarginPoints) || 0) + (Number(ltvCacRatioPoints) || 0)

  const keyManRiskPoints = valueSubtractors.keyManRisk === "Y" ? 3 : 0
  const keyClientRiskPoints = valueSubtractors.keyClientRisk === "Y" ? 2 : 0
  const singleChannelRiskPoints = valueSubtractors.singleChannelRisk === "Y" ? 1 : 0
  const marketRiskPoints = valueSubtractors.marketRisk === "Y" ? 1 : 0
  const dataRiskPoints = valueSubtractors.dataRisk === "Y" ? 1 : 0

  const valueSubtractorsTotal = keyManRiskPoints + keyClientRiskPoints + singleChannelRiskPoints + marketRiskPoints + dataRiskPoints

  const adjustedValuationMultiple = Math.max(0, (Number(ebitdaPoints) || 0) + valueAddersTotal - valueSubtractorsTotal)

  const enterpriseValue = (() => {
    const ebitdaValue = parseFloat(baselineValues.ebitda.replace(/[^0-9.-]+/g,""))
    if (isNaN(ebitdaValue)) return ""
    return formatCurrency(ebitdaValue * adjustedValuationMultiple)
  })()

  const tooltipContent = {
    revenue: "Total income generated from all business activities before any deductions",
    ebitda: "Earnings Before Interest, Taxes, Depreciation, and Amortization - a measure of a company's operating performance",
    revenueGrowth: "Year-over-year percentage increase in revenue",
    revenueRetention: "Percentage of recurring revenue retained from the previous period",
    ebitdaMargin: "EBITDA as a percentage of total revenue",
    ltvCac: "Lifetime Value to Customer Acquisition Cost ratio - measures the relationship between customer value and acquisition cost",
    keyManRisk: "Risk associated with the business's dependence on key individuals",
    keyClientRisk: "Risk associated with revenue concentration in a small number of clients",
    singleChannelRisk: "Risk associated with dependence on a single sales or distribution channel",
    marketRisk: "Risk associated with market conditions and competition",
    dataRisk: "Risk associated with data management, privacy, and security"
  }

  return (
    <div className="flex justify-center">
      <div className="w-[1050px] p-10">
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center border-b">
            <div className="flex items-center gap-4 w-full">
              <CardTitle className="text-2xl font-bold text-[#6200EE]">BUSINESS SCORECARD</CardTitle>
              <div className="flex items-center gap-2">
                <Label>Business Name:</Label>
                <Input
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="h-8 border-2 border-gray-400 rounded-none text-sm"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-2">
              {/* VAM header */}
              <div className="text-center mb-4">
                <h2 className="font-semibold">Value Acceleration Method</h2>
              </div>

              {/* Baseline Value section with column headers */}
              <div>
                <div className="scorecard-row">
                  <div></div>
                  <h3 className="font-bold">BASELINE VALUE</h3>
                  <div className="column-headers">
                    <div>COLUMN A</div>
                    <div>COLUMN B</div>
                  </div>
                  <div></div>
                </div>
                
                {/* Baseline value rows */}
                <div className="space-y-1">
                  <div className="scorecard-row">
                    <div className="scorecard-number">1</div>
                    <div className="scorecard-label flex items-center gap-1">
                      Revenue
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoIcon className="h-4 w-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">{tooltipContent.revenue}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="scorecard-input-group">
                      <Input
                        placeholder="$0"
                        value={formatCurrency(parseFloat(baselineValues.revenue.replace(/[^0-9.-]+/g,"")))}
                        onChange={(e) => setBaselineValues({ ...baselineValues, revenue: e.target.value })}
                        className="scorecard-input"
                      />
                      <Input disabled value={formatCurrency(parseFloat(baselineValues.revenue.replace(/[^0-9.-]+/g,"")))} className="scorecard-input" />
                    </div>
                  </div>

                  <div className="scorecard-row">
                    <div className="scorecard-number">2</div>
                    <div className="scorecard-label flex items-center gap-1">
                      EBITDA
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoIcon className="h-4 w-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">{tooltipContent.ebitda}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="scorecard-input-group">
                      <Input
                        placeholder="$0"
                        value={formatCurrency(parseFloat(baselineValues.ebitda.replace(/[^0-9.-]+/g,"")))}
                        onChange={(e) => setBaselineValues({ ...baselineValues, ebitda: e.target.value })}
                        className="scorecard-input"
                      />
                      <Input disabled value={ebitdaPoints} className="scorecard-input" />
                    </div>
                    <div className="scorecard-description">{"<$1M: 1 | $1M-$5M: 2.5 | $5M-$10M: 5 | $10M+: 6"}</div>
                  </div>
                </div>
              </div>

              {/* Value Adders */}
              <div>
                <h3 className="font-bold text-sm mb-2">VALUE ADDERS</h3>
                <div className="space-y-2">
                  <div className="scorecard-row">
                    <div className="scorecard-number">3</div>
                    <div className="scorecard-label flex items-center gap-1">
                      Revenue Growth %
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoIcon className="h-4 w-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">{tooltipContent.revenueGrowth}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="scorecard-input-group">
                      <Input
                        value={valueAdders.revenueGrowth}
                        onChange={(e) => setValueAdders({ ...valueAdders, revenueGrowth: e.target.value })}
                        className="scorecard-input"
                      />
                      <Input disabled value={revenueGrowthPoints} className="scorecard-input" />
                    </div>
                    <div className="scorecard-description">
                      0 - 0-30% | 1 - 30-100% | 2 - 100%+
                    </div>
                  </div>
                  <div className="scorecard-row">
                    <div className="scorecard-number">4</div>
                    <div className="scorecard-label flex items-center gap-1">
                      Yearly Revenue Retention %
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoIcon className="h-4 w-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">{tooltipContent.revenueRetention}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="scorecard-input-group">
                      <Input
                        value={valueAdders.revenueRetention}
                        onChange={(e) => setValueAdders({ ...valueAdders, revenueRetention: e.target.value })}
                        className="scorecard-input"
                      />
                      <Input disabled value={revenueRetentionPoints} className="scorecard-input" />
                    </div>
                    <div className="scorecard-description">
                      0 - {"<80%"} | 2 - {">80%"}
                    </div>
                  </div>
                  <div className="scorecard-row">
                    <div className="scorecard-number">5</div>
                    <div className="scorecard-label flex items-center gap-1">
                      EBITDA Margin
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoIcon className="h-4 w-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">{tooltipContent.ebitdaMargin}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="scorecard-input-group">
                      <Input disabled value={ebitdaMargin} className="scorecard-input" />
                      <Input disabled value={ebitdaMarginPoints} className="scorecard-input" />
                    </div>
                    <div className="scorecard-description">0 - {"<30%"} | .5 - {"(30%+)"}</div>
                  </div>
                  <div className="scorecard-row">
                    <div className="scorecard-number">6</div>
                    <div className="scorecard-label flex items-center gap-1">
                      LTV:CAC Ratio
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoIcon className="h-4 w-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">{tooltipContent.ltvCac}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="scorecard-input-group">
                      <Input
                        value={valueAdders.ltvCacRatio}
                        onChange={(e) => setValueAdders({ ...valueAdders, ltvCacRatio: e.target.value })}
                        className="scorecard-input"
                      />
                      <Input disabled value={ltvCacRatioPoints} className="scorecard-input" />
                    </div>
                    <div className="scorecard-description">
                      0 - {"<10"} | .5 - {">10"}
                    </div>
                  </div>
                  <div className="scorecard-row">
                    <div className="scorecard-number">7</div>
                    <div className="scorecard-label">TOTAL</div>
                    <div className="scorecard-input-group">
                      <div className="scorecard-total">(3B + 4B + 5B + 6B)</div>
                      <Input disabled value={valueAddersTotal} className="scorecard-input" />
                    </div>
                    <div className="scorecard-description"></div>
                  </div>
                </div>
              </div>

              {/* Value Subtractors */}
              <div>
                <h3 className="font-bold text-sm mb-2">VALUE SUBTRACTORS</h3>
                <div className="space-y-2">
                  {[
                    { num: 8, label: "Key Man Risk (Y/N)", risk: 3, key: 'keyManRisk', points: keyManRiskPoints },
                    { num: 9, label: "Key Client Risk (Y/N)", risk: 2, key: 'keyClientRisk', points: keyClientRiskPoints },
                    { num: 10, label: "Single Channel Risk (Y/N)", risk: 1, key: 'singleChannelRisk', points: singleChannelRiskPoints },
                    { num: 11, label: "Market Risk (Y/N)", risk: 1, key: 'marketRisk', points: marketRiskPoints },
                    { num: 12, label: "Data Risk (Y/N)", risk: 1, key: 'dataRisk', points: dataRiskPoints },
                  ].map((item) => (
                    <div key={item.num} className="scorecard-row">
                      <div className="scorecard-number">{item.num}</div>
                      <div className="scorecard-label flex items-center gap-1">
                        {item.label}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <InfoIcon className="h-4 w-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">{tooltipContent[item.key as keyof typeof tooltipContent]}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="scorecard-input-group">
                        <Select
                          value={valueSubtractors[item.key as keyof typeof valueSubtractors]}
                          onValueChange={(value) =>
                            setValueSubtractors({
                              ...valueSubtractors,
                              [item.key]: value,
                            })
                          }
                        >
                          <SelectTrigger className="scorecard-input">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Y">Y</SelectItem>
                            <SelectItem value="N">N</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input disabled value={item.points} className="scorecard-input bg-gray-100" />
                      </div>
                      <div className="scorecard-description">
                        Risk ({item.risk}) | No Risk (0)
                      </div>
                    </div>
                  ))}
                  <div className="scorecard-row">
                    <div className="scorecard-number">13</div>
                    <div className="scorecard-label">TOTAL</div>
                    <div className="scorecard-input-group">
                      <div className="scorecard-total">(8B + 9B + 10B + 11B + 12B)</div>
                      <Input disabled value={valueSubtractorsTotal} className="scorecard-input bg-gray-100" />
                    </div>
                    <div className="scorecard-description"></div>
                  </div>
                </div>
              </div>

              {/* Valuation */}
              <div>
                <h3 className="font-bold mb-2">VALUATION</h3>
                <div className="space-y-2">
                  <div className="scorecard-row">
                    <div className="scorecard-number">14</div>
                    <div className="scorecard-label">Adjusted Valuation Multiple</div>
                    <div className="scorecard-input-group">
                      <div className="scorecard-total"></div>
                      <Input disabled value={adjustedValuationMultiple} className="scorecard-input" />
                    </div>
                    <div className="scorecard-description">= 2B + 7B - 13B</div>
                  </div>
                  <div className="scorecard-row">
                    <div className="scorecard-number">15</div>
                    <div className="scorecard-label">Current Enterprise Value</div>
                    <div className="scorecard-input-group">
                      <div className="scorecard-total"></div>
                      <Input disabled value={enterpriseValue} className="scorecard-input" />
                    </div>
                    <div className="scorecard-description">= 2A * 14B</div>
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
    </div>
  )
}
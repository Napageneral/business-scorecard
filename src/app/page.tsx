"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

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
    if (value >= 1000000 && value < 3000000) return 2.5
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

  const ebitdaMarginPoints = (() => {
    const value = parseFloat(valueAdders.ebitdaMargin)
    if (isNaN(value)) return ""
    if (value < 30) return 0
    if (value >= 30) return 0.5
    return ""
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

  return (
    <div className="flex justify-center">
      <div className="w-[1300px] p-10">
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
                  <div className="scorecard-row">
                    <div className="scorecard-number">1</div>
                    <div className="scorecard-label">Revenue</div>
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
                    <div className="scorecard-label">EBITDA</div>
                    <div className="scorecard-input-group">
                      <Input
                        placeholder="$0"
                        value={formatCurrency(parseFloat(baselineValues.ebitda.replace(/[^0-9.-]+/g,"")))}
                        onChange={(e) => setBaselineValues({ ...baselineValues, ebitda: e.target.value })}
                        className="scorecard-input"
                      />
                      <Input disabled value={ebitdaPoints} className="scorecard-input" />
                    </div>
                    <div className="scorecard-description">{"<$1M: 1 | $1M-$3M: 2.5 | $5M-10M: 5 | $10M+: 6"}</div>
                  </div>
                </div>
              </div>

              {/* Value Adders */}
              <div>
                <h3 className="font-bold text-sm mb-2">VALUE ADDERS</h3>
                <div className="space-y-2">
                  <div className="scorecard-row">
                    <div className="scorecard-number">3</div>
                    <div className="scorecard-label">Revenue Growth %</div>
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
                    <div className="scorecard-label">Yrly Revenue Retention %</div>
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
                    <div className="scorecard-label">EBITDA Margin</div>
                    <div className="scorecard-input-group">
                      <Input
                        value={valueAdders.ebitdaMargin}
                        onChange={(e) => setValueAdders({ ...valueAdders, ebitdaMargin: e.target.value })}
                        className="scorecard-input"
                      />
                      <Input disabled value={ebitdaMarginPoints} className="scorecard-input" />
                    </div>
                    <div className="scorecard-description">
                      0 - {"<30%"} | .5 - {"(30%+)"}
                    </div>
                  </div>
                  <div className="scorecard-row">
                    <div className="scorecard-number">6</div>
                    <div className="scorecard-label">LTV:CAC Ratio</div>
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
                    { num: 12, label: "Data (Y/N)", risk: 1, key: 'dataRisk', points: dataRiskPoints },
                  ].map((item) => (
                    <div key={item.num} className="scorecard-row">
                      <div className="scorecard-number">{item.num}</div>
                      <div className="scorecard-label">{item.label}</div>
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
                    <div className="scorecard-label">STEP 3: Adjusted Valuation Multiple</div>
                    <div className="scorecard-input-group">
                      <div className="scorecard-total"></div>
                      <Input disabled value={adjustedValuationMultiple} className="scorecard-input" />
                    </div>
                    <div className="scorecard-description">= 2B + 7B - 13B</div>
                  </div>
                  <div className="scorecard-row">
                    <div className="scorecard-number">15</div>
                    <div className="scorecard-label">STEP 4: Current Enterprise Value</div>
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
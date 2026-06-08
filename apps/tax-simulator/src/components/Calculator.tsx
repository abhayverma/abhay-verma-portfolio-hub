import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@portfolio/shared-ui/components/ui/card";
import { Input } from "@portfolio/shared-ui/components/ui/input";
import { Label } from "@portfolio/shared-ui/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@portfolio/shared-ui/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@portfolio/shared-ui/components/ui/table";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#64748b'];

export const TaxCalculator = () => {
  const [income, setIncome] = useState<number>(1200000);
  const [taxRate, setTaxRate] = useState<number | ''>(15);
  const [selectedYears, setSelectedYears] = useState<number>(10);

  // 1. Tax & Income Calculation
  const calculation = useMemo(() => {
    const assumedBasic = income * 0.5;
    const pfDeduction = assumedBasic * 0.12;
    const activeTaxRate = taxRate === '' ? 0 : taxRate;
    const taxAmount = income * (activeTaxRate / 100);
    
    const netIncome = income - taxAmount - pfDeduction;
    const monthlyTakeHome = netIncome / 12;

    return { 
      gross: income,
      taxAmount, 
      pfDeduction,
      netIncome,
      monthlyTakeHome
    };
  }, [income, taxRate]);

  // 2. Financial Planner Grid Data
  const expenses = useMemo(() => {
    const net = calculation.netIncome;
    return [
      { category: 'Rent', percentage: 25, amount: net * 0.25 },
      { category: 'Transportation', percentage: 10, amount: net * 0.10 },
      { category: 'Food & Miscellaneous', percentage: 30, amount: net * 0.30 },
      { category: 'Subscriptions / Leisure', percentage: 5, amount: net * 0.05 },
      { category: 'Health / Term Insurance', percentage: 10, amount: net * 0.10 },
      { category: 'SIPs (Investments)', percentage: 15, amount: net * 0.15 },
      { category: 'Liquid Savings', percentage: 5, amount: net * 0.05 },
    ];
  }, [calculation.netIncome]);

  const totals = useMemo(() => {
    return expenses.reduce((acc, curr) => ({
      percentage: acc.percentage + curr.percentage,
      amount: acc.amount + curr.amount
    }), { percentage: 0, amount: 0 });
  }, [expenses]);

  // 3. N-Year Wealth Projection Logic
  const projections = useMemo(() => {
    let sipNominal = 0;
    let savingsNominal = 0;
    
    let currentAnnualSip = calculation.netIncome * 0.15;
    let currentAnnualSavings = calculation.netIncome * 0.05;
    let currentAnnualSalary = calculation.netIncome;

    for (let i = 0; i < selectedYears; i++) {
      sipNominal = (sipNominal + currentAnnualSip) * 1.12;
      savingsNominal = (savingsNominal + currentAnnualSavings) * 1.04;

      currentAnnualSalary *= 1.10;
      currentAnnualSip *= 1.02;
      currentAnnualSavings = currentAnnualSalary * 0.05;
    }

    const totalNominal = sipNominal + savingsNominal;
    const purchasingPower = totalNominal / Math.pow(1.05, selectedYears);

    return {
      chartData: [
        { name: 'SIP Portfolio (12% CAGR)', value: Math.round(sipNominal) },
        { name: 'Savings (4% CAGR)', value: Math.round(savingsNominal) }
      ],
      totalNominal: Math.round(totalNominal),
      purchasingPower: Math.round(purchasingPower)
    };
  }, [calculation.netIncome, selectedYears]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Wealth & Tax Simulator</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="income">Annual Income (₹)</Label>
            <Input 
              id="income" 
              type="number" 
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
            />
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Tax Regime Presets</Label>
              {/* FIXED: Dropdown now controlled and defaults correctly */}
              <Select 
                value={taxRate !== '' && ["0", "10", "15", "30"].includes(taxRate.toString()) ? taxRate.toString() : "15"} 
                onValueChange={(val) => setTaxRate(Number(val))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a baseline..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Tax Free (0%)</SelectItem>
                  <SelectItem value="10">Standard Deductions (10%)</SelectItem>
                  <SelectItem value="15">New Regime Estimate (15%)</SelectItem>
                  <SelectItem value="30">High Bracket (30%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="customTax">Effective Tax Rate (%)</Label>
              <Input 
                id="customTax" 
                type="number" 
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value === '' ? '' : Number(e.target.value))}              
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-portfolio-accent/20 bg-portfolio-accent/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Tax & Income Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Gross Income</p>
              <p className="text-2xl font-bold">₹{calculation.gross.toLocaleString('en-IN')}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Assumed PF (12% of Basic)</p>
              <p className="text-2xl font-bold text-orange-500">-₹{calculation.pfDeduction.toLocaleString('en-IN')}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Est. Tax Amount</p>
              <p className="text-2xl font-bold text-red-500">-₹{calculation.taxAmount.toLocaleString('en-IN')}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Net Take-Home</p>
              <p className="text-2xl font-bold text-green-500">₹{calculation.netIncome.toLocaleString('en-IN')}</p>
              <p className="text-xs font-medium text-muted-foreground">₹{calculation.monthlyTakeHome.toLocaleString('en-IN', { maximumFractionDigits: 0 })} / month</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ideal Financial Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Allocation</TableHead>
                <TableHead className="text-right">Annual Amount (₹)</TableHead>
                <TableHead className="text-right">Monthly Amount (₹)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((row) => (
                <TableRow key={row.category}>
                  <TableCell className="font-medium">{row.category}</TableCell>
                  <TableCell>{row.percentage}%</TableCell>
                  <TableCell className="text-right">{row.amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</TableCell>
                  <TableCell className="text-right">{Math.round(row.amount / 12).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</TableCell>
                </TableRow>
              ))}
              <TableRow className="border-t-2 font-bold bg-muted/50">
                <TableCell>Total</TableCell>
                <TableCell>{totals.percentage}%</TableCell>
                <TableCell className="text-right">₹{Math.round(totals.amount).toLocaleString('en-IN')}</TableCell>
                <TableCell className="text-right">₹{Math.round(totals.amount / 12).toLocaleString('en-IN')}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Portfolio Growth Projection</CardTitle>
          </div>
          {/* FIXED: Years dropdown now controlled and syncs correctly */}
          <Select 
            value={selectedYears.toString()} 
            onValueChange={(val) => setSelectedYears(Number(val))}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Years" />
            </SelectTrigger>
            <SelectContent>
              {[1, 5, 10, 15, 20, 50].map(year => (
                <SelectItem key={year} value={year.toString()}>{year} Years</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={projections.chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {projections.chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Total Nominal Value</p>
                <p className="text-3xl font-bold text-foreground">₹{projections.totalNominal.toLocaleString('en-IN')}</p>
              </div>
              <div className="p-4 bg-muted/50 border rounded-lg">
                <p className="text-sm text-muted-foreground">Real Purchasing Power</p>
                <p className="text-xl font-semibold text-foreground">₹{projections.purchasingPower.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
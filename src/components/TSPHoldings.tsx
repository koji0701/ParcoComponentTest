import React, { useState } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import FundRow from './FundRow';

interface Fund {
  name: string;
  value: number;
  color: string;
}

const TSPHoldings = () => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>();
  
  const funds = [
    {
      name: 'C Fund',
      value: 50150,
      riskLevel: 10,
      examples: ['Apple', 'Google', 'Microsoft', 'Meta', 'Tesla'],
      description: 'Very volatile, will reap the most rewards from good years and the worst losses of bad years',
      backgroundColor: '#2E77BC',
    },
    {
      name: 'G Fund',
      value: 64198,
      riskLevel: 1,
      examples: ['Government Securities'],
      description: 'Low risk, government-backed securities with stable returns',
      backgroundColor: '#4B4B4B',
    },
    {
      name: 'I Fund',
      value: 15640,
      riskLevel: 8,
      examples: ['Toyota', 'Nestle', 'Samsung', 'LVMH'],
      description: 'International stock index fund tracking non-US developed markets',
      backgroundColor: '#9DB3D2',
    },
    {
      name: 'S Fund',
      value: 80242,
      riskLevel: 9,
      examples: ['Square', 'Zoom', 'Coinbase'],
      description: 'Small and mid-cap US stocks not in the C Fund',
      backgroundColor: '#2F4562',
    },
  ];

  const totalValue = funds.reduce((sum, fund) => sum + fund.value, 0);

  // Prepare data for pie chart
  const chartData = funds.map(fund => ({
    name: fund.name,
    value: fund.value,
  }));

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(undefined);
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 1 }}>
        TSP Holdings
      </Typography>
      <Typography variant="h5" sx={{ mb: 4, color: '#4A5568' }}>
        Look Through Holdings
      </Typography>

      <Box sx={{ position: 'relative', height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={160}
              paddingAngle={2}
              dataKey="value"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
            >
              {funds.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.backgroundColor}
                  style={{
                    transform: `scale(${activeIndex === index ? 1.1 : 1})`,
                    transformOrigin: 'center',
                    transition: 'transform 0.3s ease-in-out'
                  }}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
          }}
        >
          <Typography variant="h6" color="textSecondary">
            TSP Total
          </Typography>
          <Typography variant="h4">
            ${totalValue.toLocaleString()}
          </Typography>
        </Box>
      </Box>
      {funds.map((fund) => (
          <FundRow
            key={fund.name}
            name={fund.name}
            value={fund.value}
            riskLevel={fund.riskLevel}
            examples={fund.examples}
            description={fund.description}
            backgroundColor={fund.backgroundColor}
          />
        ))}
    </Paper>
  );
};

export default TSPHoldings;


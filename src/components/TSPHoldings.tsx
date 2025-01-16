import React, { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import FundRow from './FundRow';
import { useTheme } from '../theme/ThemeProvider';

interface Fund {
  name: string;
  value: number;
  riskLevel: number;
  examples: string[];
  description: string;
  backgroundColor: string;
}

const TSPHoldings = () => {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState<number | undefined>();
  
  const funds = [
    {
      name: 'C Fund',
      value: 50150,
      riskLevel: 10,
      examples: ['Apple', 'Google', 'Microsoft', 'Meta', 'Tesla'],
      description: 'Very volatile, will reap the most rewards from good years and the worst losses of bad years',
      backgroundColor: theme.colors.secondary.base,
    },
    {
      name: 'G Fund',
      value: 64198,
      riskLevel: 1,
      examples: ['Government Securities'],
      description: 'Low risk, government-backed securities with stable returns',
      backgroundColor: theme.colors.gray.dark,
    },
    {
      name: 'I Fund',
      value: 15640,
      riskLevel: 8,
      examples: ['Toyota', 'Nestle', 'Samsung', 'LVMH'],
      description: 'International stock index fund tracking non-US developed markets',
      backgroundColor: theme.colors.gray.lighter,
    },
    {
      name: 'S Fund',
      value: 80242,
      riskLevel: 9,
      examples: ['Square', 'Zoom', 'Coinbase'],
      description: 'Small and mid-cap US stocks not in the C Fund',
      backgroundColor: theme.colors.secondary.darker,
    },
  ];

  const totalValue = funds.reduce((sum, fund) => sum + fund.value, 0);

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
    <Paper sx={{ 
      p: theme.spacing.xl,
      maxWidth: 600,
      mx: 'auto',
      mt: theme.spacing.xl,
      backgroundColor: theme.colors.white,
      borderRadius: '12px'
    }}>
      <Box sx={{ mb: theme.spacing.xl }}>
        <Typography 
          variant="h1" 
          sx={{ 
            ...theme.typography.h1,
            color: theme.colors.gray.dark,
            mb: theme.spacing.xs
          }}
        >
          TSP Holdings
        </Typography>
        <Typography 
          variant="h2" 
          sx={{ 
            ...theme.typography.h2,
            color: theme.colors.gray.mediumDark
          }}
        >
          Look Through Holdings
        </Typography>
      </Box>

      <Box sx={{ position: 'relative', height: 400, mb: theme.spacing.xl }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={120}
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
          <Typography 
            variant="h3" 
            sx={{ 
              ...theme.typography.h2,
              color: theme.colors.gray.medium,
              mb: theme.spacing.xs
            }}
          >
            TSP Total
          </Typography>
          <Typography 
            variant="h1" 
            sx={{ 
              ...theme.typography.h3,
              color: theme.colors.gray.dark,
              fontSize: '28px'
            }}
          >
            ${totalValue.toLocaleString()}
          </Typography>
        </Box>
      </Box>

      <Box>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          mb: theme.spacing.md,
          px: theme.spacing.md
        }}>
          <Typography sx={{ 
            ...theme.typography.body1,
            color: theme.colors.gray.medium
          }}>
            Items
          </Typography>
          <Typography sx={{ 
            ...theme.typography.body1,
            color: theme.colors.gray.medium
          }}>
            Total Value
          </Typography>
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
      </Box>
    </Paper>
  );
};

export default TSPHoldings;
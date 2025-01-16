import React, { useState } from 'react';
import { Box, Typography, Paper, Tabs, Tab } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import FundRow from './FundRow';
import { useTheme } from '../theme/ThemeProvider';

const TSPHoldings = () => {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState<number | undefined>();
  const [activeTab, setActiveTab] = useState(0);
  
  const baseFunds = [
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
      riskLevel: 10,
      examples: ['Apple', 'Google', 'Microsoft', 'Meta', 'Tesla'],
      description: 'Very volatile, will reap the most rewards from good years and the worst losses of bad years',
      backgroundColor: theme.colors.gray.dark,
    },
    {
      name: 'I Fund',
      value: 15640,
      riskLevel: 10,
      examples: ['Apple', 'Google', 'Microsoft', 'Meta', 'Tesla'],
      description: 'Very volatile, will reap the most rewards from good years and the worst losses of bad years',
      backgroundColor: theme.colors.secondary.mute
    },
    {
      name: 'Y Fund',
      value: 22739,
      riskLevel: 10,
      examples: ['Apple', 'Google', 'Microsoft', 'Meta', 'Tesla'],
      description: 'Very volatile, will reap the most rewards from good years and the worst losses of bad years',
      backgroundColor: theme.colors.secondary.darker,
    },
    {
      name: 'S Fund',
      value: 22739,
      riskLevel: 10,
      examples: ['Apple', 'Google', 'Microsoft', 'Meta', 'Tesla'],
      description: 'Very volatile, will reap the most rewards from good years and the worst losses of bad years',
      backgroundColor: theme.colors.gray.dark,
    },
    {
      name: 'F Fund',
      value: 22739,
      riskLevel: 10,
      examples: ['Apple', 'Google', 'Microsoft', 'Meta', 'Tesla'],
      description: 'Very volatile, will reap the most rewards from good years and the worst losses of bad years',
      backgroundColor: theme.colors.secondary.bright,
    },
  ];

  const lookThroughFunds = [ //im a bit unclear about what value they should have so im increasing each by 22739
    {
      ...baseFunds[0],
      value: 72889  
    },
    {
      ...baseFunds[1],
      value: 86937 
    },
    {
      ...baseFunds[2],
      value: 38379  
    }
  ];

  const funds = activeTab === 0 ? baseFunds : lookThroughFunds;
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

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
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
      <Box sx={{ 
        mb: theme.spacing.xl,
        display: 'flex',
        justifyContent: 'center',
        '& .MuiTabs-root': {
          minHeight: 'unset',
        },
        '& .MuiTabs-indicator': {
          display: 'none',
        },
      }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          sx={{
            borderRadius: '100px',
            padding: '4px',
            '& .MuiTab-root': {
              textTransform: 'none',
              fontSize: theme.typography.h2.fontSize,
              fontWeight: theme.typography.h2.fontWeight,
              color: theme.colors.gray.mediumDark,
              minHeight: 'unset',
              padding: '8px 16px',
              borderRadius: '100px',
              marginRight: '4px',
              '&:last-child': {
                marginRight: 0,
              },
              '&.Mui-selected': {
                backgroundColor: theme.colors.gray.lighter,
                boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
              },
            },
          }}
        >
          <Tab label="TSP Holdings" />
          <Tab label="Look Through Holdings" />
        </Tabs>
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
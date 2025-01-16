import React, { useState } from 'react';
import { Box, Typography, Paper, Tabs, Tab } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import FundRow from './FundRow';
import { useTheme } from '../theme/ThemeProvider';
const TSPHoldings = () => {
    const theme = useTheme();
    const [hoveredPieIndex, setHoveredPieIndex] = useState<number | undefined>();
    const [selectedPieIndex, setSelectedPieIndex] = useState<number | undefined>();
    const [expandedRowIndices, setExpandedRowIndices] = useState<number[]>([]);
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
    setHoveredPieIndex(index);
  };

  const onPieLeave = () => {
    setHoveredPieIndex(undefined);
  };

  const handlePieClick = (_: any, index: number) => {
    // Toggle selected pie index and expand corresponding row
    setSelectedPieIndex(prev => prev === index ? undefined : index);
    if (!expandedRowIndices.includes(index)) {
      setExpandedRowIndices(prev => [...prev, index]);
    }
  };

  const handleRowToggle = (index: number) => {
    setExpandedRowIndices(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setSelectedPieIndex(undefined);
    setHoveredPieIndex(undefined);
    setExpandedRowIndices([]);
  };

  // Get the currently displayed pie index (either selected or hovered)
  const displayedPieIndex = selectedPieIndex !== undefined ? selectedPieIndex : hoveredPieIndex;

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
              onClick={handlePieClick}
            >
              {funds.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.backgroundColor}
                  style={{
                    transform: `scale(${displayedPieIndex === index ? 1.1 : 1})`,
                    transformOrigin: 'center',
                    transition: 'transform 0.3s ease-in-out',
                    cursor: 'pointer'
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
          {displayedPieIndex !== undefined ? (
            <>
              <Box sx={{ 
                display: 'inline-block',
                mb: theme.spacing.xs 
              }}>
                <Typography
                  sx={{
                    backgroundColor: funds[displayedPieIndex].backgroundColor,
                    color: theme.colors.white,
                    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
                    borderRadius: '4px',
                    ...theme.typography.body1,
                  }}
                >
                  {funds[displayedPieIndex].name}
                </Typography>
              </Box>
              <Typography 
                variant="h1" 
                sx={{ 
                  ...theme.typography.h1,
                  color: theme.colors.gray.dark,
                  fontSize: '28px'
                }}
              >
                ${funds[displayedPieIndex].value.toLocaleString()}
              </Typography>
            </>
          ) : (
            <>
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
                  ...theme.typography.h1,
                  color: theme.colors.gray.dark,
                  fontSize: '28px'
                }}
              >
                ${totalValue.toLocaleString()}
              </Typography>
            </>
          )}
        </Box>
      </Box> 

      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: `${theme.spacing.md} ${theme.spacing.md}`,
        borderBottom: `1px solid ${theme.colors.gray.lighter}`,
        mb: theme.spacing.xs
        }}>
        <Typography sx={{
            ...theme.typography.h3,
            color: theme.colors.gray.medium,
        }}>
            Items
        </Typography>
        <Typography sx={{
            ...theme.typography.h3,
            color: theme.colors.gray.medium,
        }}>
            Total Value
        </Typography>
    </Box>

    <Box>
        {funds.map((fund, index) => (
        <FundRow
            key={fund.name}
            {...fund}
            expanded={expandedRowIndices.includes(index)}
            onToggle={() => handleRowToggle(index)}
        />
        ))}
    </Box>
    </Paper>    
  );
};

export default TSPHoldings;
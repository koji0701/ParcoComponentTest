import React, { useState } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface Fund {
  name: string;
  value: number;
  color: string;
}

const TSPHoldings = () => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>();
  
  const data: Fund[] = [
    { name: 'C Fund', value: 50150, color: '#4B85C3' },
    { name: 'G Fund', value: 64198, color: '#6B7580' },
    { name: 'I Fund', value: 15640, color: '#B8C5D9' },
    { name: 'Y Fund', value: 22739, color: '#2F4259' },
    { name: 'S Fund', value: 22739, color: '#1E1E1E' },
    { name: 'F Fund', value: 22739, color: '#67C6EA' }
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

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
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={160}
              paddingAngle={2}
              dataKey="value"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
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
            ${total.toLocaleString()}
          </Typography>
        </Box>
      </Box>

      <List sx={{ mt: 4 }}>
        {data.map((fund, index) => (
          <ListItem
            key={fund.name}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              py: 2,
              borderBottom: '1px solid #eee'
            }}
          >
            <Box
              sx={{
                bgcolor: fund.color,
                color: 'white',
                py: 1,
                px: 2,
                borderRadius: 1,
                minWidth: 120,
                textAlign: 'center'
              }}
            >
              {fund.name}
            </Box>
            <Typography variant="h6" component="span">
              ${fund.value.toLocaleString()}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TSPHoldings;
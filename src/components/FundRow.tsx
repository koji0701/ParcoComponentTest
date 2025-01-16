import React, { useState } from 'react';
import { Box, Typography, Collapse, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FundRowProps {
  name: string;
  value: number;
  riskLevel: number;
  examples: string[];
  description: string;
  backgroundColor: string;
}

const FundRow: React.FC<FundRowProps> = ({ name, value, riskLevel, examples, description, backgroundColor }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Box
        onClick={() => setExpanded(!expanded)}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px',
          cursor: 'pointer',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography
            variant="body1"
            sx={{
              backgroundColor,
              color: 'white',
              padding: '8px 16px',
              borderRadius: '4px',
              fontWeight: 'bold',
            }}
          >
            {name}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h6">
            ${value.toLocaleString()}
          </Typography>
          {expanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </Box>
      </Box>
      <Collapse in={expanded}>
        <Box sx={{ padding: '24px', backgroundColor: 'white', borderRadius: '8px', margin: '0 16px 16px' }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell sx={{ color: 'text.secondary', border: 'none', paddingLeft: 0 }}>
                  Risk Level
                </TableCell>
                <TableCell sx={{ border: 'none' }}>{riskLevel}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ color: 'text.secondary', border: 'none', paddingLeft: 0 }}>
                  Examples
                </TableCell>
                <TableCell sx={{ border: 'none' }}>{examples.join(', ')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ color: 'text.secondary', border: 'none', paddingLeft: 0 }}>
                  Description
                </TableCell>
                <TableCell sx={{ border: 'none' }}>{description}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Collapse>
    </>
  );
};

export default FundRow;
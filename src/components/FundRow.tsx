import React from 'react';
import { Box, Typography, Collapse, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '../theme/ThemeProvider';

interface FundRowProps {
    name: string;
    value: number;
    riskLevel: number;
    examples: string[];
    description: string;
    backgroundColor: string;
    expanded: boolean;
    onToggle: () => void;
  }

  const FundRow: React.FC<FundRowProps> = ({ 
    name, 
    value, 
    riskLevel, 
    examples, 
    description, 
    backgroundColor,
    expanded,
    onToggle
  }) => {
    const theme = useTheme();
  
    return (
      <Box sx={{
        borderBottom: `1px solid ${theme.colors.gray.lighter}`,
        '&:last-child': {
          borderBottom: 'none'
        }
      }}>
        <Box
          onClick={onToggle}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: theme.spacing.md,
            cursor: 'pointer',
            backgroundColor: expanded ? theme.colors.gray.lighter : 'transparent',
            '&:hover': {
              backgroundColor: theme.colors.gray.lighter,
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md }}>
            <Typography
              sx={{
                ...theme.typography.body1,
                backgroundColor: backgroundColor,
                color: theme.colors.white,
                padding: `${theme.spacing.xs} ${theme.spacing.md}`,
                borderRadius: '4px',
                fontWeight: 'bold',
              }}
            >
              {name}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: theme.spacing.xs }}>
            <Typography sx={{
              ...theme.typography.body1,
              color: theme.colors.gray.dark
            }}>
              ${value.toLocaleString()}
            </Typography>
            {expanded ? 
              <ChevronUp size={24} color={theme.colors.gray.medium} /> : 
              <ChevronDown size={24} color={theme.colors.gray.medium} />
            }
          </Box>
        </Box>
        <Collapse in={expanded}>
          <Box sx={{ 
            padding: theme.spacing.xl,
            backgroundColor: theme.colors.white,
            borderRadius: '8px',
            margin: `0 ${theme.spacing.md} ${theme.spacing.md}`
          }}>
        <Table>
        <TableBody>
            <TableRow>
            <TableCell 
                sx={{ 
                ...theme.typography.body1,
                color: theme.colors.gray.medium,
                borderBottom: `1px solid ${theme.colors.gray.lighter}`,
                paddingLeft: 0,
                paddingTop: 0
                }}
            >
                Risk Level
            </TableCell>
            <TableCell 
                sx={{ 
                ...theme.typography.body1,
                color: theme.colors.gray.dark,
                borderBottom: `1px solid ${theme.colors.gray.lighter}`,
                paddingTop: 0
                }}
            >
                {riskLevel}
            </TableCell>
            </TableRow>
            <TableRow>
            <TableCell 
                sx={{ 
                ...theme.typography.body1,
                color: theme.colors.gray.medium,
                borderBottom: `1px solid ${theme.colors.gray.lighter}`,
                paddingLeft: 0
                }}
            >
                Examples
            </TableCell>
            <TableCell 
                sx={{ 
                ...theme.typography.body1,
                color: theme.colors.gray.dark,
                borderBottom: `1px solid ${theme.colors.gray.lighter}`
                }}
            >
                {examples.join(', ')}
            </TableCell>
            </TableRow>
            <TableRow>
            <TableCell 
                sx={{ 
                ...theme.typography.body1,
                color: theme.colors.gray.medium,
                border: 'none',
                paddingLeft: 0,
                paddingBottom: 0
                }}
            >
                Description
            </TableCell>
            <TableCell 
                sx={{ 
                ...theme.typography.body1,
                color: theme.colors.gray.dark,
                border: 'none',
                paddingBottom: 0
                }}
            >
                {description}
            </TableCell>
            </TableRow>
        </TableBody>
        </Table>
          </Box>
        </Collapse>
      </Box>
    );
  };
export default FundRow;
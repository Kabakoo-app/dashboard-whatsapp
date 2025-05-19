import {
  Box,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip
} from '@mui/material'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts'
import { useState } from 'react'

// Define interfaces directly in this component
interface ABTestVariant {
  name: string
  opens: number
  responses: number
  completions: number
  conversionRate: number
}

interface ABTest {
  variantA: ABTestVariant
  variantB: ABTestVariant
  improvement: number
}

interface ABTestingCardProps {
  testTypes: Record<string, ABTest>
  title?: string
}

const ABTestingCard = ({ testTypes, title = "A/B Testing Results" }: ABTestingCardProps) => {
  const defaultTestType = Object.keys(testTypes)[0]
  const [currentTestType, setCurrentTestType] = useState(defaultTestType)

  // Using any type to avoid SelectChangeEvent issues
  const handleTestTypeChange = (event: any) => {
    setCurrentTestType(event.target.value)
  }

  const currentTest = testTypes[currentTestType]

  return (
    <Card>
      <CardHeader 
        title={title}
        action={
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel id="ab-test-select-label">Test Type</InputLabel>
            <Select
              labelId="ab-test-select-label"
              id="ab-test-select"
              value={currentTestType}
              label="Test Type"
              onChange={handleTestTypeChange}
            >
              {Object.entries(testTypes).map(([key, test]) => (
                <MenuItem key={key} value={key}>
                  {key.split(/(?=[A-Z])/).join(' ')}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        }
      />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <TableContainer component={Paper} elevation={0} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Metric</TableCell>
                    <TableCell align="right">Variant A: {currentTest.variantA.name}</TableCell>
                    <TableCell align="right">Variant B: {currentTest.variantB.name}</TableCell>
                    <TableCell align="right">Difference</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">Opens</TableCell>
                    <TableCell align="right">{currentTest.variantA.opens}</TableCell>
                    <TableCell align="right">{currentTest.variantB.opens}</TableCell>
                    <TableCell align="right">
                      {currentTest.variantB.opens - currentTest.variantA.opens > 0 ? '+' : ''}
                      {currentTest.variantB.opens - currentTest.variantA.opens}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">Responses</TableCell>
                    <TableCell align="right">{currentTest.variantA.responses}</TableCell>
                    <TableCell align="right">{currentTest.variantB.responses}</TableCell>
                    <TableCell align="right">
                      {currentTest.variantB.responses - currentTest.variantA.responses > 0 ? '+' : ''}
                      {currentTest.variantB.responses - currentTest.variantA.responses}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">Completions</TableCell>
                    <TableCell align="right">{currentTest.variantA.completions}</TableCell>
                    <TableCell align="right">{currentTest.variantB.completions}</TableCell>
                    <TableCell align="right">
                      {currentTest.variantB.completions - currentTest.variantA.completions > 0 ? '+' : ''}
                      {currentTest.variantB.completions - currentTest.variantA.completions}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">Conversion Rate</TableCell>
                    <TableCell align="right">{currentTest.variantA.conversionRate}%</TableCell>
                    <TableCell align="right">{currentTest.variantB.conversionRate}%</TableCell>
                    <TableCell align="right">
                      <Chip 
                        label={`+${currentTest.improvement}%`} 
                        color="success" 
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="h6" gutterBottom>Conversion Rate Comparison</Typography>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  data={[
                    {
                      name: 'Variant A',
                      value: currentTest.variantA.conversionRate,
                      label: currentTest.variantA.name
                    },
                    {
                      name: 'Variant B',
                      value: currentTest.variantB.conversionRate,
                      label: currentTest.variantB.name
                    }
                  ]}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" name="Conversion Rate">
                    <Cell fill="#8884d8" />
                    <Cell fill="#82ca9d" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="subtitle1" color="success.main">
                  Improvement: +{currentTest.improvement}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {
                    currentTest.improvement > 20 
                      ? 'Significant improvement detected!' 
                      : 'Moderate improvement detected.'
                  }
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ABTestingCard
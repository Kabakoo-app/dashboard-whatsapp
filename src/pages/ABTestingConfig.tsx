import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Stepper,
  Step,
  StepLabel,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  List,
  ListItem,
  ListItemText,
  Alert,
  Stack,
  Chip,
  Slider
} from '@mui/material'
import { useState } from 'react'

// Test types
const testTypes = [
  { id: 'messageFormat', label: 'Message Format' },
  { id: 'reminderTiming', label: 'Reminder Timing' },
  { id: 'contentLength', label: 'Content Length' },
  { id: 'mediaType', label: 'Media Type' },
  { id: 'callToAction', label: 'Call To Action Text' },
  { id: 'custom', label: 'Custom Test' }
]

// Distribution types
const distributionTypes = [
  { id: 'percentage', label: 'Percentage Split' },
  { id: 'region', label: 'Regional' },
  { id: 'demographics', label: 'Demographics Based' },
  { id: 'userBehavior', label: 'Based on User Behavior' }
]

// Active tests mock data
const activeTests = [
  { 
    id: 'test1', 
    name: 'Welcome Message Optimization', 
    type: 'messageFormat', 
    status: 'running', 
    startDate: '2023-06-01', 
    participants: 2560,
    conversions: {
      variantA: 36.3,
      variantB: 46.5
    } 
  },
  { 
    id: 'test2', 
    name: 'Evening vs Morning Reminders', 
    type: 'reminderTiming', 
    status: 'running', 
    startDate: '2023-06-15', 
    participants: 1960,
    conversions: {
      variantA: 38.8,
      variantB: 51.5
    } 
  },
  { 
    id: 'test3', 
    name: 'Module Content Detail Level', 
    type: 'contentLength', 
    status: 'scheduled', 
    startDate: '2023-07-01', 
    participants: 0,
    conversions: {
      variantA: 0,
      variantB: 0
    }  
  }
]

// Steps for creating a new test
const steps = ['Test Type', 'Variant Configuration', 'Audience Selection', 'Review & Schedule'];

const ABTestingConfig = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [testName, setTestName] = useState('')
  const [selectedTestType, setSelectedTestType] = useState('')
  const [variantAName, setVariantAName] = useState('')
  const [variantBName, setVariantBName] = useState('')
  const [variantAContent, setVariantAContent] = useState('')
  const [variantBContent, setVariantBContent] = useState('')
  const [distributionType, setDistributionType] = useState('percentage')
  const [distributionValue, setDistributionValue] = useState(50)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [goalMetric, setGoalMetric] = useState('conversion')

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
    setTestName('')
    setSelectedTestType('')
    setVariantAName('')
    setVariantBName('')
    setVariantAContent('')
    setVariantBContent('')
    setDistributionType('percentage')
    setDistributionValue(50)
    setStartDate('')
    setEndDate('')
    setGoalMetric('conversion')
  }

  const handleSubmit = () => {
    // Here would be the logic to save the new A/B test
    alert('New A/B test created successfully!')
    handleReset()
  }

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Test Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="testName"
                  label="Test Name"
                  fullWidth
                  variant="outlined"
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                  helperText="Give your test a descriptive name"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="test-type-label">Test Type</InputLabel>
                  <Select
                    labelId="test-type-label"
                    id="test-type"
                    value={selectedTestType}
                    label="Test Type"
                    onChange={(e: any) => setSelectedTestType(e.target.value)}
                  >
                    {testTypes.map((type) => (
                      <MenuItem key={type.id} value={type.id}>{type.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel id="goal-metric-label">Goal Metric</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="goal-metric-label"
                    name="goal-metric"
                    value={goalMetric}
                    onChange={(e) => setGoalMetric(e.target.value)}
                  >
                    <FormControlLabel value="conversion" control={<Radio />} label="Conversion Rate" />
                    <FormControlLabel value="completion" control={<Radio />} label="Task Completion" />
                    <FormControlLabel value="engagement" control={<Radio />} label="Engagement" />
                    <FormControlLabel value="retention" control={<Radio />} label="Retention" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Variant Configuration
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper elevation={2} sx={{ p: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Variant A (Control)
                  </Typography>
                  <TextField
                    required
                    id="variantAName"
                    label="Variant Name"
                    fullWidth
                    variant="outlined"
                    value={variantAName}
                    onChange={(e) => setVariantAName(e.target.value)}
                    margin="normal"
                  />
                  <TextField
                    required
                    id="variantAContent"
                    label="Content"
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    value={variantAContent}
                    onChange={(e) => setVariantAContent(e.target.value)}
                    margin="normal"
                    helperText="Enter the content for Variant A"
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={2} sx={{ p: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Variant B (Test)
                  </Typography>
                  <TextField
                    required
                    id="variantBName"
                    label="Variant Name"
                    fullWidth
                    variant="outlined"
                    value={variantBName}
                    onChange={(e) => setVariantBName(e.target.value)}
                    margin="normal"
                  />
                  <TextField
                    required
                    id="variantBContent"
                    label="Content"
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    value={variantBContent}
                    onChange={(e) => setVariantBContent(e.target.value)}
                    margin="normal"
                    helperText="Enter the content for Variant B"
                  />
                </Paper>
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Audience Selection
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="distribution-type-label">Distribution Method</InputLabel>
                  <Select
                    labelId="distribution-type-label"
                    id="distribution-type"
                    value={distributionType}
                    label="Distribution Method"
                    onChange={(e: any) => setDistributionType(e.target.value)}
                  >
                    {distributionTypes.map((type) => (
                      <MenuItem key={type.id} value={type.id}>{type.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {distributionType === 'percentage' && (
                <Grid item xs={12}>
                  <Typography id="distribution-percentage-slider" gutterBottom>
                    Distribution Percentage (Variant B): {distributionValue}%
                  </Typography>
                  <Slider
                    value={distributionValue}
                    onChange={(e, newValue) => setDistributionValue(newValue as number)}
                    aria-labelledby="distribution-percentage-slider"
                    valueLabelDisplay="auto"
                    step={5}
                    marks
                    min={10}
                    max={90}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Variant A: {100 - distributionValue}%, Variant B: {distributionValue}%
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12} md={6}>
                <TextField
                  id="start-date"
                  label="Start Date"
                  type="date"
                  fullWidth
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="end-date"
                  label="End Date"
                  type="date"
                  fullWidth
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Alert severity="info">
                  Statistical significance usually requires at least 1,000 participants per variant and a minimum of 2 weeks runtime.
                </Alert>
              </Grid>
            </Grid>
          </Box>
        );
      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Review Your A/B Test
            </Typography>
            <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Test Information
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Test Name" secondary={testName} />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Test Type" 
                    secondary={testTypes.find(t => t.id === selectedTestType)?.label || selectedTestType} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Goal Metric" secondary={goalMetric} />
                </ListItem>
              </List>
              <Divider />
              <Typography variant="subtitle1" sx={{ mt: 2 }} gutterBottom>
                Variants
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="subtitle2">Variant A: {variantAName}</Typography>
                    <Typography variant="body2" sx={{ mt: 1, whiteSpace: 'pre-wrap' }}>
                      {variantAContent}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="subtitle2">Variant B: {variantBName}</Typography>
                    <Typography variant="body2" sx={{ mt: 1, whiteSpace: 'pre-wrap' }}>
                      {variantBContent}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" gutterBottom>
                Distribution & Schedule
              </Typography>
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Distribution Method" 
                    secondary={distributionTypes.find(t => t.id === distributionType)?.label || distributionType} 
                  />
                </ListItem>
                {distributionType === 'percentage' && (
                  <ListItem>
                    <ListItemText 
                      primary="Distribution Split" 
                      secondary={`A: ${100 - distributionValue}%, B: ${distributionValue}%`} 
                    />
                  </ListItem>
                )}
                <ListItem>
                  <ListItemText 
                    primary="Duration" 
                    secondary={`${startDate} to ${endDate}`} 
                  />
                </ListItem>
              </List>
            </Paper>
            <Alert severity="warning" sx={{ mb: 2 }}>
              Once a test is created, you can modify the end date, but cannot change the variants or distribution.
            </Alert>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        A/B Testing Configuration
      </Typography>
      
      {/* Active Tests */}
      <Card sx={{ mb: 4 }}>
        <CardHeader title="Active Tests" />
        <CardContent>
          <Grid container spacing={2}>
            {activeTests.map((test) => (
              <Grid item xs={12} sm={6} md={4} key={test.id}>
                <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                    <Typography variant="h6" noWrap>{test.name}</Typography>
                    <Chip 
                      size="small" 
                      label={test.status} 
                      color={test.status === 'running' ? 'success' : 'primary'} 
                    />
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    Type: {testTypes.find(t => t.id === test.type)?.label || test.type}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Started: {test.startDate}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Participants: {test.participants}
                  </Typography>
                  
                  {test.status === 'running' && test.participants > 0 && (
                    <>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Conversion Rates:
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                        <Chip 
                          size="small" 
                          label={`A: ${test.conversions.variantA}%`} 
                          variant="outlined"
                        />
                        <Chip 
                          size="small" 
                          label={`B: ${test.conversions.variantB}%`} 
                          variant="outlined"
                          color={Number(test.conversions.variantB) > Number(test.conversions.variantA) ? 'success' : 'default'}
                        />
                      </Stack>
                    </>
                  )}
                  
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button size="small" variant="outlined">View Details</Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
      
      {/* Create New Test */}
      <Card>
        <CardHeader title="Create New A/B Test" />
        <CardContent>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          <Box sx={{ mt: 2, mb: 2 }}>
            {getStepContent(activeStep)}
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {activeStep > 0 && (
              <Button onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
            )}
            
            {activeStep < steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={
                  (activeStep === 0 && (!testName || !selectedTestType)) ||
                  (activeStep === 1 && (!variantAName || !variantBName || !variantAContent || !variantBContent)) ||
                  (activeStep === 2 && (!startDate || !endDate))
                }
              >
                Next
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Create Test
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default ABTestingConfig
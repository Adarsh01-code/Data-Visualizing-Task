// Importing necessary React and Chakra UI components, as well as ECharts for React.
import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react'; // ECharts wrapper for React to create dynamic and interactive charts.
import { Menu, MenuButton, MenuList, MenuItem, Button, Box } from '@chakra-ui/react'; // Chakra UI components for UI design.
import { ChevronDownIcon } from '@chakra-ui/icons'; // Chakra UI icon for visual enhancement.
import wineData from '../data/WineData.json'; // Importing the dataset used for the visualizations.


// DataSelector component for selecting different data metrics from the wine dataset.It dynamically lists down all possible metrics from the dataset for selection.
const DataSelector: React.FC<{
  label: string; // Display label for the button.
  onSelect: (value: string) => void; // Callback function to handle selection.
}> = ({ label, onSelect }) => {
  const dataKeys = Object.keys(wineData[0]); // Extracting keys (metrics) from the dataset for the menu items.
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}
        bg="gray.100" 
        color="gray.800" 
        _hover={{ bg: "gray.200" }} // Styling for the dropdown button.
      >
        {label} 
      </MenuButton>
      <MenuList>
        {dataKeys.map((key) => (
          <MenuItem key={key} onClick={() => onSelect(key)}>
            {key} 
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

// BarChart component that displays the minimum value of a selected metric for each alcohol category.
export const BarChart: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState('Magnesium'); // State for tracking the currently selected metric.

  // Calculating the minimum value for the selected metric across all alcohol categories.
  const metricByAlcohol: Record<number, number> = {};
  wineData.forEach((data: any) => {
    const alcoholCategory = data.Alcohol;
    let metric = data[selectedMetric];
    metric = typeof metric === 'string' ? parseFloat(metric) : metric; // Parsing metric values if they are stored as strings.
    if (!isNaN(metric) && (metricByAlcohol[alcoholCategory] === undefined || metric < metricByAlcohol[alcoholCategory])) {
      metricByAlcohol[alcoholCategory] = metric; // Storing the minimum value for each alcohol category.
    }
  });

  const getRandomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16); // Function to generate random colors for bars.

  // Chart configuration object for ECharts.
  const option = {
    title: {
      text: `${selectedMetric === 'Magnesium' ? 'Minimum ' : ''}${selectedMetric} by Alcohol Category`, // Dynamic title based on selected metric.
    },
    tooltip: {}, // Enabling default tooltip for hover information.
    xAxis: {
      name: 'Alcohol Category', // X-axis label.
      type: 'category', // Type of the axis.
      data: Object.keys(metricByAlcohol).map(Number), // Categories derived from alcohol data.
    },
    yAxis: {
      name: `Min ${selectedMetric}`, // Y-axis label, dynamically updated.
      type: 'value', // Type of the axis.
    },
    series: [
      {
        type: 'bar', // Specifying chart type as bar chart.
        data: Object.values(metricByAlcohol).map(value => ({
          value,
          itemStyle: {
            color: getRandomColor(), // Applying random color to each bar.
          },
        })),
      },
    ],
  };

  return (
    <Box p="4" rounded="md" className='bg-white'>
      <Box display="flex" justifyContent="center" mb="6">
        <DataSelector label="Select Metric" onSelect={setSelectedMetric} /> 
      </Box>
      <ReactECharts option={option} /> 
    </Box>
  );
};

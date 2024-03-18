import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react'; // Importing ECharts for React for data visualization.
import { Menu, MenuButton, MenuList, MenuItem, Button, Box } from '@chakra-ui/react'; // Importing components from Chakra UI for UI design.
import { ChevronDownIcon } from '@chakra-ui/icons'; 
import wineData from '../data/WineData.json'; // Importing the dataset.

// LineChart component that visualizes the relationship between two selected metrics from the wine dataset.
const LineChart: React.FC = () => {
  // State hooks for the X and Y axis metrics.
  const [xAxis, setXAxis] = useState('Flavanoids');
  const [yAxis, setYAxis] = useState('Ash');

  // Function to generate a random color for the line chart.
  const getRandomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16);

  // Chart configuration object.
  const option = {
    xAxis: {
      type: 'category',
      data: wineData.map((item:any) => item[xAxis]),
      name: xAxis, // Label for the X axis based on selected metric.
    },
    yAxis: {
      type: 'value',
      name: yAxis, // Label for the Y axis based on selected metric.
    },
    series: [{
      data: wineData.map((item:any) => item[yAxis]),
      type: 'line',
      itemStyle: {
        color: getRandomColor(), // Applying the random color to the line chart.
      },
    }],
    tooltip: {
      trigger: 'axis', // Show tooltip for items when hovering over the chart.
    },
  };

  // Function to truncate text if it's longer than a specified length.
  function truncate(text:string, maxLength:number):string {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }

  return (
    <div>
      <Box display="flex" justifyContent="space-between" mb="4">
        {/* Data selectors for X and Y axes allowing dynamic selection of metrics to be visualized. */}
        <DataSelector label={`X-Axis: ${truncate(xAxis, 4)}`} onSelect={setXAxis} />
        <DataSelector label={`Y-Axis: ${truncate(yAxis, 4)}`} onSelect={setYAxis} />
      </Box>
      <ReactECharts option={option} /> {/* Rendering the ECharts line chart with the configured options. */}
    </div>
  );
};

// Component for selecting data metrics for visualization. Provides a dropdown menu of available metrics in the dataset.
const DataSelector: React.FC<{ label: string; onSelect: (value: string) => void }> = ({ label, onSelect }) => {

  // Extracting keys from the dataset to populate the selection menu.
  const dataKeys = Object.keys(wineData[0]);
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />} 
        bg="gray.100" 
        color="gray.800" 
        _hover={{ bg: "gray.200" }} // Button styling.
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

export { LineChart };

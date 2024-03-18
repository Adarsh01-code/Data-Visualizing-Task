import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { Menu, MenuButton, MenuList, MenuItem, Button, Box } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import wineData from '../data/WineData.json';

const DataSelector: React.FC<{
  label: string;
  onSelect: (value: string) => void;
}> = ({ label, onSelect }) => {
  const dataKeys = Object.keys(wineData[0]);
  return (
    <Menu >
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />} 
      bg="gray.100" 
      color="gray.800" 
      _hover={{ bg: "gray.200" }} 
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

export const BarChart: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState('Magnesium');

  // Dynamic metric calculation
  const metricByAlcohol: Record<number, number> = {};
  wineData.forEach((data: any) => {
    const alcoholCategory = data.Alcohol;
    let metric = data[selectedMetric];
    metric = typeof metric === 'string' ? parseFloat(metric) : metric;
    if (!isNaN(metric) && (metricByAlcohol[alcoholCategory] === undefined || metric < metricByAlcohol[alcoholCategory])) {
      metricByAlcohol[alcoholCategory] = metric;
    }
  });

  const getRandomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16);

  const option = {
    title: {
    //   text: `Min ${selectedMetric} by Alcohol Category`,
    text: `${selectedMetric === 'Magnesium' ? 'Minimum ' : ''}${selectedMetric} by Alcohol Category`,
    },
    tooltip: {},
    xAxis: {
      name: 'Alcohol Category',
      type: 'category',
      data: Object.keys(metricByAlcohol).map(Number),
    },
    yAxis: {
      name: `Min ${selectedMetric}`,
      type: 'value',
    },
    series: [
      {
        type: 'bar',
        data: Object.values(metricByAlcohol).map(value => ({
          value,
          itemStyle: {
            color: getRandomColor(),
          },
        })),
      },
    ],
  };

  return (
    <Box p="4"  rounded="md" className='bg-white'>
      <Box display="flex" justifyContent="center" mb="6">
        <DataSelector label="Select Metric" onSelect={setSelectedMetric} />
      </Box>
      <ReactECharts option={option} />
    </Box>
  );
};


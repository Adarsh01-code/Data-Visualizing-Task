
import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { Menu, MenuButton, MenuList, MenuItem, Button, Box } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import wineData from '../data/WineData.json';


const LineChart: React.FC = () => {
     const [xAxis, setXAxis] = useState('Flavanoids');
     const [yAxis, setYAxis] = useState('Ash');
  
  const getRandomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16);

  const option = {
    xAxis: {
      type: 'category',
      data: wineData.map((item:any) => item[xAxis]),
      name: xAxis,
    },
    yAxis: {
      type: 'value',
      name: yAxis,
    },
    series: [{
      data: wineData.map((item:any)=> item[yAxis]),
      type: 'line',
      itemStyle: {
        color: getRandomColor(),
      },
    }],
    tooltip: {
      trigger: 'axis',
    },
  };

  function truncate(text:string, maxLength:number):string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    } else {
      return text;
    }
  }

  return (
    <div>
    <Box display="flex" justifyContent="space-between" mb="4">
      <DataSelector label={`X-Axis: ${truncate(xAxis, 4)}`} onSelect={setXAxis} />
      <DataSelector label={`Y-Axis: ${truncate(yAxis, 4)}`} onSelect={setYAxis} />
    </Box>
    <ReactECharts option={option} />
  </div>
  );
};

const DataSelector: React.FC<{ label: string; onSelect: (value: string) => void }> = ({ label, onSelect }) => {
  const dataKeys = Object.keys(wineData[0]);
  return (
    <Menu>
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

export { LineChart };

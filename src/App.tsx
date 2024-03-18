import React from 'react';
import './App.css';
import {LineChart} from './components/LineChart';
import {BarChart} from './components/BarChart';
import { Box } from '@chakra-ui/react';
import './App.css';

const App: React.FC = () => {
  return (
    
    <div className="p-5 bg-gray-100 flex flex-col items-center mx-auto max-w-full grainy">
      <h1 className="text-3xl font-bold my-8">Data Visualizer</h1>
      <Box className="h-full w-full max-w-7xl bg-white shadow-lg rounded-lg p-5 mb-10 sm:p-4 sm:mb-8">
        <h2 className="text-xl font-bold mb-5">Line Chart</h2>
        <LineChart />
      </Box>

      <Box className="h-full w-full max-w-7xl bg-white shadow-lg rounded-lg p-5 sm:p-4">
        <h2 className="text-xl font-bold mb-5">Bar Chart</h2>
        <BarChart />
      </Box>
    </div>
  );
};

export default App;



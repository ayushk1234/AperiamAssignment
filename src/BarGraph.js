import { Bar } from 'react-chartjs-2';
// import React from 'react';s
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const BarGraph = ({arr}) => {
  // Chart.register(CategoryScale);
  // Sample data (replace this with your actual data)
  console.log(arr)



  const data = {
    labels: Array.from({ length: 20 }, (_, i) => ` ${arr[i]['Mut Res']}`),
    datasets: [
      {
        label: 'Probability',
        data: Array.from({ length: 20 }, (_,i) => arr[i]['Prob_Mut']), // Replace with your actual probabilities
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Entries',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Probability',
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
  // return <div>hi</div>;
};

export default BarGraph;

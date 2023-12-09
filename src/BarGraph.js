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
  console.log((arr))
  const wtRes = arr?arr[0]['WT Res']:""
  const resNo = arr?arr[0]['Res_No']:""
//   console.log(wtRes)



  const data = {
    labels: Array.from({ length: 20 }, (_, i) => ` ${arr[i]['Mut Res']}`),
    datasets: [
      {
        label:  ` ${'Mutation Probability Chart for ' + wtRes + ' at Residue No. ' + resNo }`,
        data: Array.from({ length: 20 }, (_,i) => arr[i]['Prob_Mut']), // Replace with your actual probabilities
        // backgroundColor: if(true){ return ('rgba(75,192,192,0.6)')},
        backgroundColor: (context) => {
            // Customize colors based on conditions
            const value = context.dataset.data[context.dataIndex];
            // const findMtRes =  && (arr['WT Res']==arr[i]['Mut Res'])
            // console.log(context.dataset.data[context.dataIndex]);
            return value > 0.5 ? 'rgba(99, 255, 132, 0.6)' : 'rgba(54, 162, 235, 0.6)';
          },
        borderColor: 'rgba(75,192,192,1)',
        hoverBorderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
        datalabels: {
          color: 'black',
          align: 'end',
          anchor: 'end',
          display: 'auto',
          formatter: (value, context) => {
            //   console.log(value,context)
            return value; // Display the actual value on the bar
          },
        },
      },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Mutation Residue',
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

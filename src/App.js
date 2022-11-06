import data from './data/companydata.json';
import {DateTime} from 'luxon';
import 'chartjs-adapter-luxon';
import {Chart} from 'chart.js/auto'
import {Line} from 'react-chartjs-2';


function convertToLuxonDate(dataObj){
  return {...dataObj, time: DateTime.fromISO(dataObj.time)}
}

function App() {

  const options = {
    scales:{
        x:{
            type: 'time'
        },
    },
    elements:{
      point:{
          radius: 0
      }
    }
  };

  const graphData = {
    datasets: [
      {
        label: "Annual revenues",
        data: data.revenues.map(d => convertToLuxonDate(d)),
        backgroundColor: ['#00000'],
        borderColor: '#000000',
        borderWidth: 2,
        parsing:{
          xAxisKey: 'time',
          yAxisKey: 'revenue'
        }
      },
      {
        label: "Investments",
        data: data.investments.map(d => convertToLuxonDate(d)),
        backgroundColor: ['#e49917'],
        borderColor: '#e49917',
        borderWidth: 2,
        parsing:{
          xAxisKey: 'time',
          yAxisKey: 'expenses'
        }
      }
    ],
  }

  return (
     <div style={{ width: '50%'}}>
            <Line options={options} data={graphData}/>
        </div>
  );
}

export default App;

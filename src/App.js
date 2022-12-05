import data from './data/companydata.json';
import {DateTime} from 'luxon';
import 'chartjs-adapter-luxon';
import {Chart} from 'chart.js/auto'
import {Line} from 'react-chartjs-2';
import { useEffect, useState } from 'react';


function convertToLuxonDate(dataObj){
  return {...dataObj, time: dataObj.time}
}

function App() {

  //const [data, setData] = useState([]);

  // useEffect(()=>{
  //   axios.get("")
  //   then( resp => setData(resp.data) )
  // },[]);

  const options = {
    scales:{
        x:{
            type: 'time'
        },
    }
  };

  const graphData = {
    datasets: [
      {
        label: "Annual revenues",
        data: data,
        backgroundColor: ['#00000'],
        borderColor: '#000000',
        borderWidth: 2,
        parsing:{
          xAxisKey: 'time',
          yAxisKey: 'global'
        }
      },
      {
        label: "Investments",
        data: data.investments,
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
      <div>
          <div style={{ width: '1000px'}}>
              <Line options={options} data={graphData}/>
          </div>
          <input type={'range'} value={0} onChange={x => console.log(x)}></input>
      </div>
             
  );
}

function MyChart({options,data}){

  const [zoom, setZoom] = useState(1000);

  const zooming = (e)=>{
    setZoom(x => x+(e.deltaY/5));
  }

  const style = {
    postion: 'fixed',
    width: zoom+'px'
  }
  
  return(
          <div style={style} onWheel={zooming}>
              <Line options={options} data={data}/>
          </div>
  );
}

export default App;

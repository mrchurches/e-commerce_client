import React from 'react'
import { useMemo } from 'react';

import { Bar } from 'react-chartjs-2'

// import { Chart, registerables } from 'chart.js';
// Chart.register(...registerables)


const scores = ["10553", "9200", "8100", "7500", "12600", "9384"]
const labels = ["January", "february", "March", "April", "May", "Jun"]

const options = {
    fill:true,
    responsive: false,
}

export default function BarChart() {
    const data = useMemo(function() {
        return {
            datasets: [
                {
                    label: "Monthly sales",
                    data: scores,
                    transition: 1,
                    backgroundColor: ['rgb(60, 99, 34)', 'rgb(60, 99, 34)', 'rgb(60, 99, 34)', 'rgb(178, 3, 8)', 'rgb(60, 99, 34)', 'rgb(60, 99, 34)'],  
                    tension: 0.3
                    
                },
            ],
            labels,
        }
    }, [])
   
    return  <div class='mt-2'> 
            
    <Bar data={data} options={options}/>

</div>
};
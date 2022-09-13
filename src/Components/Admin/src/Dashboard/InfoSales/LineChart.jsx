import React from 'react'
import { useMemo } from 'react';

import { Line } from 'react-chartjs-2'

// import { Chart, registerables } from 'chart.js';
// Chart.register(...registerables)


const scores = ["10", "20", "45", "3", "80"]
const labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Frinday"]

const options = {
    fill:true,
    responsive: false,
}

export default function LineChart() {
    const data = useMemo(function() {
        return {
            datasets: [
                {
                    label: "Weekly Users",
                    data: scores,
                    transition: 1,
                    tension: 0.3,
                    borderColor: "#223852",
                    pointBackgroundColor: "#223852",
                    
                },
            ],
            labels,
        }
    }, [])
   
    return  <div class='mt-2'> 
            
    <Line data={data} options={options}/>

</div>
};
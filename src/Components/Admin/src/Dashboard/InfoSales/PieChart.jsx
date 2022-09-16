import React from 'react'
import { useMemo } from 'react';

import { Pie } from 'react-chartjs-2'

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables)

const scores = ["19522", "1029", "93943", "93483", "93284", "9384"]
const labels = ["PC", "Xbox", "Ps5", "Linux", "MacOS", "Others"]

const options = {
    fill:true,
    responsive: false,
}

export default function PieChart() {
    const data = useMemo(function() {
        return {
            datasets: [
                {
                    label: "Monthly sales",
                    data: scores,
                    transition: 1,
                    tension: 0.3,
                    border: 'none',
                    backgroundColor: ['rgb(239, 165, 165)','rgb(192, 239, 182)', 'rgb(198, 155, 247)', '#FFEC00', 'rgb(145, 210, 247)', '#FD3401'],
                 
                },
            ],
            labels,
        }
    }, [])
   
    return  <div class='mt-4'> 
            
    <Pie data={data} options={options}/>

</div>
};
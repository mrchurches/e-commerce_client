import React from 'react'
import { useMemo } from 'react';

import { Line } from 'react-chartjs-2'

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables)


const scores = ["195", "1029", "93943", "93483", "93284", "9384"]
const labels = ["January", "Febrary", "March", "April", "May", "Jun"]

const options = {
    responsive: false,
}

export default function LineChart() {
    const data = useMemo(function() {
        return {
            datasets: [
                {
                    label: "Monthly sales",
                    data: scores,
                    transition: 1,
                    tension: 0.3,             
                },
            ],
            labels,
        }
    }, [])
   
    return <Line data={data} options={options}/>
}

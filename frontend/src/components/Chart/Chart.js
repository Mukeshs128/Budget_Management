import React from "react";
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    Title,
} from "chart.js";

import { Chart } from "react-chartjs-2";
import { useGlobalContext } from "../../context/globalContext";

ChartJs.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    Title
);

function MixedChart() {
    const { incomes, expenses } = useGlobalContext();

    const mixedData = {
        labels: incomes.map((inc, index) => `Transaction ${index + 1}`),
        datasets: [
            {
                type: "bar",
                label: "Income",
                data: incomes.map((income) => income.amount || 0),
                backgroundColor: "rgba(75, 192, 192, 0.5)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
            {
                type: "line",
                label: "Expenses",
                data: expenses.map((expense) => expense.amount || 0),
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                fill: false,
                tension: 0.4, // Smoothness of the line
                borderWidth: 2,
                pointBackgroundColor: "rgba(255, 99, 132, 1)",
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Mixed Chart (Bar and Line)",
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Transactions",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Amount (₹)",
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="chart">
            <Chart type="bar" data={mixedData} options={options} />
        </div>
    );
}

export default MixedChart;

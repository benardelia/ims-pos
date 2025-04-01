import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

const SalesChart = () => {
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], // Months
        datasets: [
            {
                label: "Sales By months",
                data: [500000, 750000, 900000, 650000, 1200000, 1500000], // Sales data
                borderColor: "white",
                backgroundColor: "white",
                borderWidth: 1,
                tension: 0, // Smooth curve effect
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
                text: "Monthly Sales (Tshs)",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => `Tsh ${value.toLocaleString()}`, // Format currency
                },
            },
        },
    };
      return <Line data={data} options={options} className="bg-gray-900 rounded-xl w-1/2 shadow-lg"/>;
};
export default SalesChart
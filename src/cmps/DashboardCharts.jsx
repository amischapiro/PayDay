import { Chart, Bar, Line, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    ArcElement,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    ArcElement,
    PointElement,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);



export function DashboardCharts(statusCount){

    console.log('statusCount:', statusCount);
    
    
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' ,
            },
            title: {
                display: true,
                text: 'Board statistics',
            },
        },
    };
    
    const labels = ['Done','Stuck','Working on it','To do','Ready for review'];    
    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                // data: ,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                // data: labels.map(() => getRandomIntInclusive(1, 1000)),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };
    return <section>
        <h1>charts</h1>
         {/* <div className='dash-top-container'>
                <div className='line-chart'>
                    <Line options={options} data={data} />
                </div> */}
                <div className="bar-chart">
                    <Bar options={options} data={data} />
                </div>
            {/* </div>
            <div className="dash-bottom-container">
                <div className='pie-chart'>
                    <Pie data={pieData} />;
                </div>
                <div className='horizontal-chart'>
                    <Bar options={options} data={data} />
                </div>
            </div> */}
    </section>
}






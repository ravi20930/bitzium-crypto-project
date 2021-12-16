import React from 'react'
import { Line } from 'react-chartjs-2';

function FGIChart(props) {
    const dataD = {
        labels: ['1', '2', '3', '4', '5', '6'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };

    const [data, setData] = React.useState(dataD);
    const [options, setOptions] = React.useState({});
    const [isLoaded] = React.useState(false);

    async function getFGIData(days) {
        fetch(`https://api.alternative.me/fng/?limit=${days}`)
            .then(response => {
                return response.json();
            })
            .then(FGIData => {
                FGIData = FGIData.data;
                console.log(FGIData)

                const labels = [];
                for (var i = 0; i < FGIData.length; i++) {
                    var d = new Date(FGIData[i].timestamp* 1000);
                    var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                    var formattedDate = d.toLocaleString("en-US", dateOptions);
                    var xLabel = FGIData[i].value_classification+"\n"+formattedDate;
                    labels.push(xLabel);
                }

                const yAxisData = [];
                for (var i = 0; i < FGIData.length; i++) {
                    yAxisData.push(FGIData[i].value);
                }

                const data1 = {
                    labels:labels.reverse(),
                    datasets: [
                        {
                            label: 'FGI',
                            data: yAxisData.reverse(),
                            fill: false,
                            backgroundColor: '#5599ffff',
                            borderColor: '#5599ffff',
                        },
                    ],
                };
                setData(data1);

                const options = {
                    scales: {
                        y: {
                            beginAtZero: false
                        },
                        x:{
                            display: false
                        }
                    },
                    elements: {
                        point: {
                            radius: 2
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                };

                setOptions(options);
            }).catch(err => {
                console.log(err);
            });
    }

    React.useEffect(() => {
        getFGIData(props.days);
    }, [props])


    return (
        <div>
            <Line data={data} options={options} />
        </div>
    )
}

export default FGIChart

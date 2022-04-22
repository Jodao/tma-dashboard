import React, { useEffect, useState } from 'react';
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend,
TimeScale,
} from 'chart.js';
import {Chart, getDatasetAtEvent, getElementAtEvent, getElementsAtEvent} from 'react-chartjs-2';
import {Loader, Button, Icon} from 'semantic-ui-react';
import { useRef } from 'react';
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';
import 'chartjs-adapter-date-fns';

function Plot(props){
    
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        TimeScale
    );

    //used to show a loading state on the button that generates a PDF Image from the chart
    const [chartPDFGen,setChartPDFGen] = useState(false);
    
    const chartRef = useRef();

    //raw or metric data points dataset
    let dataSetMetric = {
        //"label" and "data" properties missing from input
        type: "line",
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 1)',
        order: 2,
        pointStyle: "circle",
        radius: 7,
        hoverRadius: 10,
        parsing: {
            xAxisKey: "valueTime",
            yAxisKey: "value"
        }
    }

    //plans dataset
    let dataSetPlans = {
        //"data" property missing from input
        label: 'Adaptation Plans',
        type: "scatter",
        borderColor: 'black',
        backgroundColor: 'white',
        pointStyle: "rectRot",
        radius: 7,
        hoverRadius: 10,
        order: 1,
        parsing: {
            xAxisKey: "valueTime",
            yAxisKey: "value"
        }
    }

    // "datasets" is an array of dataset objects where each object holds its properties and the y and x axis values.  
    const [plotData,setPlotData] = useState(
        {
            datasets: []    
        }
    )

    //function that handles what information is shown on the plot for a point that is hovered by the user
    function plotLabelHandler(tooltipItem){
        let label
        //if datasetIndex is 1, then it is the dataset relative to Plans
        if(tooltipItem.datasetIndex === 1){
            label = "Plan Id: " + tooltipItem.raw.planId
        }
        else{
            //round the value to 3 decimal places
            label = "Value: " + Math.round(tooltipItem.raw.value * 1000) / 1000; 
        }
        
        return label;
    }

    //use this to adapt plot font sizes according to the height of the chart 
    function adaptPlotFontSizes (chartInstance,newSize) {
        let axisLabelFontSize;
        let ticksFontSize;
        if(newSize.height >= 400){
            axisLabelFontSize = 20
            ticksFontSize = 12
        }
        else if(newSize.height >= 300){
            axisLabelFontSize = 18
            ticksFontSize = 11
        }
        else if(newSize.height >= 200){
            axisLabelFontSize = 14 
            ticksFontSize = 9
        }
    
        setPlotOptions((prev) => {
            let newOptions = JSON.parse(JSON.stringify(prev))
            newOptions.scales.y.title.font.size= axisLabelFontSize
            newOptions.scales.x.title.font.size= axisLabelFontSize
            newOptions.scales.x.ticks.font.size = ticksFontSize
            newOptions.scales.y.ticks.font.size = ticksFontSize
            return newOptions
        })
    }

    const [plotOptions,setPlotOptions] = useState(
        {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                    },
                    reverse: true
                },
                /* //In case it is wanted to show a title for the Chart
                title: {
                    display: true,
                    text: 'Chart.js Line Chart',
                },*/
                tooltip: {
                    usePointStyle: true,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    callbacks: {
                        label: plotLabelHandler
                    }
                }
            },
            scales:{
                x: {
                    //this will make values received from api, which are in epoch millisecond, to be converted into the local timezone
                    //and formated into the specified formats
                    type: 'time',
                    parsing: 'false',
                    time: {
                        displayFormats:{
                            second: "dd/MM/yyyy, HH:mm:ss",
                            minute: "dd/MM/yyyy, HH:mm:ss",
                            hour: "dd/MM/yyyy, HH:mm:ss",
                            day: "dd/MM/yyyy, HH:mm:ss",
                            week: "dd/MM/yyyy, HH:mm:ss",
                            month: "dd/MM/yyyy, HH:mm:ss",
                            quarter: "dd/MM/yyyy, HH:mm:ss",
                            year: "dd/MM/yyyy, HH:mm:ss",
                        },
                        minUnit: "second",
                        tooltipFormat:"dd/MM/yyyy, HH:mm:ss",
                    },
                    title: {
                        display: true,
                        text: "TimeStamp (dd/MM/yyyy, HH:mm:ss)",
                        color: '#911',
                        font: {
                            family: 'Times New Roman',
                            weight: 'bold',
                        },
                    },
                    ticks: {
                        maxTicksLimit: 20,
                        font: {
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: props.plotData.ylabel,
                        color: '#191',
                        font: {
                            family: 'Times New Roman',
                            weight: 'bold',
                        },
                    },
                    ticks: {
                        maxTicksLimit: 21,
                        font: {
                        }
                    }
                } 
            },
            onResize: adaptPlotFontSizes
        }
    )

    function chartClickHandler(ev){
        console.log(getDatasetAtEvent(chartRef.current, ev));
        console.log(getElementAtEvent(chartRef.current, ev));
        console.log(getElementsAtEvent(chartRef.current, ev));
    }

    useEffect(() => {
        let datasetsTemp = []
        datasetsTemp.push(
            {
                ...dataSetMetric,
                label: props.plotData.dataSetMetric.label,
                data: props.plotData.dataSetMetric.data
            }
        )
        if(props.plotData.plansData !== undefined){
            datasetsTemp.push(
                {
                    ...dataSetPlans,
                    data: props.plotData.plansData
                }
            )
        }
        setPlotData(
            {
                ...plotData,
                datasets: datasetsTemp
            }
        )
    },[])

    return(
        plotData.datasets.length === 0 ?
            <Loader active inline='centered'> Preparing chart </Loader>
        :    
            <div>
                <Button 
                    floated='right'
                    loading = {chartPDFGen}
                    onClick={ () => {
                        setChartPDFGen(true)
                        let canvasElem = chartRef.current.canvas;
                        //html2canvas used to improve quality. scale of 5 increases resolution in 5x
                        html2canvas(canvasElem, {scale: 3}).then((canvas) => {
                            let imgFile = canvas.toDataURL("image/png", 1);
                            let doc = new jsPDF('landscape',"px",[canvas.width,canvas.height],true,true);
                            doc.addImage(imgFile, "PNG", 0, 0, canvas.width,canvas.height);
                            doc.save('Test.pdf');
                            setChartPDFGen((prevState) => {return !prevState})
                        })
                    }}
                >
                    <Icon name='download' />
                    Download Chart
                </Button>
                <Chart ref={chartRef} onClick={chartClickHandler} options={plotOptions} data={plotData} />
            </div>
    )
}

export default Plot;
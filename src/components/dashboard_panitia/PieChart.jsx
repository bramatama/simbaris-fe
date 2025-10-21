import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { useState,useEffect } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const getResponsiveFontSizes = () => {
    if (window.innerWidth < 768) {
        // Breakpoint 'md' untuk mobile
        return { title: 16, legend: 10 };
    }
    // Ukuran default untuk desktop (md ke atas)
    return { title: 20, legend: 12 };
};

const PieChart = ({ chartData, title }) => {
    const [fontSizes, setFontSizes] = useState(getResponsiveFontSizes());
    useEffect(() => {
        const handleResize = () => {
            setFontSizes(getResponsiveFontSizes());
        };

        window.addEventListener('resize', handleResize);

        // Cleanup function untuk menghapus listener saat komponen di-unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        family: 'sans-serif',
                        size: fontSizes.legend,
                    },
                    usePointStyle: true,
                    pointStyle: 'circle',
                    generateLabels: (chart) => {
                        const { data } = chart;
                        if (data.labels.length && data.datasets.length) {
                            return data.labels.map((label, i) => {
                                const meta = chart.getDatasetMeta(0);
                                const style = meta.controller.getStyle(i);
                                const value = data.datasets[0].data[i];

                                return {
                                    // Teks akan menjadi "Nama Label: Nilai"
                                    text: `${label}: ${value}`,
                                    fillStyle: style.backgroundColor,
                                    strokeStyle: style.borderColor,
                                    lineWidth: style.borderWidth,
                                    hidden: !chart.getDataVisibility(i),
                                    index: i,
                                };
                            });
                        }
                        return [];
                    },
                },
            },
            title: {
                display: true,
                text: title,
                font: {
                    family: 'sans-serif',
                    size: fontSizes.title,
                    weight: 'bold',
                },
                padding: {
                    y: 5,
                },
                color: '#111827 ',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        const total = context.chart.getDatasetMeta(0).total;
                        const percentage =
                            ((value / total) * 100).toFixed(2) + '%';
                        return `${label}: ${value} (${percentage})`;
                    },
                },
            },
        },
    };

    // Data yang akan ditampilkan di chart
    const data = {
        labels: chartData.labels,
        datasets: [
            {
                label: 'Jumlah Pendaftar',
                data: chartData.values,
                backgroundColor: [
                    '#0C305E', // simbaris-primary
                    '#3454D1', // simbaris-secondary
                    '#EA7A2E', // simbaris-accent
                ],
                borderColor: ['#F3F4F6', '#F3F4F6', '#F3F4F6'],
                borderWidth: 5,
                hoverOffset: 8,
            },
        ],
    };

    return <Pie data={data} options={options} />;
};

export default PieChart;

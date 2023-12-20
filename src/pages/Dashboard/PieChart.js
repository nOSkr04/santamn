import React from "react"
import ReactApexChart from "react-apexcharts"
import getChartColorsArray from "components/Common/ChartsDynamicColor"

const PieChart = ({ data }) => {
  const PieApexChartColors = getChartColorsArray(
    '["--bs-success","--bs-primary", "--bs-danger","--bs-info", "--bs-warning"]'
  )

  const series = [data?.payedUser, data?.unpayedUser]
  const options = {
    chart: {
      height: 320,
      type: "pie",
    },
    series: [data?.payedUser, data?.unpayedUser],
    labels: ["Төлсөн", "Төлөөгүй"],
    colors: PieApexChartColors,
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      verticalAlign: "middle",
      floating: false,
      fontSize: "14px",
      offsetX: 0,
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            height: 240,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
  }

  return (
    <ReactApexChart options={options} series={series} type="pie" height="400" />
  )
}

export default PieChart

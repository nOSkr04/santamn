import getChartColorsArray from "components/Common/ChartsDynamicColor"
import React from "react"
import ReactApexChart from "react-apexcharts"

const DashedLine = ({ data, created }) => {
  const dashedLineChartColors = getChartColorsArray(
    '["--bs-success","--bs-primary"]'
  )

  const series = [
    {
      name: "Төлөгдсөн",
      data: data?.countNumbers,
    },
    {
      name: "Үүсгэсэн",
      data: created?.countNumbers,
    },
  ]
  const options = {
    chart: { zoom: { enabled: !1 }, toolbar: { show: !1 } },
    colors: dashedLineChartColors,
    dataLabels: { enabled: !1 },
    stroke: { width: [3, 4], curve: "straight", dashArray: [0, 8] },
    markers: { size: 0, hover: { sizeOffset: 6 } },
    xaxis: {
      categories: data?.dateStrings,
    },
    tooltip: {
      y: [
        {
          title: {
            formatter: function (e) {
              return e
            },
          },
        },
        {
          title: {
            formatter: function (e) {
              return e
            },
          },
        },
      ],
    },
    grid: { borderColor: "#f1f1f1" },
  }

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      height="380"
      className="apex-charts"
    />
  )
}

export default DashedLine

import React from 'react';
import { Group } from '@visx/group';
import { Pie } from '@visx/shape';
import { scaleOrdinal } from '@visx/scale';
import { useTooltip, TooltipWithBounds } from '@visx/tooltip';

// Sample data
const data = [
  { label: 'Sales', value: 750000 },
  { label: 'Expenses', value: 500000 },
];

// Color scale
const colorScale = scaleOrdinal({
  domain: data.map(d => d.label),
  range: ['green', 'orange'],
});

const Doughnut = ({ width = 150, height = 150 }) => {
  const radius = Math.min(width, height) / 2;
  const innerRadius = radius * 0.9;

  const { tooltipData, tooltipLeft, tooltipTop, showTooltip, hideTooltip } = useTooltip();

  return (
    <div className="relative flex justify-center items-center">
      <svg width={width} height={height}>
        <Group top={height / 2} left={width / 2}>
          <Pie
            data={data}
            pieValue={d => d.value}
            outerRadius={radius}
            innerRadius={innerRadius}
            padAngle={0.02}
          >
            {pie =>
              pie.arcs.map(arc => (
                <g

                  onMouseLeave={hideTooltip}
                >
                  <path d={pie.path(arc)} fill={colorScale(arc.data.label)} />
                </g>
              ))
            }
          </Pie>
          <text
            x="0"
            y="0"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-sm font-open font-bold fill-gray-700"
          >
            1,200,000 Tshs
          </text>
        </Group>
      </svg>
      {tooltipData && (
        <TooltipWithBounds left={tooltipLeft} top={tooltipTop}>
          {`${tooltipData.label}: Tsh ${tooltipData.value.toLocaleString()}`}
        </TooltipWithBounds>
      )}
    </div>
  );
};

export default Doughnut;

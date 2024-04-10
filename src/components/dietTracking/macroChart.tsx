import React, { PureComponent } from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface MacroChartProps {
  macros: { name: string; value: number }[];
}

const COLORS = [ '#56AE57', '#FF6961', '#ffed6f'];

export default class MacroChart extends PureComponent<MacroChartProps> {
  render() {
    const { macros } = this.props;

    return (
      <ResponsiveContainer height="100%" width="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            data={macros}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {macros.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

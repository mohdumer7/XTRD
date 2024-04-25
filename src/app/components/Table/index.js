import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import {
  Bar,
  BarChart,
  Brush,
  CartesianGrid,
  Cell,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const actualPayLoad = payload[0].payload;
    return (
      <div className="custom-tooltip bg-white text-black p-4 rounded-lg">
        <p
          className={`label ${
            actualPayLoad.pnl > 0 ? "text-green-600" : "text-red-600"
          }`}
        >{`PnL : ${actualPayLoad.pnl}`}</p>
        <p className="label">{`Leverage : ${actualPayLoad.leverage}`}</p>
        <p
          className={`label ${
            actualPayLoad.positionSide === "LONG"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >{`PositionSide : ${actualPayLoad.positionSide}`}</p>
        <p className="label">{`Instrument : ${actualPayLoad.instrumentId}`}</p>
        <p
          className={`label ${
            actualPayLoad.pnlPercentage > 0 ? "text-green-600" : "text-red-600"
          }`}
        >{`Pnl Percentage : ${actualPayLoad.pnlPercentage}`}</p>
      </div>
    );
  }

  return null;
};

const columns = [
  {
    key: "instrumentId",
    label: "Instrument",
  },
  {
    key: "positionSide",
    label: "Position",
  },
  {
    key: "marginMode",
    label: "Margin Mode",
  },
  {
    key: "leverage",
    label: "Leverage",
  },
  {
    key: "margin",
    label: "Margin",
  },
  {
    key: "openPrice",
    label: "Open price",
  },
  {
    key: "closePrice",
    label: "Close price",
  },
  {
    key: "qty",
    label: "Quantity",
  },
  {
    key: "pnl",
    label: "PnL",
  },
  {
    key: "closeTime",
    label: "Close Time",
  },
];

const TraderTable = ({ rows, isGraph }) => {
  if (!rows) {
    return <></>;
  }
  // const COLORS = rows.map((data) => (data.pnl >= 0 ? "#D0F288" : "#DF826C"));
  const COLORS = ["#D0F288", "#DF826C"];
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}
            L${x + width},${y + height}
            L${x + width},${y}
            L${x},${y}
            Z`;
  };
  const TriangleBar = (props) => {
    const { pnl, x, y, width, height } = props;
    const color = pnl >= 0 ? "#D0F288" : "#DF826C";
    return <path d={getPath(x, y, width, height)} stroke="none" fill={color} />;
  };
  return (
    <>
      {isGraph ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={rows}>
            <XAxis dataKey="closeTime" />
            <YAxis />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "transparent" }}
            />
            <Legend />
            <Brush />

            <Bar dataKey="pnl" shape={TriangleBar} />
            {/* {rows.map((data, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={data.pnl >= 0 ? "#D0F288" : "#DF826C"}
                />
              ))}
            </Bar> */}
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <Table
          aria-label="Example table with dynamic content"
          classNames={{
            base: "max-h-[520px] dark overflow-scroll ",
            table: "min-h-[420px] p-2",
          }}
          isHeaderSticky
          removeWrapper
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={rows}>
            {(item) => (
              <TableRow key={item.posId}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default TraderTable;

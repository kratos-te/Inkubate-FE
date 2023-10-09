"use client";
import React, { useEffect, useState } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { DEMO_CHART } from "@/config";
import Typography from "../Typography";
import Skeleton from "react-loading-skeleton";

const ActivityChart = () => {
  const modifyPathAttributes = () => {
    const pathElements = Array.from(
      document.getElementsByClassName("recharts-rectangle")
    ) as SVGPathElement[];

    if (pathElements.length > 0) {
      for (let pathElement of pathElements) {
        if (pathElement) {
          pathElement.setAttribute("width", "4");
          if (pathElement.getAttribute("d")) {
            pathElement.setAttribute(
              "d",
              (pathElement.getAttribute("d") as unknown as string)
                .replace(/h \d+(\.\d+)?/g, "h 4")
                .replace(/h -\d+(\.\d+)?/g, "h -4")
            );
          }
        }
      }
    }
  };

  useEffect(() => {
    modifyPathAttributes();
    const interval = setInterval(modifyPathAttributes, 500);

    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts 
    };
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1c1c1c] py-2 px-4 rounded-lg border border-[#1c1c1c]">
          <Typography className="font-semibold font-readex text-[14px] !text-secondary">{`2023-${label}`}</Typography>
          <Typography className="font-bold font-readex text-[14px]">{`Price : ETH ${payload[0].value}`}</Typography>
        </div>
      );
    }

    return null;
  };

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  return (
    <>
      {!loading && (
        <div
          className="bg-dark-400 rounded-xl mt-6"
          style={{ 
            opacity: loading ? 0 : 1,
          }}
        >
          <ResponsiveContainer width="100%" height={366}>
            <ComposedChart
              width={500}
              height={400}
              data={DEMO_CHART}
              margin={{
                top: 60,
                right: 40,
                bottom: 40,
                left: 0,
              }}
            >
              <XAxis dataKey="day" scale="band" />
              <YAxis tickMargin={12} mirror={false} minTickGap={10} />
              <Tooltip content={CustomTooltip} />
              {/* <Legend /> */}
              <Bar
                dataKey="value"
                barSize={20}
                fill="#4A4A4A"
                minPointSize={0.01}
                legendType="diamond"
              />
              <CartesianGrid vertical={false} opacity={0.1} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#EA4492"
                strokeWidth={4}
                horizAdvX={1}
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}
      {loading && (
        <div className="mt-6">
          <Skeleton
            width="100%"
            height={366}
            baseColor="#333"
            highlightColor="#444"
          />
        </div>
      )}
    </>
  );
};

export default ActivityChart;

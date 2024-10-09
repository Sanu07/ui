import React from "react";
import { Pie } from "react-chartjs-2";
import { Card } from "react-bootstrap";

const TechnologyUsageChart = ({ conversations }) => {
  const technologyCounts = {};

  conversations.forEach((item) => {
    technologyCounts[item.technology] = (technologyCounts[item.technology] || 0) + 1;
  });

  const data = {
    labels: Object.keys(technologyCounts),
    datasets: [
      {
        data: Object.values(technologyCounts),
        backgroundColor: ["#47d7ac", "#ffcc00", "#ff0000"],
      },
    ],
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Technology Usage</Card.Title>
        <Pie data={data} />
      </Card.Body>
    </Card>
  );
};

export default TechnologyUsageChart;

import React from "react";
import { Bar } from "react-chartjs-2";
import { Card } from "react-bootstrap";

const DifficultyDistributionChart = ({ conversations }) => {
  const difficultyCounts = { Easy: 0, Medium: 0, Hard: 0 };

  conversations.forEach((item) => {
    const difficulty = Number(item.difficulty);
    if (difficulty >= 1 && difficulty <= 2) difficultyCounts.Easy++;
    else if (difficulty >= 3 && difficulty <= 4) difficultyCounts.Medium++;
    else if (difficulty === 5) difficultyCounts.Hard++;
  });

  const data = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [
      {
        label: "Number of Questions",
        data: [difficultyCounts.Easy, difficultyCounts.Medium, difficultyCounts.Hard],
        backgroundColor: ["#47d7ac", "#ffcc00", "#ff0000"],
      },
    ],
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Difficulty Distribution</Card.Title>
        <Bar data={data} />
      </Card.Body>
    </Card>
  );
};

export default DifficultyDistributionChart;

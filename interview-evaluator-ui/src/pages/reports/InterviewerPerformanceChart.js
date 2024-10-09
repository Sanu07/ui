import React from "react";
import { Line } from "react-chartjs-2";
import { Card } from "react-bootstrap";

const InterviewerPerformanceChart = ({ conversations }) => {
  const interviewerPerformance = {}; // Populate this with your evaluation data

  conversations.forEach((item) => {
    const interviewer = item.interviewer; // Assuming 'interviewer' key exists
    const difficulty = Number(item.difficulty);
    interviewerPerformance[interviewer] = (interviewerPerformance[interviewer] || []);
    interviewerPerformance[interviewer].push(difficulty);
  });

  const labels = Object.keys(interviewerPerformance);
  const data = {
    labels: labels,
    datasets: labels.map((label) => ({
      label: label,
      data: interviewerPerformance[label].map((val) => val),
      fill: false,
      borderColor: "#47d7ac",
    })),
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Interviewer Performance</Card.Title>
        <Line data={data} />
      </Card.Body>
    </Card>
  );
};

export default InterviewerPerformanceChart;

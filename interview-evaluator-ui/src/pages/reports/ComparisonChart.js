import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const ComparisonChart = ({ scores, evaluationData }) => {
  // Extract AI scores from evaluationData.analysis.overall
  const aiScores = evaluationData?.analysis?.overall || {};

  // Prepare data for the chart
  const labels = [];
  const aiData = [];
  const interviewerData = [];

  // Loop through scores array to get interviewer scores and match with AI scores
  scores.forEach((scoreObj) => {
    const technology = scoreObj.technology;
    const interviewerScore = scoreObj.score;
    const aiScore = aiScores[technology] || 0; // If AI score doesn't exist, default to 0

    labels.push(technology);
    aiData.push(aiScore);
    interviewerData.push(interviewerScore);
  });

  const data = {
    labels,
    datasets: [
      {
        label: "AI Score",
        backgroundColor: "#47d7ac",
        data: aiData,
      },
      {
        label: "Interviewer Score",
        backgroundColor: "#f39c12",
        data: interviewerData,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "AI vs Interviewer Score Comparison",
      },
    },
  };

  return (
    <div>
      <h5 className="mt-4">AI vs Interviewer Score Comparison</h5>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ComparisonChart;

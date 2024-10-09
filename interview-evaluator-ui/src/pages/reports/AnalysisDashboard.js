import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import DifficultyDistributionChart from "./DifficultyDistributionChart";
import TechnologyUsageChart from "./TechnologyUsageChart";
import InterviewerPerformanceChart from "./InterviewerPerformanceChart";
import interviewData from "../../data/interviewData.json";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const AnalysisDashboard = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    setConversations(interviewData.conversations);
  }, []);

  return (
    <div style={{ margin: "60px" }}>
      <Container>
        <h1 className="mt-4">Analysis Dashboard</h1>
        <Row className="mt-4">
          <Col md={6}>
            <DifficultyDistributionChart conversations={conversations} />
          </Col>
          <Col md={6}>
            <TechnologyUsageChart conversations={conversations} />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <InterviewerPerformanceChart conversations={conversations} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AnalysisDashboard;

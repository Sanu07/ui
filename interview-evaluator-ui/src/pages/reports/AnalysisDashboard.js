import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Badge,
  Table,
  Card,
  ListGroup,
} from "react-bootstrap";
import DifficultyDistributionChart from "./DifficultyDistributionChart";
import TechnologyUsageChart from "./TechnologyUsageChart";
import ComparisonChart from "./ComparisonChart"; // Import the ComparisonChart component
import { Chart, registerables } from "chart.js";
import { useLocation } from "react-router-dom";
import CustomNavbar from "../../components/Navbar";

Chart.register(...registerables);

const AnalysisDashboard = () => {
  const [conversations, setConversations] = useState([]);
  const [scores, setScores] = useState(null); // State to hold scores
  const location = useLocation(); // Access location for passed state

  // Destructure interviewId, interviewer, interviewee, and evaluationData from the state passed via navigation
  const {
    interviewId,
    interviewer,
    interviewee,
    conversations: convos,
    evaluationData,
  } = location.state || {};

  useEffect(() => {
    // Fetch the scores when the component mounts
    const fetchScores = async () => {
      try {
        const params = new URLSearchParams({ interviewId });
        const response = await fetch(
          `http://localhost:8080/interview/scores?${params}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const parsedScores = JSON.parse(data.score);
          setScores(parsedScores); // Store parsed scores in state
          console.log("Scores fetched successfully:", parsedScores);
        } else {
          console.error("Error fetching scores");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchScores();
    setConversations(convos);
  }, [convos, interviewId]);

  return (
    <div style={{ margin: "60px" }}>
      <CustomNavbar />
      <Container>
        <Row className="mb-4">
          <Col>
            <div className="bg-light p-3 rounded shadow-sm">
              <h5>
                <Badge bg="info" className="me-2">
                  Interviewer
                </Badge>
                <span style={{ color: "#47d7ac" }}>{interviewer}</span>
              </h5>
              <h5>
                <Badge bg="warning" className="me-2">
                  Interviewee
                </Badge>
                <span style={{ color: "#47d7ac" }}>{interviewee}</span>
              </h5>
            </div>
          </Col>
        </Row>

        {/* New Section at the Top, Below CustomNavbar */}
        <Row className="mb-4">
          <Col md={6}>
            <Card
              className="p-3"
              style={{ border: `2px solid #47d7ac`, borderRadius: "10px" }}
            >
              <h5 style={{ color: "#47d7ac" }}>
                Interview Complexity: {evaluationData?.analysis?.interviewComplexity}
              </h5>
              <Row>
                <Col>
                  <h6>Positive Feedback:</h6>
                  <ListGroup>
                    {evaluationData?.analysis?.positiveFeedback?.map(
                      (feedback, index) => (
                        <ListGroup.Item key={index}>{feedback}</ListGroup.Item>
                      )
                    )}
                  </ListGroup>
                </Col>
                <Col>
                  <h6>Areas of Improvement:</h6>
                  <ListGroup>
                    {evaluationData?.analysis?.areasOfImprovement?.map((area, index) => (
                      <ListGroup.Item key={index}>{area}</ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="p-3">
              <h5>Marks from Interviewer</h5>
              {scores && (
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th>Technology</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scores.map((score, index) => (
                      <tr key={index}>
                        <td>{score.technology}</td>
                        <td>{score.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card>
          </Col>
        </Row>

        {/* Comparison Chart */}
        <Row className="mt-4">
          <Col>
            <Card className="p-3">
              {scores && evaluationData && (
                <ComparisonChart
                  scores={scores}
                  evaluationData={evaluationData}
                />
              )}
            </Card>
          </Col>
        </Row>
        {/* Display the charts */}
        <Row className="mt-4">
          <Col md={6}>
            <DifficultyDistributionChart conversations={conversations} />
          </Col>
          <Col md={6}>
            <TechnologyUsageChart conversations={conversations} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AnalysisDashboard;

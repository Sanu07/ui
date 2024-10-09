import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  ListGroup,
  Button,
  Card,
  Badge,
} from "react-bootstrap";
import CustomNavbar from "../../components/Navbar";
import interviewData from "../../data/interviewData.json";
import evaluationData from "../../data/evaluation.json";

const EvaluationPage = () => {
  const [conversations, setConversations] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [showDetails, setShowDetails] = useState([]); // State to handle show/hide for each question

  useEffect(() => {
    setConversations(interviewData.conversations);
    setEvaluations(evaluationData.evaluation);
    setShowDetails(Array(interviewData.conversations.length).fill(false)); // Initialize with false (hidden)
  }, []);

  const toggleShowDetails = (index) => {
    const updatedShowDetails = [...showDetails];
    updatedShowDetails[index] = !updatedShowDetails[index]; // Toggle show/hide
    setShowDetails(updatedShowDetails);
  };

  return (
    <div>
      <CustomNavbar />
      <div style={{ margin: "60px" }}>
        <Container>
          <Row className="mb-4">
            <Col>
              <div className="bg-light p-3 rounded shadow-sm">
                <h5>
                  <Badge bg="info" className="me-2">
                    Interviewer
                  </Badge>
                  <span style={{ color: "#47d7ac" }}>
                    {interviewData.Interviewer}
                  </span>
                </h5>
                <h5>
                  <Badge bg="warning" className="me-2">
                    Interviewee
                  </Badge>
                  <span style={{ color: "#47d7ac" }}>
                    {interviewData.Interviewee}
                  </span>
                </h5>
              </div>
            </Col>
          </Row>
        </Container>
        <Container className="mt-5">
          {conversations.map((item, index) => (
            <Card className="p-3 mb-4 shadow-sm" key={index}>
              <Row>
                <Col xs={8} className="text-start">
                  <strong>Question {index + 1}</strong>
                </Col>
                <Col xs={4} className="text-end">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => toggleShowDetails(index)}
                  >
                    {showDetails[index] ? "Hide" : "Show"}
                  </Button>
                </Col>
              </Row>

              {showDetails[index] && (
                <div className="mt-3">
                  <Row>
                    {/* Question and Answer block */}
                    <Col xs={8} className="text-start">
                      <Form.Group>
                        <Form.Label>Question:</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          value={item.question}
                          readOnly
                        />
                      </Form.Group>

                      <Form.Group className="mt-2">
                        <Form.Label>Answer:</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={item.answer}
                          readOnly
                        />
                      </Form.Group>
                    </Col>

                    {/* Marks on the right */}
                    <Col
                      xs={4}
                      className="text-end d-flex align-items-center justify-content-end"
                    >
                      <div
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "50%",
                          backgroundColor: "#f0f0f0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "18px",
                          fontWeight: "bold",
                          border: "2px solid #ccc",
                        }}
                      >
                        {evaluations[index]?.marksObtained || "N/A"}/5
                      </div>
                    </Col>
                  </Row>

                  {/* Feedback Section */}
                  {evaluations[index]?.feedback?.length > 0 && (
                    <div className="mt-3">
                      <h6>Feedback:</h6>
                      <ListGroup>
                        {evaluations[index].feedback.map(
                          (feedbackItem, feedbackIndex) => (
                            <ListGroup.Item
                              key={feedbackIndex}
                              style={{
                                listStyleType: "disc",
                                listStylePosition: "inside",
                                color: "#47d7ac",
                              }}
                            >
                              {feedbackItem}
                            </ListGroup.Item>
                          )
                        )}
                      </ListGroup>
                    </div>
                  )}
                </div>
              )}
            </Card>
          ))}
        </Container>
      </div>
    </div>
  );
};

export default EvaluationPage;

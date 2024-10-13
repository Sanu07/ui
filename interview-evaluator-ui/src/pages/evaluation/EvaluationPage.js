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
import { useNavigate, useLocation } from "react-router-dom";

const EvaluationPage = () => {
  const [conversations, setConversations] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [showDetails, setShowDetails] = useState([]); // State to handle show/hide for each question
  const location = useLocation();
  const navigate = useNavigate();

  const { evaluationData } = location.state || {};
  const { interviewId, interviewer, interviewee, conversations: convos } =
    evaluationData || {};

  useEffect(() => {
    if (evaluationData) {
      setConversations(convos || []);
      setEvaluations(evaluationData.evaluation || []);
      setShowDetails(Array((convos || []).length).fill(false));
    }
  }, [convos, evaluationData]);

  const toggleShowDetails = (index) => {
    const updatedShowDetails = [...showDetails];
    updatedShowDetails[index] = !updatedShowDetails[index];
    setShowDetails(updatedShowDetails);
  };

  const handleNavigateToAnalysis = () => {
    navigate("/analysis", {
      state: {
        interviewId: interviewId,
        interviewer: interviewer,
        interviewee: interviewee,
        conversations: convos,
        evaluationData: evaluationData
      },
    });
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

          {/* Button to navigate to the analysis page */}
          <div className="text-end">
            <Button
              variant="secondary"
              className="mt-4"
              onClick={handleNavigateToAnalysis}
            >
              Go to Analysis Page
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default EvaluationPage;
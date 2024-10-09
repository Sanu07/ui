import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Form,
  Badge,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import CustomNavbar from "../../components/Navbar";
import interviewData from "../../data/interviewData.json";

const QnAPage = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editedDifficulty, setEditedDifficulty] = useState("");
  const [editedTechnology, setEditedTechnology] = useState("");
  const [suggestedQuestion, setSuggestedQuestion] = useState(""); // Track selected suggested question

  useEffect(() => {
    setConversations(interviewData.conversations);
  }, []);

  const handleEdit = (index) => {
    setSelectedQuestion(index);
    setEditedDifficulty(conversations[index].difficulty);
    setEditedTechnology(conversations[index].technology);
    setShowModal(true);
  };

  const handleSave = () => {
    const updatedConversations = [...conversations];
    // If suggested question is selected, update the question
    if (suggestedQuestion) {
      updatedConversations[selectedQuestion].question = suggestedQuestion;
    }
    updatedConversations[selectedQuestion].difficulty = editedDifficulty;
    updatedConversations[selectedQuestion].technology = editedTechnology;
    setConversations(updatedConversations);
    setShowModal(false);
  };

  return (
    <div>
      <CustomNavbar />
      <div style={{ margin: "60px" }}>
        <Container
          fluid
          className="mt-5"
          style={{ minHeight: "100vh", overflowY: "auto" }}
        >
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

          {conversations.map((item, index) => (
            <div key={index} className="mb-4 p-3 border rounded shadow-sm">
              <Row className="align-items-center">
                <Col xs={9} className="text-start">
                  <h4 className="mb-0">{item.question}</h4>
                </Col>
                <Col xs={3} className="text-end">
                  <table style={{ float: "right" }}>
                    <tbody>
                      <tr>
                        <td>
                          <Badge bg="secondary" className="me-2">
                            {item.technology}
                          </Badge>
                        </td>
                        <td>
                          <Badge
                            bg={
                              item.difficulty <= "2"
                                ? "success"
                                : item.difficulty <= "4"
                                ? "warning"
                                : "danger"
                            }
                            className="me-2"
                          >
                            {item.difficulty <= "2"
                              ? "Easy"
                              : item.difficulty <= "4"
                              ? "Medium"
                              : "Hard"}
                          </Badge>
                        </td>
                        <td>
                          <Button
                            variant="outline-custom"
                            onClick={() => handleEdit(index)}
                          >
                            Edit
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Col>
              </Row>
              <Form.Group className="mt-2">
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={item.answer}
                  readOnly
                />
              </Form.Group>
            </div>
          ))}
          <Button variant="primary" className="mt-3">
            Analysis
          </Button>
        </Container>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Suggested Questions */}
            <Form.Group className="mb-3">
              <Form.Label>Suggested Questions</Form.Label>
              <Form.Check
                type="radio"
                label="What is a Circuit Breaker pattern?"
                name="suggestedQuestions"
                value="What is a Circuit Breaker pattern?"
                onChange={(e) => setSuggestedQuestion(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="Explain Kafka and its key features."
                name="suggestedQuestions"
                value="Explain Kafka and its key features."
                onChange={(e) => setSuggestedQuestion(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Difficulty</Form.Label>
              <Form.Control
                as="select"
                value={editedDifficulty}
                onChange={(e) => setEditedDifficulty(e.target.value)}
              >
                <option value="1">1 - Easy (Level 1)</option>
                <option value="2">2 - Easy (Level 2)</option>
                <option value="3">3 - Medium (Level 1)</option>
                <option value="4">4 - Medium (Level 2)</option>
                <option value="5">5 - Hard</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Technology</Form.Label>
              <Form.Control
                as="select"
                value={editedTechnology}
                onChange={(e) => setEditedTechnology(e.target.value)}
              >
                <option value="Circuit Breaker">Circuit Breaker</option>
                <option value="Microservices">Microservices</option>
                <option value="Kafka">Kafka</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default QnAPage;

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
import { useLocation } from "react-router-dom";

const QnAPage = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editedDifficulty, setEditedDifficulty] = useState("");
  const [editedTechnology, setEditedTechnology] = useState("");
  const [suggestedQuestion, setSuggestedQuestion] = useState(""); // Track selected suggested question
  const location = useLocation();
  const [interviewer, setInterviewer] = useState("");
  const [interviewee, setInterviewee] = useState("");
  const [isUpdated, setIsUpdated] = useState([]); // Track if a question has been updated
  // const [suggestedQuestions, setSuggestedQuestions] = useState([]); // Store suggested questions

  useEffect(() => {
    if (location.state && location.state.data) {
      const { interviewer, interviewee, questionsAndAnswers } =
        location.state.data;
      setInterviewer(interviewer);
      setInterviewee(interviewee);

      // Extract QnA data and suggested questions from the response
      const formattedConversations = questionsAndAnswers.map((qna) => {
        return {
          question: qna.question,
          answer: qna.answer,
          difficulty: qna.difficulty,
          technology: qna.technology,
          llmDifficulty: qna.difficulty,
          llmTechnology: qna.technology,
          suggestedQuestions: qna.suggestedQuestions
        };
      });

      // Set the formatted conversations to state
      setConversations(formattedConversations);
      setIsUpdated(new Array(questionsAndAnswers.length).fill(false));
    }
  }, [location.state]);

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

    const updatedStatus = [...isUpdated];
    updatedStatus[selectedQuestion] = true; // Set isUpdated for the selected question
    setIsUpdated(updatedStatus);

    setConversations(updatedConversations);
    setShowModal(false);
  };

  const handleAnalyze = async () => {
    // Map the conversations to create the QuestionAndAnswers structure
    const questionAndAnswers = conversations.map((item, index) => ({
      questionId: item.id, // Assuming each conversation has an id
      question: item.question,
      answer: item.answer, // Include the answer if needed
      selectedTechnology: item.technology,
      selectedDifficulty: item.difficulty,
      llmTechnology: item.llmTechnology, // Assuming llmTechnology is part of qna
      llmDifficulty: item.llmDifficulty, // Assuming llmDifficulty is part of qna
    }));

    // Create the AnalyseRequest object
    const postData = {
      experience: 5, // Assuming a fixed experience value, replace as needed
      questionAndAnswers: questionAndAnswers,
    };

    try {
      const response = await fetch(
        "http://localhost:8080/interview/updateDetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Analysis submitted successfully:", data);
        alert("Analysis submitted successfully!");
      } else {
        console.error("Error submitting analysis");
        alert("Error submitting analysis");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting analysis");
    }
  };

  const getDifficultyLabel = (difficulty) => {
    if (difficulty <= 2) return "Easy";
    if (difficulty <= 4) return "Medium";
    return "Hard";
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
          <Button variant="primary" className="mt-3" onClick={handleAnalyze}>
            Analyze
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
              {conversations[selectedQuestion]?.suggestedQuestions &&
                conversations[selectedQuestion].suggestedQuestions.map(
                  (question, index) => (
                    <Form.Check
                      key={index}
                      type="radio"
                      label={question}
                      name="suggestedQuestions"
                      value={question}
                      onChange={(e) => setSuggestedQuestion(e.target.value)}
                    />
                  )
                )}
            </Form.Group>

            <Form.Group>
              <Form.Label>Difficulty</Form.Label>
              <Form.Control
                as="select"
                value={editedDifficulty}
                onChange={(e) => setEditedDifficulty(e.target.value)}
              >
                {Array.from({ length: 5 }, (_, index) => index + 1).map(
                  (difficulty) => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty} - {getDifficultyLabel(difficulty)}
                    </option>
                  )
                )}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Technology</Form.Label>
              <Form.Control
                as="select"
                value={editedTechnology}
                onChange={(e) => setEditedTechnology(e.target.value)}
              >
                {[
                  "microservice",
                  "java",
                  "springboot",
                  "database",
                  "devops",
                ].map((tech, index) => (
                  <option key={index} value={tech}>
                    {tech}
                  </option>
                ))}
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

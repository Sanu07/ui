import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import CustomNavbar from "../../components/Navbar";

const ComparisonFormPage = () => {
  const [jobDescription, setJobDescription] = useState(""); // Textarea for job description
  const [candidates, setCandidates] = useState([""]);

  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleCandidateChange = (index, value) => {
    const newCandidates = [...candidates];
    newCandidates[index] = value;
    setCandidates(newCandidates);
  };

  const addCandidateField = () => {
    if (candidates.length < 3) {
      setCandidates([...candidates, ""]);
    }
  };

  const removeCandidateField = (index) => {
    const newCandidates = candidates.filter((_, i) => i !== index);
    setCandidates(newCandidates);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!jobDescription) {
      alert("Please enter the job description");
      return;
    }

    const formData = {
      jobDescription,
      candidates,
    };

    try {
      const response = await fetch("http://localhost:8080/interview/compareAndRank", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("API Response:", result);
        alert("Form submitted successfully!");
      } else {
        console.error("Error submitting form:", response.statusText);
        alert("Failed to submit the form.");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="form-background">
      <CustomNavbar />
      <Container className="mt-5 d-flex justify-content-center">
        <div
          className="form-container"
          style={{ width: "100%", maxWidth: "600px" }}
        >
          <h2 className="text-center">Compare and Rank Candidates</h2>
          <Form onSubmit={handleSubmit}>
            {/* Job Description Textarea */}
            <Form.Group controlId="formJobDescription" className="mb-3">
              <Form.Label>Enter Job Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={jobDescription}
                onChange={handleJobDescriptionChange}
                placeholder="Enter the job description here..."
              />
            </Form.Group>

            {/* Dynamic Candidate Inputs */}
            {candidates.map((candidate, index) => (
              <Row key={index} className="mb-3 align-items-center">
                <Col xs={10}>
                  <Form.Control
                    type="text"
                    placeholder={`Candidate ${index + 1} Name`}
                    value={candidate}
                    onChange={(e) =>
                      handleCandidateChange(index, e.target.value)
                    }
                  />
                </Col>
                <Col xs={2}>
                  <Button
                    variant="danger"
                    onClick={() => removeCandidateField(index)}
                    disabled={candidates.length === 1 && index === 0} // Prevent removal if it's the only candidate
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            ))}

            {/* Row for Add Candidate and Submit buttons */}
            <Row className="mb-3">
              <Col xs={6}>
                <Button variant="secondary" onClick={addCandidateField}>
                  Add Candidate
                </Button>
              </Col>
              <Col xs={6}>
                <Button variant="outline-custom" type="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default ComparisonFormPage;

// src/pages/ComparisonFormPage.js
import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import CustomNavbar from "../../components/Navbar";

const ComparisonFormPage = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [candidates, setCandidates] = useState([""]);

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("PDF File:", pdfFile);
    console.log("Candidates:", candidates);
  };

  return (
    <div className="form-background">
      <CustomNavbar />
      <Container className="mt-5 d-flex justify-content-center">
        <div
          className="form-container"
          style={{ width: "100%", maxWidth: "600px" }}
        >
          <h2 className="text-center">Comparison Form</h2>
          <Form onSubmit={handleSubmit}>
            {/* PDF Upload */}
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Job Description PDF</Form.Label>
              <Form.Control
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
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

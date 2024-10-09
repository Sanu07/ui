import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./FormPage.css";
import CustomNavbar from "../../components/Navbar";

const FormPage = () => {
  const [file, setFile] = useState(null);
  const [marksFile, setMarksFile] = useState(null); // State for interviewer marks file
  const [experience, setExperience] = useState("");
  const [genus, setGenus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ file, marksFile, experience, genus }); // Log all values
  };

  return (
    <div className="form-background">
      <CustomNavbar />
      <div className="form-container">
        <h1>Candidate Evaluation Form</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Select Transcript File</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Form.Group>

          <Form.Group controlId="formMarksFile" className="mb-3">
            <Form.Label>Upload Interviewer Marks File</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setMarksFile(e.target.files[0])} // Update state for marks file
            />
          </Form.Group>

          <Form.Group controlId="formExperience" className="mb-3">
            <Form.Label>Years of Experience</Form.Label>
            <Form.Control
              type="number"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="Enter years of experience of the candidate"
            />
          </Form.Group>

          <Form.Group controlId="formGenus" className="mb-3">
            <Form.Label>Genus of the Candidate</Form.Label>
            <Form.Select
              value={genus}
              onChange={(e) => setGenus(e.target.value)}
            >
              <option value="">Select Genus</option>
              <option value="Homo Sapiens">Homo Sapiens</option>
              <option value="Neanderthal">Neanderthal</option>
              <option value="Denisovan">Denisovan</option>
              {/* Add more options as needed */}
            </Form.Select>
          </Form.Group>

          <Button variant="outline-custom" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default FormPage;

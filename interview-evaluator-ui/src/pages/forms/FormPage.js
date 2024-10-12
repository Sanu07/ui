import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./FormPage.css";
import CustomNavbar from "../../components/Navbar";

const FormPage = () => {
  const [file, setFile] = useState(null);
  const [marksFile, setMarksFile] = useState(null); // State for interviewer marks file
  const [experience, setExperience] = useState("");
  const [genus, setGenus] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send files and form data in the request
    const formData = new FormData();
    formData.append("docFile", file); // Appending the docFile
    formData.append("excelFile", marksFile); // Appending the excelFile (marksFile)
    formData.append("experience", experience); // Appending the number (experience as integer)
    formData.append("genus", genus); // Appending the text (genus as string)

    try {
      const response = await fetch("http://localhost:8080/interview/qna", {
        method: "POST",
        body: formData,
        // No need to set Content-Type for multipart requests. The browser will set it automatically.
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);
        navigate("/qna", { state: { data } });
      } else {
        console.error("Error submitting form");
        alert("Error submitting form");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting form");
    }
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
              <option value="java">Java</option>
              <option value="java-fullstack">Java fullstack</option>
              <option value="machine-learning">Machine Learning</option>
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

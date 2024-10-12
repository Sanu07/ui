import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, ListGroup, Card } from "react-bootstrap";
import CustomNavbar from "../../components/Navbar";
import comparisonData from "../../data/comparisonData.json"; // Assuming the file is located here

const ComparisonResultPage = () => {
  const [data, setData] = useState(null);

  // Fetch the JSON data
  useEffect(() => {
    // Simulate fetching the data from a file
    setData(comparisonData);
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <CustomNavbar />
      <Container className="mt-5">
        <div style={{ margin: "70px" }}>
          <Card className="mb-4">
            <Card.Body>
              <h3>Job Analysis</h3>
              <p>
                <strong>Experience Required:</strong>{" "}
                {data.jobAnalysis.experience} years
              </p>
              <p>
                <strong>Job Description:</strong>{" "}
                {data.jobAnalysis.jobDescription}
              </p>
              <p>
                <strong>Mandatory Skills:</strong>
              </p>
              <ListGroup>
                {data.jobAnalysis.mandatorySkills.map((skill, index) => (
                  <ListGroup.Item key={index}>{skill}</ListGroup.Item>
                ))}
              </ListGroup>
              <p className="mt-3">
                <strong>Good-to-Have Skills:</strong>
              </p>
              <ListGroup>
                {data.jobAnalysis.goodToHave.map((skill, index) => (
                  <ListGroup.Item key={index}>{skill}</ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>

          {/* Weightage Table */}
          <Card className="mb-4">
            <Card.Body>
              <h3>Weightage Breakdown</h3>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>Skill</th>
                    <th>Weightage (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(data.jobAnalysis.weightage).map((key, index) => (
                    <tr
                      key={index}
                      style={{
                        backgroundColor: index % 2 === 0 ? "#47d7ac" : "white",
                      }}
                    >
                      <td>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                      <td>{data.jobAnalysis.weightage[key]}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          {/* Results Section */}
          <h3>Candidate Results</h3>
          {data.results.map((result, index) => (
            <Card className="mb-4" key={index}>
              <Card.Body>
                <Row>
                  <Col xs={12} md={4}>
                    <h5>
                      Rank: {result.rank}
                      <br />
                      Name: {result.name}
                    </h5>
                  </Col>
                  <Col xs={12} md={8}>
                    <h6>Weightage Calculation:</h6>
                    <p>{result.weightage.calculation}</p>

                    {result.weightage.explanation.length > 0 && (
                      <>
                        <h6>Explanation:</h6>
                        <ListGroup>
                          {result.weightage.explanation.map(
                            (exp, explanationIndex) => (
                              <ListGroup.Item key={explanationIndex}>
                                {exp}
                              </ListGroup.Item>
                            )
                          )}
                        </ListGroup>
                      </>
                    )}

                    <h6 className="mt-4">Feedback:</h6>
                    <ListGroup>
                      {result.feedback.map((feedback, feedbackIndex) => (
                        <ListGroup.Item key={feedbackIndex}>
                          {feedback}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ComparisonResultPage;

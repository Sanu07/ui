import React from "react";
import { Container, Row, Col, Table, ListGroup, Card, Badge } from "react-bootstrap";
import CustomNavbar from "../../components/Navbar";
import { useLocation } from "react-router-dom"; // Import useLocation

const ComparisonResultPage = () => {
  const location = useLocation();
  const data = location.state?.result; // Access the result passed from the previous page

  if (!data) return <div>Loading...</div>; // Handle case where data is not present

  const renderSkillsInColumns = (skills) => {
    const columns = Math.ceil(skills.length / 3);
    const skillColumns = [];

    for (let i = 0; i < 3; i++) {
      skillColumns.push(skills.slice(i * columns, (i + 1) * columns));
    }

    return (
      <Row>
        {skillColumns.map((column, index) => (
          <Col key={index} xs={12} md={4}>
            <ListGroup>
              {column.map((skill, skillIndex) => (
                <ListGroup.Item key={skillIndex} style={{
                  backgroundColor: skillIndex % 2 === 0 ? "#f8f9fa" : "white"
                }}>
                  {skill}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        ))}
      </Row>
    );
  };

  const renderWeightageBreakdown = () => {
    const weightageEntries = Object.keys(data.jobAnalysis.weightage).map(key => ({
      skill: key.charAt(0).toUpperCase() + key.slice(1),
      weightage: data.jobAnalysis.weightage[key]
    }));

    const columns = Math.ceil(weightageEntries.length / 3);
    const weightageColumns = [];

    for (let i = 0; i < 3; i++) {
      weightageColumns.push(weightageEntries.slice(i * columns, (i + 1) * columns));
    }

    return (
      <Row>
        {weightageColumns.map((column, index) => (
          <Col key={index} xs={12} md={4}>
            <ListGroup>
              {column.map((entry, entryIndex) => (
                <ListGroup.Item key={entryIndex} style={{
                  display: "flex", 
                  justifyContent: "space-between",
                  backgroundColor: entryIndex % 2 === 0 ? "#f8f9fa" : "white"
                }}>
                  <span>{entry.skill}</span>
                  <span>{entry.weightage}%</span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <div>
      <CustomNavbar />
      <Container className="mt-5">
        <div style={{ margin: "70px" }}>
          <Card className="mb-4">
            <Card.Body>
              <h3 style={{ color: "#47d7ac" }}>Job Analysis</h3>
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
              {renderSkillsInColumns(data.jobAnalysis.mandatorySkills)}
              <p className="mt-3">
                <strong>Good-to-Have Skills:</strong>
              </p>
              {renderSkillsInColumns(data.jobAnalysis.goodToHave)}
            </Card.Body>
          </Card>

          {/* Weightage Breakdown in Columns */}
          <Card className="mb-4">
            <Card.Body>
              <h3 style={{ color: "#47d7ac" }}>Weightage Breakdown</h3>
              {renderWeightageBreakdown()}
            </Card.Body>
          </Card>

          {/* Results Section */}
          <h3 style={{ color: "#47d7ac" }}>Candidate Results</h3>
          {data.results.map((result, index) => (
            <Card className="mb-4" key={index}>
              <Card.Body>
                <Row>
                  <Col xs={12} md={4}>
                    <h5>
                      Rank: 
                      {result.rank === 1 && <Badge className="ms-2">Rank 1</Badge>}
                      {result.rank === 2 && <Badge className="ms-2">Rank 2</Badge>}
                      {result.rank === 3 && <Badge className="ms-2">Rank 3</Badge>}
                      <br />
                      Name: {result.name}
                    </h5>
                    <h6>
                      Experience: {result.overall['experience']}
                    </h6>
                    <Table striped bordered>
                      <thead>
                        <tr>
                          <th>Skill</th>
                          <th>Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.overall &&
                        Object.keys(result.overall).length > 0 ? (
                          Object.keys(result.overall).map((key, index) => (
                            <tr
                              key={index}
                              style={{
                                backgroundColor:
                                  index % 2 === 0 ? "#47d7ac" : "white",
                              }}
                            >
                              <td>
                                {key
                                  ? key.charAt(0).toUpperCase() + key.slice(1)
                                  : 0}
                              </td>
                              <td>
                                {result.overall[key] !== null
                                  ? result.overall[key]
                                  : 0}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="2" style={{ textAlign: "center" }}>
                              No Overall Data Available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
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
                    {result.feedback.length > 0 ? (
                      <ListGroup>
                        {result.feedback.map((feedback, feedbackIndex) => (
                          <ListGroup.Item key={feedbackIndex}>
                            {feedback || "No feedback available."}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    ) : (
                      <p>No feedback available.</p>
                    )}
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

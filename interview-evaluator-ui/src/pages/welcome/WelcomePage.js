// src/pages/WelcomePage.js
import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './WelcomePage.css'; // Create a separate CSS file if needed

const WelcomePage = () => {
    return (
        <div className="background">
            <div className="container-welcome">
                <h1>
                    <span className="big-w">
                        W
                    </span>
                    elcome to <b>AI Powered Interview Evaluator App</b>
                </h1>
                <p className="mt-4">
                    "Unlocking potential through unbiased evaluations and intelligent insights."
                </p>
                <Link to="/form">
                    <Button variant="outline-custom" size="lg" className="mt-4">
                        Analyse an Interview
                    </Button>
                </Link>
                <span style={{ marginLeft: "10px" }}></span>
                <Link to="/compare">
                    <Button variant="outline-custom" size="lg" className="mt-4">
                        Rank candidates
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default WelcomePage;

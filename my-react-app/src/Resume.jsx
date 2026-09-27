import React from "react";

export function Header() {
  return (
    <header className="resume-header">
      <h1>Your Name</h1>
      <p>Job Title / Tagline</p>
      <p>email@example.com | (555) 555-5555 | City, State</p>
    </header>
  );
}

export function Summary() {
  return (
    <section className="resume-summary">
      <h2>Summary</h2>
      <p>Brief professional summary goes here.</p>
    </section>
  );
}

export function Experience() {
  return (
    <section className="resume-experience">
      <h2>Experience</h2>
      <ul>
        <li>Job Title — Company Name (Start – End)</li>
      </ul>
    </section>
  );
}

export function Education() {
  return (
    <section className="resume-education">
      <h2>Education</h2>
      <ul>
        <li>Degree — School Name (Year)</li>
      </ul>
    </section>
  );
}

export function Skills() {
  return (
    <section className="resume-skills">
      <h2>Skills</h2>
      <ul>
        <li>Skill One</li>
      </ul>
    </section>
  );
}


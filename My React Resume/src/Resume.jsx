
import React from "react";
 
export function Header() {
  return (
    <header className="resume-header">
      <h1>Andrew Gump</h1>
      <p className="tagline">
        Systems Integrator | Network &amp; Hardware Troubleshooting | Cybersecurity Student
      </p>
      <p className="contact">
        <a href="mailto:andrewgumpwork@gmail.com">andrewgumpwork@gmail.com</a>
        {" | "}
        <a href="tel:+12604339292">(260) 433-9292</a>
        {" | "}
        Fort Wayne, Indiana
      </p>
    </header>
  );
}
 
export function Summary() {
  return (
    <section className="resume-summary">
      <h2>Summary</h2>
      <p>
        Dedicated Systems Integrator specializing in network integration and
        hardware troubleshooting. Successfully managed system upgrades,
        enhancing operational effectiveness and minimizing downtime while
        collaborating with cross-functional teams to ensure seamless technical
        support.
      </p>
    </section>
  );
}
 
export function Experience() {
  return (
    <section className="resume-experience">
      <h2>Experience</h2>
      <div className="job-heading">
        <h3>Military Intelligence Systems Maintainer / Systems Integrator</h3>
        <p className="job-dates">05/2020 – 05/2024</p>
      </div>
      <ul>
        <li>Managed system upgrades and installations, minimizing downtime while adhering to project timelines.</li>
        <li>Enhanced system performance through thorough testing and troubleshooting of software, hardware, and network components, contributing to system reliability.</li>
        <li>Collaborated with cross-functional teams to troubleshoot and resolve technical issues, ensuring minimal disruption to operations.</li>
        <li>Integrated complex systems, improving operational effectiveness and mission readiness.</li>
      </ul>
    </section>
  );
}
 
export function Education() {
  return (
    <section className="resume-education">
      <h2>Education</h2>
      <ul>
        <li>Cybersecurity – Indiana Institute of Technology (Expected May 2028)</li>
        <li>Dean's List (Spring 2026)</li>
      </ul>
    </section>
  );
}
 
export function Skills() {
  return (
    <section className="resume-skills">
      <h2>Skills</h2>
      <ul>
        <li>Network integration</li>
        <li>Hardware troubleshooting</li>
        <li>System upgrades and installations</li>
        <li>Software, hardware, and network testing</li>
        <li>Cross-functional collaboration</li>
        <li>Cybersecurity (in progress)</li>
      </ul>
    </section>
  );
}
 
const styles = `
.resume { max-width: 760px; margin: 0 auto; padding: 40px 24px; font-family: Georgia, "Times New Roman", serif; color: #1c2430; line-height: 1.55; }
.resume h1 { font-size: 2.2rem; margin: 0 0 4px; }
.resume h2 { font-size: 1.1rem; margin: 28px 0 8px; padding-bottom: 4px; border-bottom: 2px solid #1f4e79; color: #1f4e79; }
.resume h3 { font-size: 1rem; margin: 0; }
.resume p { margin: 0 0 6px; }
.resume .tagline { font-size: 1.05rem; color: #3a4658; }
.resume .contact, .resume .job-dates { font-size: 0.9rem; color: #5a6578; }
.resume a { color: inherit; }
.resume ul { margin: 6px 0 0; padding-left: 20px; }
.resume .job-heading { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 4px 16px; align-items: baseline; }
.resume-skills ul { display: flex; flex-wrap: wrap; gap: 6px 24px; list-style: none; padding: 0; }
@media print { .resume { padding: 0; } }
`;
 
export default function Resume() {
  return (
    <main className="resume">
      <style>{styles}</style>
      <Header />
      <Summary />
      <Experience />
      <Education />
      <Skills />
    </main>
  );
}
 

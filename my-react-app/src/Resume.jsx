import React from "react";

export function Header() {
  return (
    <header className="resume-header">
      <h1>Seth Russell</h1>
      <p>Cybersecurity & Systems Administration Specialist</p>
      <p>srussell01@indianatech.edu | Fort Wayne, IN | github.com/TruHav0c</p>
    </header>
  );
}

export function Summary() {
  return (
    <section className="resume-summary">
      <h2>Summary</h2>
      <p>
        Cybersecurity and Computer Science student with hands-on experience in
        SIEM deployment, network topology design, and Linux system administration.
        Proven track record of building automated admin tools and analyzing 
        security events in virtualized environments.
      </p>
    </section>
  );
}

export function Experience() {
  return (
    <section className="resume-experience">
      <h2>Hands-On Projects & Experience</h2>
      <ul>
        <li>
          <strong>Wazuh SIEM Deployment & Monitoring</strong> — VirtualBox / Ubuntu
          <br />
          Configured a Wazuh SIEM server on an Ubuntu VM to ingest and analyze endpoint 
          logs, setup rule alerts, and present security insights.
        </li>
        <li>
          <strong>Cisco Network Topology & Inter-VLAN Routing</strong> — Packet Tracer
          <br />
          Designed multi-VLAN topologies using Switched Virtual Interfaces (SVIs), 
          DHCP pools, and inter-VLAN routing for segregated traffic management.
        </li>
        <li>
          <strong>Automated System Administration Tools</strong> — Rocky Linux
          <br />
          Wrote Bash and Awk scripts to automate user provisioning from CSV files 
          and configured automated log rotation using system cron jobs.
        </li>
      </ul>
    </section>
  );
}

export function Education() {
  return (
    <section className="resume-education">
      <h2>Education</h2>
      <ul>
        <li>
          <strong>B.S. in Cybersecurity / Computer Science</strong> — Indiana Institute of Technology
        </li>
      </ul>
    </section>
  );
}

export function Skills() {
  return (
    <section className="resume-skills">
      <h2>Skills</h2>
      <ul>
        <li><strong>Security & Monitoring:</strong> Wazuh SIEM, Nmap, Vulnerability Scanning</li>
        <li><strong>Networking:</strong> Cisco IOS, VLANs, Inter-VLAN Routing, DHCP, SVIs</li>
        <li><strong>Systems & Scripting:</strong> Linux (Ubuntu, Rocky Linux), Bash, Awk, Git</li>
        <li><strong>Web & Database:</strong> React, JavaScript, HTML/CSS, SQL (3NF Schema Design)</li>
      </ul>
    </section>
  );
}

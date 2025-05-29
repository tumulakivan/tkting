import React from "react";
import styles from "./AboutUs.module.css";
import myPhoto from "../assets/guy1.jpg"; // Update this if needed

const AboutUs: React.FC = () => {
  const name = "Ivan Tumulak";
  const role = "Full Stack Developer";
  const bio =
    "As the sole developer of the Tkting Parking Management System, I handled both frontend and backend development, ensuring the project met performance, usability, and integration goals.";

  const contributions = [
    "Built the fullstack application using React, TailwindCSS, and Spring Boot",
    "Designed and implemented the user interface and component logic",
    "Created the backend API and integrated MySQL using Supabase",
    "Handled authentication, real-time updates, and deployment (Render & Vercel)",
    "Managed source control and GitHub repositories",
  ];

  return (
    <div className={styles.aboutUs}>
      <div className={styles.header}>
        <h1>About the Developer</h1>
        <p className={styles.subtitle}>
          The creator of the Tkting Parking Management System
        </p>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <div className={styles.teamMember}>
            <img src={myPhoto} alt={name} className={styles.memberImage} />
            <div className={styles.memberInfo}>
              <h3 className={styles.memberName}>{name}</h3>
              <p className={styles.memberRole}>{role}</p>
              <p className={styles.memberBio}>{bio}</p>
              <div className={styles.contribution}>
                <h4>Key Contributions</h4>
                <ul>
                  {contributions.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;

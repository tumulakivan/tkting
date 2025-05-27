import React from "react";
import styles from "./AboutUs.module.css";
import guy1 from "../assets/guy1.jpg";
import guy2 from "../assets/guy2.jpg";
import guy3 from "../assets/guy3.jpg";
import guy4 from "../assets/guy4.jpg";

const AboutUs: React.FC = () => {
  const teamMembers = [
    {
      name: "John Earl Mandawe",
      role: "Frontend Lead",
      image: guy3,
      bio: "Passionate about creating intuitive user interfaces and seamless user experiences. Led the frontend development of the parking management system.",
      contributions: [
        "Implemented the real-time parking map interface",
        "Developed the theme system with dark/light mode",
        "Created responsive navigation and layout components",
      ],
    },
    {
      name: "Ivan Tumulak",
      role: "Backend Developer",
      image: guy1,
      bio: "Specializes in building robust and scalable backend systems. Focused on creating efficient data management solutions for the parking system.",
      contributions: [
        "Designed the parking slot management API",
        "Implemented user authentication system",
        "Created real-time slot status updates",
      ],
    },
    {
      name: "Jivonz Dy",
      role: "UI/UX Designer",
      image: guy2,
      bio: "Creative designer with a keen eye for user experience. Transformed complex parking management workflows into intuitive interfaces.",
      contributions: [
        "Designed the modern user interface",
        "Created the visual design system",
        "Developed interactive prototypes",
      ],
    },
    {
      name: "Kent Abadiano",
      role: "Full Stack Developer",
      image: guy4,
      bio: "Full stack developer with expertise in both frontend and backend technologies. Focused on system integration and performance optimization.",
      contributions: [
        "Integrated frontend and backend systems",
        "Implemented real-time updates",
        "Optimized application performance",
      ],
    },
  ];

  return (
    <div className={styles.aboutUs}>
      <div className={styles.header}>
        <h1>Meet Our Team</h1>
        <p className={styles.subtitle}>
          The minds behind Tkting Parking Management System
        </p>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <div className={styles.teamGrid}>
            {teamMembers.map((member, index) => (
              <div key={index} className={styles.teamMember}>
                <img
                  src={member.image}
                  alt={member.name}
                  className={styles.memberImage}
                />
                <div className={styles.memberInfo}>
                  <h3 className={styles.memberName}>{member.name}</h3>
                  <p className={styles.memberRole}>{member.role}</p>
                  <p className={styles.memberBio}>{member.bio}</p>
                  <div className={styles.contribution}>
                    <h4>Key Contributions</h4>
                    <ul>
                      {member.contributions.map((contribution, idx) => (
                        <li key={idx}>{contribution}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;

import React from 'react';
import Sidebar from './Sidebar';
import './About.css';
import '@fortawesome/fontawesome-free/css/all.css';


const About = () => {
  return (
    <div className="about-container">
      <Sidebar />
      <div className="about-content">
        <br/><br/><br/>
        <h2>About Me</h2>
        <div className="paragraph-container">
          <p>
            I am a dedicated developer passionate about creating innovative solutions using the power of React.<br/> 
            My goal is to build high-quality, user-friendly web applications that provide exceptional experiences for users.
          </p>
          <p>
            At the core of my development process is a strong emphasis on efficiency, scalability, and maintainability. <br/>
            I believe in following best practices and utilizing modern technologies to deliver robust and reliable applications.
          </p>
          <p>
            I am well-versed in React and its ecosystem, including Redux, React Router, and other popular libraries and frameworks.<br/>
            I have extensive experience in developing responsive and mobile-friendly applications,<br/>
            ensuring seamless user experiences across different devices.
          </p>
          <p>
            Whether you need a simple single-page application or a complex enterprise-level system, <br/>
            I have the expertise and dedication to deliver exceptional results. <br/>
         </p>
         <div className="social-links">
            <a href="https://github.com/kugeIblitz" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
               GitHub
            </a>
            <br/>
            <a href="https://www.linkedin.com/in/rayen-troudi-99aa63223/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
               LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

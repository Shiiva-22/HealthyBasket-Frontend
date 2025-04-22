import React from "react";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import "./About.css";
import adminprofile from "../../Assets/Images/admin profile.jpg";
import adminprofile2 from "../../Assets/Images/admin profile2.jpg"; // Add new image
import adminprofile3 from "../../Assets/Images/adminprofile3.jpeg"; // Add new image

const About = () => {
  document.title = "About Us";
  return (
    <>
      <Header />

      <div className="about-section-container">
        <h1 className="Heading">
          About <span>Us</span>
        </h1>

        <div className="about-section-box">
        <div className="about-card">
    <img src={adminprofile2} alt="Team Member" />
    <h1>Dev Singh</h1>
    {/* <button onClick={() => window.open("https://ananya-sharma.dev/", "_blank")}>
      Visit Portfolio
    </button> */}
    <p>Passionate about UI/UX design and frontend development. Loves working with React and Tailwind CSS.</p>
  </div>
  <div className="about-card">
    <img src={adminprofile} alt="Founder" />
    <h1>Shiva Singh</h1>
    <button onClick={() => window.open("https://shiva-singh.onrender.com/", "_blank")}>
      Visit Website
    </button>
    <p>This is a Grocery website made by @Shiva Singh. With the purpose of learning MERN Stack.</p>
  </div>

  

  <div className="about-card">
    <img src={adminprofile3} alt="Team Member" />
    <h1>Riti Suryavanshi</h1>
    {/* <button onClick={() => window.open("https://rohit-verma.dev/", "_blank")}>
      Visit Portfolio
    </button> */}
    <p>Fullstack developer enthusiastic about MERN stack. Backend specialist with a love for Node.js.</p>
  </div>
</div>


      </div>

      <Footer />
    </>
  );
};

export default About;

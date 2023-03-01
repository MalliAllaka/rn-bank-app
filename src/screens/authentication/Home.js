import "./home.css";
import bgimage from "./bgimage.jpg";
import screenbg from "./screen-bg.jpg";
import screenbg2 from "./screen-bg-2.jpg";

const HomeWeb = ({ showLogin, setShowLogin }) => {
  return (
    <>
      <div
        class="bgimg w3-display-container w3-text-white"
        style={{
          backgroundImage: `url(${screenbg})`,
          minHeight: "100%",
          backgroundPosition: "center",
          backgroundColor: "#fff",
          backgroundRepeat: "repeat",
          // backgroundSize: "100% 100%",
        }}
      >
        <div
          style={{
            backgroundImage: `url(${bgimage})`,
            minHeight: "100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "75% 85%",
          }}
        >
          <div class="w3-display-topleft w3-container w3-xlarge">
            <p onClick={() => setShowLogin(true)}>
              <button
                class="w3-button w3-white"
                style={{ color: "#000", borderWidth: 0 }}
              >
                Online Banking
              </button>
            </p>
          </div>
          <div class="w3-display-topright w3-container w3-xlarge">
            <p onClick={() => setShowLogin(true)}>
              <button class="w3-button w3-black">Login</button>
            </p>
          </div>
          <div class="w3-display-bottomleft w3-container">
            <p style={{ color: "#000" }}>
              powered by Vsm college of Engineering
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeWeb;

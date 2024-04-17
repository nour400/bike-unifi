const NavBar = () => {
  return (
    <>
      <div
        style={{
          backgroundColor: "#111",
          width: "100%",
          height: "100px",
          display: "flex",
          alignItems: "center",
          padding: "2px 0px",
          justifyContent: "space-around",
        }}
      >
        <img
          style={{ width: "80px" }}
          src="https://bikeindex.org/assets/revised/logo-b5b90b10f3084a33e26097ffff6528ca15766eaeb008c5a6d0e242605ccad3b8.svg"
          alt=""
        />
        <button
          style={{
            background: "transparent",
            border: "none",
            color: "white",
            fontSize: "20px",
          }}
        >
          home
        </button>
      </div>
    </>
  );
};

export default NavBar;

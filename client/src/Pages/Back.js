
import React from "react";


function Back() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((dataS) => setData(dataS.message));
  }, []);

  return (
    <div className="App">
        <p>{!data ? "Loading..." : data}</p>
    </div>
  );
}

export default Back;
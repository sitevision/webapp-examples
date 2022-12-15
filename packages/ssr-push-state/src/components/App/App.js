import * as React from "react";
import PropTypes from "prop-types";
import router from "@sitevision/api/common/router";
import Link from "../Link";

const App = ({ state: initialState }) => {
  const [state, setState] = React.useState(initialState);

  React.useEffect(() => {
    router.on("path:changed", ({ path }) => {
      setState(path);
    });

    return () => router.off("path:changed");
  }, []);

  return (
    <div>
      <h1>currentState: {state}</h1>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </div>
  );
};

App.propTypes = {
  state: PropTypes.string.isRequired,
};

export default App;

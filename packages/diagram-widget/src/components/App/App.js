/*global document, globalThis */
import * as React from "react";
import PropTypes from "prop-types";
import i18n from "@sitevision/api/common/i18n";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

// this is a utility function to fetch the variables from the CSS
function cssvar(name) {
  return globalThis.getComputedStyle(document.body).getPropertyValue(name);
}

const envisionColors = [
  "red",
  "pink",
  "purple",
  "deep-purple",
  "indigo",
  "blue",
  "light-blue",
  "cyan",
  "teal",
  "green",
  "light-green",
  "lime",
  "yellow",
  "orange",
  "brown",
  "gray",
];

const App = ({ contentTypes }) => {
  const labels = Object.keys(contentTypes);
  const values = Object.values(contentTypes);
  const colors = envisionColors.slice(0, labels.length);
  const data = {
    labels,
    datasets: [
      {
        label: i18n.get("noOfObjects"),
        data: values,
        backgroundColor: colors.map((color) =>
          cssvar(`--env-dashboard-color-${color}-20`).trim()
        ),
        borderColor: colors.map((color) =>
          cssvar(`--env-dashboard-color-${color}-50`).trim()
        ),
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className="env-dashboard-widget env-p-around--large">
      <h2 className="env-ui-text-sectionheading">{i18n.get("contentTypes")}</h2>
      <Pie
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: i18n.get("contentTypesByType"),
            },
          },
        }}
      />
    </section>
  );
};

App.propTypes = {
  contentTypes: PropTypes.object,
};

export default App;

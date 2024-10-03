import React from "react";

const Country = ({ country }) => {
  const { name, capital, area, languages, flags } = country;

  return (
    <div>
      <h2>{name.common}</h2>
      <div>
        <p>
          <strong>Capital:</strong>{" "}
          {Array.isArray(capital) ? capital.join(", ") : capital}
        </p>
        <p>
          <strong>Area:</strong> {area} km²
        </p>
      </div>
      <h3>Languages:</h3>
      <ol>
        {Object.entries(languages).map(([code, language]) => (
          <li key={code}>{language}</li>
        ))}
      </ol>
      <img
        src={flags.png}
        alt={`Flag of ${name.common}`}
        style={{ width: "100px" }}
      />
    </div>
  );
};

export { Country };

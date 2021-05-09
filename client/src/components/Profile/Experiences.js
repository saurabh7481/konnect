import React from "react";
import PropTypes from "prop-types";
import {formatDate} from "../../utils/formatDate";

const Experiences = ({
  experience: { company, title, location, current, to, from, description },
}) => {
  return (
    <>
      <h3 className="text-dark">{company}</h3>
      <p>
        {formatDate(from)} - {to ? formatDate(to) : "Now"}
      </p>
      <p>
        <strong>Position: </strong> {title}
      </p>
      <p>
        <strong>Location: </strong> {location}
      </p>
      <p>
        <strong>Description: </strong> {description}
      </p>
    </>
  );
};

Experiences.propTypes = {
  experience: PropTypes.object.isRequired
};

export default Experiences;

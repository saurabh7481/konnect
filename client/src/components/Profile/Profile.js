import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../Layout/Spinner";
import Experiences from "./Experiences";
import Educations from "./Educations";
import GitHubRepos from "./GitHubRepos";
import { getProfileById } from "../../actions/profileActions";

const Profile = ({ getProfileById, profile: { profile }, auth, match }) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <>
      {profile === null ? (
        <Spinner />
      ) : (
        <>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <div class="profile-top bg-primary p-2">
              <img class="round-img my-1" src={profile.user.avatar} alt="" />
              <h1 class="large">{profile.user.name}</h1>
              <p class="lead">
                {profile.status}{" "}
                {profile.company ? <span>{profile.company}</span> : null}
              </p>
              <p>{profile.location ? <span>{profile.location}</span> : null}</p>
              <div class="icons my-1">
                {profile.website ? (
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-globe fa-2x" />
                  </a>
                ) : null}
                {profile.social
                  ? Object.entries(profile.social)
                      .filter(([_, value]) => value)
                      .map(([key, value]) => (
                        <a
                          key={key}
                          href={value}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className={`fab fa-${key} fa-2x`}></i>
                        </a>
                      ))
                  : null}
              </div>
            </div>

            <div class="profile-about bg-light p-2">
              {profile.bio && (
                <>
                  <h2 className="text-primary">
                    {profile.user.name.trim().split(" ")[0]}s Bio
                  </h2>
                  <p>{profile.bio}</p>
                  <div className="line" />
                </>
              )}
              <h2 class="text-primary">Skill Set</h2>
              <div class="skills">
                {profile.skills.map((skill, index) => (
                  <div key={index} className="p-1">
                    <i className="fas fa-check" /> {skill}
                  </div>
                ))}
              </div>
            </div>
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((experience) => (
                    <Experiences key={experience._id} experience={experience} />
                  ))}
                </Fragment>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>

            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((education) => (
                    <Educations key={education._id} education={education} />
                  ))}
                </Fragment>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>
            <div className="profile-github">
              {profile.githubusername && (
                <GitHubRepos username={profile.githubusername} />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);

import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>
        {title ? `${title} - Github (@codelikeagirl29)` : "Github codelikeagirl29"}
      </title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Github - Lindsey",
  description:
    "Github is where people build software.More than 83 million people use GitHub to discover, fork, and contribute to over 200 million projects ",
  keywords: "github, repository, software, projects "
};
export default Meta;

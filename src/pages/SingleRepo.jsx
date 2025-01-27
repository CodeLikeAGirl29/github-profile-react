import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import moment from "moment";
import { BiCodeAlt, BiCode, BiGitBranch, BiTime } from "react-icons/bi";
import { BsTag } from "react-icons/bs";
import { GrClone } from "react-icons/gr";
import { VscIssues } from "react-icons/vsc";
import { GiBackwardTime } from "react-icons/gi";
import { ImHistory } from "react-icons/im";
import { BreadCrumb, Loader, Meta } from "../components";

const token = import.meta.env.VITE_APP_API_TOKEN;

const SingleRepo = () => {
  const { username, repoId } = useParams(); // Dynamic username and repoId
  const [repo, setRepo] = useState({});
  const [langs, setLangs] = useState({});
  const [tags, setTags] = useState([]);
  const [issues, setIssues] = useState([]);
  const [contents, setContents] = useState([]);
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        setLoading(true);

        const [repoRes, langsRes, tagsRes, issuesRes, contentsRes, commitsRes] =
          await Promise.all([
            fetch(`https://api.github.com/repos/${username}/${repoId}`, {
              headers: { Authorization: `token ${token}` },
            }).then((res) => res.json()),
            fetch(
              `https://api.github.com/repos/${username}/${repoId}/languages`,
              {
                headers: { Authorization: `token ${token}` },
              },
            ).then((res) => res.json()),
            fetch(`https://api.github.com/repos/${username}/${repoId}/tags`, {
              headers: { Authorization: `token ${token}` },
            }).then((res) => res.json()),
            fetch(`https://api.github.com/repos/${username}/${repoId}/issues`, {
              headers: { Authorization: `token ${token}` },
            }).then((res) => res.json()),
            fetch(
              `https://api.github.com/repos/${username}/${repoId}/contents`,
              {
                headers: { Authorization: `token ${token}` },
              },
            ).then((res) => res.json()),
            fetch(
              `https://api.github.com/repos/${username}/${repoId}/commits`,
              {
                headers: { Authorization: `token ${token}` },
              },
            ).then((res) => res.json()),
          ]);

        setRepo(repoRes);
        setLangs(langsRes);
        setTags(tagsRes);
        setIssues(issuesRes);
        setContents(contentsRes);
        setCommits(commitsRes);
      } catch (error) {
        console.error("Error fetching repository data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepoData();
  }, [username, repoId]);

  const {
    name,
    description,
    default_branch,
    clone_url,
    visibility,
    created_at,
    updated_at,
  } = repo;

  const latestCommit = commits[0]?.commit;

  return (
    <>
      <Meta title={name || "Repository"} />
      {loading ? (
        <Loader text="Loading Repository Details..." />
      ) : (
        <Container>
          <BreadCrumb repoName={name} />
          <Wrapper>
            <Content>
              <h3>Repository Name: {name}</h3>
              <p>{description || "No description available"}</p>

              <div className="langs">
                <BiCode />
                {Object.keys(langs).map((lang, i) => (
                  <span key={i}>{lang}</span>
                ))}
                <BiCodeAlt />
              </div>

              <div className="details">
                <span>
                  <BiGitBranch /> {default_branch} branch
                </span>
                <span>
                  <BsTag /> {tags.length || 0} tags
                </span>
                <span>
                  <VscIssues /> {issues.length || 0} issues
                </span>
              </div>

              <div className="clone">
                <a href={clone_url} target="_blank" rel="noreferrer">
                  <GrClone /> Clone Repository
                </a>
                <span className="visibility">{visibility}</span>
              </div>

              <div className="time">
                <span>Created: {moment(created_at).fromNow()}</span>
                <ImHistory />
                <span>Updated: {moment(updated_at).fromNow()}</span>
              </div>
            </Content>

            <Details>
              <div className="header">
                <span className="author">
                  Last Commit by: {latestCommit?.committer?.name || "Unknown"}
                </span>
                <span>
                  {latestCommit?.message
                    ? latestCommit.message.length < 30
                      ? latestCommit.message
                      : `${latestCommit.message.substring(0, 30)}...`
                    : "No commit message"}
                </span>
                <span>
                  <GiBackwardTime /> {commits.length || 0} commits
                </span>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>File Name</th>
                    <th>File Size (kB)</th>
                  </tr>
                </thead>
                <tbody>
                  {contents.map((item, i) => (
                    <tr key={i}>
                      <td>
                        <a
                          href={item.html_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {item.name}
                        </a>
                      </td>
                      <td className="size">{item.size}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Details>
          </Wrapper>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  min-height: 80vh;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  margin: 1rem;
  border-radius: 10px;
`;

const Content = styled.div`
  width: 50%;
  padding: 1rem;
  margin: 1rem;
  border-radius: 10px;
  background: #f9f9f9;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  h3 {
    margin-bottom: 1rem;
  }
  .langs {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
  }
  .details,
  .clone,
  .time {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
  }
`;

const Details = styled.div`
  width: 50%;
  padding: 1rem;
  margin: 1rem;
  border-radius: 10px;
  background: #f9f9f9;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  table {
    width: 100%;
    margin-top: 1rem;
    border-collapse: collapse;
    th,
    td {
      padding: 0.5rem;
      border: 1px solid #ddd;
    }
  }
`;

export default SingleRepo;

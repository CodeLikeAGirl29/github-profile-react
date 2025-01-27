import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaGithub, FaTwitter, FaLinkedin, FaDiscord } from "react-icons/fa";
import { useApiFetch } from "../hooks/useApiFetch";
import { useProfileFetch } from "../hooks/useProfileFetch";
import { Card, Grid, Loader } from "../components";
import { Link, useParams } from "react-router-dom";

const Home = () => {
  const { keyword } = useParams();
  const { repos, loading } = useApiFetch();
  const { user } = useProfileFetch();

  const avatar = user?.avatar_url;
  const userProfileName = user?.name;
  const userName = user?.login;
  const viewProfile = user?.html_url;

  return (
    <Container>
      {loading ? (
        <Loader text="Loading.." />
      ) : (
        <>
          <Profile>
            <img src={avatar} alt="Avatar" />
            <h4>{userProfileName}</h4>
            <p>@{userName}</p>
            <a href={viewProfile} target="_blank" rel="noreferrer">
              View GitHub Profile
            </a>
            <Socials>
              <a href="https://github.com" target="_blank" rel="noreferrer">
                <FaGithub />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <FaTwitter />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <FaLinkedin />
              </a>
              <a href="https://discord.com" target="_blank" rel="noreferrer">
                <FaDiscord />
              </a>
            </Socials>
          </Profile>

          <Repositories>
            <h3>Top Repositories</h3>
            <Grid>
              {repos &&
                repos
                  .slice(0, 4)
                  .map((item, i) => (
                    <Card
                      key={i}
                      repoId={item.name}
                      name={item.name}
                      description={item.description}
                      created_at={item.created_at}
                    />
                  ))}
            </Grid>
            <Link to="/repos" className="view-more">
              View All Repositories
            </Link>
          </Repositories>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  font-family: "Inter", sans-serif;
  color: #333;
`;

const Profile = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-bottom: 1rem;
    border: 2px solid #eaeaea;
  }
  h4 {
    font-size: 1.5rem;
    font-weight: bold;
  }
  p {
    color: #666;
    margin-bottom: 1rem;
  }
  a {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background: #0073e6;
    color: #fff;
    border-radius: 4px;
    text-decoration: none;
    transition: background 0.3s ease;
    &:hover {
      background: #005bb5;
    }
  }
`;

const Socials = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  a {
    color: #666;
    font-size: 1.25rem;
    transition: color 0.3s ease;
    &:hover {
      color: #0073e6;
    }
  }
`;

const Repositories = styled.div`
  width: 100%;
  max-width: 800px;
  h3 {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 1.25rem;
  }
  .view-more {
    display: block;
    margin: 2rem auto 0;
    text-align: center;
    color: #0073e6;
    text-decoration: none;
    font-size: 1rem;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default Home;

import styled from "styled-components";
import { BiGitBranch } from "react-icons/bi";
import moment from "moment";
import { Link } from "react-router-dom";

const Card = ({ repoId, name, description, created_at }) => {
  return (
    <Container>
      <Link to={`/repos/${repoId}`} className="link">
        <Header>
          <BiGitBranch />
          <h4>{name}</h4>
        </Header>
        <Description>
          {description ? description : "No description available"}
        </Description>
        <Footer>Created: {moment(created_at).fromNow()}</Footer>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  background: #f9f9f9;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 1rem;
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  .link {
    text-decoration: none;
    color: #333;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  svg {
    color: #0073e6;
    margin-right: 0.5rem;
  }
  h4 {
    font-size: 1.1rem;
  }
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
`;

const Footer = styled.div`
  font-size: 0.8rem;
  color: #999;
  text-align: right;
`;

export default Card;

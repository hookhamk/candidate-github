import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Link } from 'react-router-dom';
import Candidates  from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidates>({
    name: '',
    username: '',
    location: '',
    avatar: '',
    email: '',
    html_url: '',
    company: '',
  });

  const [currentCandidate, setCandidate] = useState(0);

  const next = async () => {
    setCandidate(currentCandidate + 1);
  };

  const save = async () => {
  const savedCandidates: Candidates[] = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
  savedCandidates.push(candidates);
  localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));

  setCandidate(currentCandidate + 1);
};

useEffect(() => {
  const fetchCandidates = async () => {
    try {
      const rawData = await searchGithub();
      if (rawData.length === 0) {
        console.error(`No candidates found`);
        return;
      }

      // Fetch detailed data for the first candidate
      const rawCandidate = await searchGithubUser(rawData[currentCandidate].login);

      setCandidates(
        {
          name: rawCandidate.name,
          username: rawCandidate.login,
          location: rawCandidate.location,
          avatar: rawCandidate.avatar_url,
          email: rawCandidate.email,
          html_url: rawCandidate.html_url,
          company: rawCandidate.company,
        },
      );
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  };

  fetchCandidates();
}, [currentCandidate]);

//Only render the candidate information template if candidates remain
return (currentCandidate > 20
  ? <>
    <h1>No more candidates</h1>
    <Link to='/SavedCandidates' > Go to saved candidates</Link>
  </>

  : <>
    <h1>Candidate Search</h1>
    <div className='candidate'>
      <img src={candidates.avatar} alt={'A github avatar'} width={250}></img>
      <h2>{`${candidates.name || "N/A"} (${candidates.username})`}</h2>
      <p>Location: {candidates.location || "N/A"}</p>
      <p>Email: {candidates.email || "N/A"}</p>
      <p>Company: {candidates.company || "N/A"} </p>
      <a href={candidates.html_url}>View github profile</a>
      <div className='choices'>
        <button style={{ background: 'red' }} onClick={next}>-</button>
        <button style={{ background: 'green' }} onClick={save}>+</button>
      </div>
    </div>
  </>
);
}

export default CandidateSearch;

import TeamCard from './TeamCard';

const TeamCardSet = ({ members }) => {
  if (members) {
    return (
      <ul className="team-set grid">
        {members.map((member) => (
          <TeamCard member={member} key={`member-${member.member[0].text}`} />
        ))}
      </ul>
    );
  }
  return '';
};

export default TeamCardSet;

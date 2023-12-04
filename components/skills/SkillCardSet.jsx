import SkillCard from './SkillCard';

function SkillCardSet({ skills }) {
  if (skills) {
    return (
      <ul className="wrapper" id="skills-set" data-scroll-section>
        {skills.map((skill) => (
          <SkillCard skill={skill} key={`set-${skill.skill_title[0].text}`} />
        ))}
      </ul>
    );
  }
}

export default SkillCardSet;

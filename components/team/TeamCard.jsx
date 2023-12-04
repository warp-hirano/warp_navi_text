import React from 'react';
import { RichText } from 'prismic-reactjs';

const TeamCard = ({ member }) => {
  const title =
    member && RichText.asText(member.member)
      ? RichText.asText(member.member)
      : '';

  const position =
    member && RichText.asText(member.member_position)
      ? RichText.asText(member.member_position)
      : '';

  const description =
    member && RichText.asText(member.member_description)
      ? RichText.asText(member.member_description)
      : '';

  if (member) {
    return (
      <li className="member">
        <div
          className="card"
          style={{
            backgroundImage:
              Object.keys(member.member_image).length > 0 &&
              `url(${member.member_image.url})`,
          }}
        />
        <h4>{title}</h4>
        <div className="position">{position}</div>
        <div className="member-desc">{description}</div>
      </li>
    );
  }
  return '';
};

export default TeamCard;

import React from 'react';
import { useRouter } from 'next/router';

const SocialShare = ({ baseUrl, width = 640, height = 320 }) => {
  const router = useRouter();

  const getBoxPositionOnWindowCenter = () => ({
    left:
      window.outerWidth / 2 +
      (window.screenX || window.screenLeft || 0) -
      width / 2,
    top:
      window.outerHeight / 2 +
      (window.screenY || window.screenTop || 0) -
      height / 2,
  });

  function getShareUrl(type, url) {
    switch (type) {
      case 'twitter':
        return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          document.title,
        )}&url=${encodeURIComponent(url)}`;
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url,
        )}`;
      case 'linkedin':
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url,
        )}`;
      default:
        return null;
    }
  }

  function windowOpen(url, top, left) {
    const popupWindow = window.open(
      url,
      'A test',
      `scrollbars=yes, width=${width}, height=${height}, top=${top}, left=${left}`,
    );
    popupWindow.focus();
    return popupWindow;
  }

  const handleClick = (e) => {
    e.preventDefault();
    const url = `${baseUrl}${router.asPath}`;
    const type = e.target.getAttribute('data-type');

    const shareUrl = getShareUrl(type, url);

    windowOpen(
      shareUrl,
      getBoxPositionOnWindowCenter().top,
      getBoxPositionOnWindowCenter().left,
    );
  };

  return (
    <div className="wrapper grid social-share" data-scroll-section>
      <div className="social-title">Share</div>
      <ul className="social-options">
        <li className="underlined-links">
          <a data-type="linkedin" href="#" onClick={handleClick}>
            Linkedin
          </a>
        </li>
        <li className="underlined-links">
          <a data-type="twitter" href="#" onClick={handleClick}>
            Twitter
          </a>
        </li>
        <li className="underlined-links">
          <a data-type="facebook" href="#" onClick={handleClick}>
            Facebook
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SocialShare;

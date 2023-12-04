import React, { useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const ContactPen = React.forwardRef(({ href, isClicked }, ref) => {
  const router = useRouter();
  function showOverlay(e) {
    e.preventDefault();

    isClicked(true);
    setTimeout(() => {
      router.push(href);
    }, 500);
  }
  return (
    <a href={href} onClick={showOverlay} ref={ref}>
      <img id="contact-pen" src="/images/Contact-button.svg" alt="contact" />
    </a>
  );
});

const Contact = () => {
  const [clicked, isClicked] = useState(false);
  return (
    <>
      <div id="contact">
        <NextLink href={{ pathname: '/contact' }} passHref>
          <ContactPen clicked={clicked} isClicked={isClicked} />
        </NextLink>
        <div id="contact-wrapper" className={clicked ? 'on' : ''} />
      </div>
    </>
  );
};

export default Contact;

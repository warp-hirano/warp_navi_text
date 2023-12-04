/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import NextLink from 'next/link';
import { linkResolver, hrefResolver } from 'prismic-configuration';

const AltLangs = ({ altLangs = [], currentLang, setMenuDisplayed }) => (
  <>
    <li className="current-lang" key={currentLang.id}>
      <a href="#">{currentLang.slice(0, 2)}</a>
    </li>
    {altLangs.map((altLang) => (
      <li key={altLang.id}>
        <NextLink
          locale={altLang.lang}
          as={linkResolver(altLang)}
          href={hrefResolver(altLang)}
          passHref
        >
          <a onClick={() => setMenuDisplayed(false)}>
            {altLang.lang.slice(-2)}
          </a>
        </NextLink>
      </li>
    ))}
  </>
);

const LanguageSwitcher = ({ altLangs, currentLang, setMenuDisplayed }) => (
  <AltLangs
    altLangs={altLangs}
    currentLang={currentLang}
    setMenuDisplayed={setMenuDisplayed}
  />
);

export default LanguageSwitcher;

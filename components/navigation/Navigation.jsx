import { default as NextLink } from 'next/link';
import { RichText } from 'prismic-reactjs';
import { hrefResolver } from 'prismic-configuration';
import i18n from 'utils/i18n';
import CloseMenuButton from './CloseMenuButton';

function MenuLink({ link = [] }) {
  if (link.link.slug === 'servicepage') {
    return (
      <li key={link.link.id} className="underlined-links hassub">
        <a>{RichText.asText(link.label)}</a>
        <ul className="submenu">
          <li><a href="/shopify">Shopify</a></li>
          <li><a href="/salesforcecommercecloud">Salesforce Commerce Cloud</a></li>
          <li><a href="/cegid">Cegid</a></li>
          <li>
            <NextLink href={hrefResolver(link.link)} passHref>
              <a>Website</a>
            </NextLink>
          </li>
        </ul>
      </li>
    );
  }
  return (
    <li key={link.link.id} className="underlined-links">
      <NextLink href={hrefResolver(link.link)} passHref>
        <a>{RichText.asText(link.label)}</a>
      </NextLink>
    </li>
  );
}

function MenuLinks({ links = [] }) {
  if (links) {
    return (
      <ul className="menu-links">
        {links.map((menuLink) => (
          <MenuLink link={menuLink} />
        ))}
      </ul>
    );
  }
}

export const SNS = ({ links = [], lang = 'en' }) => (
  <div className="sns">
    <span>{i18n[lang].followus}</span>
    <ul className="underlined-links">
      {links.map((link) => (
        <li key={RichText.asText(link.sns_label)}>
          <NextLink href={link.sns_link.url} target={link.sns_link.target}>
            <a>{RichText.asText(link.sns_label)}</a>
          </NextLink>
        </li>
      ))}
    </ul>
  </div>
);

const Navigation = ({ menu, isMenuDisplayed, setMenuDisplayed }) => (
  <div className={`navigation ${isMenuDisplayed ? 'on' : 'off'}`}>
    <CloseMenuButton setMenuDisplayed={setMenuDisplayed} />
    <div className="wrapper">
      <div className="grid">
        {menu && (
          <>
            <MenuLinks links={menu.data.menu_links} />
            <SNS links={menu.data.sns} />
          </>
        )}
      </div>
    </div>
  </div>
);

export default Navigation;

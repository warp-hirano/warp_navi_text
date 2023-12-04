import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
/* eslint-disable import/first */
gsap.registerPlugin(ScrollTrigger);
/* eslint-disable import/first */
import { Link as Scroll } from 'react-scroll';
import NextLink from 'next/link';

import { Client, manageLocal } from 'utils/prismicHelpers';
/* import useShouldLoadDistortion from 'components/hooks/useShouldLoadDistortion'; */
/* import dynamic from 'next/dynamic'; */

/* eslint-disable import/first */
import { init, send } from 'emailjs-com';

/**
 * cegid Page component
 */

function CegidPage({ userID, serviceID, templateID }) {
  const [formNameSei, setNameSei] = useState('');
  const [formNameMei, setNameMei] = useState('');
  const [formCompany, setCompany] = useState('');
  const [formMail, setMail] = useState('');
  const [formPhone, setPhone] = useState('');
  const [formMessage, setMessage] = useState('');
  const sendMail = () => {
    if (
      userID !== undefined &&
      serviceID !== undefined &&
      templateID !== undefined
    ) {
      init(userID);
      const templateParam = {
        to_name: formNameSei + formNameMei,
        company: formCompany,
        from_email: formMail,
        title: 'WARP Shopifyページ お問い合わせ',
        message: formMessage,
      };
      send(serviceID, templateID, templateParam).then(() => {
        window.alert('お問い合わせを送信致しました。');
        setNameSei('');
        setNameMei('');
        setCompany('');
        setMail('');
        setMessage('');
        setPhone('');
      });
    }
  };

  const submitBtnClick = () => {
    const psei = document.contactForm.name_sei.value;
    const pmei = document.contactForm.name_mei.value;
    const pemail = document.contactForm.email.value;
    const pphone = document.contactForm.phone.value;
    const pcompany = document.contactForm.company.value;
    const pcontent = document.contactForm.content.value;
    let isTure = true;
    if (psei) {
      document.getElementById('formNameSei').classList.remove('err');
      isTure = true;
    } else {
      document.getElementById('formNameSei').classList.add('err');
      isTure = false;
    }
    if (pmei) {
      document.getElementById('formNameMei').classList.remove('err');
      isTure = true;
    } else {
      document.getElementById('formNameMei').classList.add('err');
      isTure = false;
    }
    if (pemail) {
      document.getElementById('form_email').classList.remove('err');
      if (!pemail.match(/.+@.+\..+/)) {
        document.getElementById('form_email').classList.add('err');
        document.getElementById('errTxt_email').textContent = 'メールアドレスを入力してください';
        isTure = false;
      } else {
        document.getElementById('form_email').classList.remove('err');
        isTure = true;
      }
    } else {
      document.getElementById('form_email').classList.add('err');
      isTure = false;
    }
    if (pphone) {
      document.getElementById('formPhone').classList.remove('err');
      isTure = true;
    } else {
      document.getElementById('formPhone').classList.add('err');
      isTure = false;
    }
    if (pcompany) {
      document.getElementById('formCompany').classList.remove('err');
      isTure = true;
    } else {
      document.getElementById('formCompany').classList.add('err');
      isTure = false;
    }
    if (pcontent) {
      document.getElementById('form_content').classList.remove('err');
      isTure = true;
    } else {
      document.getElementById('form_content').classList.add('err');
      isTure = false;
    }
    // submit()でフォームの内容を送信
    // document.myform.submit();
    if (isTure) {
      /* function formMessage(message){
        if(message==='OK'){
          alert('お問い合わせありがとうございます\n内容は送信されました');
          document.contactForm.reset();
        }
      } */
      sendMail();
    }
  };
  /* const shouldLoadDistortion = useShouldLoadDistortion(); */

  /* function playVideo(el) {
    const vid = document.getElementById(el);
    vid.play();
    // console.log('playing video');
  } */

  useEffect(() => {
    ScrollTrigger.create({
      trigger: '.cegid__section__head',
      start: '100px top',
      toggleClass: { targets: '.cegid__section__head', className: 'scrolled' },
      once: true,
      // markers: true
    });
    const ttlAnimElems = document.getElementsByClassName('anim_svg_line');
    for (let i = 0; i < ttlAnimElems.length; i += 1) {
      gsap.to(ttlAnimElems[i], {
        scrollTrigger: {
          trigger: ttlAnimElems[i],
          start: 'top 50%',
          toggleClass: { targets: ttlAnimElems[i], className: 'act' },
          once: true,
          // markers: true
        },
      });
    }
    const scrlAnimElems = document.getElementsByClassName('scrl_anim');
    for (let i = 0; i < scrlAnimElems.length; i += 1) {
      gsap.to(scrlAnimElems[i], {
        scrollTrigger: {
          trigger: scrlAnimElems[i],
          start: 'top 50%',
          toggleClass: { targets: scrlAnimElems[i], className: 'act' },
          once: true,
          // markers: true
        },
      });
    }
    /* ScrollTrigger.create({
      trigger: '#cegid_video_wrap',
      start: 'top center-=10%',
      once: true,
      // markers: true,
      onEnter: ({ progress, direction, isActive }) => {
        console.log(progress, direction, isActive);
        playVideo('cegid_video');
      },
    });
    ScrollTrigger.create({
      trigger: '#cegid_video_wrap2',
      start: 'top center-=10%',
      once: true,
      // markers: true,
      onEnter: ({ progress, direction, isActive }) => {
        console.log(progress, direction, isActive);
        playVideo('cegid_video2');
      },
    }); */
  }, []);
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <title>Cegid | Warp Japan VISEO</title>
        <meta
          property="og:title"
          content="Shopify | Warp Japan VISEO"
          key="title"
        />
        <meta property="og:image" content="/images/warp-team.jpg" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@digital_tokyo" />
        <meta name="twitter:title" content="Shopify | Warp Japan VISEO" />
        <link rel="preconnect" href="https://p.typekit.net" />
        <link rel="preconnect" href="https://warp-kakigori.prismic.io" />
        <link
          rel="preload"
          href="https://use.typekit.net/cqb8zcm.css"
          as="style"
        />
        <link rel="stylesheet" href="https://use.typekit.net/zby4zve.css" />
      </Head>
      <div className="cegid__body">
        <header className="cegid__header">
          <div className="cegid__wrapper">
            <h1 className="cegid__header__h1">
              <NextLink href="/">
                <img src="/images/cegid/logo.svg" alt="warpjapan viseo" />
              </NextLink>
            </h1>
            <ul className="cegid__header__ul">
              <li className="cegid__header__li font_outfit">
                <Scroll to="aboutShopify" smooth>About Cegid</Scroll>
              </li>
              <li className="cegid__header__li font_outfit">
                <Scroll to="ourServices" smooth>Our Services</Scroll>
              </li>
              <li className="cegid__header__li font_outfit">
                <Scroll to="ourWorks" smooth>Our Works</Scroll>
              </li>
            </ul>
            <Scroll to="contact" smooth className="cegid__header__btn font_outfit">
              <span>Get Started</span>
              <svg width="33px" x="0px" y="0px" viewBox="0 0 33.8 8.7" xmlSpace="preserve"><polygon className="st0" points="29.4,0 28.7,0.7 31.8,3.9 0,3.9 0,4.9 31.8,4.9 28.7,8 29.4,8.7 33.8,4.4 " /></svg>
            </Scroll>
          </div>
        </header>
        <main className="cegid__main">
          <section className="cegid__section cegid__section__head scrl_anim">
            <div className="cegid__section__logo-wrap">
              <img src="/images/cegid/cegid_logo.jpg" alt="Cegid" />
            </div>
            <p className="cegid__section__head__p anim_obj03 sp-text">
              ファッション、
              <br />
              ラグジュアリー、コスメなどに特化したリテールソリューション
            </p>
            <p className="cegid__section__head__p anim_obj03">
              Warp Japan VISEOは、Platinum Cegidパートナーとして、
              <br className="pc" />
              あなたのビジネスを支援します
            </p>
            <p className="anim_obj03">
              <Scroll to="contact" smooth className="gr_btn font_outfit ">今すぐ相談する</Scroll>
            </p>
            <div className="cegid__section__head__img anim_obj04">
              <div className="cegid__section__head__img__wrap">
                <svg className="anim_svg_line" width="255px" x="0px" y="0px" viewBox="0 0 250.4 256.8" xmlSpace="preserve">
                  <g id="line_layer">
                    <path id="svgline" className="st0" d="M3.9,238.8c-0.4,0-0.7,0-0.9,0c-0.8,0-1.5-0.7-1.5-1.5c0-0.8,0.7-1.5,1.5-1.5c0,0,0,0,0,0 c0.2,0,0.5,0,0.9,0c3.9,0,14.5-0.4,28.4-4.1c0.8-0.2,1.6,0.3,1.8,1.1s-0.3,1.6-1.1,1.8C18.9,238.4,8,238.8,3.9,238.8z M42.3,231.7 c-0.6,0-1.2-0.4-1.4-1c-0.3-0.8,0.1-1.6,0.9-1.9c9.3-3.2,18.3-7.5,26.7-12.7c0.7-0.4,1.6-0.2,2.1,0.5c0.4,0.7,0.2,1.6-0.5,2.1 c-8.6,5.3-17.8,9.7-27.3,13C42.6,231.7,42.4,231.7,42.3,231.7z M77.6,213.3c-0.5,0-0.9-0.2-1.2-0.6c-0.5-0.7-0.3-1.6,0.3-2.1 c7.9-5.7,15.3-12.4,22-19.8c0.6-0.6,1.5-0.7,2.1-0.1s0.7,1.5,0.1,2.1c-6.9,7.6-14.4,14.4-22.5,20.2 C78.2,213.2,77.9,213.3,77.6,213.3z M106.3,185.6c-0.3,0-0.7-0.1-0.9-0.3c-0.6-0.5-0.8-1.5-0.2-2.1c6-7.5,11.5-15.8,16.3-24.8 c0.4-0.7,1.3-1,2-0.6c0.7,0.4,1,1.3,0.6,2c-5,9.1-10.6,17.6-16.6,25.2C107.2,185.4,106.7,185.6,106.3,185.6z M127.3,151.7 c-0.2,0-0.4,0-0.6-0.1c-0.7-0.4-1.1-1.3-0.7-2c4.5-9.5,7.9-18.9,9.9-27.9c0.2-0.8,1-1.3,1.8-1.1c0.8,0.2,1.3,1,1.1,1.8 c-2.1,9.3-5.5,18.9-10.1,28.5C128.4,151.4,127.9,151.7,127.3,151.7z M139,113.7c-0.1,0-0.1,0-0.2,0c-0.8-0.1-1.4-0.9-1.3-1.7 c0.5-3.8,0.7-7.7,0.7-11.4c0-3.6-0.2-7.2-0.7-10.7c-2.2,0.9-4.4,1.8-6.6,2.6c-0.8,0.3-1.6-0.1-1.9-0.9c-0.3-0.8,0.1-1.6,0.9-1.9 c2.4-0.9,4.8-1.9,7.2-2.9c-0.2-1.4-0.5-2.8-0.8-4.2c-0.2-0.8,0.3-1.6,1.1-1.8c0.8-0.2,1.6,0.3,1.8,1.1c0.3,1.2,0.5,2.4,0.7,3.6 c5.7-2.5,11.4-5.3,17-8.3c0.7-0.4,1.6-0.1,2,0.6s0.1,1.6-0.6,2c-6,3.2-12,6.1-18,8.7c0.5,3.9,0.8,7.9,0.8,11.9 c0,3.8-0.3,7.8-0.7,11.8C140.4,113.1,139.8,113.7,139,113.7z M78,103.4C78,103.4,78,103.4,78,103.4c-9.9,0-18.7-1.4-26.3-4.1 c-0.8-0.3-1.2-1.1-0.9-1.9c0.3-0.8,1.1-1.2,1.9-0.9c7.2,2.6,15.7,4,25.2,4c1.2,0,2.5,0,3.8-0.1c0.8,0,1.5,0.6,1.6,1.4 c0,0.8-0.6,1.5-1.4,1.6C80.6,103.4,79.3,103.4,78,103.4z M91.8,102.5c-0.7,0-1.4-0.6-1.5-1.3c-0.1-0.8,0.5-1.6,1.3-1.7 c9.2-1.1,19-3.3,28.9-6.5c0.8-0.3,1.6,0.2,1.9,1c0.3,0.8-0.2,1.6-1,1.9c-10.2,3.3-20.1,5.5-29.5,6.6 C91.9,102.5,91.9,102.5,91.8,102.5z M43.3,95c-0.3,0-0.5-0.1-0.8-0.2c-9.3-5.8-15.2-14.5-17-25c-0.1-0.8,0.4-1.6,1.2-1.7 c0.8-0.1,1.6,0.4,1.7,1.2c1.7,9.8,6.9,17.6,15.6,23c0.7,0.4,0.9,1.4,0.5,2.1C44.3,94.8,43.8,95,43.3,95z M166.4,75.2 c-0.5,0-1-0.3-1.3-0.7c-0.4-0.7-0.2-1.6,0.5-2.1c8.4-4.9,16.7-10.5,24.8-16.6c0.7-0.5,1.6-0.4,2.1,0.3c0.5,0.7,0.4,1.6-0.3,2.1 c-8.2,6.1-16.6,11.8-25,16.8C166.9,75.2,166.7,75.2,166.4,75.2z M134.9,74.3c-0.6,0-1.2-0.4-1.4-1c-3.4-9.2-8.6-17.5-15.4-24.8 c-0.6-0.6-0.5-1.6,0.1-2.1c0.6-0.6,1.6-0.5,2.1,0.1c7.1,7.5,12.5,16.2,16.1,25.8c0.3,0.8-0.1,1.6-0.9,1.9 C135.3,74.3,135.1,74.3,134.9,74.3z M26.5,61C26.5,61,26.4,61,26.5,61c-0.9-0.1-1.5-0.8-1.5-1.6c0.1-1.3,0.2-2.7,0.4-4.1 c1.3-9.9,5.3-17.9,11.9-23.7c0.6-0.6,1.6-0.5,2.1,0.1c0.6,0.6,0.5,1.6-0.1,2.1c-6,5.3-9.7,12.7-10.9,21.9c-0.2,1.3-0.3,2.6-0.4,3.8 C27.9,60.4,27.3,61,26.5,61z M199.2,52.4c-0.4,0-0.9-0.2-1.2-0.6c-0.5-0.6-0.4-1.6,0.2-2.1c7.6-6.1,15.1-12.8,22.3-19.8 c0.6-0.6,1.5-0.6,2.1,0c0.6,0.6,0.6,1.5,0,2.1c-7.3,7.1-14.9,13.8-22.6,20C199.9,52.3,199.5,52.4,199.2,52.4z M111.9,42.2 c-0.3,0-0.7-0.1-1-0.3c-7.6-6.3-16.5-11.1-25.7-14c-0.8-0.2-1.2-1.1-1-1.9c0.2-0.8,1.1-1.2,1.9-1c9.6,3,18.8,8,26.7,14.5 c0.6,0.5,0.7,1.5,0.2,2.1C112.7,42,112.3,42.2,111.9,42.2z M46.6,28.9c-0.6,0-1.1-0.3-1.4-0.9c-0.4-0.8,0-1.6,0.7-2 c5.9-2.8,12.7-4.2,20.2-4.2c3.3,0,6.7,0.3,10.1,0.8c0.8,0.1,1.4,0.9,1.2,1.7c-0.1,0.8-0.9,1.4-1.7,1.2c-3.2-0.5-6.5-0.8-9.6-0.8 c-7,0-13.4,1.3-18.9,3.9C47,28.8,46.8,28.9,46.6,28.9z M228.7,25.4c-0.4,0-0.8-0.1-1-0.4c-0.6-0.6-0.6-1.5,0-2.1 c6.8-7,13.5-14.6,19.8-22.3c0.5-0.6,1.5-0.7,2.1-0.2s0.7,1.5,0.2,2.1c-6.4,7.8-13.1,15.4-20,22.5C229.5,25.3,229.1,25.4,228.7,25.4 z" />
                    <path id="svgline_arr" className="st0" d="M29.9,256.8c-0.3,0-0.6-0.1-0.8-0.2l-29.3-19l19.1-29.3c0.5-0.7,1.4-0.9,2.1-0.4 c0.7,0.5,0.9,1.4,0.4,2.1L3.9,236.6L30.7,254c0.7,0.5,0.9,1.4,0.4,2.1C30.8,256.5,30.4,256.8,29.9,256.8z" />
                  </g>
                  <g id="mask_layer">
                    <path id="svgline_mask" className="st1" d="M248.3,0.1c0,0-51,72.7-132.1,96.2C32.7,120.5,6,61.5,43.3,29.5c26.8-23,95,11.2,97,63.4 c1.4,36.2-25.5,135.8-140.3,145.1" />
                  </g>
                </svg>
                <img src="/images/cegid/rotate-text.svg" width="160" className="cegid__section__head__img__circle" alt="ビジネスを成長させる - GROW UP YPUR BUSINESS" />
                <img src="/images/cegid/fv_img.png" className="cegid__section__head__img__phone pc" alt="first view" />
                <img src="/images/cegid/fv_img-sp.png" className="cegid__section__head__img__phone sp" alt="first view" />
              </div>
            </div>
          </section>

          <section className="cegid__section cegid__section__about ">
            <div className="cegid__wrapper">
              <div id="aboutShopify" className="cegid__col2 rev scrl_anim">
                <div className="img anim_obj01">
                  <div className="rimg service_img"><img src="/images/cegid/cegid_partner.png" alt="cegid partner logo" /></div>
                </div>
                <div className="txt anim_obj02">
                  <h3>
                    What is CEGID?
                  </h3>
                  <p className="cegid__btxt">
                    CEGIDは、ファッション、ラグジュアリー、コスメなどの業界に特化したリテールソリューションを提供しています。
                    <br />
                    急速に変化する今日の世界において、CEGIDは、革新的で目的にかなったビジネスソリューションにより、
                    お客様の潜在能力を引き出すお手伝いをすることで、より多くのことを可能にします。
                  </p>
                  <div className="cegid__stxt">
                    <p>
                      私たちは、Cegid Retail Y2ソリューションのパートナーとして、小売業者にモビリティソリューションのサービスを提供しています。
                      これにより、店舗内やオンラインで、いつでもどこでもショッピングを楽しめるようになります。
                    </p>
                  </div>
                </div>
              </div>
              <div className="cegid__col2 scrl_anim about02">
                <div className="img anim_obj01">
                  <div className="rimg"><img src="/images/cegid/cegid_store.png" alt="cegid store" /></div>
                </div>
                <div className="txt anim_obj02">
                  <h3 className="txt_position">
                    Why choose CEGID?
                  </h3>
                  <div className="cegid__stxt">
                    <p>
                      <span>
                        ファッション業界向けの
                        <br className="sp" />
                        ソリューション
                      </span>
                      <br />
                      ファッション業界に特化したリテールソリューションで、
                      アパレル、コスメ、ラグジュアリーなどのニーズに応える機能を提供しています。
                    </p>
                  </div>
                  <div className="cegid__stxt">
                    <p>
                      <span>
                        SaaS型ソリューション
                      </span>
                      <br />
                      SaaS型のソリューションで、アプリケーション基盤は全てCegidが提供し、
                      業務プロセスの改善に集中できます。
                    </p>
                  </div>
                  <div className="cegid__stxt">
                    <p>
                      <span>
                        グローバル対応
                      </span>
                      <br />
                      グローバル対応のソリューションで、日本語を含む25ヶ国の言語や法規制に対応し、
                      世界各国で統一したシステムとオペレーションを構築できます。
                    </p>
                  </div>
                  <div className="cegid__stxt">
                    <p>
                      <span>
                        オムニチャネル
                      </span>
                      <br />
                      オムニチャネルやCRMなどの機能を備えており、店舗やECサイトの在庫、売上、
                      顧客などのデータを一元管理し、顧客サービスの向上と販売機会の最大化を実現できます。
                    </p>
                  </div>
                  <div className="cegid__stxt">
                    <p>
                      <span>
                        全般的なサポート
                      </span>
                      <br />
                      CTCなどのパートナー企業と連携しており、マーケティング、販売、
                      導入提案・構築・展開から保守サポートサービスまでトータルで提供してもらえます。
                    </p>
                  </div>
                </div>
              </div>
              <p className="cegid__section__about__p anim_obj02">世界中のブランドから信頼されています</p>
              <div className="cegid__section__about__top scrl_anim">
                <ul className="cegid__section__about__logos anim_obj03">
                  <li className="cegid__section__about__logo"><img src="/images/cegid/logo_dior.png" alt="Dior" /></li>
                  <li className="cegid__section__about__logo"><img src="/images/cegid/logo_berluti.png" alt="BERLUTI" /></li>
                  <li className="cegid__section__about__logo"><img src="/images/cegid/logo_devialet.png" alt="DEVIALET" /></li>
                  <li className="cegid__section__about__logo"><img src="/images/cegid/logo_fhifeido.png" alt="SHISEIDO" /></li>
                  <li className="cegid__section__about__logo"><img src="/images/cegid/logo_loreal.png" alt="LOREAL" /></li>
                </ul>
              </div>
            </div>
          </section>
          <section id="ourServices" className="cegid__section cegid__section__whatwedo cegid__section__whatwedo__01">
            <div className="cegid__wrapper map-wrapper">
              <h2 className="font_outfit scrl_anim">
                <span className="main anim_obj01">
                  <div id="ourServices" className="cegid__section">
                    <div className="cegid__wrapper map-in-wrapper">
                      <h2 className="font_outfit scrl_anim">
                        <span className="main anim_obj01">Our Retail practice with CEGID</span>
                      </h2>
                      <div>
                        <p className="sub">
                          私たちは、2015年からCEGIDのパートナーとして、プロジェクトの構築と展開においては
                          <br />
                          「ワンチーム」で行動し、Y2ソリューションの世界的な展開において大きな成功を収めています。
                        </p>
                      </div>
                      <div className="world-wrap">
                        <img className="world-map pc" src="/images/cegid/world-map.svg" alt="cegid world map" />
                        <img className="world-map sp" src="/images/cegid/world-map-sp.svg" alt="cegid world map" />
                      </div>
                    </div>
                  </div>
                </span>
              </h2>
            </div>
          </section>
          <section id="ourServices" className="sec03 cegid__section cegid__section__whatwedo cegid__section__whatwedo__02">
            <div className="cegid__wrapper">
              <h2 className="font_outfit scrl_anim">
                <span className="main anim_obj01">Our solutions & services</span>
              </h2>
              <div className="cegid__col2 align-items rev scrl_anim">
                <div className="img anim_obj01">
                  <div className="rimg"><img src="/images/cegid/service-01.jpg" alt="service imame 01" /></div>
                </div>
                <div className="txt anim_obj02">
                  <h3>
                    コアモデル構築・展開
                  </h3>
                  <div className="cegid__stxt">
                    <p>
                      VISEOは、世界中でCegid Retail Y2ソリューションを導入した経験があり、
                      海外のお客様がNAM、LA、EMEA、APAC、アフリカなどの異なる地域で、
                      現地の法律や財政規制への適応、現地のビジネスプロセスに基づくローカライズ作業を行い、
                      コアモードの設計とコアモデルの展開を支援します。
                    </p>
                  </div>
                </div>
              </div>
              <div className="cegid__col2 align-items scrl_anim">
                <div className="img anim_obj01">
                  <div className="rimg"><img src="/images/cegid/service-02.jpg" alt="service imame 02" /></div>
                </div>
                <div className="txt anim_obj02">
                  <h3>
                    オムニチャネルプロセスの設計・実装
                  </h3>
                  <div className="cegid__stxt">
                    <p>
                      私たちは、クリック＆コレクト、オンラインで注文して店舗で受け取る、オンラインで注文して倉庫や店舗から発送する、
                      オンラインで注文した商品を店舗で返品するなどのオムニチャネルプロセスの設計と実装をお客様に支援しています。
                      <br />
                      <br />
                      これは、Cegid Retail Y2とe-Com、OMS、ERPなどの他の第三者システムとの間の統合によって実現されます。
                      これにより、消費者により優れた先進的な統一されたショッピング体験を提供することができます。
                    </p>
                  </div>
                </div>
              </div>
              <div className="cegid__col2 align-items rev scrl_anim">
                <div className="img anim_obj01">
                  <div className="rimg"><img src="/images/cegid/service-03.jpg" alt="service imame 03" /></div>
                </div>
                <div className="txt anim_obj02">
                  <h3>
                    店舗のデジタル化 /&nbsp;
                    <br className="sp" />
                    モビリティ
                  </h3>
                  <div className="cegid__stxt">
                    <p>
                      私たちのモビリティソリューションは、Cegid Retail Y2ソリューションと完全に統合されており、
                      販売店やモバイル端末、在庫管理、CRMなどの機能を活用できます。
                      VISEOは、小売業者のニーズに応じて、最適なモビリティソリューションを提案し、導入からサポートまで一貫して行います。
                    </p>
                  </div>
                </div>
              </div>
              <div className="cegid__col2 align-items scrl_anim">
                <div className="img anim_obj01">
                  <div className="rimg"><img src="/images/cegid/service-04.jpg" alt="service imame 04" /></div>
                </div>
                <div className="txt anim_obj02">
                  <h3>
                    カスタマイズ開発
                  </h3>
                  <div className="cegid__stxt">
                    <p>
                      私たちは、お客様にCegid Retailソリューションの社内展開を支援しています。
                      その際には、必ずローカルで特有の要件が発生します。
                      私たちは、CEGIDが提供するCBS開発ツールを使って、ローカルの特性に合わせた特別な開発を行うことができます。
                      <br />
                      <br />
                      お客様のニーズに応えるために、柔軟でカスタマイズ可能なサービスを提供しています。
                    </p>
                  </div>
                </div>
              </div>
              <div className="cegid__col2 align-items rev scrl_anim">
                <div className="img anim_obj01">
                  <div className="rimg"><img src="/images/cegid/service-05.jpg" alt="service imame 05" /></div>
                </div>
                <div className="txt anim_obj02">
                  <h3>
                    システム統合
                  </h3>
                  <div className="cegid__stxt">
                    <p>
                      私は、Cegid Retail Y2とERP、WMS、OMS、e-Com、CRM、PIMなどの他のシステムとの間の統合サービスを提供しています。
                      統合方法は、バッチファイル、API、Webhookなど様々なものがあります。お客様の業務に合わせて、
                      最適な統合方法を選択し、効率的で安全なデータ連携を実現します。
                    </p>
                  </div>
                </div>
              </div>
              <div className="cegid__col2 align-items scrl_anim">
                <div className="img anim_obj01">
                  <div className="rimg"><img src="/images/cegid/service-06.jpg" alt="service imame 06" /></div>
                </div>
                <div className="txt anim_obj02">
                  <h3>
                    翻訳・トレーニング
                  </h3>
                  <div className="cegid__stxt">
                    <p>
                      私たちは、Cegidのソリューションを日本市場に合わせて、日本語化や法令遵守などのカスタマイズを行っています。
                      <br />
                      <br />
                      また、お客様にCegidのソリューションを快適に使っていただくために、翻訳やユーザートレーニングのサービスも提供しています。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="cegid__section cegid__section__more ">
            <svg className="anim_svg_line" width="255px" x="0px" y="0px" viewBox="0 0 250.4 256.8" xmlSpace="preserve">
              <g id="line_layer">
                <path id="svgline" className="st0" d="M3.9,238.8c-0.4,0-0.7,0-0.9,0c-0.8,0-1.5-0.7-1.5-1.5c0-0.8,0.7-1.5,1.5-1.5c0,0,0,0,0,0 c0.2,0,0.5,0,0.9,0c3.9,0,14.5-0.4,28.4-4.1c0.8-0.2,1.6,0.3,1.8,1.1s-0.3,1.6-1.1,1.8C18.9,238.4,8,238.8,3.9,238.8z M42.3,231.7 c-0.6,0-1.2-0.4-1.4-1c-0.3-0.8,0.1-1.6,0.9-1.9c9.3-3.2,18.3-7.5,26.7-12.7c0.7-0.4,1.6-0.2,2.1,0.5c0.4,0.7,0.2,1.6-0.5,2.1 c-8.6,5.3-17.8,9.7-27.3,13C42.6,231.7,42.4,231.7,42.3,231.7z M77.6,213.3c-0.5,0-0.9-0.2-1.2-0.6c-0.5-0.7-0.3-1.6,0.3-2.1 c7.9-5.7,15.3-12.4,22-19.8c0.6-0.6,1.5-0.7,2.1-0.1s0.7,1.5,0.1,2.1c-6.9,7.6-14.4,14.4-22.5,20.2 C78.2,213.2,77.9,213.3,77.6,213.3z M106.3,185.6c-0.3,0-0.7-0.1-0.9-0.3c-0.6-0.5-0.8-1.5-0.2-2.1c6-7.5,11.5-15.8,16.3-24.8 c0.4-0.7,1.3-1,2-0.6c0.7,0.4,1,1.3,0.6,2c-5,9.1-10.6,17.6-16.6,25.2C107.2,185.4,106.7,185.6,106.3,185.6z M127.3,151.7 c-0.2,0-0.4,0-0.6-0.1c-0.7-0.4-1.1-1.3-0.7-2c4.5-9.5,7.9-18.9,9.9-27.9c0.2-0.8,1-1.3,1.8-1.1c0.8,0.2,1.3,1,1.1,1.8 c-2.1,9.3-5.5,18.9-10.1,28.5C128.4,151.4,127.9,151.7,127.3,151.7z M139,113.7c-0.1,0-0.1,0-0.2,0c-0.8-0.1-1.4-0.9-1.3-1.7 c0.5-3.8,0.7-7.7,0.7-11.4c0-3.6-0.2-7.2-0.7-10.7c-2.2,0.9-4.4,1.8-6.6,2.6c-0.8,0.3-1.6-0.1-1.9-0.9c-0.3-0.8,0.1-1.6,0.9-1.9 c2.4-0.9,4.8-1.9,7.2-2.9c-0.2-1.4-0.5-2.8-0.8-4.2c-0.2-0.8,0.3-1.6,1.1-1.8c0.8-0.2,1.6,0.3,1.8,1.1c0.3,1.2,0.5,2.4,0.7,3.6 c5.7-2.5,11.4-5.3,17-8.3c0.7-0.4,1.6-0.1,2,0.6s0.1,1.6-0.6,2c-6,3.2-12,6.1-18,8.7c0.5,3.9,0.8,7.9,0.8,11.9 c0,3.8-0.3,7.8-0.7,11.8C140.4,113.1,139.8,113.7,139,113.7z M78,103.4C78,103.4,78,103.4,78,103.4c-9.9,0-18.7-1.4-26.3-4.1 c-0.8-0.3-1.2-1.1-0.9-1.9c0.3-0.8,1.1-1.2,1.9-0.9c7.2,2.6,15.7,4,25.2,4c1.2,0,2.5,0,3.8-0.1c0.8,0,1.5,0.6,1.6,1.4 c0,0.8-0.6,1.5-1.4,1.6C80.6,103.4,79.3,103.4,78,103.4z M91.8,102.5c-0.7,0-1.4-0.6-1.5-1.3c-0.1-0.8,0.5-1.6,1.3-1.7 c9.2-1.1,19-3.3,28.9-6.5c0.8-0.3,1.6,0.2,1.9,1c0.3,0.8-0.2,1.6-1,1.9c-10.2,3.3-20.1,5.5-29.5,6.6 C91.9,102.5,91.9,102.5,91.8,102.5z M43.3,95c-0.3,0-0.5-0.1-0.8-0.2c-9.3-5.8-15.2-14.5-17-25c-0.1-0.8,0.4-1.6,1.2-1.7 c0.8-0.1,1.6,0.4,1.7,1.2c1.7,9.8,6.9,17.6,15.6,23c0.7,0.4,0.9,1.4,0.5,2.1C44.3,94.8,43.8,95,43.3,95z M166.4,75.2 c-0.5,0-1-0.3-1.3-0.7c-0.4-0.7-0.2-1.6,0.5-2.1c8.4-4.9,16.7-10.5,24.8-16.6c0.7-0.5,1.6-0.4,2.1,0.3c0.5,0.7,0.4,1.6-0.3,2.1 c-8.2,6.1-16.6,11.8-25,16.8C166.9,75.2,166.7,75.2,166.4,75.2z M134.9,74.3c-0.6,0-1.2-0.4-1.4-1c-3.4-9.2-8.6-17.5-15.4-24.8 c-0.6-0.6-0.5-1.6,0.1-2.1c0.6-0.6,1.6-0.5,2.1,0.1c7.1,7.5,12.5,16.2,16.1,25.8c0.3,0.8-0.1,1.6-0.9,1.9 C135.3,74.3,135.1,74.3,134.9,74.3z M26.5,61C26.5,61,26.4,61,26.5,61c-0.9-0.1-1.5-0.8-1.5-1.6c0.1-1.3,0.2-2.7,0.4-4.1 c1.3-9.9,5.3-17.9,11.9-23.7c0.6-0.6,1.6-0.5,2.1,0.1c0.6,0.6,0.5,1.6-0.1,2.1c-6,5.3-9.7,12.7-10.9,21.9c-0.2,1.3-0.3,2.6-0.4,3.8 C27.9,60.4,27.3,61,26.5,61z M199.2,52.4c-0.4,0-0.9-0.2-1.2-0.6c-0.5-0.6-0.4-1.6,0.2-2.1c7.6-6.1,15.1-12.8,22.3-19.8 c0.6-0.6,1.5-0.6,2.1,0c0.6,0.6,0.6,1.5,0,2.1c-7.3,7.1-14.9,13.8-22.6,20C199.9,52.3,199.5,52.4,199.2,52.4z M111.9,42.2 c-0.3,0-0.7-0.1-1-0.3c-7.6-6.3-16.5-11.1-25.7-14c-0.8-0.2-1.2-1.1-1-1.9c0.2-0.8,1.1-1.2,1.9-1c9.6,3,18.8,8,26.7,14.5 c0.6,0.5,0.7,1.5,0.2,2.1C112.7,42,112.3,42.2,111.9,42.2z M46.6,28.9c-0.6,0-1.1-0.3-1.4-0.9c-0.4-0.8,0-1.6,0.7-2 c5.9-2.8,12.7-4.2,20.2-4.2c3.3,0,6.7,0.3,10.1,0.8c0.8,0.1,1.4,0.9,1.2,1.7c-0.1,0.8-0.9,1.4-1.7,1.2c-3.2-0.5-6.5-0.8-9.6-0.8 c-7,0-13.4,1.3-18.9,3.9C47,28.8,46.8,28.9,46.6,28.9z M228.7,25.4c-0.4,0-0.8-0.1-1-0.4c-0.6-0.6-0.6-1.5,0-2.1 c6.8-7,13.5-14.6,19.8-22.3c0.5-0.6,1.5-0.7,2.1-0.2s0.7,1.5,0.2,2.1c-6.4,7.8-13.1,15.4-20,22.5C229.5,25.3,229.1,25.4,228.7,25.4 z" />
                <path id="svgline_arr" className="st0" d="M29.9,256.8c-0.3,0-0.6-0.1-0.8-0.2l-29.3-19l19.1-29.3c0.5-0.7,1.4-0.9,2.1-0.4 c0.7,0.5,0.9,1.4,0.4,2.1L3.9,236.6L30.7,254c0.7,0.5,0.9,1.4,0.4,2.1C30.8,256.5,30.4,256.8,29.9,256.8z" />
              </g>
              <g id="mask_layer">
                <path id="svgline_mask" className="st1" d="M248.3,0.1c0,0-51,72.7-132.1,96.2C32.7,120.5,6,61.5,43.3,29.5c26.8-23,95,11.2,97,63.4 c1.4,36.2-25.5,135.8-140.3,145.1" />
              </g>
            </svg>
            <div className="cegid__wrapper">
              <h2 className="font_outfit scrl_anim">
                <span className="main anim_obj02">Our support case</span>
              </h2>
              <div className="cegid__col2 align-items rev scrl_anim">
                <div className="img anim_obj01">
                  <div className="rimg"><img src="/images/cegid/support-01.jpg" alt="support 01" /></div>
                </div>
                <div className="txt anim_obj02">
                  <h3>
                    SHISEIDO
                  </h3>
                  <div className="cegid__stxt">
                    <p>
                      <span>
                        アジアで初めてCEGIDのSaaSプラットフォーム
                        <br className="pc" />
                        を利用したケース。
                      </span>
                      <span>
                        全ブティック、全カウンターの在庫管理をSAPとの
                        <br className="pc" />
                        統合をし、在庫管理を効率化することができました。
                      </span>
                      <span>
                        Eコマースの売上データをPOSシステムに統合し、
                        <br className="pc" />
                        データの一元管理・分析することができました。
                      </span>
                      <span>
                        顧客の要求に応え、ロイヤリティマネジメントの
                        <br className="pc" />
                        ローカライズを行いました。店舗登録フォームを開発し、
                        <br className="pc" />
                        顧客情報をより正確に把握できるようにした。
                      </span>
                      <span>
                        正確なレポーティングを行うため、CBSツールで作成した
                        <br className="pc" />
                        管理レポートを実装しました。
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="cegid__col2 align-items scrl_anim">
                <div className="img anim_obj01">
                  <div className="rimg"><img src="/images/cegid/support-02.jpg" alt="support 02" /></div>
                </div>
                <div className="txt anim_obj02">
                  <h3>
                    L’ORÉAL
                  </h3>
                  <div className="cegid__stxt">
                    <p>
                      <span>
                        Cegid POSの新バージョンへの移行を複数の店舗で
                        <br className="pc" />
                        スムーズに行い、システムの安定性と機能性を向上させました。
                      </span>
                      <span>
                        香港の全店舗にEFTコネクタを導入し、決済プロセスを効率化し、
                        <br className="pc" />
                        顧客満足度を高めました。
                      </span>
                      <span>
                        80店舗にわたってモバイルPOSを実装し、接客時間を短縮し、
                        <br className="pc" />
                        販売機会を増やしました。
                      </span>
                      <span>
                        APJ地域のCegid POSに対して、長期的なサポートと保守
                        <br className="pc" />
                        プロジェクトを担当しました。専門的なサポートと新たな
                        <br className="pc" />
                        要件に応えるために、15人のチームを展開し、お客様の
                        <br className="pc" />
                        ビジネスニーズに対応しました。
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="cegid__col2 align-items rev scrl_anim">
                <div className="img anim_obj01">
                  <div className="rimg plsarw"><img src="/images/cegid/support-03.jpg" alt="support 03" /></div>
                </div>
                <div className="txt anim_obj02">
                  <h3>
                    DEVIALET
                  </h3>
                  <div className="cegid__stxt">
                    <p>
                      <span>
                        お客様の即時的・中期的なニーズを把握し、
                        <br className="pc" />
                        最適なソリューションを提案しました。
                      </span>
                      <span>
                        共有SaaSモードでCBRソリューションを実装し、
                        <br className="pc" />
                        コスト削減と柔軟性を実現しました。
                      </span>
                      <span>
                        新店舗のセットアップを迅速かつスムーズにサポートし、
                        <br className="pc" />
                        オープンに間に合わせました。
                      </span>
                      <span>
                        社内で使用されている他のITソリューションとの
                        <br className="pc" />
                        インターフェースを実装し、データ連携と業務効率化
                        <br className="pc" />
                        を促進しました。
                      </span>
                      <span>
                        お客様のニーズに応じてソリューションを進化させ、
                        <br className="pc" />
                        モバイルPOSやプロモーションオファーなどの機能を追加し、
                        <br className="pc" />
                        販売力向上に貢献しました。
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="cegid__col2 align-items scrl_anim last_col">
                <div className="img anim_obj01">
                  <div className="rimg"><img src="/images/cegid/support-04.jpg" alt="support 04" /></div>
                </div>
                <div className="txt anim_obj02">
                  <h3>
                    URBAN REVIVO
                  </h3>
                  <div className="cegid__stxt">
                    <p>
                      <span>
                        国際展開（SG、TH、UK）：3ヶ月以内にSG、TH、UKの
                        <br className="pc" />
                        新店舗の展開をアジャイルにサポートしました。
                      </span>
                      <span>
                        中国の全店舗を管理するために、集中化とローカライズを
                        <br className="pc" />
                        行いました。
                      </span>
                      <span>
                        ローカルのERPやOMSとインターフェースしました。
                      </span>
                      <span>
                        ECサイト（shopify）とインターフェースし、オムニチャネル
                        <br className="pc" />
                        シナリオ（クリック＆コレクト、返品など）やロイヤリティ
                        <br className="pc" />
                        ポイントの集約をサポートしました。
                      </span>
                      <span>
                        EC、POS、マーケットプレイスを通じて在庫や
                        <br className="pc" />
                        注文を自動的に更新しました。
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="contact" className="cegid__section cegid__section__form scrl_anim">
            <div className="cegid__wrapper">
              <svg className="anim_svg_line" width="255px" x="0px" y="0px" viewBox="0 0 250.4 256.8" xmlSpace="preserve">
                <g id="line_layer">
                  <path id="svgline" className="st0" d="M3.9,238.8c-0.4,0-0.7,0-0.9,0c-0.8,0-1.5-0.7-1.5-1.5c0-0.8,0.7-1.5,1.5-1.5c0,0,0,0,0,0 c0.2,0,0.5,0,0.9,0c3.9,0,14.5-0.4,28.4-4.1c0.8-0.2,1.6,0.3,1.8,1.1s-0.3,1.6-1.1,1.8C18.9,238.4,8,238.8,3.9,238.8z M42.3,231.7 c-0.6,0-1.2-0.4-1.4-1c-0.3-0.8,0.1-1.6,0.9-1.9c9.3-3.2,18.3-7.5,26.7-12.7c0.7-0.4,1.6-0.2,2.1,0.5c0.4,0.7,0.2,1.6-0.5,2.1 c-8.6,5.3-17.8,9.7-27.3,13C42.6,231.7,42.4,231.7,42.3,231.7z M77.6,213.3c-0.5,0-0.9-0.2-1.2-0.6c-0.5-0.7-0.3-1.6,0.3-2.1 c7.9-5.7,15.3-12.4,22-19.8c0.6-0.6,1.5-0.7,2.1-0.1s0.7,1.5,0.1,2.1c-6.9,7.6-14.4,14.4-22.5,20.2 C78.2,213.2,77.9,213.3,77.6,213.3z M106.3,185.6c-0.3,0-0.7-0.1-0.9-0.3c-0.6-0.5-0.8-1.5-0.2-2.1c6-7.5,11.5-15.8,16.3-24.8 c0.4-0.7,1.3-1,2-0.6c0.7,0.4,1,1.3,0.6,2c-5,9.1-10.6,17.6-16.6,25.2C107.2,185.4,106.7,185.6,106.3,185.6z M127.3,151.7 c-0.2,0-0.4,0-0.6-0.1c-0.7-0.4-1.1-1.3-0.7-2c4.5-9.5,7.9-18.9,9.9-27.9c0.2-0.8,1-1.3,1.8-1.1c0.8,0.2,1.3,1,1.1,1.8 c-2.1,9.3-5.5,18.9-10.1,28.5C128.4,151.4,127.9,151.7,127.3,151.7z M139,113.7c-0.1,0-0.1,0-0.2,0c-0.8-0.1-1.4-0.9-1.3-1.7 c0.5-3.8,0.7-7.7,0.7-11.4c0-3.6-0.2-7.2-0.7-10.7c-2.2,0.9-4.4,1.8-6.6,2.6c-0.8,0.3-1.6-0.1-1.9-0.9c-0.3-0.8,0.1-1.6,0.9-1.9 c2.4-0.9,4.8-1.9,7.2-2.9c-0.2-1.4-0.5-2.8-0.8-4.2c-0.2-0.8,0.3-1.6,1.1-1.8c0.8-0.2,1.6,0.3,1.8,1.1c0.3,1.2,0.5,2.4,0.7,3.6 c5.7-2.5,11.4-5.3,17-8.3c0.7-0.4,1.6-0.1,2,0.6s0.1,1.6-0.6,2c-6,3.2-12,6.1-18,8.7c0.5,3.9,0.8,7.9,0.8,11.9 c0,3.8-0.3,7.8-0.7,11.8C140.4,113.1,139.8,113.7,139,113.7z M78,103.4C78,103.4,78,103.4,78,103.4c-9.9,0-18.7-1.4-26.3-4.1 c-0.8-0.3-1.2-1.1-0.9-1.9c0.3-0.8,1.1-1.2,1.9-0.9c7.2,2.6,15.7,4,25.2,4c1.2,0,2.5,0,3.8-0.1c0.8,0,1.5,0.6,1.6,1.4 c0,0.8-0.6,1.5-1.4,1.6C80.6,103.4,79.3,103.4,78,103.4z M91.8,102.5c-0.7,0-1.4-0.6-1.5-1.3c-0.1-0.8,0.5-1.6,1.3-1.7 c9.2-1.1,19-3.3,28.9-6.5c0.8-0.3,1.6,0.2,1.9,1c0.3,0.8-0.2,1.6-1,1.9c-10.2,3.3-20.1,5.5-29.5,6.6 C91.9,102.5,91.9,102.5,91.8,102.5z M43.3,95c-0.3,0-0.5-0.1-0.8-0.2c-9.3-5.8-15.2-14.5-17-25c-0.1-0.8,0.4-1.6,1.2-1.7 c0.8-0.1,1.6,0.4,1.7,1.2c1.7,9.8,6.9,17.6,15.6,23c0.7,0.4,0.9,1.4,0.5,2.1C44.3,94.8,43.8,95,43.3,95z M166.4,75.2 c-0.5,0-1-0.3-1.3-0.7c-0.4-0.7-0.2-1.6,0.5-2.1c8.4-4.9,16.7-10.5,24.8-16.6c0.7-0.5,1.6-0.4,2.1,0.3c0.5,0.7,0.4,1.6-0.3,2.1 c-8.2,6.1-16.6,11.8-25,16.8C166.9,75.2,166.7,75.2,166.4,75.2z M134.9,74.3c-0.6,0-1.2-0.4-1.4-1c-3.4-9.2-8.6-17.5-15.4-24.8 c-0.6-0.6-0.5-1.6,0.1-2.1c0.6-0.6,1.6-0.5,2.1,0.1c7.1,7.5,12.5,16.2,16.1,25.8c0.3,0.8-0.1,1.6-0.9,1.9 C135.3,74.3,135.1,74.3,134.9,74.3z M26.5,61C26.5,61,26.4,61,26.5,61c-0.9-0.1-1.5-0.8-1.5-1.6c0.1-1.3,0.2-2.7,0.4-4.1 c1.3-9.9,5.3-17.9,11.9-23.7c0.6-0.6,1.6-0.5,2.1,0.1c0.6,0.6,0.5,1.6-0.1,2.1c-6,5.3-9.7,12.7-10.9,21.9c-0.2,1.3-0.3,2.6-0.4,3.8 C27.9,60.4,27.3,61,26.5,61z M199.2,52.4c-0.4,0-0.9-0.2-1.2-0.6c-0.5-0.6-0.4-1.6,0.2-2.1c7.6-6.1,15.1-12.8,22.3-19.8 c0.6-0.6,1.5-0.6,2.1,0c0.6,0.6,0.6,1.5,0,2.1c-7.3,7.1-14.9,13.8-22.6,20C199.9,52.3,199.5,52.4,199.2,52.4z M111.9,42.2 c-0.3,0-0.7-0.1-1-0.3c-7.6-6.3-16.5-11.1-25.7-14c-0.8-0.2-1.2-1.1-1-1.9c0.2-0.8,1.1-1.2,1.9-1c9.6,3,18.8,8,26.7,14.5 c0.6,0.5,0.7,1.5,0.2,2.1C112.7,42,112.3,42.2,111.9,42.2z M46.6,28.9c-0.6,0-1.1-0.3-1.4-0.9c-0.4-0.8,0-1.6,0.7-2 c5.9-2.8,12.7-4.2,20.2-4.2c3.3,0,6.7,0.3,10.1,0.8c0.8,0.1,1.4,0.9,1.2,1.7c-0.1,0.8-0.9,1.4-1.7,1.2c-3.2-0.5-6.5-0.8-9.6-0.8 c-7,0-13.4,1.3-18.9,3.9C47,28.8,46.8,28.9,46.6,28.9z M228.7,25.4c-0.4,0-0.8-0.1-1-0.4c-0.6-0.6-0.6-1.5,0-2.1 c6.8-7,13.5-14.6,19.8-22.3c0.5-0.6,1.5-0.7,2.1-0.2s0.7,1.5,0.2,2.1c-6.4,7.8-13.1,15.4-20,22.5C229.5,25.3,229.1,25.4,228.7,25.4 z" />
                  <path id="svgline_arr" className="st0" d="M29.9,256.8c-0.3,0-0.6-0.1-0.8-0.2l-29.3-19l19.1-29.3c0.5-0.7,1.4-0.9,2.1-0.4 c0.7,0.5,0.9,1.4,0.4,2.1L3.9,236.6L30.7,254c0.7,0.5,0.9,1.4,0.4,2.1C30.8,256.5,30.4,256.8,29.9,256.8z" />
                </g>
                <g id="mask_layer">
                  <path id="svgline_mask" className="st1" d="M248.3,0.1c0,0-51,72.7-132.1,96.2C32.7,120.5,6,61.5,43.3,29.5c26.8-23,95,11.2,97,63.4 c1.4,36.2-25.5,135.8-140.3,145.1" />
                </g>
              </svg>
              <div className="cegid__section__form__head anim_obj01">
                <h2 className="font_outfit">Let’s work together</h2>
                <p>
                  Cegid導入・保守管理などに関するご相談
                </p>
              </div>
              <div className="cegid__section__form__btns anim_obj02">
                <a href="tel:03-6441-2450" className="cegid__section__form__btn cegid__section__form__btn--tel">
                  <svg xmlns="http://www.w3.org/2000/svg" width="27.804" height="27.811" viewBox="0 0 27.804 27.811">
                    <path id="phone" d="M18.042,18.043c-2.752,2.75-5.94,5.382-7.2,4.122-1.8-1.8-2.915-3.374-6.892-.177s-.921,5.326.826,7.071c2.016,2.016,9.533.108,16.962-7.32S31.069,6.792,29.051,4.776c-1.747-1.749-3.868-4.8-7.063-.826s-1.627,5.088.179,6.892C23.423,12.1,20.792,15.291,18.042,18.043Z" transform="translate(-2.001 -2)" fill="#fff" />
                  </svg>
                  <span className="font_outfit">03-6441-2450</span>
                </a>
                <a href="mailto:info@warpjapan.com" className="cegid__section__form__btn cegid__section__form__btn--mail">
                  <svg xmlns="http://www.w3.org/2000/svg" width="31.29" height="20.859" viewBox="0 0 31.29 20.859">
                    <path id="mail" d="M2,6.235l13.037,7a3.758,3.758,0,0,0,3.15,0l13.037-7C32.072,5.778,32.875,4,31.316,4H1.906C.346,4,1.149,5.778,2,6.235Zm29.619,3.83c-.965.5-12.841,6.691-13.432,7a2.962,2.962,0,0,1-1.575.346,2.962,2.962,0,0,1-1.575-.346c-.591-.309-12.4-6.5-13.364-7C.993,9.709,1,10.124,1,10.444V23.121A2.116,2.116,0,0,0,2.738,24.86H30.551a2.116,2.116,0,0,0,1.738-1.738V10.446C32.29,10.126,32.3,9.71,31.617,10.065Z" transform="translate(-1 -4)" fill="#fff" />
                  </svg>
                  <span className="font_outfit">info@warpjapan.com</span>
                </a>
              </div>
              <form className="contactForm" name="contactForm">
                <div className="cegid__section__form__row">
                  <div id="formNameSei" className="cegid__section__form__col">
                    <label htmlFor="name_sei" className="cegid__section__form__label">
                      <span>姓</span>
                      <input
                        type="text"
                        id="name_sei"
                        name="name_sei"
                        className="formInput"
                        value={formNameSei}
                        onChange={(e) => setNameSei(e.target.value)}
                      />
                    </label>
                    <p className="errTxt">必須項目です</p>
                  </div>
                  <div id="formNameMei" className="cegid__section__form__col">
                    <label htmlFor="name_mei" className="cegid__section__form__label">
                      <span>名</span>
                      <input
                        type="text"
                        id="name_mei"
                        name="name_mei"
                        className="formInput"
                        value={formNameMei}
                        onChange={(e) => setNameMei(e.target.value)}
                      />
                    </label>
                    <p className="errTxt">必須項目です</p>
                  </div>
                </div>
                <div className="cegid__section__form__row">
                  <div id="form_email" className="cegid__section__form__col">
                    <label htmlFor="email" className="cegid__section__form__label">
                      <span>Eメール</span>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="formInput"
                        value={formMail}
                        onChange={(e) => setMail(e.target.value)}
                      />
                    </label>
                    <p id="errTxt_email" className="errTxt">必須項目です</p>
                  </div>
                  <div id="formCompany" className="cegid__section__form__col">
                    <label htmlFor="company" className="cegid__section__form__label">
                      <span>会社名</span>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        className="formInput"
                        value={formCompany}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                    </label>
                    <p className="errTxt">必須項目です</p>
                  </div>
                </div>
                <div className="cegid__section__form__row">
                  <div id="formPhone" className="cegid__section__form__col col1">
                    <label htmlFor="phone" className="cegid__section__form__label">
                      <span>電話番号</span>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="formInput"
                        value={formPhone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </label>
                    <p className="errTxt">必須項目です</p>
                  </div>
                </div>
                <div className="cegid__section__form__row">
                  <div id="form_content" className="cegid__section__form__col col1">
                    <label htmlFor="content">
                      <span>
                        プロジェクトに関する詳細
                        <br className="sp_show" />
                        （サービス、スコープ、タイムラインなど）
                      </span>
                      <textarea
                        type="text"
                        name="content"
                        id="content"
                        className="formInput"
                        cols="30"
                        rows="3"
                        value={formMessage}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </label>
                    <p className="errTxt">必須項目です</p>
                  </div>
                </div>

                <div className="cegid__section__form__row">
                  <button id="submitBtn" className="submitBtn" onClick={submitBtnClick} type="button">送信</button>
                </div>
              </form>
            </div>
          </section>
          <footer className="cegid__footer">
            <div className="cegid__wrapper">
              <div className="cegid__footer__left">
                <h3><img src="/images/shopify/ttl_footer.svg" alt="warpjapan viseo" /></h3>
                <p>私たちは、デジタル領域を中心としたプランニング、デザイン、テクノロジーによって、ビジネスの成長に貢献することをミッションとするデジタルエージェンシーです。</p>
              </div>
              <div className="cegid__footer__right">
                <p>
                  Tokyo office
                  <br />
                  〒106-0043
                  <br />
                  東京都港区麻布永坂町1番地
                  <br />
                  麻布パークサイドビル503室
                  <br />
                  03-6441-2450
                  <br />
                  info@warpjapan.com
                </p>
              </div>
              <p className="cegid__footer__copy font_outfit">
                &copy;2023 Warp japan Viseo
              </p>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}

export async function getServerSideProps({
  preview,
  previewData,
  locale,
  locales,
}) {
  const ref = previewData ? previewData.ref : null;
  const isPreview = preview || false;
  const client = Client();
  const doc =
    (await client.getSingle(
      'shopifypage',
      ref ? { ref, lang: locale } : { lang: locale },
    )) || {};
  const menu =
    (await client.getSingle(
      'top_menu',
      ref ? { ref, lang: locale } : { lang: locale },
    )) || {};

  const footer =
    (await client.getSingle(
      'footer',
      ref ? { ref, lang: locale } : { lang: locale },
    )) || {};

  const { currentLang, isMyMainLanguage } = manageLocal(locales, locale);

  /* const userID = process.env.REACT_APP_USER_ID;
  const serviceID = process.env.REACT_APP_SERVICE_ID;
  const templateID = process.env.REACT_APP_TEMPLATE_ID; *//*  一時的/0531 */
  return {
    props: {
      menu,
      doc,
      footer,
      preview: {
        isActive: isPreview,
        activeRef: ref,
      },
      lang: {
        currentLang,
        isMyMainLanguage,
      },
      /* userID,
      serviceID,
      templateID, *//* 一時的/0531 */
    },
  };
}

export default CegidPage;

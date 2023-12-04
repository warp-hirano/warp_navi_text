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
 * Sfcc Page component
 */

function SfccPage({ userID, serviceID, templateID }) {
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
        title: 'WARP SFCCページ お問い合わせ',
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
  function playVideo(el) {
    const vid = document.getElementById(el);
    vid.play();
    // console.log('playing video');
  }

  useEffect(() => {
    ScrollTrigger.create({
      trigger: '.wsfcc__section__head',
      start: '100px top',
      toggleClass: { targets: '.wsfcc__section__head', className: 'scrolled' },
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

    ScrollTrigger.create({
      trigger: '#ws_video_wrap',
      start: 'top center-=10%',
      once: true,
      // markers: true,
      onEnter: ({ progress, direction, isActive }) => {
        console.log(progress, direction, isActive);
        playVideo('ws_video');
      },
    });
    ScrollTrigger.create({
      trigger: '#ws_video_wrap2',
      start: 'top center-=10%',
      once: true,
      // markers: true,
      onEnter: ({ progress, direction, isActive }) => {
        console.log(progress, direction, isActive);
        playVideo('ws_video2');
      },
    });
  }, []);
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <title>Salesforce Commerce Cloud | Warp Japan VISEO</title>
        <meta
          property="og:title"
          content="Salesforce Commerce Cloud | Warp Japan VISEO"
          key="title"
        />
        <meta property="og:image" content="/images/warp-team.jpg" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@digital_tokyo" />
        <meta name="twitter:title" content="Salesforce Commerce Cloud | Warp Japan VISEO" />
        <link rel="preconnect" href="https://p.typekit.net" />
        <link rel="preconnect" href="https://warp-kakigori.prismic.io" />
        <link
          rel="preload"
          href="https://use.typekit.net/cqb8zcm.css"
          as="style"
        />
        <link rel="stylesheet" href="https://use.typekit.net/zby4zve.css" />
      </Head>
      <div className="wsfcc__body">
        <header className="wsfcc__header">
          <div className="wsfcc__wrapper">
            <h1 className="wsfcc__header__h1">
              <NextLink href="/">
                <img src="/images/sfcc/logo.svg" alt="warpjapan viseo" />
              </NextLink>
            </h1>
            <ul className="wsfcc__header__ul">
              <li className="wsfcc__header__li font_outfit">
                <Scroll to="aboutSfcc" smooth>About Salesforce</Scroll>
              </li>
              <li className="wsfcc__header__li font_outfit">
                <Scroll to="ourServices" smooth>Our Services</Scroll>
              </li>
              <li className="wsfcc__header__li font_outfit">
                <Scroll to="ourWorks" smooth>Our Works</Scroll>
              </li>
            </ul>
            <Scroll to="contact" smooth className="wsfcc__header__btn font_outfit">
              <span>Get Started</span>
              <svg width="33px" x="0px" y="0px" viewBox="0 0 33.8 8.7" xmlSpace="preserve"><polygon className="st0" points="29.4,0 28.7,0.7 31.8,3.9 0,3.9 0,4.9 31.8,4.9 28.7,8 29.4,8.7 33.8,4.4 " /></svg>
            </Scroll>
          </div>
        </header>
        <main className="wsfcc__main">
          <section className="wsfcc__section wsfcc__section__head scrl_anim">
            <h2 className="wsfcc__section__head__h2 anim_obj02">
              <span className="font_outfit">Salesforce Commerce Cloud</span>
              で
              <br />
              あなたのECサイトを成功に導く
            </h2>

            <p className="wsfcc__section__head__p anim_obj03">
              世界800件以上、
              <br className="sp_show" />
              アジア400件以上のプロジェクト実績で、
              <br />
              Warp Japan VISEOが
              <br className="sp_show" />
              あなたのビジネスをサポートします。
            </p>
            <p className="anim_obj03">
              <Scroll to="contact" smooth className="bl_btn">今すぐ相談する</Scroll>
            </p>
            <div className="wsfcc__section__head__img anim_obj04">
              <div className="wsfcc__section__head__img__wrap">
                <svg className="anim_svg_line" width="255px" x="0px" y="0px" viewBox="0 0 250.4 256.8" xmlSpace="preserve">
                  <g id="line_layer">
                    <path id="svgline" className="st0" d="M3.9,238.8c-0.4,0-0.7,0-0.9,0c-0.8,0-1.5-0.7-1.5-1.5c0-0.8,0.7-1.5,1.5-1.5c0,0,0,0,0,0 c0.2,0,0.5,0,0.9,0c3.9,0,14.5-0.4,28.4-4.1c0.8-0.2,1.6,0.3,1.8,1.1s-0.3,1.6-1.1,1.8C18.9,238.4,8,238.8,3.9,238.8z M42.3,231.7 c-0.6,0-1.2-0.4-1.4-1c-0.3-0.8,0.1-1.6,0.9-1.9c9.3-3.2,18.3-7.5,26.7-12.7c0.7-0.4,1.6-0.2,2.1,0.5c0.4,0.7,0.2,1.6-0.5,2.1 c-8.6,5.3-17.8,9.7-27.3,13C42.6,231.7,42.4,231.7,42.3,231.7z M77.6,213.3c-0.5,0-0.9-0.2-1.2-0.6c-0.5-0.7-0.3-1.6,0.3-2.1 c7.9-5.7,15.3-12.4,22-19.8c0.6-0.6,1.5-0.7,2.1-0.1s0.7,1.5,0.1,2.1c-6.9,7.6-14.4,14.4-22.5,20.2 C78.2,213.2,77.9,213.3,77.6,213.3z M106.3,185.6c-0.3,0-0.7-0.1-0.9-0.3c-0.6-0.5-0.8-1.5-0.2-2.1c6-7.5,11.5-15.8,16.3-24.8 c0.4-0.7,1.3-1,2-0.6c0.7,0.4,1,1.3,0.6,2c-5,9.1-10.6,17.6-16.6,25.2C107.2,185.4,106.7,185.6,106.3,185.6z M127.3,151.7 c-0.2,0-0.4,0-0.6-0.1c-0.7-0.4-1.1-1.3-0.7-2c4.5-9.5,7.9-18.9,9.9-27.9c0.2-0.8,1-1.3,1.8-1.1c0.8,0.2,1.3,1,1.1,1.8 c-2.1,9.3-5.5,18.9-10.1,28.5C128.4,151.4,127.9,151.7,127.3,151.7z M139,113.7c-0.1,0-0.1,0-0.2,0c-0.8-0.1-1.4-0.9-1.3-1.7 c0.5-3.8,0.7-7.7,0.7-11.4c0-3.6-0.2-7.2-0.7-10.7c-2.2,0.9-4.4,1.8-6.6,2.6c-0.8,0.3-1.6-0.1-1.9-0.9c-0.3-0.8,0.1-1.6,0.9-1.9 c2.4-0.9,4.8-1.9,7.2-2.9c-0.2-1.4-0.5-2.8-0.8-4.2c-0.2-0.8,0.3-1.6,1.1-1.8c0.8-0.2,1.6,0.3,1.8,1.1c0.3,1.2,0.5,2.4,0.7,3.6 c5.7-2.5,11.4-5.3,17-8.3c0.7-0.4,1.6-0.1,2,0.6s0.1,1.6-0.6,2c-6,3.2-12,6.1-18,8.7c0.5,3.9,0.8,7.9,0.8,11.9 c0,3.8-0.3,7.8-0.7,11.8C140.4,113.1,139.8,113.7,139,113.7z M78,103.4C78,103.4,78,103.4,78,103.4c-9.9,0-18.7-1.4-26.3-4.1 c-0.8-0.3-1.2-1.1-0.9-1.9c0.3-0.8,1.1-1.2,1.9-0.9c7.2,2.6,15.7,4,25.2,4c1.2,0,2.5,0,3.8-0.1c0.8,0,1.5,0.6,1.6,1.4 c0,0.8-0.6,1.5-1.4,1.6C80.6,103.4,79.3,103.4,78,103.4z M91.8,102.5c-0.7,0-1.4-0.6-1.5-1.3c-0.1-0.8,0.5-1.6,1.3-1.7 c9.2-1.1,19-3.3,28.9-6.5c0.8-0.3,1.6,0.2,1.9,1c0.3,0.8-0.2,1.6-1,1.9c-10.2,3.3-20.1,5.5-29.5,6.6 C91.9,102.5,91.9,102.5,91.8,102.5z M43.3,95c-0.3,0-0.5-0.1-0.8-0.2c-9.3-5.8-15.2-14.5-17-25c-0.1-0.8,0.4-1.6,1.2-1.7 c0.8-0.1,1.6,0.4,1.7,1.2c1.7,9.8,6.9,17.6,15.6,23c0.7,0.4,0.9,1.4,0.5,2.1C44.3,94.8,43.8,95,43.3,95z M166.4,75.2 c-0.5,0-1-0.3-1.3-0.7c-0.4-0.7-0.2-1.6,0.5-2.1c8.4-4.9,16.7-10.5,24.8-16.6c0.7-0.5,1.6-0.4,2.1,0.3c0.5,0.7,0.4,1.6-0.3,2.1 c-8.2,6.1-16.6,11.8-25,16.8C166.9,75.2,166.7,75.2,166.4,75.2z M134.9,74.3c-0.6,0-1.2-0.4-1.4-1c-3.4-9.2-8.6-17.5-15.4-24.8 c-0.6-0.6-0.5-1.6,0.1-2.1c0.6-0.6,1.6-0.5,2.1,0.1c7.1,7.5,12.5,16.2,16.1,25.8c0.3,0.8-0.1,1.6-0.9,1.9 C135.3,74.3,135.1,74.3,134.9,74.3z M26.5,61C26.5,61,26.4,61,26.5,61c-0.9-0.1-1.5-0.8-1.5-1.6c0.1-1.3,0.2-2.7,0.4-4.1 c1.3-9.9,5.3-17.9,11.9-23.7c0.6-0.6,1.6-0.5,2.1,0.1c0.6,0.6,0.5,1.6-0.1,2.1c-6,5.3-9.7,12.7-10.9,21.9c-0.2,1.3-0.3,2.6-0.4,3.8 C27.9,60.4,27.3,61,26.5,61z M199.2,52.4c-0.4,0-0.9-0.2-1.2-0.6c-0.5-0.6-0.4-1.6,0.2-2.1c7.6-6.1,15.1-12.8,22.3-19.8 c0.6-0.6,1.5-0.6,2.1,0c0.6,0.6,0.6,1.5,0,2.1c-7.3,7.1-14.9,13.8-22.6,20C199.9,52.3,199.5,52.4,199.2,52.4z M111.9,42.2 c-0.3,0-0.7-0.1-1-0.3c-7.6-6.3-16.5-11.1-25.7-14c-0.8-0.2-1.2-1.1-1-1.9c0.2-0.8,1.1-1.2,1.9-1c9.6,3,18.8,8,26.7,14.5 c0.6,0.5,0.7,1.5,0.2,2.1C112.7,42,112.3,42.2,111.9,42.2z M46.6,28.9c-0.6,0-1.1-0.3-1.4-0.9c-0.4-0.8,0-1.6,0.7-2 c5.9-2.8,12.7-4.2,20.2-4.2c3.3,0,6.7,0.3,10.1,0.8c0.8,0.1,1.4,0.9,1.2,1.7c-0.1,0.8-0.9,1.4-1.7,1.2c-3.2-0.5-6.5-0.8-9.6-0.8 c-7,0-13.4,1.3-18.9,3.9C47,28.8,46.8,28.9,46.6,28.9z M228.7,25.4c-0.4,0-0.8-0.1-1-0.4c-0.6-0.6-0.6-1.5,0-2.1 c6.8-7,13.5-14.6,19.8-22.3c0.5-0.6,1.5-0.7,2.1-0.2s0.7,1.5,0.2,2.1c-6.4,7.8-13.1,15.4-20,22.5C229.5,25.3,229.1,25.4,228.7,25.4 z" />
                    <path id="svgline_arr" className="st0" d="M29.9,256.8c-0.3,0-0.6-0.1-0.8-0.2l-29.3-19l19.1-29.3c0.5-0.7,1.4-0.9,2.1-0.4 c0.7,0.5,0.9,1.4,0.4,2.1L3.9,236.6L30.7,254c0.7,0.5,0.9,1.4,0.4,2.1C30.8,256.5,30.4,256.8,29.9,256.8z" />
                  </g>
                  <g id="mask_layer">
                    <path id="svgline_mask" className="st1" d="M248.3,0.1c0,0-51,72.7-132.1,96.2C32.7,120.5,6,61.5,43.3,29.5c26.8-23,95,11.2,97,63.4 c1.4,36.2-25.5,135.8-140.3,145.1" />
                  </g>
                </svg>
                <img src="/images/sfcc/txt_head_circle.svg" width="160" className="wsfcc__section__head__img__circle" alt="" />
                <div className="wsfcc__section__head__img__main">
                  <img src="/images/sfcc/img_head01.jpg?v3" alt="" />
                </div>
                <img src="/images/sfcc/img_head02.png" className="wsfcc__section__head__img__phone pc" alt="" />
                <img src="/images/sfcc/img_head02_sp.png" className="wsfcc__section__head__img__phone sp" alt="" />
              </div>
            </div>
            <img src="/images/sfcc/salesforce_partner.svg" className="wsfcc__section__head__img__logo" alt="" />
          </section>

          <section className="wsfcc__section wsfcc__section__about ">
            <div className="wsfcc__wrapper">
              <div className="wsfcc__section__about__top scrl_anim">
                <h2 className="wsfcc__section__about__h2 anim_obj01">
                  Warp Japan VISEOは、
                  <br />
                  ブランドとともにEコマースでの顧客体験の最適化を目指します。
                </h2>
                <p className="wsfcc__section__about__p anim_obj02">世界中のブランドから信頼されています</p>
                <ul className="wsfcc__section__about__logos anim_obj03">
                  <li className="wsfcc__section__about__logo"><img src="/images/sfcc/logo_longchamp.svg" alt="" /></li>
                  <li className="wsfcc__section__about__logo"><img src="/images/sfcc/logo_margarethowell.svg" alt="" /></li>
                  <li className="wsfcc__section__about__logo"><img src="/images/sfcc/logo_jillstuart.svg" alt="" /></li>
                  <li className="wsfcc__section__about__logo"><img src="/images/sfcc/logo_laline.svg" alt="" /></li>
                  <li className="wsfcc__section__about__logo"><img src="/images/sfcc/logo_guerlain.svg" alt="" /></li>
                </ul>
              </div>
              <div id="aboutSfcc" className="wsfcc__col2 rev scrl_anim">
                <div className="img">
                  <div className="rimg anim_obj01"><img src="/images/sfcc/img_about01.png" alt="" /></div>
                </div>
                <div className="txt anim_obj02">
                  <h3>
                    Commerce Cloudとは?
                  </h3>
                  <p className="wsfcc__btxt">
                    Commerce Cloudは、セールスフォースが提供するクラウド型Eコマースプラットフォームです。
                    <br />
                    Web、ソーシャル、モバイル、店舗など、あらゆるコマースの場面におけるあらゆる取引を統合できる特長を持っています。
                  </p>
                  <div className="wsfcc__stxt">
                    <p>
                      さらに、各顧客がどのようにブランドと関わりを持っているかを包括的に把握できます。
                      <br />
                      顧客がブランドを発見した時点から、商品やサービスをいつ、どのように購入したか、
                      そしてブランドとどのように交流したかなど、顧客の動きを一元管理し、分析することができます。
                    </p>
                  </div>
                </div>
              </div>
              <div className="wsfcc__col2 scrl_anim about02">
                <div className="img ">
                  <div className="rimg anim_obj01"><img src="/images/sfcc/img_about02.png" alt="" /></div>
                </div>
                <div className="txt anim_obj02">
                  <h3>
                    なぜCommerce Cloudを選ぶのか?
                  </h3>
                  <ul className="wsfcc__listtxt">
                    <li>
                      <h4>
                        統合されたオムニチャネル体験
                      </h4>
                      <div className="wsfcc__stxt">
                        <p>
                          Web、モバイル、ソーシャル、店舗などのあらゆるコマースの場面で、
                          一貫したオムニチャネル体験を提供することができます。
                          <br />
                          また、オンラインとオフラインの取引を統合し、
                          顧客の購買体験を最適化することができます。
                        </p>
                      </div>
                    </li>
                    <li>
                      <h4>
                        パーソナライズドなカスタマージャーニー
                      </h4>
                      <div className="wsfcc__stxt">
                        <p>
                          顧客の行動や好みに合わせたパーソナライズドなカスタマージャーニーを提供することができます。
                          <br />
                          これにより、顧客がブランドにより強く愛着を持ち、リピート購入や口コミを促進することができます。
                        </p>
                      </div>
                    </li>
                    <li>
                      <h4>
                        大規模かつ拡張性の高いプラットフォーム
                      </h4>
                      <div className="wsfcc__stxt">
                        <p>
                          高いスケーラビリティを持ち、急速に成長する企業にも対応できる大規模かつ拡張性の高いプラットフォームです。
                          <br />
                          また、世界中の顧客に対応するために、多言語や多通貨にも対応しています。
                        </p>
                      </div>
                    </li>
                    <li>
                      <h4>
                        AIによる予測分析
                      </h4>
                      <div className="wsfcc__stxt">
                        <p>
                          人工知能（AI）による予測分析を活用することができます。
                          <br />
                          これにより、商品の需要予測や在庫管理、マーケティングキャンペーンの最適化など、
                          効率的かつ正確なビジネス判断を行うことができます。
                        </p>
                      </div>
                    </li>
                    <li>
                      <h4>
                        安全性と信頼性
                      </h4>
                      <div className="wsfcc__stxt">
                        <p>
                          セールスフォースの高いセキュリティ基準に準拠しており、顧客情報や取引データの安全性と信頼性を確保しています。
                          <br />
                          また、セールスフォースでは24時間体制のサポート窓口も提供されており、緊急でサポートが必要な場合も安心です。
                          （※営業時間外のサポートはプレミアサクセスプランのみ利用でき、海外のサポート窓口（英語）での対応になります。）
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <section id="ourServices" className="wsfcc__section wsfcc__section__whatwedo ">
            <div className="wsfcc__wrapper">
              <h2 className="font_outfit scrl_anim">
                <span className="main anim_obj01 font_outfit">What we do</span>
              </h2>
              <div className="wsfcc__col2 align-items rev scrl_anim">
                <div className="img anim_obj01">
                  <div className="rimg"><img src="/images/sfcc/img_whatwedo01.jpg?v2" alt="" /></div>
                </div>
                <div className="txt anim_obj02">
                  <h4 className="font_outfit">Experience and achievements</h4>
                  <h3>
                    専門性と長年の実績
                  </h3>
                  <div className="wsfcc__stxt">
                    <p>
                      Warp Japan VISEOは、 Salesforce関連の案件を10年以上にわたり制作・運用しており、
                      パートナーの中でもトップクラスのSummitパートナーとして認定されています。
                      14の専門分野で150以上のSalesforce認定資格を取得しており、
                      コンサルティングファーム出身のコンサルタントとビジネスソリューションの経験を持つシニアチームによるサポート体制を備え、
                      アジアをはじめ全世界で800件以上の成功事例を持ち、 多くの顧客と長期的なパートナーシップを築いています。
                      専門性と長年にわたる実績を持つWarp Japan VISEOが、 あなたのビジネスを支援いたします。
                    </p>
                  </div>
                  <div className="wsfcc__logolist">
                    <ul className="wsfcc__logolist__ul">
                      <li><img src="/images/sfcc/salesforece_certified_01.jpg" alt="" /></li>
                      <li><img src="/images/sfcc/salesforece_certified_02.jpg" alt="" /></li>
                      <li><img src="/images/sfcc/salesforece_certified_03.jpg" alt="" /></li>
                      <li><img src="/images/sfcc/salesforece_certified_04.jpg" alt="" /></li>
                      <li><img src="/images/sfcc/salesforece_certified_05.jpg" alt="" /></li>
                      <li><img src="/images/sfcc/salesforece_certified_06.jpg" alt="" /></li>
                      <li><img src="/images/sfcc/salesforece_certified_07.jpg" alt="" /></li>
                      <li><img src="/images/sfcc/salesforece_certified_08.jpg" alt="" /></li>
                      <li><img src="/images/sfcc/salesforece_certified_09.jpg" alt="" /></li>
                      <li><img src="/images/sfcc/salesforece_certified_10.jpg" alt="" /></li>
                      <li><img src="/images/sfcc/salesforece_certified_11.jpg" alt="" /></li>
                      <li><img src="/images/sfcc/salesforece_certified_12.jpg" alt="" /></li>
                      <li><img src="/images/sfcc/salesforece_certified_13.jpg" alt="" /></li>
                      <li><img src="/images/sfcc/salesforece_certified_14.jpg" alt="" /></li>
                      <li><img src="/images/sfcc/salesforece_certified_01.jpg" alt="" /></li>
                      <li><img src="/images/sfcc/salesforece_certified_02.jpg" alt="" /></li>
                      <li><img src="/images/sfcc/salesforece_certified_03.jpg" alt="" /></li>
                      <li><img src="/images/sfcc/salesforece_certified_04.jpg" alt="" /></li>
                      <li><img src="/images/sfcc/salesforece_certified_05.jpg" alt="" /></li>
                      <li><img src="/images/sfcc/salesforece_certified_06.jpg" alt="" /></li>
                      <li><img src="/images/sfcc/salesforece_certified_07.jpg" alt="" /></li>
                      <li><img src="/images/sfcc/salesforece_certified_08.jpg" alt="" /></li>
                      <li><img src="/images/sfcc/salesforece_certified_09.jpg" alt="" /></li>
                      <li><img src="/images/sfcc/salesforece_certified_10.jpg" alt="" /></li>
                      <li><img src="/images/sfcc/salesforece_certified_11.jpg" alt="" /></li>
                      <li><img src="/images/sfcc/salesforece_certified_12.jpg" alt="" /></li>
                      <li><img src="/images/sfcc/salesforece_certified_13.jpg" alt="" /></li>
                      <li><img src="/images/sfcc/salesforece_certified_14.jpg" alt="" /></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="wsfcc__col2 align-items scrl_anim">
                <div className="img">
                  <div className="rimg anim_obj01"><img src="/images/sfcc/img_whatwedo02.jpg" alt="" /></div>
                  <img src="/images/sfcc/svg_img_arr2.svg" className="svg_img_arr2 anim_obj03" alt="" />
                </div>
                <div className="txt anim_obj02">
                  <h4 className="font_outfit">Salesforce multi-Cloud expertise</h4>
                  <h3>
                    マルチクラウドに関する専門知識
                  </h3>
                  <div className="wsfcc__stxt">
                    <p>
                      Salesforceは、マーケティング、
                      セールス、サービス、データ分析、
                      AIなどの一連のCRMを提供する包括的なマルチクラウドプラットフォームです。
                      Warp Japan VISEOは、Salesforceプラットフォーム全体に関する専門知識を用いたソリューションと実装を提供し、
                      エンゲージメントジャーニー全体で顧客体験を最適化することに誇りを持っています。
                    </p>
                  </div>
                </div>
              </div>
              {/*
              <div className="wsfcc__col2 align-items rev scrl_anim">
                <div className="img anim_obj01">
                  <div className="rimg"><img src="/images/sfcc/img_whatwedo03.jpg" alt="" /></div>
                </div>
                <div className="txt anim_obj02">
                  <h4 className="font_outfit">Overseas Expansion</h4>
                  <h3>
                    EC事業の海外展開
                  </h3>
                  <p className="wsfcc__btxt">
                    国内外のデザインや技術トレンドを抑えたグローバルなスタッフが在籍し、
                    最先端なクリエイティブ制作や多言語対応サイト、海外ブランドのローカライズなどを得意としています。
                    <br />
                    <br />
                    すでに、海外越境ECの構築、運営の実績が豊富にあり、安心してお任せいただけます。
                  </p>
                </div>
              </div>
              */}
            </div>
          </section>
          <section className="wsfcc__section wsfcc__section__more ">
            <svg className="anim_svg_line" width="255px" x="0px" y="0px" viewBox="0 0 250.4 256.8" xmlSpace="preserve">
              <g id="line_layer">
                <path id="svgline" className="st0" d="M3.9,238.8c-0.4,0-0.7,0-0.9,0c-0.8,0-1.5-0.7-1.5-1.5c0-0.8,0.7-1.5,1.5-1.5c0,0,0,0,0,0 c0.2,0,0.5,0,0.9,0c3.9,0,14.5-0.4,28.4-4.1c0.8-0.2,1.6,0.3,1.8,1.1s-0.3,1.6-1.1,1.8C18.9,238.4,8,238.8,3.9,238.8z M42.3,231.7 c-0.6,0-1.2-0.4-1.4-1c-0.3-0.8,0.1-1.6,0.9-1.9c9.3-3.2,18.3-7.5,26.7-12.7c0.7-0.4,1.6-0.2,2.1,0.5c0.4,0.7,0.2,1.6-0.5,2.1 c-8.6,5.3-17.8,9.7-27.3,13C42.6,231.7,42.4,231.7,42.3,231.7z M77.6,213.3c-0.5,0-0.9-0.2-1.2-0.6c-0.5-0.7-0.3-1.6,0.3-2.1 c7.9-5.7,15.3-12.4,22-19.8c0.6-0.6,1.5-0.7,2.1-0.1s0.7,1.5,0.1,2.1c-6.9,7.6-14.4,14.4-22.5,20.2 C78.2,213.2,77.9,213.3,77.6,213.3z M106.3,185.6c-0.3,0-0.7-0.1-0.9-0.3c-0.6-0.5-0.8-1.5-0.2-2.1c6-7.5,11.5-15.8,16.3-24.8 c0.4-0.7,1.3-1,2-0.6c0.7,0.4,1,1.3,0.6,2c-5,9.1-10.6,17.6-16.6,25.2C107.2,185.4,106.7,185.6,106.3,185.6z M127.3,151.7 c-0.2,0-0.4,0-0.6-0.1c-0.7-0.4-1.1-1.3-0.7-2c4.5-9.5,7.9-18.9,9.9-27.9c0.2-0.8,1-1.3,1.8-1.1c0.8,0.2,1.3,1,1.1,1.8 c-2.1,9.3-5.5,18.9-10.1,28.5C128.4,151.4,127.9,151.7,127.3,151.7z M139,113.7c-0.1,0-0.1,0-0.2,0c-0.8-0.1-1.4-0.9-1.3-1.7 c0.5-3.8,0.7-7.7,0.7-11.4c0-3.6-0.2-7.2-0.7-10.7c-2.2,0.9-4.4,1.8-6.6,2.6c-0.8,0.3-1.6-0.1-1.9-0.9c-0.3-0.8,0.1-1.6,0.9-1.9 c2.4-0.9,4.8-1.9,7.2-2.9c-0.2-1.4-0.5-2.8-0.8-4.2c-0.2-0.8,0.3-1.6,1.1-1.8c0.8-0.2,1.6,0.3,1.8,1.1c0.3,1.2,0.5,2.4,0.7,3.6 c5.7-2.5,11.4-5.3,17-8.3c0.7-0.4,1.6-0.1,2,0.6s0.1,1.6-0.6,2c-6,3.2-12,6.1-18,8.7c0.5,3.9,0.8,7.9,0.8,11.9 c0,3.8-0.3,7.8-0.7,11.8C140.4,113.1,139.8,113.7,139,113.7z M78,103.4C78,103.4,78,103.4,78,103.4c-9.9,0-18.7-1.4-26.3-4.1 c-0.8-0.3-1.2-1.1-0.9-1.9c0.3-0.8,1.1-1.2,1.9-0.9c7.2,2.6,15.7,4,25.2,4c1.2,0,2.5,0,3.8-0.1c0.8,0,1.5,0.6,1.6,1.4 c0,0.8-0.6,1.5-1.4,1.6C80.6,103.4,79.3,103.4,78,103.4z M91.8,102.5c-0.7,0-1.4-0.6-1.5-1.3c-0.1-0.8,0.5-1.6,1.3-1.7 c9.2-1.1,19-3.3,28.9-6.5c0.8-0.3,1.6,0.2,1.9,1c0.3,0.8-0.2,1.6-1,1.9c-10.2,3.3-20.1,5.5-29.5,6.6 C91.9,102.5,91.9,102.5,91.8,102.5z M43.3,95c-0.3,0-0.5-0.1-0.8-0.2c-9.3-5.8-15.2-14.5-17-25c-0.1-0.8,0.4-1.6,1.2-1.7 c0.8-0.1,1.6,0.4,1.7,1.2c1.7,9.8,6.9,17.6,15.6,23c0.7,0.4,0.9,1.4,0.5,2.1C44.3,94.8,43.8,95,43.3,95z M166.4,75.2 c-0.5,0-1-0.3-1.3-0.7c-0.4-0.7-0.2-1.6,0.5-2.1c8.4-4.9,16.7-10.5,24.8-16.6c0.7-0.5,1.6-0.4,2.1,0.3c0.5,0.7,0.4,1.6-0.3,2.1 c-8.2,6.1-16.6,11.8-25,16.8C166.9,75.2,166.7,75.2,166.4,75.2z M134.9,74.3c-0.6,0-1.2-0.4-1.4-1c-3.4-9.2-8.6-17.5-15.4-24.8 c-0.6-0.6-0.5-1.6,0.1-2.1c0.6-0.6,1.6-0.5,2.1,0.1c7.1,7.5,12.5,16.2,16.1,25.8c0.3,0.8-0.1,1.6-0.9,1.9 C135.3,74.3,135.1,74.3,134.9,74.3z M26.5,61C26.5,61,26.4,61,26.5,61c-0.9-0.1-1.5-0.8-1.5-1.6c0.1-1.3,0.2-2.7,0.4-4.1 c1.3-9.9,5.3-17.9,11.9-23.7c0.6-0.6,1.6-0.5,2.1,0.1c0.6,0.6,0.5,1.6-0.1,2.1c-6,5.3-9.7,12.7-10.9,21.9c-0.2,1.3-0.3,2.6-0.4,3.8 C27.9,60.4,27.3,61,26.5,61z M199.2,52.4c-0.4,0-0.9-0.2-1.2-0.6c-0.5-0.6-0.4-1.6,0.2-2.1c7.6-6.1,15.1-12.8,22.3-19.8 c0.6-0.6,1.5-0.6,2.1,0c0.6,0.6,0.6,1.5,0,2.1c-7.3,7.1-14.9,13.8-22.6,20C199.9,52.3,199.5,52.4,199.2,52.4z M111.9,42.2 c-0.3,0-0.7-0.1-1-0.3c-7.6-6.3-16.5-11.1-25.7-14c-0.8-0.2-1.2-1.1-1-1.9c0.2-0.8,1.1-1.2,1.9-1c9.6,3,18.8,8,26.7,14.5 c0.6,0.5,0.7,1.5,0.2,2.1C112.7,42,112.3,42.2,111.9,42.2z M46.6,28.9c-0.6,0-1.1-0.3-1.4-0.9c-0.4-0.8,0-1.6,0.7-2 c5.9-2.8,12.7-4.2,20.2-4.2c3.3,0,6.7,0.3,10.1,0.8c0.8,0.1,1.4,0.9,1.2,1.7c-0.1,0.8-0.9,1.4-1.7,1.2c-3.2-0.5-6.5-0.8-9.6-0.8 c-7,0-13.4,1.3-18.9,3.9C47,28.8,46.8,28.9,46.6,28.9z M228.7,25.4c-0.4,0-0.8-0.1-1-0.4c-0.6-0.6-0.6-1.5,0-2.1 c6.8-7,13.5-14.6,19.8-22.3c0.5-0.6,1.5-0.7,2.1-0.2s0.7,1.5,0.2,2.1c-6.4,7.8-13.1,15.4-20,22.5C229.5,25.3,229.1,25.4,228.7,25.4 z" />
                <path id="svgline_arr" className="st0" d="M29.9,256.8c-0.3,0-0.6-0.1-0.8-0.2l-29.3-19l19.1-29.3c0.5-0.7,1.4-0.9,2.1-0.4 c0.7,0.5,0.9,1.4,0.4,2.1L3.9,236.6L30.7,254c0.7,0.5,0.9,1.4,0.4,2.1C30.8,256.5,30.4,256.8,29.9,256.8z" />
              </g>
              <g id="mask_layer">
                <path id="svgline_mask" className="st1" d="M248.3,0.1c0,0-51,72.7-132.1,96.2C32.7,120.5,6,61.5,43.3,29.5c26.8-23,95,11.2,97,63.4 c1.4,36.2-25.5,135.8-140.3,145.1" />
              </g>
            </svg>
            <div className="scrl_anim">
              <h2 className="font_outfit  anim_obj02">
                <span className="main font_outfit">More with us and Salesforce Commerce Cloud</span>
                <span className="main font_outfit">More with us and Salesforce Commerce Cloud</span>
              </h2>
            </div>
            <div className="wsfcc__wrapper">
              <div id="ws_video_wrap" className="wsfcc__col2 align-items scrl_anim">
                <div className="img anim_obj01">
                  <div className="rimg imgInVideo">
                    <img src="/images/sfcc/img_more.png" alt="" />
                    <div className="video">
                      <video id="ws_video" muted playsInline>
                        <source src="/video/sfcc_web01.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </div>
                </div>
                <div className="txt anim_obj02">
                  <h4 className="font_outfit">Digital strategy scoping & e-commerce REPLATFORMING</h4>
                  <h3>
                    デジタル戦略とEコマースの再構築
                  </h3>
                  <p className="wsfcc__btxt">
                    Warp Japan VISEOでは、戦略策定から実行までの総合的なサポートを提供いたします。
                  </p>
                  <ul className="wsfcc__listtxt">
                    <li>
                      <h4>
                        戦略策定
                      </h4>
                      <div className="wsfcc__stxt">
                        <p>
                          お客様のビジネスニーズに合わせた戦略策定を行います。
                          その際、市場調査や競合分析などのデータに基づき、最適な戦略を提案いたします。
                        </p>
                      </div>
                    </li>
                    <li>
                      <h4>サイト構築</h4>
                      <div className="wsfcc__stxt">
                        <p>
                          1からビジネスニーズを満たすサイトを構築するのは困難です。
                          そこで、私たちが設計・開発から運用まで、お客様のニーズに合わせたサイト構築をトータルサポートいたします。
                        </p>
                      </div>
                    </li>
                    <li>
                      <h4>
                        マーケティング支援
                      </h4>
                      <div className="wsfcc__stxt">
                        <p>
                          お客様のマーケティング戦略に合わせたキャンペーン設計や施策実行を支援し、
                          売上アップにつながる施策を提案いたします。
                        </p>
                      </div>
                    </li>
                    <li>
                      <h4>
                        運用サポート
                      </h4>
                      <div className="wsfcc__stxt">
                        <p>
                          お客様の運用業務をサポートし、安定的な運用を支援します。
                          また、最新の機能やアップデート情報などを常にお客様に提供し、サイトの最適化に貢献いたします。
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div id="ws_video_wrap2" className="wsfcc__col2 align-items rev scrl_anim">
                <div className="img anim_obj01">
                  <div className="rimg imgInVideo">
                    <img src="/images/sfcc/img_more.png" alt="" />
                    <div className="video">
                      <video id="ws_video2" muted playsInline>
                        <source src="/video/sfcc_web02.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </div>
                </div>
                <div className="txt anim_obj02">
                  <h4 className="font_outfit">E-commerce & supply chain replatforming</h4>
                  <h3>
                    Eコマース＆サプライチェーンのリプラットフォームとの連携
                  </h3>
                  <ul className="wsfcc__listtxt">
                    <li>
                      <h4>ShipHero</h4>
                      <div className="wsfcc__stxt">
                        <p>
                          Eコマースビジネスに最適化されたウェアハウス管理システムを提供する、
                          クラウドベースのサプライチェーンプラットフォームです。
                          ShipHeroは、Salesforce Commerce Cloudと直接統合され、受注処理から発送までのプロセスを自動化し、
                          追跡可能な配送情報を提供します。
                        </p>
                      </div>
                    </li>
                    <li>
                      <h4>
                        Orderbot
                      </h4>
                      <div className="wsfcc__stxt">
                        <p>
                          Eコマースビジネス向けに設計された、
                          クラウドベースのオーダーマネジメントシステムです。
                          Orderbotは、Salesforce Commerce Cloudと直接統合され、
                          受注処理、在庫管理、配送、返品処理、支払い処理などの全てのオーダープロセスを自動化することができます。
                        </p>
                      </div>
                    </li>
                    <li>
                      <h4>
                        TradeGecko
                      </h4>
                      <div className="wsfcc__stxt">
                        <p>
                          在庫管理、発注管理、会計、顧客管理などのビジネスプロセスを統合するための
                          オールインワン型のクラウドベースのサプライチェーンプラットフォームです。
                          TradeGeckoは、Salesforce Commerce Cloudと直接統合され、在庫レベルを自動的に更新し、
                          販売チャンネルからの注文を自動的に受信し、追跡可能な配送情報を提供します。
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <Scroll to="contact" smooth className="bl_btn font_outfit ">今すぐ相談する</Scroll>

            </div>
          </section>
          <section id="ourWorks" className="wsfcc__section wsfcc__section__sfccwork ">
            <div className="wsfcc__wrapper">
              <h2 className="font_outfit scrl_anim">
                <span className="main anim_obj01 font_outfit">Our Salesforce Commerce Cloud Works</span>
              </h2>
              <ul className="wsfcc__section__sfccwork__ul scrl_anim">
                <li className="wsfcc__section__sfccwork__li anim_obj01">
                  <div className="wsfcc__section__sfccwork__li__inner">
                    <div className="img">
                      <a href="https://www.margarethowell.jp/" target="_blank" rel="noreferrer">
                        <img src="/images/sfcc/img_sfccwork01.png" alt="" />
                      </a>
                    </div>
                    <div className="txt">
                      <h3 className="font_outfit">MARGARET HOWELL</h3>
                      <p>
                        ブランド・ECサイトのリニューアルに伴い、
                        ECプラットフォームCommerce cloudを用いてUIUXデザイン・フロントエンドを担当。
                        日本独自のコンテンツを盛り込みつつ本国のデザインを踏襲し、
                        シンプルかつ優れたスタイルを作りつづけるブランドのイメージにマッチするように構築しました。
                        サイトリリース後も運用および特集ページの制作を担い、ユーザーの志向・行動の変化に合わて都度マイナーチェンジを行っています。
                        MARGARET HOWELLのブランド・ECサイトは、よりブランドを魅力的に伝えるだけでなく、
                        使いやすく顧客のニーズに応えるサイトとなりました。
                      </p>
                      <a href="https://www.margarethowell.jp/" target="_blank" rel="noreferrer" className="btn font_outfit">Visit website</a>
                    </div>
                  </div>
                </li>
                <li className="wsfcc__section__sfccwork__li anim_obj02">
                  <div className="wsfcc__section__sfccwork__li__inner">
                    <img src="/images/sfcc/svg_img_arr2.svg" className="svg_img_arr2" alt="" />
                    <div className="img">
                      <a href="https://www.the-lib.jp/" target="_blank" rel="noreferrer">
                        <img src="/images/sfcc/img_sfccwork02.png" alt="" />
                      </a>
                    </div>
                    <div className="txt">
                      <h3 className="font_outfit">THE LIBRARY</h3>
                      <p>
                        THE LIBRARYは、国内外から厳選されたウィメンズ・メンズのウェアやライフスタイルグッズなどを取り揃えるセレクトショップです。
                        私たちは、このECサイトのデザインからフロントエンドまでをCommerce Cloudで担当しました。
                        デザイン性の高いサイトを構築し、高い評価を得ています。
                        さらに、サイトの運用やコンテンツ制作も行っており、
                        常に最新のトレンドを取り入れたエキサイティングなショッピング体験を提供しています。
                      </p>
                      <a href="https://www.the-lib.jp/" target="_blank" rel="noreferrer" className="btn font_outfit">Visit website</a>
                    </div>
                  </div>
                </li>
                <li className="wsfcc__section__sfccwork__li anim_obj03">
                  <div className="wsfcc__section__sfccwork__li__inner">
                    <div className="img">
                      <a href="https://www.laline.jp/" target="_blank" rel="noreferrer">
                        <img src="/images/sfcc/img_sfccwork03.png" alt="" />
                      </a>
                    </div>
                    <div className="txt">
                      <h3 className="font_outfit">LALINE</h3>
                      <p>
                        イスラエルの化粧品ブランド「LALINE」のオンラインストアを、弊社がリニューアルしました。
                        プラットフォームにはCommerce Cloudを採用し、
                        UI・UXの改善やコンテンツの簡単な更新機能を実装しました。
                        その結果、リニューアル前と比較して売上が大幅に改善されました。
                        弊社は常に最新の技術とトレンドを取り入れながら、お客様のビジネス成長をサポートしてまいります。
                      </p>
                      <a href="https://www.laline.jp/" target="_blank" rel="noreferrer" className="btn font_outfit">Visit website</a>
                    </div>
                  </div>
                </li>
                <li className="wsfcc__section__sfccwork__li anim_obj04">
                  <div className="wsfcc__section__sfccwork__li__inner">
                    <div className="img">
                      <a href="https://www.jillstuart.jp/" target="_blank" rel="noreferrer">
                        <img src="/images/sfcc/img_sfccwork04.png" alt="" />
                      </a>
                    </div>
                    <div className="txt">
                      <h3 className="font_outfit">JILLSTUART</h3>
                      <p>
                        スキンケア、コスメ、アパレルまで幅広く展開するブランド「JILLSTUART」のECサイトを制作しました。
                        Commerce cloudを利用し、デザインからフロントエンドまでを担当しました。
                        スタッフコーディネートを掲載する仕組みなど、
                        顧客の関心を引き付けるコンテンツを追加実装し、
                        サイトの改善にも力を注いでいます。
                      </p>
                      <a href="https://www.jillstuart.jp/" target="_blank" rel="noreferrer" className="btn font_outfit">Visit website</a>
                    </div>
                  </div>
                </li>
                <li className="wsfcc__section__sfccwork__li anim_obj05">
                  <div className="wsfcc__section__sfccwork__li__inner">
                    <div className="img">
                      <a href="https://www.longchamp.com/jp/ja" target="_blank" rel="noreferrer">
                        <img src="/images/sfcc/img_sfccwork05.png" alt="" />
                      </a>
                    </div>
                    <div className="txt">
                      <h3 className="font_outfit">LONGCHAMP</h3>
                      <p>
                        欧州向けコアモデルの実装や米国およびアジアへの展開など、戦略策定から実装までの総合的なサポートを提供。
                        この取り組みの中で、Commerce Cloudを活用し、注文の割り当てやスケジューリングの最適化、
                        オムニチャネルサービスの実装、クリック＆コレクト、店舗からの出荷、
                        店舗からWeb店舗内アプリケーションへの変換などを実現しました。
                        これにより、顧客のニーズに応えながらビジネスを拡大し、競争力を高めることができました。
                      </p>
                      <a href="https://www.longchamp.com/jp/ja" target="_blank" rel="noreferrer" className="btn font_outfit">Visit website</a>
                    </div>
                  </div>
                </li>
                <li className="wsfcc__section__sfccwork__li anim_obj06">
                  <div className="wsfcc__section__sfccwork__li__inner">
                    <div className="img">
                      <a href="https://www.guerlain.com" target="_blank" rel="noreferrer">
                        <img src="/images/sfcc/img_sfccwork06.png" alt="" />
                      </a>
                    </div>
                    <div className="txt">
                      <h3 className="font_outfit">GUERLAIN</h3>
                      <p>
                        Commerce Cloudの新アーキテクチャであるSFRAを使用して、ウェブサイトのリニューアルを実施しました。
                        米国市場向けにはGTMおよびADA対応を実装し、SFRAデフォルトナビゲーションをカスタマイズしました。
                        弊社はウェブサイトの制作からバックエンドのカスタマイズの管理までを行い、日本市場での展開にも取り組みました。
                        このリニューアルにより、弊社の顧客により良いユーザーエクスペリエンスを提供することができました。
                      </p>
                      <a href="https://www.guerlain.com" target="_blank" rel="noreferrer" className="btn font_outfit">Visit website</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </section>
          <section id="contact" className="wsfcc__section wsfcc__section__form scrl_anim">
            <div className="wsfcc__wrapper">
              <svg className="anim_svg_line" width="255px" x="0px" y="0px" viewBox="0 0 250.4 256.8" xmlSpace="preserve">
                <g id="line_layer">
                  <path id="svgline" className="st0" d="M3.9,238.8c-0.4,0-0.7,0-0.9,0c-0.8,0-1.5-0.7-1.5-1.5c0-0.8,0.7-1.5,1.5-1.5c0,0,0,0,0,0 c0.2,0,0.5,0,0.9,0c3.9,0,14.5-0.4,28.4-4.1c0.8-0.2,1.6,0.3,1.8,1.1s-0.3,1.6-1.1,1.8C18.9,238.4,8,238.8,3.9,238.8z M42.3,231.7 c-0.6,0-1.2-0.4-1.4-1c-0.3-0.8,0.1-1.6,0.9-1.9c9.3-3.2,18.3-7.5,26.7-12.7c0.7-0.4,1.6-0.2,2.1,0.5c0.4,0.7,0.2,1.6-0.5,2.1 c-8.6,5.3-17.8,9.7-27.3,13C42.6,231.7,42.4,231.7,42.3,231.7z M77.6,213.3c-0.5,0-0.9-0.2-1.2-0.6c-0.5-0.7-0.3-1.6,0.3-2.1 c7.9-5.7,15.3-12.4,22-19.8c0.6-0.6,1.5-0.7,2.1-0.1s0.7,1.5,0.1,2.1c-6.9,7.6-14.4,14.4-22.5,20.2 C78.2,213.2,77.9,213.3,77.6,213.3z M106.3,185.6c-0.3,0-0.7-0.1-0.9-0.3c-0.6-0.5-0.8-1.5-0.2-2.1c6-7.5,11.5-15.8,16.3-24.8 c0.4-0.7,1.3-1,2-0.6c0.7,0.4,1,1.3,0.6,2c-5,9.1-10.6,17.6-16.6,25.2C107.2,185.4,106.7,185.6,106.3,185.6z M127.3,151.7 c-0.2,0-0.4,0-0.6-0.1c-0.7-0.4-1.1-1.3-0.7-2c4.5-9.5,7.9-18.9,9.9-27.9c0.2-0.8,1-1.3,1.8-1.1c0.8,0.2,1.3,1,1.1,1.8 c-2.1,9.3-5.5,18.9-10.1,28.5C128.4,151.4,127.9,151.7,127.3,151.7z M139,113.7c-0.1,0-0.1,0-0.2,0c-0.8-0.1-1.4-0.9-1.3-1.7 c0.5-3.8,0.7-7.7,0.7-11.4c0-3.6-0.2-7.2-0.7-10.7c-2.2,0.9-4.4,1.8-6.6,2.6c-0.8,0.3-1.6-0.1-1.9-0.9c-0.3-0.8,0.1-1.6,0.9-1.9 c2.4-0.9,4.8-1.9,7.2-2.9c-0.2-1.4-0.5-2.8-0.8-4.2c-0.2-0.8,0.3-1.6,1.1-1.8c0.8-0.2,1.6,0.3,1.8,1.1c0.3,1.2,0.5,2.4,0.7,3.6 c5.7-2.5,11.4-5.3,17-8.3c0.7-0.4,1.6-0.1,2,0.6s0.1,1.6-0.6,2c-6,3.2-12,6.1-18,8.7c0.5,3.9,0.8,7.9,0.8,11.9 c0,3.8-0.3,7.8-0.7,11.8C140.4,113.1,139.8,113.7,139,113.7z M78,103.4C78,103.4,78,103.4,78,103.4c-9.9,0-18.7-1.4-26.3-4.1 c-0.8-0.3-1.2-1.1-0.9-1.9c0.3-0.8,1.1-1.2,1.9-0.9c7.2,2.6,15.7,4,25.2,4c1.2,0,2.5,0,3.8-0.1c0.8,0,1.5,0.6,1.6,1.4 c0,0.8-0.6,1.5-1.4,1.6C80.6,103.4,79.3,103.4,78,103.4z M91.8,102.5c-0.7,0-1.4-0.6-1.5-1.3c-0.1-0.8,0.5-1.6,1.3-1.7 c9.2-1.1,19-3.3,28.9-6.5c0.8-0.3,1.6,0.2,1.9,1c0.3,0.8-0.2,1.6-1,1.9c-10.2,3.3-20.1,5.5-29.5,6.6 C91.9,102.5,91.9,102.5,91.8,102.5z M43.3,95c-0.3,0-0.5-0.1-0.8-0.2c-9.3-5.8-15.2-14.5-17-25c-0.1-0.8,0.4-1.6,1.2-1.7 c0.8-0.1,1.6,0.4,1.7,1.2c1.7,9.8,6.9,17.6,15.6,23c0.7,0.4,0.9,1.4,0.5,2.1C44.3,94.8,43.8,95,43.3,95z M166.4,75.2 c-0.5,0-1-0.3-1.3-0.7c-0.4-0.7-0.2-1.6,0.5-2.1c8.4-4.9,16.7-10.5,24.8-16.6c0.7-0.5,1.6-0.4,2.1,0.3c0.5,0.7,0.4,1.6-0.3,2.1 c-8.2,6.1-16.6,11.8-25,16.8C166.9,75.2,166.7,75.2,166.4,75.2z M134.9,74.3c-0.6,0-1.2-0.4-1.4-1c-3.4-9.2-8.6-17.5-15.4-24.8 c-0.6-0.6-0.5-1.6,0.1-2.1c0.6-0.6,1.6-0.5,2.1,0.1c7.1,7.5,12.5,16.2,16.1,25.8c0.3,0.8-0.1,1.6-0.9,1.9 C135.3,74.3,135.1,74.3,134.9,74.3z M26.5,61C26.5,61,26.4,61,26.5,61c-0.9-0.1-1.5-0.8-1.5-1.6c0.1-1.3,0.2-2.7,0.4-4.1 c1.3-9.9,5.3-17.9,11.9-23.7c0.6-0.6,1.6-0.5,2.1,0.1c0.6,0.6,0.5,1.6-0.1,2.1c-6,5.3-9.7,12.7-10.9,21.9c-0.2,1.3-0.3,2.6-0.4,3.8 C27.9,60.4,27.3,61,26.5,61z M199.2,52.4c-0.4,0-0.9-0.2-1.2-0.6c-0.5-0.6-0.4-1.6,0.2-2.1c7.6-6.1,15.1-12.8,22.3-19.8 c0.6-0.6,1.5-0.6,2.1,0c0.6,0.6,0.6,1.5,0,2.1c-7.3,7.1-14.9,13.8-22.6,20C199.9,52.3,199.5,52.4,199.2,52.4z M111.9,42.2 c-0.3,0-0.7-0.1-1-0.3c-7.6-6.3-16.5-11.1-25.7-14c-0.8-0.2-1.2-1.1-1-1.9c0.2-0.8,1.1-1.2,1.9-1c9.6,3,18.8,8,26.7,14.5 c0.6,0.5,0.7,1.5,0.2,2.1C112.7,42,112.3,42.2,111.9,42.2z M46.6,28.9c-0.6,0-1.1-0.3-1.4-0.9c-0.4-0.8,0-1.6,0.7-2 c5.9-2.8,12.7-4.2,20.2-4.2c3.3,0,6.7,0.3,10.1,0.8c0.8,0.1,1.4,0.9,1.2,1.7c-0.1,0.8-0.9,1.4-1.7,1.2c-3.2-0.5-6.5-0.8-9.6-0.8 c-7,0-13.4,1.3-18.9,3.9C47,28.8,46.8,28.9,46.6,28.9z M228.7,25.4c-0.4,0-0.8-0.1-1-0.4c-0.6-0.6-0.6-1.5,0-2.1 c6.8-7,13.5-14.6,19.8-22.3c0.5-0.6,1.5-0.7,2.1-0.2s0.7,1.5,0.2,2.1c-6.4,7.8-13.1,15.4-20,22.5C229.5,25.3,229.1,25.4,228.7,25.4 z" />
                  <path id="svgline_arr" className="st0" d="M29.9,256.8c-0.3,0-0.6-0.1-0.8-0.2l-29.3-19l19.1-29.3c0.5-0.7,1.4-0.9,2.1-0.4 c0.7,0.5,0.9,1.4,0.4,2.1L3.9,236.6L30.7,254c0.7,0.5,0.9,1.4,0.4,2.1C30.8,256.5,30.4,256.8,29.9,256.8z" />
                </g>
                <g id="mask_layer">
                  <path id="svgline_mask" className="st1" d="M248.3,0.1c0,0-51,72.7-132.1,96.2C32.7,120.5,6,61.5,43.3,29.5c26.8-23,95,11.2,97,63.4 c1.4,36.2-25.5,135.8-140.3,145.1" />
                </g>
              </svg>
              <div className="wsfcc__section__form__head anim_obj01">
                <h2 className="font_outfit">Let’s work together</h2>
                <p>
                  Salesforce Commerce CloudでECサイトを始めませんか？
                  <br />
                  ご気軽にお問い合わせください。
                </p>
              </div>
              <div className="wsfcc__section__form__btns anim_obj02">
                <a href="tel:03-6441-2450" className="wsfcc__section__form__btn wsfcc__section__form__btn--tel">
                  <svg xmlns="http://www.w3.org/2000/svg" width="27.804" height="27.811" viewBox="0 0 27.804 27.811">
                    <path id="phone" d="M18.042,18.043c-2.752,2.75-5.94,5.382-7.2,4.122-1.8-1.8-2.915-3.374-6.892-.177s-.921,5.326.826,7.071c2.016,2.016,9.533.108,16.962-7.32S31.069,6.792,29.051,4.776c-1.747-1.749-3.868-4.8-7.063-.826s-1.627,5.088.179,6.892C23.423,12.1,20.792,15.291,18.042,18.043Z" transform="translate(-2.001 -2)" fill="#fff" />
                  </svg>
                  <span className="font_outfit">03-6441-2450</span>
                </a>
                <a href="mailto:info@warpjapan.com" className="wsfcc__section__form__btn wsfcc__section__form__btn--mail">
                  <svg xmlns="http://www.w3.org/2000/svg" width="31.29" height="20.859" viewBox="0 0 31.29 20.859">
                    <path id="mail" d="M2,6.235l13.037,7a3.758,3.758,0,0,0,3.15,0l13.037-7C32.072,5.778,32.875,4,31.316,4H1.906C.346,4,1.149,5.778,2,6.235Zm29.619,3.83c-.965.5-12.841,6.691-13.432,7a2.962,2.962,0,0,1-1.575.346,2.962,2.962,0,0,1-1.575-.346c-.591-.309-12.4-6.5-13.364-7C.993,9.709,1,10.124,1,10.444V23.121A2.116,2.116,0,0,0,2.738,24.86H30.551a2.116,2.116,0,0,0,1.738-1.738V10.446C32.29,10.126,32.3,9.71,31.617,10.065Z" transform="translate(-1 -4)" fill="#fff" />
                  </svg>
                  <span className="font_outfit">info@warpjapan.com</span>
                </a>
              </div>
              <form className="contactForm" name="contactForm">
                <div className="wsfcc__section__form__row">
                  <div id="formNameSei" className="wsfcc__section__form__col">
                    <label htmlFor="name_sei" className="wsfcc__section__form__label">
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
                  <div id="formNameMei" className="wsfcc__section__form__col">
                    <label htmlFor="name_mei" className="wsfcc__section__form__label">
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
                <div className="wsfcc__section__form__row">
                  <div id="form_email" className="wsfcc__section__form__col">
                    <label htmlFor="email" className="wsfcc__section__form__label">
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
                  <div id="formCompany" className="wsfcc__section__form__col">
                    <label htmlFor="company" className="wsfcc__section__form__label">
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
                <div className="wsfcc__section__form__row">
                  <div id="formPhone" className="wsfcc__section__form__col col1">
                    <label htmlFor="phone" className="wsfcc__section__form__label">
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
                <div className="wsfcc__section__form__row">
                  <div id="form_content" className="wsfcc__section__form__col col1">
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

                <div className="wsfcc__section__form__row">
                  <button id="submitBtn" className="submitBtn" onClick={submitBtnClick} type="button">送信</button>
                </div>
              </form>
            </div>
          </section>
          <footer className="wsfcc__footer">
            <div className="wsfcc__wrapper">
              <div className="wsfcc__footer__left">
                <h3><img src="/images/sfcc/ttl_footer.svg" alt="" /></h3>
                <p>
                  私たちは、デジタル領域を中心としたプランニング、デザイン、テクノロジーによって、
                  ビジネスの成長に貢献することをミッションとするデジタルエージェンシーです。
                </p>
              </div>
              <div className="wsfcc__footer__right">
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
              <p className="wsfcc__footer__copy font_outfit">
                &copy;2022 Warp japan Viseo
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
      'sfccpage',
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

  const userID = process.env.REACT_APP_USER_ID;
  const serviceID = process.env.REACT_APP_SERVICE_ID;
  const templateID = process.env.REACT_APP_TEMPLATE_ID;
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
      userID,
      serviceID,
      templateID,
    },
  };
}

export default SfccPage;

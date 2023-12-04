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
 * Shopify Page component
 */

function ShopifyPage({ userID, serviceID, templateID }) {
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

  function playVideo(el) {
    const vid = document.getElementById(el);
    vid.play();
    // console.log('playing video');
  }

  useEffect(() => {
    ScrollTrigger.create({
      trigger: '.ws__section__head',
      start: '100px top',
      toggleClass: { targets: '.ws__section__head', className: 'scrolled' },
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
        <title>Shopify | Warp Japan VISEO</title>
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
      <div className="ws__body">
        <header className="ws__header">
          <div className="ws__wrapper">
            <h1 className="ws__header__h1">
              <NextLink href="/">
                <img src="/images/shopify/logo.svg" alt="warpjapan viseo" />
              </NextLink>
            </h1>
            <ul className="ws__header__ul">
              <li className="ws__header__li font_outfit">
                <Scroll to="aboutShopify" smooth>About Shopify</Scroll>
              </li>
              <li className="ws__header__li font_outfit">
                <Scroll to="ourServices" smooth>Our Services</Scroll>
              </li>
              <li className="ws__header__li font_outfit">
                <Scroll to="ourWorks" smooth>Our Works</Scroll>
              </li>
            </ul>
            <Scroll to="contact" smooth className="ws__header__btn font_outfit">
              <span>Get Started</span>
              <svg width="33px" x="0px" y="0px" viewBox="0 0 33.8 8.7" xmlSpace="preserve"><polygon className="st0" points="29.4,0 28.7,0.7 31.8,3.9 0,3.9 0,4.9 31.8,4.9 28.7,8 29.4,8.7 33.8,4.4 " /></svg>
            </Scroll>
          </div>
        </header>
        <main className="ws__main">
          <section className="ws__section ws__section__head scrl_anim">
            <h2 className="ws__section__head__h2 anim_obj02">
              世界中で選ばれる
              <br className="sp_show" />
              Shopifyで
              <br />
              あなたのビジネスに
              <br className="sp_show" />
              合わせた
              <br className="sp_show" />
              ECサイトを実現
            </h2>
            <p className="ws__section__head__p anim_obj03">
              国内有数の構築力と実績
              <br />
              公式認定Shopifyエキスパートとして、
              <br className="sp_show" />
              Warp Japan VISEOが
              <br className="sp_show" />
              あなたのビジネスを支援します
            </p>
            <p className="anim_obj03">
              <Scroll to="contact" smooth className="gr_btn font_outfit ">Start your project now</Scroll>
            </p>
            <div className="ws__section__head__img anim_obj04">
              <div className="ws__section__head__img__wrap">
                <svg className="anim_svg_line" width="255px" x="0px" y="0px" viewBox="0 0 250.4 256.8" xmlSpace="preserve">
                  <g id="line_layer">
                    <path id="svgline" className="st0" d="M3.9,238.8c-0.4,0-0.7,0-0.9,0c-0.8,0-1.5-0.7-1.5-1.5c0-0.8,0.7-1.5,1.5-1.5c0,0,0,0,0,0 c0.2,0,0.5,0,0.9,0c3.9,0,14.5-0.4,28.4-4.1c0.8-0.2,1.6,0.3,1.8,1.1s-0.3,1.6-1.1,1.8C18.9,238.4,8,238.8,3.9,238.8z M42.3,231.7 c-0.6,0-1.2-0.4-1.4-1c-0.3-0.8,0.1-1.6,0.9-1.9c9.3-3.2,18.3-7.5,26.7-12.7c0.7-0.4,1.6-0.2,2.1,0.5c0.4,0.7,0.2,1.6-0.5,2.1 c-8.6,5.3-17.8,9.7-27.3,13C42.6,231.7,42.4,231.7,42.3,231.7z M77.6,213.3c-0.5,0-0.9-0.2-1.2-0.6c-0.5-0.7-0.3-1.6,0.3-2.1 c7.9-5.7,15.3-12.4,22-19.8c0.6-0.6,1.5-0.7,2.1-0.1s0.7,1.5,0.1,2.1c-6.9,7.6-14.4,14.4-22.5,20.2 C78.2,213.2,77.9,213.3,77.6,213.3z M106.3,185.6c-0.3,0-0.7-0.1-0.9-0.3c-0.6-0.5-0.8-1.5-0.2-2.1c6-7.5,11.5-15.8,16.3-24.8 c0.4-0.7,1.3-1,2-0.6c0.7,0.4,1,1.3,0.6,2c-5,9.1-10.6,17.6-16.6,25.2C107.2,185.4,106.7,185.6,106.3,185.6z M127.3,151.7 c-0.2,0-0.4,0-0.6-0.1c-0.7-0.4-1.1-1.3-0.7-2c4.5-9.5,7.9-18.9,9.9-27.9c0.2-0.8,1-1.3,1.8-1.1c0.8,0.2,1.3,1,1.1,1.8 c-2.1,9.3-5.5,18.9-10.1,28.5C128.4,151.4,127.9,151.7,127.3,151.7z M139,113.7c-0.1,0-0.1,0-0.2,0c-0.8-0.1-1.4-0.9-1.3-1.7 c0.5-3.8,0.7-7.7,0.7-11.4c0-3.6-0.2-7.2-0.7-10.7c-2.2,0.9-4.4,1.8-6.6,2.6c-0.8,0.3-1.6-0.1-1.9-0.9c-0.3-0.8,0.1-1.6,0.9-1.9 c2.4-0.9,4.8-1.9,7.2-2.9c-0.2-1.4-0.5-2.8-0.8-4.2c-0.2-0.8,0.3-1.6,1.1-1.8c0.8-0.2,1.6,0.3,1.8,1.1c0.3,1.2,0.5,2.4,0.7,3.6 c5.7-2.5,11.4-5.3,17-8.3c0.7-0.4,1.6-0.1,2,0.6s0.1,1.6-0.6,2c-6,3.2-12,6.1-18,8.7c0.5,3.9,0.8,7.9,0.8,11.9 c0,3.8-0.3,7.8-0.7,11.8C140.4,113.1,139.8,113.7,139,113.7z M78,103.4C78,103.4,78,103.4,78,103.4c-9.9,0-18.7-1.4-26.3-4.1 c-0.8-0.3-1.2-1.1-0.9-1.9c0.3-0.8,1.1-1.2,1.9-0.9c7.2,2.6,15.7,4,25.2,4c1.2,0,2.5,0,3.8-0.1c0.8,0,1.5,0.6,1.6,1.4 c0,0.8-0.6,1.5-1.4,1.6C80.6,103.4,79.3,103.4,78,103.4z M91.8,102.5c-0.7,0-1.4-0.6-1.5-1.3c-0.1-0.8,0.5-1.6,1.3-1.7 c9.2-1.1,19-3.3,28.9-6.5c0.8-0.3,1.6,0.2,1.9,1c0.3,0.8-0.2,1.6-1,1.9c-10.2,3.3-20.1,5.5-29.5,6.6 C91.9,102.5,91.9,102.5,91.8,102.5z M43.3,95c-0.3,0-0.5-0.1-0.8-0.2c-9.3-5.8-15.2-14.5-17-25c-0.1-0.8,0.4-1.6,1.2-1.7 c0.8-0.1,1.6,0.4,1.7,1.2c1.7,9.8,6.9,17.6,15.6,23c0.7,0.4,0.9,1.4,0.5,2.1C44.3,94.8,43.8,95,43.3,95z M166.4,75.2 c-0.5,0-1-0.3-1.3-0.7c-0.4-0.7-0.2-1.6,0.5-2.1c8.4-4.9,16.7-10.5,24.8-16.6c0.7-0.5,1.6-0.4,2.1,0.3c0.5,0.7,0.4,1.6-0.3,2.1 c-8.2,6.1-16.6,11.8-25,16.8C166.9,75.2,166.7,75.2,166.4,75.2z M134.9,74.3c-0.6,0-1.2-0.4-1.4-1c-3.4-9.2-8.6-17.5-15.4-24.8 c-0.6-0.6-0.5-1.6,0.1-2.1c0.6-0.6,1.6-0.5,2.1,0.1c7.1,7.5,12.5,16.2,16.1,25.8c0.3,0.8-0.1,1.6-0.9,1.9 C135.3,74.3,135.1,74.3,134.9,74.3z M26.5,61C26.5,61,26.4,61,26.5,61c-0.9-0.1-1.5-0.8-1.5-1.6c0.1-1.3,0.2-2.7,0.4-4.1 c1.3-9.9,5.3-17.9,11.9-23.7c0.6-0.6,1.6-0.5,2.1,0.1c0.6,0.6,0.5,1.6-0.1,2.1c-6,5.3-9.7,12.7-10.9,21.9c-0.2,1.3-0.3,2.6-0.4,3.8 C27.9,60.4,27.3,61,26.5,61z M199.2,52.4c-0.4,0-0.9-0.2-1.2-0.6c-0.5-0.6-0.4-1.6,0.2-2.1c7.6-6.1,15.1-12.8,22.3-19.8 c0.6-0.6,1.5-0.6,2.1,0c0.6,0.6,0.6,1.5,0,2.1c-7.3,7.1-14.9,13.8-22.6,20C199.9,52.3,199.5,52.4,199.2,52.4z M111.9,42.2 c-0.3,0-0.7-0.1-1-0.3c-7.6-6.3-16.5-11.1-25.7-14c-0.8-0.2-1.2-1.1-1-1.9c0.2-0.8,1.1-1.2,1.9-1c9.6,3,18.8,8,26.7,14.5 c0.6,0.5,0.7,1.5,0.2,2.1C112.7,42,112.3,42.2,111.9,42.2z M46.6,28.9c-0.6,0-1.1-0.3-1.4-0.9c-0.4-0.8,0-1.6,0.7-2 c5.9-2.8,12.7-4.2,20.2-4.2c3.3,0,6.7,0.3,10.1,0.8c0.8,0.1,1.4,0.9,1.2,1.7c-0.1,0.8-0.9,1.4-1.7,1.2c-3.2-0.5-6.5-0.8-9.6-0.8 c-7,0-13.4,1.3-18.9,3.9C47,28.8,46.8,28.9,46.6,28.9z M228.7,25.4c-0.4,0-0.8-0.1-1-0.4c-0.6-0.6-0.6-1.5,0-2.1 c6.8-7,13.5-14.6,19.8-22.3c0.5-0.6,1.5-0.7,2.1-0.2s0.7,1.5,0.2,2.1c-6.4,7.8-13.1,15.4-20,22.5C229.5,25.3,229.1,25.4,228.7,25.4 z" />
                    <path id="svgline_arr" className="st0" d="M29.9,256.8c-0.3,0-0.6-0.1-0.8-0.2l-29.3-19l19.1-29.3c0.5-0.7,1.4-0.9,2.1-0.4 c0.7,0.5,0.9,1.4,0.4,2.1L3.9,236.6L30.7,254c0.7,0.5,0.9,1.4,0.4,2.1C30.8,256.5,30.4,256.8,29.9,256.8z" />
                  </g>
                  <g id="mask_layer">
                    <path id="svgline_mask" className="st1" d="M248.3,0.1c0,0-51,72.7-132.1,96.2C32.7,120.5,6,61.5,43.3,29.5c26.8-23,95,11.2,97,63.4 c1.4,36.2-25.5,135.8-140.3,145.1" />
                  </g>
                </svg>
                <img src="/images/shopify/txt_head_circle.svg" width="160" className="ws__section__head__img__circle" alt="" />
                <div className="ws__section__head__img__main">
                  <img src="/images/shopify/img_head01.jpg?v3" alt="" />
                </div>
                <img src="/images/shopify/img_head02.png" className="ws__section__head__img__phone pc" alt="" />
                <img src="/images/shopify/img_head02_sp.png" className="ws__section__head__img__phone sp" alt="" />
              </div>
            </div>
          </section>

          <section className="ws__section ws__section__about ">
            <div className="ws__wrapper">
              <div className="ws__section__about__top scrl_anim">
                <h2 className="ws__section__about__h2 anim_obj01">
                  Warp Japan VISEOは、
                  <br className="sp_show" />
                  商材や事業規模に関わらず、
                  <br />
                  ベストなECサイトをつくります。
                </h2>
                <p className="ws__section__about__p anim_obj02">世界中のブランドから信頼をされています</p>
                <ul className="ws__section__about__logos anim_obj03">
                  <li className="ws__section__about__logo"><img src="/images/shopify/logo_louis.png" alt="" /></li>
                  <li className="ws__section__about__logo"><img src="/images/shopify/logo_remy.png" alt="" /></li>
                  <li className="ws__section__about__logo"><img src="/images/shopify/logo_hava.png" alt="" /></li>
                  <li className="ws__section__about__logo"><img src="/images/shopify/logo_talika.png" alt="" /></li>
                  <li className="ws__section__about__logo"><img src="/images/shopify/logo_pyrex.png" alt="" /></li>
                </ul>
                <img src="/images/shopify/img_about01.png?v2" className="ws__section__about__img01 anim_obj04" alt="" />
              </div>
              <div id="aboutShopify" className="ws__col2 rev scrl_anim">
                <div className="img anim_obj01 tb_hide">
                  <img src="/images/shopify/svg_img_heart.svg" className="svg_img_heart" alt="" />
                  <div className="rimg"><img src="/images/shopify/img_about02.jpg?v3" alt="" /></div>
                </div>
                <div className="txt anim_obj02">
                  <img src="/images/shopify/logo_shopify.svg?22" className="logo_shopify" alt="" />
                  <p className="ws__btxt">
                    Shopifyは世界でシェアNo.1を誇り、世界175ヶ以上で利用されているECプラットフォームです。
                    <br />
                    Warp Japan VISEOは、長年にわたり、様々な業界にて、eコマースサイトを設計、構築してきました。
                  </p>
                  <div className="ws__stxt">
                    <p>
                      Warp Japan VISEOの強みとして、ブランドアイデンティティの理解力、最新UI・UXトレンドを抑えたデザインなどを持ち。
                      <br />
                      私たちの強みを活かし、ブランドらしさとユーザーにとっての使いやすさを大事にしながら、お客様の要望を叶え、オリジナリティのあるECサイトを実現します。
                    </p>
                  </div>
                </div>
              </div>
              <div className="ws__col2 scrl_anim about02">
                <div className="img anim_obj01">
                  <img src="/images/shopify/svg_img_arr.svg" className="svg_img_arr" alt="" />
                  <div className="rimg"><img src="/images/shopify/img_about03.jpg?v2" alt="" /></div>
                </div>
                <div className="txt anim_obj02">
                  <img src="/images/shopify/ttl_shopifyExperts.png" className="ttl_head" alt="" />
                  <h3>
                    Shopifyエキスパートとは？
                  </h3>
                  <p className="ws__btxt">
                    Shopifyエキスパートとは、Shopifyパートナーの中でも高度な審査を受けて正式に実績が認められた企業のこと。
                  </p>
                  <div className="ws__stxt">
                    <p>
                      実績が豊富でサイト制作クオリティが認められた制作会社のみ認定され、
                      通常の制作会社よりもShopify構築に関して、高く信頼をされています。
                      日本国内では80社ほどShopifyエキスパートとして認められています。
                      <br />
                      Warp Japan VISEOは、Shopifyエキスパートに認定されており、
                      Shopifyについての知識はもちろんのこと、長年の経験を活かしたECサイト制作を構築します。
                      <br />
                      売上を伸ばすECサイトを目指し、お客様のご要望や将来設計を見据え、
                      設計・提案からECサイト制作を行います。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="ourServices" className="ws__section ws__section__whatwedo ">
            <div className="ws__wrapper">
              <h2 className="font_outfit scrl_anim">
                <span className="main anim_obj01">What we do</span>
                <span className="sub anim_obj02">Warp Japan VISEO</span>
              </h2>
              <div className="ws__col2 align-items rev scrl_anim">
                <div className="img anim_obj01">
                  <div className="rimg"><img src="/images/shopify/img_whatwedo01.jpg?v2" alt="" /></div>
                </div>
                <div className="txt anim_obj02">
                  <h4 className="font_outfit">UI/UX & Design</h4>
                  <h3>
                    UI/UXと設計
                  </h3>
                  <div className="ws__stxt">
                    <p>
                      Shopifyエキスパートとして、UI/UXを考慮しながら、Shopifyを利用したテンプレートもしくはオリジナルデザインでサイトを構築します。
                      <br />
                      <br />
                      ユーザー目線に立った使いやすさや見やすさなどを意識し、単なるビジュアル表現だけに留まらず、目的をより良く達成するためのデザインを制作します。
                    </p>
                  </div>
                </div>
              </div>
              <div className="ws__col2 align-items scrl_anim">
                <div className="img anim_obj01">
                  <div className="rimg"><img src="/images/shopify/img_whatwedo02.jpg" alt="" /></div>
                </div>
                <div className="txt anim_obj02">
                  <h4 className="font_outfit">Development & Operational Support</h4>
                  <h3>
                    開発・運用サポート
                  </h3>
                  <div className="ws__stxt">
                    <p>
                      お客様のご要望に合わせた機能や、売上につながる機能を提案し、
                      最適なECサイトを目指します。例えば、インタラクティブな店舗体験ができる機能や、
                      ユーザーロイヤリティ機能、ポイントサービスなど、様々なエクステンションを提案します。
                      <br />
                      <br />
                      ECサイトで売上を伸ばすためには、サイトリリース後の運用が重要です。
                      そのため、Warp Japan VISEOは運用サポートやECコンサルティングを行っています。日常的なサイト更新から広告運用まで、柔軟に対応いたします。
                    </p>
                  </div>
                </div>
              </div>
              <div className="ws__col2 align-items rev scrl_anim">
                <div className="img anim_obj01">
                  <div className="rimg"><img src="/images/shopify/img_whatwedo03.jpg" alt="" /></div>
                </div>
                <div className="txt anim_obj02">
                  <h4 className="font_outfit">Overseas Expansion</h4>
                  <h3>
                    EC事業の海外展開
                  </h3>
                  <p className="ws__btxt">
                    国内外のデザインや技術トレンドを抑えたグローバルなスタッフが在籍し、
                    最先端なクリエイティブ制作や多言語対応サイト、海外ブランドのローカライズなどを得意としています。
                    <br />
                    <br />
                    すでに、海外越境ECの構築、運営の実績が豊富にあり、安心してお任せいただけます。
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="ws__section ws__section__more ">
            <svg className="anim_svg_line" width="255px" x="0px" y="0px" viewBox="0 0 250.4 256.8" xmlSpace="preserve">
              <g id="line_layer">
                <path id="svgline" className="st0" d="M3.9,238.8c-0.4,0-0.7,0-0.9,0c-0.8,0-1.5-0.7-1.5-1.5c0-0.8,0.7-1.5,1.5-1.5c0,0,0,0,0,0 c0.2,0,0.5,0,0.9,0c3.9,0,14.5-0.4,28.4-4.1c0.8-0.2,1.6,0.3,1.8,1.1s-0.3,1.6-1.1,1.8C18.9,238.4,8,238.8,3.9,238.8z M42.3,231.7 c-0.6,0-1.2-0.4-1.4-1c-0.3-0.8,0.1-1.6,0.9-1.9c9.3-3.2,18.3-7.5,26.7-12.7c0.7-0.4,1.6-0.2,2.1,0.5c0.4,0.7,0.2,1.6-0.5,2.1 c-8.6,5.3-17.8,9.7-27.3,13C42.6,231.7,42.4,231.7,42.3,231.7z M77.6,213.3c-0.5,0-0.9-0.2-1.2-0.6c-0.5-0.7-0.3-1.6,0.3-2.1 c7.9-5.7,15.3-12.4,22-19.8c0.6-0.6,1.5-0.7,2.1-0.1s0.7,1.5,0.1,2.1c-6.9,7.6-14.4,14.4-22.5,20.2 C78.2,213.2,77.9,213.3,77.6,213.3z M106.3,185.6c-0.3,0-0.7-0.1-0.9-0.3c-0.6-0.5-0.8-1.5-0.2-2.1c6-7.5,11.5-15.8,16.3-24.8 c0.4-0.7,1.3-1,2-0.6c0.7,0.4,1,1.3,0.6,2c-5,9.1-10.6,17.6-16.6,25.2C107.2,185.4,106.7,185.6,106.3,185.6z M127.3,151.7 c-0.2,0-0.4,0-0.6-0.1c-0.7-0.4-1.1-1.3-0.7-2c4.5-9.5,7.9-18.9,9.9-27.9c0.2-0.8,1-1.3,1.8-1.1c0.8,0.2,1.3,1,1.1,1.8 c-2.1,9.3-5.5,18.9-10.1,28.5C128.4,151.4,127.9,151.7,127.3,151.7z M139,113.7c-0.1,0-0.1,0-0.2,0c-0.8-0.1-1.4-0.9-1.3-1.7 c0.5-3.8,0.7-7.7,0.7-11.4c0-3.6-0.2-7.2-0.7-10.7c-2.2,0.9-4.4,1.8-6.6,2.6c-0.8,0.3-1.6-0.1-1.9-0.9c-0.3-0.8,0.1-1.6,0.9-1.9 c2.4-0.9,4.8-1.9,7.2-2.9c-0.2-1.4-0.5-2.8-0.8-4.2c-0.2-0.8,0.3-1.6,1.1-1.8c0.8-0.2,1.6,0.3,1.8,1.1c0.3,1.2,0.5,2.4,0.7,3.6 c5.7-2.5,11.4-5.3,17-8.3c0.7-0.4,1.6-0.1,2,0.6s0.1,1.6-0.6,2c-6,3.2-12,6.1-18,8.7c0.5,3.9,0.8,7.9,0.8,11.9 c0,3.8-0.3,7.8-0.7,11.8C140.4,113.1,139.8,113.7,139,113.7z M78,103.4C78,103.4,78,103.4,78,103.4c-9.9,0-18.7-1.4-26.3-4.1 c-0.8-0.3-1.2-1.1-0.9-1.9c0.3-0.8,1.1-1.2,1.9-0.9c7.2,2.6,15.7,4,25.2,4c1.2,0,2.5,0,3.8-0.1c0.8,0,1.5,0.6,1.6,1.4 c0,0.8-0.6,1.5-1.4,1.6C80.6,103.4,79.3,103.4,78,103.4z M91.8,102.5c-0.7,0-1.4-0.6-1.5-1.3c-0.1-0.8,0.5-1.6,1.3-1.7 c9.2-1.1,19-3.3,28.9-6.5c0.8-0.3,1.6,0.2,1.9,1c0.3,0.8-0.2,1.6-1,1.9c-10.2,3.3-20.1,5.5-29.5,6.6 C91.9,102.5,91.9,102.5,91.8,102.5z M43.3,95c-0.3,0-0.5-0.1-0.8-0.2c-9.3-5.8-15.2-14.5-17-25c-0.1-0.8,0.4-1.6,1.2-1.7 c0.8-0.1,1.6,0.4,1.7,1.2c1.7,9.8,6.9,17.6,15.6,23c0.7,0.4,0.9,1.4,0.5,2.1C44.3,94.8,43.8,95,43.3,95z M166.4,75.2 c-0.5,0-1-0.3-1.3-0.7c-0.4-0.7-0.2-1.6,0.5-2.1c8.4-4.9,16.7-10.5,24.8-16.6c0.7-0.5,1.6-0.4,2.1,0.3c0.5,0.7,0.4,1.6-0.3,2.1 c-8.2,6.1-16.6,11.8-25,16.8C166.9,75.2,166.7,75.2,166.4,75.2z M134.9,74.3c-0.6,0-1.2-0.4-1.4-1c-3.4-9.2-8.6-17.5-15.4-24.8 c-0.6-0.6-0.5-1.6,0.1-2.1c0.6-0.6,1.6-0.5,2.1,0.1c7.1,7.5,12.5,16.2,16.1,25.8c0.3,0.8-0.1,1.6-0.9,1.9 C135.3,74.3,135.1,74.3,134.9,74.3z M26.5,61C26.5,61,26.4,61,26.5,61c-0.9-0.1-1.5-0.8-1.5-1.6c0.1-1.3,0.2-2.7,0.4-4.1 c1.3-9.9,5.3-17.9,11.9-23.7c0.6-0.6,1.6-0.5,2.1,0.1c0.6,0.6,0.5,1.6-0.1,2.1c-6,5.3-9.7,12.7-10.9,21.9c-0.2,1.3-0.3,2.6-0.4,3.8 C27.9,60.4,27.3,61,26.5,61z M199.2,52.4c-0.4,0-0.9-0.2-1.2-0.6c-0.5-0.6-0.4-1.6,0.2-2.1c7.6-6.1,15.1-12.8,22.3-19.8 c0.6-0.6,1.5-0.6,2.1,0c0.6,0.6,0.6,1.5,0,2.1c-7.3,7.1-14.9,13.8-22.6,20C199.9,52.3,199.5,52.4,199.2,52.4z M111.9,42.2 c-0.3,0-0.7-0.1-1-0.3c-7.6-6.3-16.5-11.1-25.7-14c-0.8-0.2-1.2-1.1-1-1.9c0.2-0.8,1.1-1.2,1.9-1c9.6,3,18.8,8,26.7,14.5 c0.6,0.5,0.7,1.5,0.2,2.1C112.7,42,112.3,42.2,111.9,42.2z M46.6,28.9c-0.6,0-1.1-0.3-1.4-0.9c-0.4-0.8,0-1.6,0.7-2 c5.9-2.8,12.7-4.2,20.2-4.2c3.3,0,6.7,0.3,10.1,0.8c0.8,0.1,1.4,0.9,1.2,1.7c-0.1,0.8-0.9,1.4-1.7,1.2c-3.2-0.5-6.5-0.8-9.6-0.8 c-7,0-13.4,1.3-18.9,3.9C47,28.8,46.8,28.9,46.6,28.9z M228.7,25.4c-0.4,0-0.8-0.1-1-0.4c-0.6-0.6-0.6-1.5,0-2.1 c6.8-7,13.5-14.6,19.8-22.3c0.5-0.6,1.5-0.7,2.1-0.2s0.7,1.5,0.2,2.1c-6.4,7.8-13.1,15.4-20,22.5C229.5,25.3,229.1,25.4,228.7,25.4 z" />
                <path id="svgline_arr" className="st0" d="M29.9,256.8c-0.3,0-0.6-0.1-0.8-0.2l-29.3-19l19.1-29.3c0.5-0.7,1.4-0.9,2.1-0.4 c0.7,0.5,0.9,1.4,0.4,2.1L3.9,236.6L30.7,254c0.7,0.5,0.9,1.4,0.4,2.1C30.8,256.5,30.4,256.8,29.9,256.8z" />
              </g>
              <g id="mask_layer">
                <path id="svgline_mask" className="st1" d="M248.3,0.1c0,0-51,72.7-132.1,96.2C32.7,120.5,6,61.5,43.3,29.5c26.8-23,95,11.2,97,63.4 c1.4,36.2-25.5,135.8-140.3,145.1" />
              </g>
            </svg>
            <div className="ws__wrapper">
              <h2 className="font_outfit scrl_anim">
                <img src="/images/shopify/ttl_ShopifyPlus.svg?22" className="ttl_shopifyplus anim_obj01" alt="" />
                <span className="main anim_obj02">More with us and Shopify</span>
              </h2>
              <div id="ws_video_wrap" className="ws__col2 align-items scrl_anim">
                <div className="img anim_obj01">
                  <div className="rimg imgInVideo">
                    <img src="/images/shopify/img_more01.png?v2" alt="" />
                    <div className="video">
                      <video id="ws_video" muted playsInline>
                        <source src="/video/Whopify-Telmont.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </div>
                </div>
                <div className="txt anim_obj02">
                  <h4 className="font_outfit">Going Global with Shopify Plus</h4>
                  <h3>
                    Shopify Plusでグローバル化
                  </h3>
                  <p className="ws__btxt">
                    Shopify Plusは、Shopifyのプランの中でも最上級のエンタープライズ向けプランです。
                    Shopify Plusはより柔軟にカスタマイズができ、独自な機能もあります。
                    例えば、受注・発送業務・顧客管理の自動化や、複数のECストア情報を一括管理が可能です。
                    <br />
                    <br />
                    Warp Japan VISEOは、フランス・イギリス・日本で同時展開のECサイト構築経験が多数あります。
                  </p>
                </div>
              </div>
              <div id="ws_video_wrap2" className="ws__col2 align-items rev scrl_anim">
                <div className="img anim_obj01">
                  <div className="rimg imgInVideo">
                    <img src="/images/shopify/img_more01.png?v2" alt="" />
                    <div className="video">
                      <video id="ws_video2" muted playsInline>
                        <source src="/video/Whopify-Bruichladdich.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </div>
                </div>
                <div className="txt anim_obj02">
                  <h4 className="font_outfit">Business Integrations</h4>
                  <h3>
                    様々なツールとの連携
                  </h3>
                  <p className="ws__btxt">
                    ニーズに合わせてプラットフォームの機能を迅速に統合・拡張することができます。
                    <br />
                    <br />
                    これまでさまざまなプラットフォームとAPI連携を行い、お客様のEコマース事業の効率化のお手伝いをしてきました。
                  </p>
                </div>
              </div>
              <Scroll to="contact" smooth className="gr_btn font_outfit ">Start your project now</Scroll>
            </div>
          </section>
          <section id="ourWorks" className="ws__section ws__section__pluswork ">
            <div className="ws__wrapper">
              <h2 className="font_outfit scrl_anim">
                <span className="main anim_obj01">Shopify Work</span>
              </h2>
              <ul className="ws__section__pluswork__ul scrl_anim">
                <li className="ws__section__pluswork__li anim_obj01">
                  <a href="https://ultima.dev" target="_blank" rel="noreferrer">
                    <div className="img">
                      <img src="/images/shopify/img_pluswork01.jpg" alt="" />
                    </div>
                    <div className="txt">
                      <h3 className="font_outfit">Ultima mobility</h3>
                      <p>
                        100％ヨーロッパの素材、技術で作られたフランス製自転車メーカー。3Dコンフィギュレーターを使い、一人一人にビッタリの自転車を作られることに。
                      </p>
                    </div>
                  </a>
                </li>
                <li className="ws__section__pluswork__li anim_obj02">
                  <a href="https://hayama-aromance.jp" target="_blank" rel="noreferrer">
                    <div className="img">
                      <img src="/images/shopify/img_pluswork02.jpg?v2" alt="" />
                    </div>
                    <div className="txt">
                      <h3 className="font_outfit">Hayama Aromance</h3>
                      <p>
                        葉山で生まれた新しいブランド。ブランドロゴ・パッケージから、オンラインショップまで携わり。
                      </p>
                    </div>
                  </a>
                </li>
                <li className="ws__section__pluswork__li anim_obj03">
                  <a href="https://norwegianrain.jp" target="_blank" rel="noreferrer">
                    <div className="img">
                      <img src="/images/shopify/img_pluswork03.jpg" alt="" />
                    </div>
                    <div className="txt">
                      <h3 className="font_outfit">Norwegian Rain</h3>
                      <p>
                        シンプルかつ魅力的、さらにユーザーが店舗での体験を実感できるオンラインショップを目標に。
                        360度回転するテクノロジーを利用し、Eコマース機能だけでなく、商品や店舗をリアルに体験できるウェブサイトを実現。
                      </p>
                    </div>
                  </a>
                </li>
                <li className="ws__section__pluswork__li anim_obj04">
                  <a href="https://ogata.com/paris/" target="_blank" rel="noreferrer">
                    <div className="img">
                      <img src="/images/shopify/img_pluswork04.jpg" alt="" />
                    </div>
                    <div className="txt">
                      <h3 className="font_outfit">OGATA Paris</h3>
                      <p>
                        八雲茶寮やHIGASHIYA-MA Tokyoなどを手がける緒方慎一郎氏がパリに新しくオープンしたOGATA Parisのオンラインショップ。
                        オンラインストアとしてはもちろん、ブランドの価値観を表現する場となっています。
                      </p>
                    </div>
                  </a>
                </li>
                <li className="ws__section__pluswork__li anim_obj05">
                  <a href="https://jp.champagne-telmont.com/" target="_blank" rel="noreferrer">
                    <div className="img">
                      <img src="/images/shopify/img_pluswork05.jpg" alt="" />
                    </div>
                    <div className="txt">
                      <h3 className="font_outfit">Telmont Champagne</h3>
                      <p>
                        世代を超えて継承されるシャンパーニュをメゾンであるテルモンのサイト制作をShopify Plusで実装しました。
                        多言語対応はもちろん、国によって異なる販売仕様やEC機能の有無に柔軟に対応するため、Shopifyにてカスタマイズを行い、
                        各国のサイトの一元管理を可能にしました。
                      </p>
                    </div>
                  </a>
                </li>
                <li className="ws__section__pluswork__li anim_obj06">
                  <a href="https://www.bruichladdich.com/" target="_blank" rel="noreferrer">
                    <div className="img">
                      <img src="/images/shopify/img_pluswork06.jpg" alt="" />
                    </div>
                    <div className="txt">
                      <h3 className="font_outfit">Bruichladdich</h3>
                      <p>
                        同名を冠したスコッチウイスキーをはじめとし様々なウイスキーを製造・販売する、
                        ブル一クラディのサイト制作をShopify plusで行いました。イギリス向けサイトと国外向けサイト双方の管理を一極化し、
                        スムーズなサイト運営を可能にしています。
                      </p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </section>
          <section id="contact" className="ws__section ws__section__form scrl_anim">
            <div className="ws__wrapper">
              <svg className="anim_svg_line" width="255px" x="0px" y="0px" viewBox="0 0 250.4 256.8" xmlSpace="preserve">
                <g id="line_layer">
                  <path id="svgline" className="st0" d="M3.9,238.8c-0.4,0-0.7,0-0.9,0c-0.8,0-1.5-0.7-1.5-1.5c0-0.8,0.7-1.5,1.5-1.5c0,0,0,0,0,0 c0.2,0,0.5,0,0.9,0c3.9,0,14.5-0.4,28.4-4.1c0.8-0.2,1.6,0.3,1.8,1.1s-0.3,1.6-1.1,1.8C18.9,238.4,8,238.8,3.9,238.8z M42.3,231.7 c-0.6,0-1.2-0.4-1.4-1c-0.3-0.8,0.1-1.6,0.9-1.9c9.3-3.2,18.3-7.5,26.7-12.7c0.7-0.4,1.6-0.2,2.1,0.5c0.4,0.7,0.2,1.6-0.5,2.1 c-8.6,5.3-17.8,9.7-27.3,13C42.6,231.7,42.4,231.7,42.3,231.7z M77.6,213.3c-0.5,0-0.9-0.2-1.2-0.6c-0.5-0.7-0.3-1.6,0.3-2.1 c7.9-5.7,15.3-12.4,22-19.8c0.6-0.6,1.5-0.7,2.1-0.1s0.7,1.5,0.1,2.1c-6.9,7.6-14.4,14.4-22.5,20.2 C78.2,213.2,77.9,213.3,77.6,213.3z M106.3,185.6c-0.3,0-0.7-0.1-0.9-0.3c-0.6-0.5-0.8-1.5-0.2-2.1c6-7.5,11.5-15.8,16.3-24.8 c0.4-0.7,1.3-1,2-0.6c0.7,0.4,1,1.3,0.6,2c-5,9.1-10.6,17.6-16.6,25.2C107.2,185.4,106.7,185.6,106.3,185.6z M127.3,151.7 c-0.2,0-0.4,0-0.6-0.1c-0.7-0.4-1.1-1.3-0.7-2c4.5-9.5,7.9-18.9,9.9-27.9c0.2-0.8,1-1.3,1.8-1.1c0.8,0.2,1.3,1,1.1,1.8 c-2.1,9.3-5.5,18.9-10.1,28.5C128.4,151.4,127.9,151.7,127.3,151.7z M139,113.7c-0.1,0-0.1,0-0.2,0c-0.8-0.1-1.4-0.9-1.3-1.7 c0.5-3.8,0.7-7.7,0.7-11.4c0-3.6-0.2-7.2-0.7-10.7c-2.2,0.9-4.4,1.8-6.6,2.6c-0.8,0.3-1.6-0.1-1.9-0.9c-0.3-0.8,0.1-1.6,0.9-1.9 c2.4-0.9,4.8-1.9,7.2-2.9c-0.2-1.4-0.5-2.8-0.8-4.2c-0.2-0.8,0.3-1.6,1.1-1.8c0.8-0.2,1.6,0.3,1.8,1.1c0.3,1.2,0.5,2.4,0.7,3.6 c5.7-2.5,11.4-5.3,17-8.3c0.7-0.4,1.6-0.1,2,0.6s0.1,1.6-0.6,2c-6,3.2-12,6.1-18,8.7c0.5,3.9,0.8,7.9,0.8,11.9 c0,3.8-0.3,7.8-0.7,11.8C140.4,113.1,139.8,113.7,139,113.7z M78,103.4C78,103.4,78,103.4,78,103.4c-9.9,0-18.7-1.4-26.3-4.1 c-0.8-0.3-1.2-1.1-0.9-1.9c0.3-0.8,1.1-1.2,1.9-0.9c7.2,2.6,15.7,4,25.2,4c1.2,0,2.5,0,3.8-0.1c0.8,0,1.5,0.6,1.6,1.4 c0,0.8-0.6,1.5-1.4,1.6C80.6,103.4,79.3,103.4,78,103.4z M91.8,102.5c-0.7,0-1.4-0.6-1.5-1.3c-0.1-0.8,0.5-1.6,1.3-1.7 c9.2-1.1,19-3.3,28.9-6.5c0.8-0.3,1.6,0.2,1.9,1c0.3,0.8-0.2,1.6-1,1.9c-10.2,3.3-20.1,5.5-29.5,6.6 C91.9,102.5,91.9,102.5,91.8,102.5z M43.3,95c-0.3,0-0.5-0.1-0.8-0.2c-9.3-5.8-15.2-14.5-17-25c-0.1-0.8,0.4-1.6,1.2-1.7 c0.8-0.1,1.6,0.4,1.7,1.2c1.7,9.8,6.9,17.6,15.6,23c0.7,0.4,0.9,1.4,0.5,2.1C44.3,94.8,43.8,95,43.3,95z M166.4,75.2 c-0.5,0-1-0.3-1.3-0.7c-0.4-0.7-0.2-1.6,0.5-2.1c8.4-4.9,16.7-10.5,24.8-16.6c0.7-0.5,1.6-0.4,2.1,0.3c0.5,0.7,0.4,1.6-0.3,2.1 c-8.2,6.1-16.6,11.8-25,16.8C166.9,75.2,166.7,75.2,166.4,75.2z M134.9,74.3c-0.6,0-1.2-0.4-1.4-1c-3.4-9.2-8.6-17.5-15.4-24.8 c-0.6-0.6-0.5-1.6,0.1-2.1c0.6-0.6,1.6-0.5,2.1,0.1c7.1,7.5,12.5,16.2,16.1,25.8c0.3,0.8-0.1,1.6-0.9,1.9 C135.3,74.3,135.1,74.3,134.9,74.3z M26.5,61C26.5,61,26.4,61,26.5,61c-0.9-0.1-1.5-0.8-1.5-1.6c0.1-1.3,0.2-2.7,0.4-4.1 c1.3-9.9,5.3-17.9,11.9-23.7c0.6-0.6,1.6-0.5,2.1,0.1c0.6,0.6,0.5,1.6-0.1,2.1c-6,5.3-9.7,12.7-10.9,21.9c-0.2,1.3-0.3,2.6-0.4,3.8 C27.9,60.4,27.3,61,26.5,61z M199.2,52.4c-0.4,0-0.9-0.2-1.2-0.6c-0.5-0.6-0.4-1.6,0.2-2.1c7.6-6.1,15.1-12.8,22.3-19.8 c0.6-0.6,1.5-0.6,2.1,0c0.6,0.6,0.6,1.5,0,2.1c-7.3,7.1-14.9,13.8-22.6,20C199.9,52.3,199.5,52.4,199.2,52.4z M111.9,42.2 c-0.3,0-0.7-0.1-1-0.3c-7.6-6.3-16.5-11.1-25.7-14c-0.8-0.2-1.2-1.1-1-1.9c0.2-0.8,1.1-1.2,1.9-1c9.6,3,18.8,8,26.7,14.5 c0.6,0.5,0.7,1.5,0.2,2.1C112.7,42,112.3,42.2,111.9,42.2z M46.6,28.9c-0.6,0-1.1-0.3-1.4-0.9c-0.4-0.8,0-1.6,0.7-2 c5.9-2.8,12.7-4.2,20.2-4.2c3.3,0,6.7,0.3,10.1,0.8c0.8,0.1,1.4,0.9,1.2,1.7c-0.1,0.8-0.9,1.4-1.7,1.2c-3.2-0.5-6.5-0.8-9.6-0.8 c-7,0-13.4,1.3-18.9,3.9C47,28.8,46.8,28.9,46.6,28.9z M228.7,25.4c-0.4,0-0.8-0.1-1-0.4c-0.6-0.6-0.6-1.5,0-2.1 c6.8-7,13.5-14.6,19.8-22.3c0.5-0.6,1.5-0.7,2.1-0.2s0.7,1.5,0.2,2.1c-6.4,7.8-13.1,15.4-20,22.5C229.5,25.3,229.1,25.4,228.7,25.4 z" />
                  <path id="svgline_arr" className="st0" d="M29.9,256.8c-0.3,0-0.6-0.1-0.8-0.2l-29.3-19l19.1-29.3c0.5-0.7,1.4-0.9,2.1-0.4 c0.7,0.5,0.9,1.4,0.4,2.1L3.9,236.6L30.7,254c0.7,0.5,0.9,1.4,0.4,2.1C30.8,256.5,30.4,256.8,29.9,256.8z" />
                </g>
                <g id="mask_layer">
                  <path id="svgline_mask" className="st1" d="M248.3,0.1c0,0-51,72.7-132.1,96.2C32.7,120.5,6,61.5,43.3,29.5c26.8-23,95,11.2,97,63.4 c1.4,36.2-25.5,135.8-140.3,145.1" />
                </g>
              </svg>
              <div className="ws__section__form__head anim_obj01">
                <h2 className="font_outfit">Let’s work together</h2>
                <p>
                  あなたのビジネス目標を教えてください。
                  <br />
                  一緒に素晴らしいものを作る方法を見ていきます。
                </p>
              </div>
              <form className="contactForm" name="contactForm">
                <div className="ws__section__form__row">
                  <div id="formNameSei" className="ws__section__form__col">
                    <label htmlFor="name_sei" className="ws__section__form__label">
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
                  <div id="formNameMei" className="ws__section__form__col">
                    <label htmlFor="name_mei" className="ws__section__form__label">
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
                <div className="ws__section__form__row">
                  <div id="form_email" className="ws__section__form__col">
                    <label htmlFor="email" className="ws__section__form__label">
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
                  <div id="formCompany" className="ws__section__form__col">
                    <label htmlFor="company" className="ws__section__form__label">
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
                <div className="ws__section__form__row">
                  <div id="formPhone" className="ws__section__form__col col1">
                    <label htmlFor="phone" className="ws__section__form__label">
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
                <div className="ws__section__form__row">
                  <div id="form_content" className="ws__section__form__col col1">
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

                <div className="ws__section__form__row">
                  <button id="submitBtn" className="submitBtn" onClick={submitBtnClick} type="button">送信</button>
                </div>
              </form>
            </div>
          </section>
          <footer className="ws__footer">
            <div className="ws__wrapper">
              <div className="ws__footer__left">
                <h3><img src="/images/shopify/ttl_footer.svg" alt="" /></h3>
                <p>私たちは、デジタル領域を中心としたプランニング、デザイン、テクノロジーによって、ビジネスの成長に貢献することをミッションとするデジタルエージェンシーです。</p>
              </div>
              <div className="ws__footer__right">
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
              <p className="ws__footer__copy font_outfit">
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

export default ShopifyPage;

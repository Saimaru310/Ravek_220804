/**
 * @modules : node_modulesフォルダまでの絶対パスのエイリアス
 * webpack.config.jsにて定義している
 */

import $ from "@modules/jquery";
import ScrollHint from '@modules/scroll-hint';

("use strict");

//------------------------------------
// スムーススクロール
//------------------------------------
$('a[href^="#"]').on('click', function () {
  const speed = 500;
  // アンカーの値取得
  const href = $(this).attr('href');
  // 移動先を取得
  const target = $(href == '#' || href == '' ? 'html' : href);
  // 移動先を数値で取得
  const position = target.offset().top;

  $('body,html').animate({
    scrollTop: position
  }, speed, 'swing');
  return false;
});

//------------------------------------
// ドロワーメニュー
//------------------------------------
$(function () {
  $('#js-drawer').click(function () {
    $('.js-drawer-target').slideToggle();
    $('body, .header, .drawer, .drawer-menu__icon').toggleClass('drawer-active');
  });
  $('.js-drawer-nav__link').click(function () {
    $('.js-drawer-target').slideUp();
    $('body, .header, .drawer, .drawer-menu__icon').removeClass('drawer-active');
  });
});

// ドロワーメニュー表示の際、背景スクロールを禁止
$(function () {
  let state = false;
  let pos;
  $('#js-drawer, .js-drawer-nav__link').click(function () {
    if (state == false) {
      pos = $(window).scrollTop();
      $('body').addClass('is-fixed').css({
        'top': -pos
      });
      state = true;
    } else {
      $('body').removeClass('is-fixed').css({
        'top': 0
      });
      window.scrollTo(0, pos);
      state = false;
    }
  });
});

//------------------------------------
// スクロールヒント
//------------------------------------
new ScrollHint('.js-scroll-hint', {
  suggestiveShadow: true,
  remainingTime: 5000,
  i18n: {
    scrollable: 'スクロールできます'
  }
});
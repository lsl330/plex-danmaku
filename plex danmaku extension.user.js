// ==UserScript==
// @name         plex danmaku extension
// @namespace    http://tampermonkey.net/
// @version      0.12
// @description  使plex网页版支持弹幕功能，适配web版本4.76.1
// @author       F2bbb&lsl330
// @include     /^https?://.*:32400/web.*
// @include     http://*:32400/web/index.html*
// @include     https://*:32400/web/index.html*
// @include     https://app.plex.tv/*
// @require https://cdn.jsdelivr.net/npm/danmaku/dist/danmaku.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require http://code.jquery.com/jquery-1.11.0.min.js
// @grant        GM_xmlhttpRequest
// @grant        GM_download
// @grant GM_setValue
// @grant GM_getValue
// ==/UserScript==
var danmaku_icon='<svg t="1628392319408" class="icon" viewBox="0 0 400 400" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1713" width="32" height="24"><path id="svg_10" fill="#FFFFFF" d="m228.82,254.62c-10.19,1.42 -19.55,2.67 -28.89,4.04c-11.98,1.75 -23.89,4.18 -35.92,5.21c-8.4,0.72 -15.77,-3.54 -22.31,-8.64c-3.15,-2.46 -2.75,-4.64 1.11,-5.42c5.01,-1.01 10.18,-1.35 15.29,-1.78c21.2,-1.79 42.4,-3.49 63.59,-5.27c2.14,-0.18 4.26,-0.68 6.74,-1.09c0,-12.05 0,-24.09 0,-36.8c-9.94,1.47 -19.61,2.81 -29.23,4.44c-1.13,0.19 -2.09,1.89 -2.97,3.01c-2.74,3.51 -5.13,3.8 -7.33,-0.1c-2.82,-5.01 -5.16,-10.38 -7,-15.84c-5.52,-16.35 -10.5,-32.89 -16.13,-49.21c-1.99,-5.77 -5.26,-11.09 -7.89,-16.64c-2.73,-5.77 -1.28,-8.26 5.08,-7.86c7.93,0.49 15.95,2.84 23.7,2.06c21.29,-2.13 42.5,-5.21 63.66,-8.43c10.14,-1.54 20.99,-2.41 29.93,-6.82c13.96,-6.9 24.73,-1.48 35.99,4.93c5.76,3.28 11.56,6.62 16.83,10.6c4.42,3.34 4.43,7.07 0.13,10.4c-11.04,8.53 -16.25,20.73 -21.88,32.82c-4.27,9.17 -9.05,18.11 -13.81,27.04c-1.23,2.31 -3.02,4.42 -4.91,6.27c-3.7,3.62 -6.48,3.53 -9.49,-0.69c-1.76,-2.47 -3.51,-2.93 -6.24,-2.52c-10.01,1.49 -20.04,2.8 -30.51,4.24l0,36.4c7.45,-0.84 14.82,-1.6 22.16,-2.53c17.46,-2.21 34.88,-4.72 52.37,-6.68c12.18,-1.36 22.99,2.6 32.28,10.48c1.52,1.29 2.29,3.49 3.4,5.26c-1.8,0.98 -3.52,2.52 -5.43,2.82c-4.24,0.69 -8.58,0.96 -12.89,1.04c-16.81,0.32 -33.63,0.2 -50.42,0.82c-13.76,0.5 -27.5,1.82 -41.46,2.79c-1.92,38.38 3.65,77.07 -8.81,114.11c-0.7,0.1 -1.4,0.2 -2.1,0.3c-0.85,-1.76 -2.25,-3.46 -2.47,-5.3c-1.3,-10.87 -2.99,-21.75 -3.31,-32.66c-0.7,-23.46 -0.65,-46.94 -0.9,-70.42c0.03,-1.12 0.04,-2.25 0.04,-4.38zm17.35,-62.21c10.34,-1.56 20.14,-3.35 30.02,-4.41c5.77,-0.62 8.95,-2.71 10.55,-8.64c3.79,-14.06 9,-27.81 9.13,-42.61c0.08,-9.17 -4.37,-14 -13.4,-13.43c-11.22,0.72 -22.38,2.48 -33.54,4.03c-1.1,0.15 -2.76,1.97 -2.8,3.07c-0.26,6.94 -0.13,13.89 -0.13,19.46c8.32,0 16.1,-0.17 23.86,0.07c4.49,0.14 5.93,3.3 2.99,6.68c-1.77,2.04 -4.29,3.8 -6.82,4.74c-6.46,2.4 -13.13,4.27 -19.86,6.4l0,24.64zm-18.77,-63.22c-14.18,2.03 -27.58,3.95 -41.36,5.92c3,21.9 5.91,43.17 8.89,64.94c10.88,-1.47 21.06,-2.77 31.2,-4.31c1.01,-0.15 2.53,-1.77 2.56,-2.74c0.21,-7.46 0.12,-14.92 0.12,-22.31c-9.18,-2.64 -18.91,-1.41 -27.66,-7.13c8.67,-6 18.44,-6.23 27.88,-9.55c-0.53,-8.05 -1.06,-16.21 -1.63,-24.82z"/><path id="svg_11" fill="#FFFFFF" d="m58.31,306.77c4.37,0.43 8.74,0.9 13.11,1.29c3.97,0.36 7.95,0.56 11.91,0.95c7.81,0.77 12.83,-3 16.65,-9.47c6.85,-11.6 9.36,-24.45 10.75,-37.5c1,-9.4 1.29,-18.94 1.07,-28.4c-0.31,-13.62 -6.68,-18.56 -19.72,-15.2c-12.57,3.25 -24.87,7.38 -34.83,16.42c-3.76,3.41 -6.12,2.71 -8.52,-1.96c-4.56,-8.86 -2.27,-17.1 7.14,-23.13c7.94,-5.08 12.81,-12.04 14.57,-21.12c2.6,-13.39 1.71,-26.45 -4.5,-38.87c-0.82,-1.63 -1.5,-3.34 -2.16,-5.04c-0.35,-0.9 -0.53,-1.87 -1.03,-3.72c2.15,0 3.86,-0.24 5.46,0.06c1.93,0.37 3.93,0.94 5.64,1.88c14.81,8.19 27.91,-0.39 41.46,-4.2c0.79,-0.22 1.47,-1.64 1.79,-2.63c4.36,-13.49 7.24,-27.28 7.69,-41.49c0.22,-7.01 -1.15,-8.22 -8.29,-6.82c-10.42,2.04 -20.78,4.39 -31.12,6.77c-10.92,2.51 -19.22,-0.68 -24.84,-10.52c2.45,-0.4 4.53,-0.94 6.64,-1.06c16.46,-0.94 32.78,-2.86 48.48,-8.11c4.02,-1.34 7.96,-3.47 11.33,-6.03c4.98,-3.79 10.1,-4.43 15.4,-1.77c6.38,3.2 12.58,6.8 18.64,10.57c4.3,2.68 4.39,5.67 0.86,9.42c-0.68,0.73 -1.38,1.49 -2.22,2.01c-16.42,10.18 -21.91,27.39 -28.06,44.07c-0.56,1.51 0.67,4.01 1.65,5.71c4.49,7.7 3.29,10 -5.51,11.32c-12.48,1.87 -24.91,4.02 -37.32,6.29c-1.3,0.24 -3.16,1.99 -3.31,3.22c-1.93,15.95 -3.61,31.94 -5.41,48.5c9.19,-1.16 18.53,-2.27 26.07,-8.18c5.75,-4.51 11.22,-5.33 17.44,-1.86c3.34,1.86 6.69,3.74 9.85,5.88c3.26,2.21 4.19,5.52 1.74,8.63c-6.83,8.66 -7.67,18.94 -8.36,29.23c-0.98,14.6 -1.27,29.26 -2.48,43.84c-1.46,17.49 -5.62,34.24 -18.17,47.48c-3.36,3.54 -7.68,6.3 -11.9,8.86c-3.98,2.42 -8.17,0.97 -9.62,-3.04c-4.8,-13.24 -14.71,-21.45 -26.09,-28.47c-0.98,-0.61 -2,-1.16 -3,-1.74c0.39,-0.7 0.76,-1.38 1.12,-2.07z"/><path id="svg_12" fill="#FFFFFF" d="m254.44,107.14c2.2,-5.96 4.24,-11.98 6.62,-17.87c4.48,-11.09 9.53,-22.01 8.9,-34.38c-0.14,-2.78 -0.61,-5.59 -1.32,-8.29c-1.16,-4.41 -0.09,-6.88 4.5,-7.33c3.89,-0.37 8.09,-0.28 11.81,0.8c6.45,1.88 12.77,4.39 18.87,7.21c2.9,1.34 4.43,4.11 1.57,7.32c-13.6,15.25 -27.14,30.56 -40.81,45.76c-2.57,2.86 -5.6,5.29 -8.42,7.92c-0.58,-0.38 -1.15,-0.76 -1.72,-1.14z"/><path id="svg_13" fill="#FFFFFF" d="m227.27,87.26c-0.15,1.32 -0.16,2.66 -0.46,3.94c-2.36,10.27 -8.2,12.4 -16.37,5.77c-12.11,-9.83 -18.57,-23.59 -25.19,-37.15c-1.57,-3.21 0.24,-5.12 3.91,-4.53c14.24,2.3 25.94,9.03 34.27,20.89c2.18,3.11 3.1,7.12 4.59,10.72c-0.26,0.12 -0.5,0.24 -0.75,0.36z"/></svg>'
var search_icon='<svg t="1628398535183" class="icon" viewBox="0 0 500 500" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2890" width="32" height="24"> <path fill="#FFFFFF" d="m228.47854,54.93436a154.04816,154.04794 0 0 0 -154.04799,154.0468a154.04816,154.04794 0 0 0 154.04799,154.04802a154.04816,154.04794 0 0 0 154.04799,-154.04802a154.04816,154.04794 0 0 0 -154.04799,-154.0468zm0,26.77613a129.95832,127.2707 0 0 1 129.9588,127.27067a129.95832,127.2707 0 0 1 -129.9588,127.27067a129.95832,127.2707 0 0 1 -129.95758,-127.27067a129.95832,127.2707 0 0 1 129.95758,-127.27067z" id="path4714" /><rect fill="#FFFFFF" id="rect4721" width="173.02675" height="36.16684" x="444.05115" y="-50.83782" transform="matrix(0.653168 0.757213 -0.60689 0.794785 0 0)" rx="33.24944" ry="18.08342"/></svg>'
var info_icon='<svg t="1628402015202" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3873" width="32" height="24"><path d="M504.5 101.77c-226.563 0-410.229 183.666-410.229 410.229 0 226.565 183.666 410.231 410.229 410.231s410.229-183.666 410.229-410.231c0-226.563-183.666-410.229-410.229-410.229z m0 755.048c-190.437 0-344.818-154.381-344.818-344.819 0-190.438 154.381-344.818 344.818-344.818 190.438 0 344.819 154.381 344.819 344.818 0 190.439-154.381 344.819-344.819 344.819z" fill="#FFFFFF" p-id="3874"></path><path d="M504.5 313.259m-41.998 0a41.998 41.998 0 1 0 83.996 0 41.998 41.998 0 1 0-83.996 0Z" fill="#FFFFFF" p-id="3875"></path><path d="M546.498 712.738c0 22.092-17.908 40-40 40h-3.996c-22.091 0-40-17.908-40-40V437.255c0-22.091 17.909-40 40-40h3.996c22.092 0 40 17.909 40 40v275.483z" fill="#FFFFFF" p-id="3876"></path></svg>'
var first_ini=false
var is_danmaku_show=true
var danmaku=null;
var episode_info=null
var selecAnime_id=0
var video_container
var next_video_flag=false
function initButton(){
    var menubar=document.querySelector("div[class='PlayerControls-buttonGroupCenter-LDbSmK PlayerControls-buttonGroup-L3xlI0 PlayerControls-balanceLeft-jE50ih']")
    var danmakuDisplay = document.createElement('button', {
        class: 'btnGuide hide paper-icon-button-light icon-button-conditionalfocuscolor',
    })
    danmakuDisplay.setAttribute("is", "paper-icon-button-light")
    danmakuDisplay.setAttribute("title", "显示/隐藏弹幕")
    danmakuDisplay.setAttribute("id", "displayDanmaku")
    danmakuDisplay.innerHTML=danmaku_icon
    menubar.appendChild(danmakuDisplay)

    var danmakuSearch = document.createElement('button', {
        class: 'btnGuide hide paper-icon-button-light icon-button-conditionalfocuscolor',
    })
    danmakuSearch.setAttribute("is", "paper-icon-button-light")
    danmakuSearch.setAttribute("title", "搜索弹幕")
    danmakuSearch.setAttribute("id", "searchDanmaku")
    danmakuSearch.innerHTML=search_icon
    menubar.appendChild(danmakuSearch)

    var danmakuInfo = document.createElement('button', {
        class: 'btnGuide hide paper-icon-button-light icon-button-conditionalfocuscolor',
    })
    danmakuInfo.setAttribute("is", "paper-icon-button-light")
    danmakuInfo.setAttribute("title", "查看弹幕信息")
    danmakuInfo.setAttribute("id", "infoDanmaku")
    danmakuInfo.innerHTML=info_icon
    menubar.appendChild(danmakuInfo)
    $("#displayDanmaku").click(function(){
        console.log("click hide/show!!!!")
        if(is_danmaku_show){
            danmaku.hide();
            is_danmaku_show=false
			danmaku_icon='<svg t="1628392319408" class="icon" viewBox="0 0 400 400" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1713" width="32" height="24"><path id="svg_10" fill="#000000" d="m228.82,254.62c-10.19,1.42 -19.55,2.67 -28.89,4.04c-11.98,1.75 -23.89,4.18 -35.92,5.21c-8.4,0.72 -15.77,-3.54 -22.31,-8.64c-3.15,-2.46 -2.75,-4.64 1.11,-5.42c5.01,-1.01 10.18,-1.35 15.29,-1.78c21.2,-1.79 42.4,-3.49 63.59,-5.27c2.14,-0.18 4.26,-0.68 6.74,-1.09c0,-12.05 0,-24.09 0,-36.8c-9.94,1.47 -19.61,2.81 -29.23,4.44c-1.13,0.19 -2.09,1.89 -2.97,3.01c-2.74,3.51 -5.13,3.8 -7.33,-0.1c-2.82,-5.01 -5.16,-10.38 -7,-15.84c-5.52,-16.35 -10.5,-32.89 -16.13,-49.21c-1.99,-5.77 -5.26,-11.09 -7.89,-16.64c-2.73,-5.77 -1.28,-8.26 5.08,-7.86c7.93,0.49 15.95,2.84 23.7,2.06c21.29,-2.13 42.5,-5.21 63.66,-8.43c10.14,-1.54 20.99,-2.41 29.93,-6.82c13.96,-6.9 24.73,-1.48 35.99,4.93c5.76,3.28 11.56,6.62 16.83,10.6c4.42,3.34 4.43,7.07 0.13,10.4c-11.04,8.53 -16.25,20.73 -21.88,32.82c-4.27,9.17 -9.05,18.11 -13.81,27.04c-1.23,2.31 -3.02,4.42 -4.91,6.27c-3.7,3.62 -6.48,3.53 -9.49,-0.69c-1.76,-2.47 -3.51,-2.93 -6.24,-2.52c-10.01,1.49 -20.04,2.8 -30.51,4.24l0,36.4c7.45,-0.84 14.82,-1.6 22.16,-2.53c17.46,-2.21 34.88,-4.72 52.37,-6.68c12.18,-1.36 22.99,2.6 32.28,10.48c1.52,1.29 2.29,3.49 3.4,5.26c-1.8,0.98 -3.52,2.52 -5.43,2.82c-4.24,0.69 -8.58,0.96 -12.89,1.04c-16.81,0.32 -33.63,0.2 -50.42,0.82c-13.76,0.5 -27.5,1.82 -41.46,2.79c-1.92,38.38 3.65,77.07 -8.81,114.11c-0.7,0.1 -1.4,0.2 -2.1,0.3c-0.85,-1.76 -2.25,-3.46 -2.47,-5.3c-1.3,-10.87 -2.99,-21.75 -3.31,-32.66c-0.7,-23.46 -0.65,-46.94 -0.9,-70.42c0.03,-1.12 0.04,-2.25 0.04,-4.38zm17.35,-62.21c10.34,-1.56 20.14,-3.35 30.02,-4.41c5.77,-0.62 8.95,-2.71 10.55,-8.64c3.79,-14.06 9,-27.81 9.13,-42.61c0.08,-9.17 -4.37,-14 -13.4,-13.43c-11.22,0.72 -22.38,2.48 -33.54,4.03c-1.1,0.15 -2.76,1.97 -2.8,3.07c-0.26,6.94 -0.13,13.89 -0.13,19.46c8.32,0 16.1,-0.17 23.86,0.07c4.49,0.14 5.93,3.3 2.99,6.68c-1.77,2.04 -4.29,3.8 -6.82,4.74c-6.46,2.4 -13.13,4.27 -19.86,6.4l0,24.64zm-18.77,-63.22c-14.18,2.03 -27.58,3.95 -41.36,5.92c3,21.9 5.91,43.17 8.89,64.94c10.88,-1.47 21.06,-2.77 31.2,-4.31c1.01,-0.15 2.53,-1.77 2.56,-2.74c0.21,-7.46 0.12,-14.92 0.12,-22.31c-9.18,-2.64 -18.91,-1.41 -27.66,-7.13c8.67,-6 18.44,-6.23 27.88,-9.55c-0.53,-8.05 -1.06,-16.21 -1.63,-24.82z"/><path id="svg_11" fill="#000000" d="m58.31,306.77c4.37,0.43 8.74,0.9 13.11,1.29c3.97,0.36 7.95,0.56 11.91,0.95c7.81,0.77 12.83,-3 16.65,-9.47c6.85,-11.6 9.36,-24.45 10.75,-37.5c1,-9.4 1.29,-18.94 1.07,-28.4c-0.31,-13.62 -6.68,-18.56 -19.72,-15.2c-12.57,3.25 -24.87,7.38 -34.83,16.42c-3.76,3.41 -6.12,2.71 -8.52,-1.96c-4.56,-8.86 -2.27,-17.1 7.14,-23.13c7.94,-5.08 12.81,-12.04 14.57,-21.12c2.6,-13.39 1.71,-26.45 -4.5,-38.87c-0.82,-1.63 -1.5,-3.34 -2.16,-5.04c-0.35,-0.9 -0.53,-1.87 -1.03,-3.72c2.15,0 3.86,-0.24 5.46,0.06c1.93,0.37 3.93,0.94 5.64,1.88c14.81,8.19 27.91,-0.39 41.46,-4.2c0.79,-0.22 1.47,-1.64 1.79,-2.63c4.36,-13.49 7.24,-27.28 7.69,-41.49c0.22,-7.01 -1.15,-8.22 -8.29,-6.82c-10.42,2.04 -20.78,4.39 -31.12,6.77c-10.92,2.51 -19.22,-0.68 -24.84,-10.52c2.45,-0.4 4.53,-0.94 6.64,-1.06c16.46,-0.94 32.78,-2.86 48.48,-8.11c4.02,-1.34 7.96,-3.47 11.33,-6.03c4.98,-3.79 10.1,-4.43 15.4,-1.77c6.38,3.2 12.58,6.8 18.64,10.57c4.3,2.68 4.39,5.67 0.86,9.42c-0.68,0.73 -1.38,1.49 -2.22,2.01c-16.42,10.18 -21.91,27.39 -28.06,44.07c-0.56,1.51 0.67,4.01 1.65,5.71c4.49,7.7 3.29,10 -5.51,11.32c-12.48,1.87 -24.91,4.02 -37.32,6.29c-1.3,0.24 -3.16,1.99 -3.31,3.22c-1.93,15.95 -3.61,31.94 -5.41,48.5c9.19,-1.16 18.53,-2.27 26.07,-8.18c5.75,-4.51 11.22,-5.33 17.44,-1.86c3.34,1.86 6.69,3.74 9.85,5.88c3.26,2.21 4.19,5.52 1.74,8.63c-6.83,8.66 -7.67,18.94 -8.36,29.23c-0.98,14.6 -1.27,29.26 -2.48,43.84c-1.46,17.49 -5.62,34.24 -18.17,47.48c-3.36,3.54 -7.68,6.3 -11.9,8.86c-3.98,2.42 -8.17,0.97 -9.62,-3.04c-4.8,-13.24 -14.71,-21.45 -26.09,-28.47c-0.98,-0.61 -2,-1.16 -3,-1.74c0.39,-0.7 0.76,-1.38 1.12,-2.07z"/><path id="svg_12" fill="#000000" d="m254.44,107.14c2.2,-5.96 4.24,-11.98 6.62,-17.87c4.48,-11.09 9.53,-22.01 8.9,-34.38c-0.14,-2.78 -0.61,-5.59 -1.32,-8.29c-1.16,-4.41 -0.09,-6.88 4.5,-7.33c3.89,-0.37 8.09,-0.28 11.81,0.8c6.45,1.88 12.77,4.39 18.87,7.21c2.9,1.34 4.43,4.11 1.57,7.32c-13.6,15.25 -27.14,30.56 -40.81,45.76c-2.57,2.86 -5.6,5.29 -8.42,7.92c-0.58,-0.38 -1.15,-0.76 -1.72,-1.14z"/><path id="svg_13" fill="#000000" d="m227.27,87.26c-0.15,1.32 -0.16,2.66 -0.46,3.94c-2.36,10.27 -8.2,12.4 -16.37,5.77c-12.11,-9.83 -18.57,-23.59 -25.19,-37.15c-1.57,-3.21 0.24,-5.12 3.91,-4.53c14.24,2.3 25.94,9.03 34.27,20.89c2.18,3.11 3.1,7.12 4.59,10.72c-0.26,0.12 -0.5,0.24 -0.75,0.36z"/></svg>'
			danmakuDisplay.innerHTML=danmaku_icon
       }else{
            danmaku.show();
            is_danmaku_show=true
			danmaku_icon='<svg t="1628392319408" class="icon" viewBox="0 0 400 400" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1713" width="32" height="24"><path id="svg_10" fill="#FFFFFF" d="m228.82,254.62c-10.19,1.42 -19.55,2.67 -28.89,4.04c-11.98,1.75 -23.89,4.18 -35.92,5.21c-8.4,0.72 -15.77,-3.54 -22.31,-8.64c-3.15,-2.46 -2.75,-4.64 1.11,-5.42c5.01,-1.01 10.18,-1.35 15.29,-1.78c21.2,-1.79 42.4,-3.49 63.59,-5.27c2.14,-0.18 4.26,-0.68 6.74,-1.09c0,-12.05 0,-24.09 0,-36.8c-9.94,1.47 -19.61,2.81 -29.23,4.44c-1.13,0.19 -2.09,1.89 -2.97,3.01c-2.74,3.51 -5.13,3.8 -7.33,-0.1c-2.82,-5.01 -5.16,-10.38 -7,-15.84c-5.52,-16.35 -10.5,-32.89 -16.13,-49.21c-1.99,-5.77 -5.26,-11.09 -7.89,-16.64c-2.73,-5.77 -1.28,-8.26 5.08,-7.86c7.93,0.49 15.95,2.84 23.7,2.06c21.29,-2.13 42.5,-5.21 63.66,-8.43c10.14,-1.54 20.99,-2.41 29.93,-6.82c13.96,-6.9 24.73,-1.48 35.99,4.93c5.76,3.28 11.56,6.62 16.83,10.6c4.42,3.34 4.43,7.07 0.13,10.4c-11.04,8.53 -16.25,20.73 -21.88,32.82c-4.27,9.17 -9.05,18.11 -13.81,27.04c-1.23,2.31 -3.02,4.42 -4.91,6.27c-3.7,3.62 -6.48,3.53 -9.49,-0.69c-1.76,-2.47 -3.51,-2.93 -6.24,-2.52c-10.01,1.49 -20.04,2.8 -30.51,4.24l0,36.4c7.45,-0.84 14.82,-1.6 22.16,-2.53c17.46,-2.21 34.88,-4.72 52.37,-6.68c12.18,-1.36 22.99,2.6 32.28,10.48c1.52,1.29 2.29,3.49 3.4,5.26c-1.8,0.98 -3.52,2.52 -5.43,2.82c-4.24,0.69 -8.58,0.96 -12.89,1.04c-16.81,0.32 -33.63,0.2 -50.42,0.82c-13.76,0.5 -27.5,1.82 -41.46,2.79c-1.92,38.38 3.65,77.07 -8.81,114.11c-0.7,0.1 -1.4,0.2 -2.1,0.3c-0.85,-1.76 -2.25,-3.46 -2.47,-5.3c-1.3,-10.87 -2.99,-21.75 -3.31,-32.66c-0.7,-23.46 -0.65,-46.94 -0.9,-70.42c0.03,-1.12 0.04,-2.25 0.04,-4.38zm17.35,-62.21c10.34,-1.56 20.14,-3.35 30.02,-4.41c5.77,-0.62 8.95,-2.71 10.55,-8.64c3.79,-14.06 9,-27.81 9.13,-42.61c0.08,-9.17 -4.37,-14 -13.4,-13.43c-11.22,0.72 -22.38,2.48 -33.54,4.03c-1.1,0.15 -2.76,1.97 -2.8,3.07c-0.26,6.94 -0.13,13.89 -0.13,19.46c8.32,0 16.1,-0.17 23.86,0.07c4.49,0.14 5.93,3.3 2.99,6.68c-1.77,2.04 -4.29,3.8 -6.82,4.74c-6.46,2.4 -13.13,4.27 -19.86,6.4l0,24.64zm-18.77,-63.22c-14.18,2.03 -27.58,3.95 -41.36,5.92c3,21.9 5.91,43.17 8.89,64.94c10.88,-1.47 21.06,-2.77 31.2,-4.31c1.01,-0.15 2.53,-1.77 2.56,-2.74c0.21,-7.46 0.12,-14.92 0.12,-22.31c-9.18,-2.64 -18.91,-1.41 -27.66,-7.13c8.67,-6 18.44,-6.23 27.88,-9.55c-0.53,-8.05 -1.06,-16.21 -1.63,-24.82z"/><path id="svg_11" fill="#FFFFFF" d="m58.31,306.77c4.37,0.43 8.74,0.9 13.11,1.29c3.97,0.36 7.95,0.56 11.91,0.95c7.81,0.77 12.83,-3 16.65,-9.47c6.85,-11.6 9.36,-24.45 10.75,-37.5c1,-9.4 1.29,-18.94 1.07,-28.4c-0.31,-13.62 -6.68,-18.56 -19.72,-15.2c-12.57,3.25 -24.87,7.38 -34.83,16.42c-3.76,3.41 -6.12,2.71 -8.52,-1.96c-4.56,-8.86 -2.27,-17.1 7.14,-23.13c7.94,-5.08 12.81,-12.04 14.57,-21.12c2.6,-13.39 1.71,-26.45 -4.5,-38.87c-0.82,-1.63 -1.5,-3.34 -2.16,-5.04c-0.35,-0.9 -0.53,-1.87 -1.03,-3.72c2.15,0 3.86,-0.24 5.46,0.06c1.93,0.37 3.93,0.94 5.64,1.88c14.81,8.19 27.91,-0.39 41.46,-4.2c0.79,-0.22 1.47,-1.64 1.79,-2.63c4.36,-13.49 7.24,-27.28 7.69,-41.49c0.22,-7.01 -1.15,-8.22 -8.29,-6.82c-10.42,2.04 -20.78,4.39 -31.12,6.77c-10.92,2.51 -19.22,-0.68 -24.84,-10.52c2.45,-0.4 4.53,-0.94 6.64,-1.06c16.46,-0.94 32.78,-2.86 48.48,-8.11c4.02,-1.34 7.96,-3.47 11.33,-6.03c4.98,-3.79 10.1,-4.43 15.4,-1.77c6.38,3.2 12.58,6.8 18.64,10.57c4.3,2.68 4.39,5.67 0.86,9.42c-0.68,0.73 -1.38,1.49 -2.22,2.01c-16.42,10.18 -21.91,27.39 -28.06,44.07c-0.56,1.51 0.67,4.01 1.65,5.71c4.49,7.7 3.29,10 -5.51,11.32c-12.48,1.87 -24.91,4.02 -37.32,6.29c-1.3,0.24 -3.16,1.99 -3.31,3.22c-1.93,15.95 -3.61,31.94 -5.41,48.5c9.19,-1.16 18.53,-2.27 26.07,-8.18c5.75,-4.51 11.22,-5.33 17.44,-1.86c3.34,1.86 6.69,3.74 9.85,5.88c3.26,2.21 4.19,5.52 1.74,8.63c-6.83,8.66 -7.67,18.94 -8.36,29.23c-0.98,14.6 -1.27,29.26 -2.48,43.84c-1.46,17.49 -5.62,34.24 -18.17,47.48c-3.36,3.54 -7.68,6.3 -11.9,8.86c-3.98,2.42 -8.17,0.97 -9.62,-3.04c-4.8,-13.24 -14.71,-21.45 -26.09,-28.47c-0.98,-0.61 -2,-1.16 -3,-1.74c0.39,-0.7 0.76,-1.38 1.12,-2.07z"/><path id="svg_12" fill="#FFFFFF" d="m254.44,107.14c2.2,-5.96 4.24,-11.98 6.62,-17.87c4.48,-11.09 9.53,-22.01 8.9,-34.38c-0.14,-2.78 -0.61,-5.59 -1.32,-8.29c-1.16,-4.41 -0.09,-6.88 4.5,-7.33c3.89,-0.37 8.09,-0.28 11.81,0.8c6.45,1.88 12.77,4.39 18.87,7.21c2.9,1.34 4.43,4.11 1.57,7.32c-13.6,15.25 -27.14,30.56 -40.81,45.76c-2.57,2.86 -5.6,5.29 -8.42,7.92c-0.58,-0.38 -1.15,-0.76 -1.72,-1.14z"/><path id="svg_13" fill="#FFFFFF" d="m227.27,87.26c-0.15,1.32 -0.16,2.66 -0.46,3.94c-2.36,10.27 -8.2,12.4 -16.37,5.77c-12.11,-9.83 -18.57,-23.59 -25.19,-37.15c-1.57,-3.21 0.24,-5.12 3.91,-4.53c14.24,2.3 25.94,9.03 34.27,20.89c2.18,3.11 3.1,7.12 4.59,10.72c-0.26,0.12 -0.5,0.24 -0.75,0.36z"/></svg>'
			danmakuDisplay.innerHTML=danmaku_icon
        }
    })
    $("#searchDanmaku").click(function(){
        if(danmaku!=null){
            danmaku.clear();
            danmaku.destroy()
            danmaku=null
        }
        next_video_flag=false
        console.log("searchDanmaku!!!!")
        actionFunction(false)
    })
    $("#infoDanmaku").click(function(){
        console.log("infoDanmaku!!!!")
        if(episode_info!=null){
            alert(episode_info)
        }
    })
}

function actionFunction (is_init=true) {
    //-- DO WHAT YOU WANT TO THE TARGETED ELEMENTS HERE.
    //alert("hhh");
    if(next_video_flag){
        return
    }
    danmaku=null
    episode_info=null
    selecAnime_id=0
	
    if(document.getElementById('searchDanmaku') == undefined){
        initButton()
    }
    video_container=document.querySelector('[class="HTMLMedia-mediaElement-u17S9P"]');
    //修复音乐播放时播放界面不断刷新按钮的问题
    //video_container=document.querySelector("video[class='HTMLMedia-mediaElement-u17S9P']");
    if(!first_ini){
        video_container.addEventListener('loadstart',listnContainer)
        video_container.addEventListener('play',changeVideo)
        first_ini=true
    }else{
        console.log("secondly loading!!")
    }
    //var ori_anime=document.querySelector("title").innerHTML
    //ori_anime=/[^▶](.*) -/gi.exec(ori_anime)[1]
    //ori_anime=ori_anime[1]
    var ori_anime=document.querySelector("a[class='MetadataPosterTitle-singleLineTitle-e8SSfL MetadataPosterTitle-title-bvCBDN Link-link-SxPFpG Link-default-BXtKLo']").innerHTML
    var anime= ori_anime
    if(GM_getValue(ori_anime)){
        anime=GM_getValue(ori_anime)
    }
    if(!is_init){
        selecAnime_id=0;
        anime = prompt("确认动画名:",anime);
    }
    if(anime!=ori_anime){
        GM_setValue(ori_anime,anime)
    }
    var episode =document.querySelector("title")
    if(episode){
        episode=episode.innerHTML
        var newepisode=/第([0-9]*)集/gi.exec(episode)
        if(newepisode!=null){
            newepisode=newepisode[1]
    }else{
        newepisode='movie'
    }
    }
    //newepisode=parseInt(newepisode)
    var searchUrl;
    if(!is_init){
        searchUrl = "https://api.acplay.net/api/v2/search/episodes?anime="+anime+"&withRelated=true" //+"&episode="+newepisode,
    }else{
        searchUrl = "https://api.acplay.net/api/v2/search/episodes?anime="+anime+"&withRelated=true&episode="+newepisode
    }
    GM_xmlhttpRequest({
        method: "GET",
        url: searchUrl,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        data:"",
        onload: function(response){

            console.log("请求成功");
            //console.log(response.responseText);
            var obj = JSON.parse(response.responseText)
            if(!is_init){
                console.log(obj)
                var anime_lists_str=list2string(obj)
                console.log(anime_lists_str);
                selecAnime_id= prompt("选择:\n"+anime_lists_str,selecAnime_id)
                var newepisode_lists_str=ep2string(obj.animes[selecAnime_id].episodes)
                newepisode = prompt("确认集数:\n"+newepisode_lists_str,parseInt(newepisode)-1);
                newepisode=parseInt(newepisode)
            }else{
                newepisode=0
            }
            console.log("dsadasdasda",selecAnime_id,newepisode,obj)
            var episodeId=obj.animes[selecAnime_id].episodes[newepisode].episodeId
            if(obj.animes[selecAnime_id].type=="tvseries"){
                episode_info="动画名称:"+obj.animes[selecAnime_id].animeTitle+"\n分集名称:"+obj.animes[selecAnime_id].episodes[newepisode].episodeTitle
            }else{
                episode_info="动画名称:"+obj.animes[selecAnime_id].animeTitle
            }
            GM_xmlhttpRequest({
                method: "GET",
                url: "https://api.acplay.net/api/v2/comment/"+episodeId+"?withRelated=true",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                },
                data:"",
                onload: function(response2){
                    console.log("请求成功");
                    //console.log(response2.responseText);
                    var obj2 = JSON.parse(response2.responseText).comments
                    var comments = bilibiliParser(obj2)
                    console.log(comments.length)
                    var container=document.querySelector("div[class='Player-fullPlayerContainer-wBDz23']")
                    var media=document.querySelector('[class="HTMLMedia-mediaElement-u17S9P"]')
                    //var media=document.querySelector("video[class='HTMLMedia-mediaElement-u17S9P']")
                    if(danmaku!=null){
                        danmaku.clear();
                        danmaku.destroy()
                        danmaku=null
                        episode_info=null
                        selecAnime_id=0
                    }
                    danmaku=createDanmaku(container,media,comments)
                    //danmakuDisplay=document.getElementById('displayDanmaku')

                    var test=document.querySelector('[class="HTMLMedia-mediaElement-u17S9P"]');
                    //var test=document.querySelector("video[class='HTMLMedia-mediaElement-u17S9P']");
                    test.setAttribute("test","test")
                    var test2=document.querySelector("div[class='Player-fullPlayerContainer-wBDz23']");
                    test2.setAttribute("test","test")
                    test.addEventListener('loadstart',function(){wait1()})
                    new ResizeObserver(() => {
                        if(!document.querySelector("div[class='Player-fullPlayerContainer-wBDz23']")){
                        danmaku.destroy();
                            reload();
                        }
                        console.log("resizing")
                        danmaku.resize()
                    }).observe(test2)

                },
                onerror: function(response2){
                    console.log("请求失败");
                }
            });


        },
        onerror: function(response){
            console.log("请求失败");
        }
    });

}
function searchDanmaku(){

}

function createDanmaku($container,$media,$comments){
    return new Danmaku({
        container: $container,
        media: $media,
        //media: document.getElementById('my-video'),
        comments: $comments,
        engine: 'canvas'
    });
}

function bilibiliParser($obj) {
    //const $xml = new DOMParser().parseFromString(string, 'text/xml');
    console.log($obj)
    return $obj.map(($comment) => {
        const p = $comment.p
        //if (p === null || $comment.childNodes[0] === undefined) return null;
        const values = p.split(',');
        const mode = ({ 6: 'ltr', 1: 'rtl', 5: 'top', 4: 'bottom' })[values[1]];
        if (!mode) return null;
        //const fontSize = Number(values[2]) || 25;
        const fontSize=25
        const color = `000000${Number(values[2]).toString(16)}`.slice(-6);
        return {
            text: $comment.m,
            mode,
            time: values[0] * 1,
            style: {
                fontSize: `${fontSize}px`,
                color: `#${color}`,
                textShadow: color === '00000'
                ? '-1px -1px #fff, -1px 1px #fff, 1px -1px #fff, 1px 1px #fff'
                : '-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000',

                font: `${fontSize}px sans-serif`,
                fillStyle: `#${color}`,
                strokeStyle: color === '000000' ? '#fff' : '#000',
                lineWidth: 2.0,
            },
        };
    }).filter((x) => x);
}

function list2string($obj2){
    const $animes=$obj2.animes
    var anime_lists=$animes.map(($single_anime)=>{
        //console.log($single_anime.animeTitle)
        return $single_anime.animeTitle+" 类型:"+$single_anime.typeDescription
    })
    var anime_lists_str='0:'+anime_lists[0];
    for (var i=1;i<anime_lists.length;i++)
    {
        anime_lists_str=anime_lists_str+"\n"+(i).toString()+":"+anime_lists[i]
    }
    return anime_lists_str
}
function ep2string($obj3){
    const $animes=$obj3
    var anime_lists=$animes.map(($single_ep)=>{
        //console.log($single_anime.animeTitle)
        return $single_ep.episodeTitle
    })
    var ep_lists_str='0:'+anime_lists[0];
    for (var i=1;i<anime_lists.length;i++)
    {
        ep_lists_str=ep_lists_str+"\n"+(i).toString()+":"+anime_lists[i]
    }
    return ep_lists_str
}
function wait1(){
    danmaku=null;
    episode_info=null
    selecAnime_id=0
    if(!first_ini){
        initButton()
        waitForKeyElements ("a[class='MetadataPosterTitle-singleLineTitle-e8SSfL MetadataPosterTitle-title-bvCBDN Link-link-SxPFpG Link-default-BXtKLo']",actionFunction)
    }else{
        actionFunction()
    }
}
function listnContainer(){
    //video_container.removeEventListener("click", listnContainer);
    console.log('restart!!!!')
    if(danmaku!=null){
        danmaku.clear();
        danmaku.destroy()
        danmaku=null
        episode_info=null
        selecAnime_id=0
    }
    next_video_flag=true
}

function changeVideo(){
    console.log("play!!!")
    if(next_video_flag){
        console.log("true restart!!!")
        if(danmaku!=null){
            danmaku.clear();
            danmaku.destroy()
            danmaku=null
            episode_info=null
            selecAnime_id=0
        }
        next_video_flag=false
        //actionFunction()
    }

}
function reload(){
quit
}
(function() {
    'use strict';
    waitForKeyElements ("div[class='Player-fullPlayerContainer-wBDz23']",wait1);
    // Your code here...
})();

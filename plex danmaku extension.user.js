// ==UserScript==
// @name         plex danmaku extension
// @namespace    http://tampermonkey.net/
// @version      0.11
// @description  try to take over the world!
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
// 适配web版本4.76.1
// ==/UserScript==
//var danmaku_icon='<svg t="1628392319408" class="icon" viewBox="0 0 300 300" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1713" width="32" height="24"><path stroke-width="0.6894" fill="#FFFFFF" d="m171.68995,284.1811c-3.17802,-2.39519 -3.25652,-3.52051 -3.25652,-46.68449l0,-40.69656l-7.75572,-0.0189c-4.26564,-0.0104 -17.02192,-0.31269 -28.34729,-0.67181c-23.69961,-0.7515 -25.45074,-1.12606 -25.77793,-5.51391c-0.099,-1.32708 0.0775,-2.80565 0.39221,-3.2857c0.31468,-0.48004 2.87749,-1.37177 5.6951,-1.98163c4.23902,-0.91751 9.36538,-1.08776 29.71014,-0.98673l24.58717,0.12209l0.45842,-4.68973c0.25213,-2.57934 0.51125,-5.15507 0.57581,-5.72382c0.0907,-0.79952 -2.22838,-1.50425 -10.22356,-3.1067c-17.3625,-3.4799 -23.26657,-8.0808 -26.16862,-20.39252c-2.21863,-9.41237 -0.8746,-29.09402 2.69352,-39.44353c2.58079,-7.48571 6.33553,-10.16936 19.96368,-14.26883l7.51892,-2.26176l13.16299,0.46853c14.7612,0.52541 19.03412,1.11255 26.86596,3.6916c11.78795,3.88182 17.63704,14.21886 17.6495,31.19181c0.006,7.91791 -1.23795,17.51596 -3.03741,23.43949c-2.24568,7.39243 -2.91973,8.18841 -11.11814,13.12927l-7.62134,4.59309l-7.77551,0.73325c-4.27653,0.40329 -7.93042,0.88816 -8.11976,1.07749c-0.49767,0.49768 -1.66274,10.28643 -1.27093,10.67823c0.18124,0.18123 13.44172,0.53138 29.46774,0.77811c31.13411,0.47933 31.28858,0.49809 32.88085,3.99274c1.30381,2.86155 0.88611,4.04068 -1.84678,5.21334c-6.73437,2.88968 -15.22305,3.59405 -33.2634,2.76009c-6.63544,-0.30673 -15.54765,-0.46092 -19.8049,-0.34262l-7.74046,0.21507l-0.18761,42.75983l-0.1876,42.75984l-1.93428,1.66353c-2.12875,1.83078 -4.42411,2.12837 -6.18425,0.8018l0,0.00004zm-5.41088,-122.97116l2.15436,-0.43088l0,-10.49831l0,-10.49833l-5.27449,-0.44584c-2.90097,-0.24523 -8.6402,-0.44586 -12.75384,-0.44586l-7.47936,0l0,4.31327c0,5.3235 0.79656,8.21567 3.22975,11.72676c2.04633,2.95288 2.96609,3.43515 10.21349,5.35547c5.36379,1.42123 6.76808,1.55212 9.91009,0.92372zm28.03425,-1.32292c6.05392,-1.56825 9.08738,-3.84514 11.05732,-8.29951c2.21325,-5.00455 2.38141,-9.5332 0.4266,-11.48801c-1.33097,-1.33098 -2.40615,-1.49718 -11.44529,-1.76912c-5.48699,-0.16507 -10.77127,-0.10062 -11.74285,0.14324l-1.76652,0.44336l0,11.01721l0,11.01722l4.68093,0c2.57452,0 6.52993,-0.47897 8.78981,-1.06439zm-27.43104,-33.09142c1.51841,-0.33311 1.55115,-0.54375 1.55115,-9.97872l0,-9.63843l-5.06091,0c-6.1652,0 -10.6182,1.26456 -15.04749,4.27316c-3.77008,2.56085 -4.58147,4.37324 -5.18561,11.58298l-0.37549,4.48108l11.2836,-0.18988c6.206,-0.10445 11.98163,-0.34302 12.83475,-0.53019zm38.60623,0.00069c1.19339,-0.26237 1.55114,-0.82409 1.55114,-2.4355c0,-10.31345 -6.96544,-16.0852 -20.50955,-16.99477l-5.68752,-0.38194l-0.00066,10.26577l-0.00066,10.26578l11.54806,-0.18915c6.35142,-0.10403 12.24606,-0.34261 13.09919,-0.53019zm-126.2906,154.39776c-1.31826,-1.31826 -2.33495,-3.58745 -3.16448,-7.06291c-0.79792,-3.34298 0.50856,-45.83381 1.72577,-56.12782c2.44475,-20.67523 7.83834,-37.63729 14.08589,-44.29806c9.25094,-9.86282 13.93772,-21.27794 12.47483,-30.3837c-0.75372,-4.69153 -1.7688,-5.77034 -8.96255,-9.5254c-5.86621,-3.0621 -12.5832,-5.41142 -20.77608,-7.26661c-3.76546,-0.85265 -7.80943,-2.26038 -9.335,-3.24959c-5.16166,-3.34687 -7.80576,-9.3231 -7.80576,-17.64264c0,-3.94657 0.42824,-5.76584 2.48322,-10.54935c2.16185,-5.03232 2.89869,-6.04696 5.69383,-7.8406c5.42438,-3.48081 9.45237,-4.91048 17.789,-6.31389c14.73329,-2.48025 17.80442,-5.50367 17.80838,-17.53172l0.002,-6.89397l-18.95841,-0.3447c-16.03145,-0.29148 -19.28547,-0.52394 -21.07682,-1.50569c-2.53098,-1.3871 -3.42103,-2.38749 -4.38881,-4.93296c-0.70793,-1.86198 -0.62273,-1.96017 3.23209,-3.72496c3.95649,-1.81134 3.97186,-1.8126 22.69001,-1.8567c10.30196,-0.02428 18.98675,-0.29984 19.29953,-0.61238c0.31278,-0.31253 0.58384,-5.27619 0.60237,-11.03035c0.0276,-8.57578 0.26494,-11.02144 1.31637,-13.56439c1.74779,-4.22714 1.98165,-4.39925 4.74051,-3.48874c4.42669,1.46094 4.60761,2.53833 4.60761,27.43919c0,23.9045 -0.47307,27.81081 -4.40912,36.40828c-1.42668,3.11627 -2.25696,3.94578 -6.10134,6.09568c-5.78561,3.2355 -11.13033,5.04518 -18.78892,6.36177c-7.80119,1.34111 -10.35003,2.53989 -12.58681,5.91989c-1.4268,2.15604 -1.84068,3.76746 -2.09471,8.15558c-0.29552,5.10511 -0.20761,5.56101 1.32261,6.85796c2.99724,2.54036 9.83069,5.35865 16.77176,6.91708c10.1524,2.27946 16.00678,4.47308 20.01569,7.49985c6.44399,4.86526 10.02938,12.79014 9.04287,19.9876c-1.46913,10.71839 -5.00813,18.98062 -12.1818,28.43986c-8.4186,11.10084 -12.76473,20.49109 -14.71956,31.80319c-1.85111,10.7118 -2.64776,28.85262 -2.14359,48.81211c0.49956,19.77729 0.24773,22.28697 -2.46177,24.53374c-1.86136,1.54346 -4.48572,1.77871 -5.74909,0.51535l0.00028,0zm62.45356,-198.19587c-6.84098,-1.34472 -9.6954,-3.97348 -12.55238,-11.55997c-3.14693,-8.35647 -3.71591,-12.73076 -3.69067,-28.37366c0.0205,-12.7446 0.21484,-15.45009 1.38603,-19.30311c1.34725,-4.43219 1.38805,-4.47978 3.73946,-4.36168c1.70867,0.08581 2.92634,0.73382 4.32912,2.30381c1.92312,2.15234 1.94483,2.27292 1.47973,8.21836c-0.73423,9.38571 -1.34569,8.87876 10.21875,8.47228c5.80434,-0.20402 10.00001,-0.6445 10.27917,-1.07914c0.25944,-0.40392 0.68944,-3.80563 0.95556,-7.55934c0.56752,-8.00475 1.77636,-10.15523 5.82145,-10.35607c2.37931,-0.11813 2.4195,-0.07204 4.10195,4.70648c1.57076,4.46124 1.6991,5.78919 1.69904,17.57962c-0.00009,17.97737 -2.8591,32.48848 -7.20052,36.54681c-3.71867,3.47618 -14.46207,5.96559 -20.56669,4.76561zm10.92312,-12.26002c1.31376,-0.70458 2.59647,-2.02305 2.85046,-2.92993c0.25399,-0.90689 0.49273,-5.40366 0.53052,-9.99284l0.0687,-8.34395l-5.27449,-0.44586c-2.90097,-0.24522 -7.13233,-0.44585 -9.40302,-0.44585l-4.12852,0l0.34468,7.75571c0.39591,8.90807 2.26376,14.68825 4.91388,15.20617c3.73066,0.72911 7.85155,0.40122 10.09778,-0.80345l0.00001,0zm44.81351,12.24414c-6.53001,-1.24234 -8.07632,-2.42793 -11.07738,-8.49328c-4.18764,-8.46348 -5.64517,-16.56402 -5.65424,-31.42447c-0.007,-10.20883 0.22104,-12.90888 1.47765,-17.55463c0.81675,-3.01961 1.76825,-5.77344 2.11444,-6.11963c0.91975,-0.91976 3.82642,-0.0016 6.0405,1.90799c1.89544,1.63483 1.92509,1.77772 1.72711,8.32258c-0.29901,9.88539 -1.13681,9.17714 10.38647,8.78044c5.39411,-0.1857 9.9435,-0.4601 10.10974,-0.60978c0.16624,-0.14969 0.51154,-3.55083 0.76733,-7.55808c0.40985,-6.42072 0.66048,-7.48122 2.11064,-8.93046c0.90505,-0.90449 2.61619,-1.83841 3.80254,-2.07539c2.04343,-0.40817 2.2154,-0.27294 3.26627,2.56854c2.76964,7.48889 3.614,17.1935 2.54027,29.19648c-1.45537,16.26933 -4.09616,25.6691 -7.86021,27.97808c-5.6554,3.46918 -13.85186,5.13394 -19.75113,4.01161zm11.43662,-12.26695c1.91051,-1.16501 2.22702,-1.85674 3.07456,-6.71904c0.96385,-5.52952 1.31064,-13.60778 0.61422,-14.30724c-0.21232,-0.21324 -4.71357,-0.59429 -10.00276,-0.84678l-9.61673,-0.45907l0.45503,8.19866c0.49886,8.98845 1.90033,13.78915 4.3097,14.76282c2.72277,1.10032 8.90049,0.75213 11.16598,-0.62935z" id="path5731"/></svg>'
var danmaku_icon='<svg t="1628392319408" class="icon" viewBox="0 0 400 400" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1713" width="32" height="24"><path id="svg_2" d="m37.59,393.81c-0.92,0.31 -1.52,0.05 -2,-0.78c-0.7,-1.2 -1.52,-2.34 -2.47,-3.78l0,4.59c-0.55,0.03 -0.95,0.05 -1.41,0.07c-0.03,-0.37 -0.06,-0.64 -0.06,-0.91c0,-1.91 0,-3.81 0,-5.7c1.13,-0.41 1.77,-0.03 2.29,0.91c0.62,1.11 1.38,2.14 2.31,3.19l0,-4.2l1.35,0l0,6.61l-0.01,0z"/><path id="svg_3" d="m12.94,393.88l0,-6.75c1.9,0.19 3.93,-0.54 5.37,1.29c0.8,1.01 0.78,2.88 0.03,3.97c-1.37,1.97 -3.4,1.51 -5.4,1.49m1.45,-1.22c2.04,0.12 2.92,-0.58 2.89,-2.21c-0.03,-1.51 -0.98,-2.19 -2.89,-2l0,4.21z"/><path id="svg_4" d="m11.81,393.87l-5.49,0c0.68,-2.18 2.47,-3.48 3.51,-5.45l-3.08,0l0,-1.21l5.29,0c-0.71,2.13 -2.44,3.48 -3.47,5.51c0.86,0 1.63,0.04 2.39,-0.01c0.79,-0.05 1.14,0.21 0.85,1.16"/><path id="svg_5" d="m39.33,393.86l0,-6.61l3.7,0l0,1.07l-2.22,0l0,1.52c0.68,0.04 1.34,0.09 2.07,0.13l0,1.07c-0.72,0.05 -1.38,0.09 -2.1,0.14l0,1.48l2.4,0l0,1.19l-3.85,0l0,0.01z"/><path id="svg_6" d="m27.71,388.56c-1.15,-0.3 -2.46,-0.61 -3.1,0.64c-0.37,0.73 -0.41,1.93 -0.06,2.67c0.63,1.35 1.99,0.93 3.17,0.68c0.35,0.94 -0.01,1.32 -0.93,1.46c-1.62,0.25 -3.05,-0.27 -3.76,-1.48c-0.73,-1.25 -0.6,-3.03 0.31,-4.17c0.88,-1.11 2.71,-1.7 4,-1.16c0.32,0.13 0.44,0.74 0.65,1.12c-0.1,0.08 -0.19,0.16 -0.28,0.24"/><path id="svg_7" d="m49.15,387.24l0,1.07c-0.59,0.02 -1.17,0.05 -1.87,0.08l0,5.44l-1.48,0l0,-5.44l-1.85,0c-0.05,-0.4 -0.08,-0.73 -0.13,-1.15l5.33,0z"/><path id="svg_8" d="m20.06,387.21l1.33,0l0,6.62l-1.33,0l0,-6.62z"/><path id="svg_9" d="m30.68,393.25c-0.49,0.38 -0.8,0.79 -1.05,0.76c-0.32,-0.05 -0.6,-0.45 -0.9,-0.7c0.26,-0.24 0.51,-0.64 0.8,-0.67c0.29,-0.04 0.62,0.3 1.15,0.61"/><path id="svg_10" fill="#FFFFFF" d="m228.82,254.62c-10.19,1.42 -19.55,2.67 -28.89,4.04c-11.98,1.75 -23.89,4.18 -35.92,5.21c-8.4,0.72 -15.77,-3.54 -22.31,-8.64c-3.15,-2.46 -2.75,-4.64 1.11,-5.42c5.01,-1.01 10.18,-1.35 15.29,-1.78c21.2,-1.79 42.4,-3.49 63.59,-5.27c2.14,-0.18 4.26,-0.68 6.74,-1.09c0,-12.05 0,-24.09 0,-36.8c-9.94,1.47 -19.61,2.81 -29.23,4.44c-1.13,0.19 -2.09,1.89 -2.97,3.01c-2.74,3.51 -5.13,3.8 -7.33,-0.1c-2.82,-5.01 -5.16,-10.38 -7,-15.84c-5.52,-16.35 -10.5,-32.89 -16.13,-49.21c-1.99,-5.77 -5.26,-11.09 -7.89,-16.64c-2.73,-5.77 -1.28,-8.26 5.08,-7.86c7.93,0.49 15.95,2.84 23.7,2.06c21.29,-2.13 42.5,-5.21 63.66,-8.43c10.14,-1.54 20.99,-2.41 29.93,-6.82c13.96,-6.9 24.73,-1.48 35.99,4.93c5.76,3.28 11.56,6.62 16.83,10.6c4.42,3.34 4.43,7.07 0.13,10.4c-11.04,8.53 -16.25,20.73 -21.88,32.82c-4.27,9.17 -9.05,18.11 -13.81,27.04c-1.23,2.31 -3.02,4.42 -4.91,6.27c-3.7,3.62 -6.48,3.53 -9.49,-0.69c-1.76,-2.47 -3.51,-2.93 -6.24,-2.52c-10.01,1.49 -20.04,2.8 -30.51,4.24l0,36.4c7.45,-0.84 14.82,-1.6 22.16,-2.53c17.46,-2.21 34.88,-4.72 52.37,-6.68c12.18,-1.36 22.99,2.6 32.28,10.48c1.52,1.29 2.29,3.49 3.4,5.26c-1.8,0.98 -3.52,2.52 -5.43,2.82c-4.24,0.69 -8.58,0.96 -12.89,1.04c-16.81,0.32 -33.63,0.2 -50.42,0.82c-13.76,0.5 -27.5,1.82 -41.46,2.79c-1.92,38.38 3.65,77.07 -8.81,114.11c-0.7,0.1 -1.4,0.2 -2.1,0.3c-0.85,-1.76 -2.25,-3.46 -2.47,-5.3c-1.3,-10.87 -2.99,-21.75 -3.31,-32.66c-0.7,-23.46 -0.65,-46.94 -0.9,-70.42c0.03,-1.12 0.04,-2.25 0.04,-4.38zm17.35,-62.21c10.34,-1.56 20.14,-3.35 30.02,-4.41c5.77,-0.62 8.95,-2.71 10.55,-8.64c3.79,-14.06 9,-27.81 9.13,-42.61c0.08,-9.17 -4.37,-14 -13.4,-13.43c-11.22,0.72 -22.38,2.48 -33.54,4.03c-1.1,0.15 -2.76,1.97 -2.8,3.07c-0.26,6.94 -0.13,13.89 -0.13,19.46c8.32,0 16.1,-0.17 23.86,0.07c4.49,0.14 5.93,3.3 2.99,6.68c-1.77,2.04 -4.29,3.8 -6.82,4.74c-6.46,2.4 -13.13,4.27 -19.86,6.4l0,24.64zm-18.77,-63.22c-14.18,2.03 -27.58,3.95 -41.36,5.92c3,21.9 5.91,43.17 8.89,64.94c10.88,-1.47 21.06,-2.77 31.2,-4.31c1.01,-0.15 2.53,-1.77 2.56,-2.74c0.21,-7.46 0.12,-14.92 0.12,-22.31c-9.18,-2.64 -18.91,-1.41 -27.66,-7.13c8.67,-6 18.44,-6.23 27.88,-9.55c-0.53,-8.05 -1.06,-16.21 -1.63,-24.82z"/><path id="svg_11" fill="#FFFFFF" d="m58.31,306.77c4.37,0.43 8.74,0.9 13.11,1.29c3.97,0.36 7.95,0.56 11.91,0.95c7.81,0.77 12.83,-3 16.65,-9.47c6.85,-11.6 9.36,-24.45 10.75,-37.5c1,-9.4 1.29,-18.94 1.07,-28.4c-0.31,-13.62 -6.68,-18.56 -19.72,-15.2c-12.57,3.25 -24.87,7.38 -34.83,16.42c-3.76,3.41 -6.12,2.71 -8.52,-1.96c-4.56,-8.86 -2.27,-17.1 7.14,-23.13c7.94,-5.08 12.81,-12.04 14.57,-21.12c2.6,-13.39 1.71,-26.45 -4.5,-38.87c-0.82,-1.63 -1.5,-3.34 -2.16,-5.04c-0.35,-0.9 -0.53,-1.87 -1.03,-3.72c2.15,0 3.86,-0.24 5.46,0.06c1.93,0.37 3.93,0.94 5.64,1.88c14.81,8.19 27.91,-0.39 41.46,-4.2c0.79,-0.22 1.47,-1.64 1.79,-2.63c4.36,-13.49 7.24,-27.28 7.69,-41.49c0.22,-7.01 -1.15,-8.22 -8.29,-6.82c-10.42,2.04 -20.78,4.39 -31.12,6.77c-10.92,2.51 -19.22,-0.68 -24.84,-10.52c2.45,-0.4 4.53,-0.94 6.64,-1.06c16.46,-0.94 32.78,-2.86 48.48,-8.11c4.02,-1.34 7.96,-3.47 11.33,-6.03c4.98,-3.79 10.1,-4.43 15.4,-1.77c6.38,3.2 12.58,6.8 18.64,10.57c4.3,2.68 4.39,5.67 0.86,9.42c-0.68,0.73 -1.38,1.49 -2.22,2.01c-16.42,10.18 -21.91,27.39 -28.06,44.07c-0.56,1.51 0.67,4.01 1.65,5.71c4.49,7.7 3.29,10 -5.51,11.32c-12.48,1.87 -24.91,4.02 -37.32,6.29c-1.3,0.24 -3.16,1.99 -3.31,3.22c-1.93,15.95 -3.61,31.94 -5.41,48.5c9.19,-1.16 18.53,-2.27 26.07,-8.18c5.75,-4.51 11.22,-5.33 17.44,-1.86c3.34,1.86 6.69,3.74 9.85,5.88c3.26,2.21 4.19,5.52 1.74,8.63c-6.83,8.66 -7.67,18.94 -8.36,29.23c-0.98,14.6 -1.27,29.26 -2.48,43.84c-1.46,17.49 -5.62,34.24 -18.17,47.48c-3.36,3.54 -7.68,6.3 -11.9,8.86c-3.98,2.42 -8.17,0.97 -9.62,-3.04c-4.8,-13.24 -14.71,-21.45 -26.09,-28.47c-0.98,-0.61 -2,-1.16 -3,-1.74c0.39,-0.7 0.76,-1.38 1.12,-2.07z"/><path id="svg_12" fill="#FFFFFF" d="m254.44,107.14c2.2,-5.96 4.24,-11.98 6.62,-17.87c4.48,-11.09 9.53,-22.01 8.9,-34.38c-0.14,-2.78 -0.61,-5.59 -1.32,-8.29c-1.16,-4.41 -0.09,-6.88 4.5,-7.33c3.89,-0.37 8.09,-0.28 11.81,0.8c6.45,1.88 12.77,4.39 18.87,7.21c2.9,1.34 4.43,4.11 1.57,7.32c-13.6,15.25 -27.14,30.56 -40.81,45.76c-2.57,2.86 -5.6,5.29 -8.42,7.92c-0.58,-0.38 -1.15,-0.76 -1.72,-1.14z"/><path id="svg_13" fill="#FFFFFF" d="m227.27,87.26c-0.15,1.32 -0.16,2.66 -0.46,3.94c-2.36,10.27 -8.2,12.4 -16.37,5.77c-12.11,-9.83 -18.57,-23.59 -25.19,-37.15c-1.57,-3.21 0.24,-5.12 3.91,-4.53c14.24,2.3 25.94,9.03 34.27,20.89c2.18,3.11 3.1,7.12 4.59,10.72c-0.26,0.12 -0.5,0.24 -0.75,0.36z"/></svg>'
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
        }else{
            danmaku.show();
            is_danmaku_show=true
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

/*!
   JW Player version 8.2.2
   Copyright (c) 2018, JW Player, All Rights Reserved 
   This source code and its use and distribution is subject to the terms 
   and conditions of the applicable license agreement. 
   https://www.jwplayer.com/tos/
   This product includes portions of other software. For the full text of licenses, see
   https://ssl.p.jwpcdn.com/player/v/8.2.2/notice.txt
*/
webpackJsonpjwplayer([14],{125:function(e,t,a){"use strict";function i(e,t){function a(){t.set("castState",{available:t.get("castAvailable"),active:t.get("castActive")})}function i(e){e&&e.forEach(function(e){e.file=l.a.getAbsolutePath(e.file)})}function n(e){e&&(e.image=l.a.getAbsolutePath(e.image),i(e.allSources),i(e.sources))}function c(){u.removeEventListener("webkitplaybacktargetavailabilitychanged",o.updateAvailability),u.removeEventListener("webkitcurrentplaybacktargetiswirelesschanged",o.updateActive)}function s(){u.addEventListener("webkitplaybacktargetavailabilitychanged",o.updateAvailability),u.addEventListener("webkitcurrentplaybacktargetiswirelesschanged",o.updateActive)}function r(){u=null,t.getVideo()&&(u=t.getVideo().video),u&&(c(),s()),o.updateAvailability({}),o.updateActive()}var u=null,o=this;o.updateAvailability=function(e){t.set("castAvailable","available"===e.availability),a()},o.updateActive=function(){var i=!1;u&&(i=!!u.webkitCurrentPlaybackTargetIsWireless),t.off("change:playlistItem",n),i&&(e.instreamDestroy(),n(t.get("playlistItem")),t.on("change:playlistItem",n)),t.set("airplayActive",i),t.set("castActive",i),a()},o.airplayToggle=function(){u&&u.webkitShowPlaybackTargetPicker()},t.change("itemReady",r)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=i;var l=a(6)}});
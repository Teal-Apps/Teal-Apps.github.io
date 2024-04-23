//<script>

var youtube;
var youtubevol = 0;  // tried with 1 to avoid it showing sound off but you can still hear some of it
var currentlyplaying = 1; //default to first


// called by youtube when script finished loading
function onYouTubeIframeAPIReady() 
{
	try {  
		youtube = new YT.Player('youtube', 
				{
				loading: 'lazy',
				width: 420,
          				height: 315,
				volume: youtubevol,
        	  			videoId: video[1],
				host: 'https://www.youtube-nocookie.com',
				//playerVars: { 'controls' : 0 },	// removes controls, disabled on style/iframe now
          				events: { 'onStateChange': onyoutubechange, 
					'onReady': onPlayerReady }
        			});

		//	youtube.pauseVideo(); // keeps giving errors in F12
	
		return true; //?
	}
	catch (err)
	{
	 	return true; //?  just ignore, we don't really need the video
	}
}



function loadvideo(track, title, youtubeid, audiopath, startat = 0)
{
	if (track == currentlyplaying)
	{
		try {
			// just unpause video
			youtube.playVideo();
			youtube.setVolume(youtubevol);
			youtube.mute();
		}
		catch (err)
		{	
			; // just ignore, we don't really need the video
		}

		// set current star (now an arrow)
		document.getElementById('star'+track).innerHTML = '>';

		return;
	}		

	stopall(track); // pause all others first

	try {
		youtube.pauseVideo(); // including current video
	}
	catch (err)
	{
		; // just ignore
	}

	// reset all other music to start from the beginning
	restartall(track);
	
	// remove all 'currently playing' stars
	for (i=1; i<=songcount; i++)
		document.getElementById('star'+i).innerHTML = '';
	
	// set current star (now an arrow)
	document.getElementById('star'+track).innerHTML = '>';

	// set title above video
	document.getElementById('playing').innerHTML = title;

	if (youtubeid == 'xxxxxxxxxxx')
		document.getElementById('video').innerHTML = "<i style='color:blue'>I could not find a recording, please email me if you find one (in the same key).</i>"
	else
		//display link for video
		document.getElementById('video').innerHTML = "<a target=_blank href='https://www.youtube.com/watch?v=" + youtubeid + "'>https://www.youtube.com/watch?v=" + youtubeid + "</a>";

	try {
		youtube.loadVideoById(youtubeid, startat);
		youtube.setVolume(youtubevol);
		youtube.mute();
	}
	catch (err)
	{
		; // just ignore
	}

	currentlyplaying = track;

	return true; //?
}


function onPlayerReady(event) 
{
	return true; //?
}


// this seems to be needed, no idea why....
function onyoutubechange(event) 
{
	return false;
}


function stopped()
{
	// called when current part stops playing, so that the shows || then no autoplay
  	// set current to pause sign
  	document.getElementById('star'+currentlyplaying).innerHTML = '||';

	return true; //?
}

function stopall()
{
	stopall(0); // stop including curent one
}

function stopall(track)
{
	switch (songcount)
	{
		case 20:	if (track != 20) piano20['pause']();
		case 19:	if (track != 19) piano19['pause']();	
		case 18:	if (track != 18) piano18['pause']();	
		case 17:	if (track != 17) piano17['pause']();	
		case 16:	if (track != 16) piano16['pause']();	
		case 15:	if (track != 15) piano15['pause']();	
		case 14:	if (track != 14) piano14['pause']();	
		case 13:	if (track != 13) piano13['pause']();	
		case 12:	if (track != 12) piano12['pause']();	
		case 11:	if (track != 11) piano11['pause']();	
		case 10:	if (track != 10) piano10['pause']();	
		case 9:		if (track != 9) piano9['pause']();	
		case 8:		if (track != 8) piano8['pause']();	
		case 7:		if (track != 7) piano7['pause']();	
		case 6:		if (track != 6) piano6['pause']();	
		case 5:		if (track != 5) piano5['pause']();	
		case 4:		if (track != 4) piano4['pause']();	
		case 3:		if (track != 3) piano3['pause']();	
		case 2:		if (track != 2) piano2['pause']();	
		case 1:		if (track != 1) piano1['pause']();	
	}

	try {
	  	youtube.pauseVideo();
	}
	catch (err)
	{
		; //ignore
	}

  	// set current to pause sign
  	document.getElementById('star'+currentlyplaying).innerHTML = '||';

	return true; //?
}


function restartall(track)
{
	switch (songcount)
	{
		case 20:	if (track != 20) piano20.currentTime = 0;
		case 19:	if (track != 19) piano19.currentTime = 0;
		case 18:	if (track != 18) piano18.currentTime = 0;
		case 17:	if (track != 17) piano17.currentTime = 0;
		case 16:	if (track != 16) piano16.currentTime = 0;
		case 15:	if (track != 15) piano15.currentTime = 0;
		case 14:	if (track != 14) piano14.currentTime = 0;
		case 13:	if (track != 13) piano13.currentTime = 0;
		case 12:	if (track != 12) piano12.currentTime = 0;
		case 11:	if (track != 11) piano11.currentTime = 0;
		case 10:	if (track != 10) piano10.currentTime = 0;
		case 9:		if (track != 9) piano9.currentTime = 0;
		case 8:		if (track != 8) piano8.currentTime = 0;
		case 7:		if (track != 7) piano7.currentTime = 0;
		case 6:		if (track != 6) piano6.currentTime = 0;
		case 5:		if (track != 5) piano5.currentTime = 0;
		case 4:		if (track != 4) piano4.currentTime = 0;
		case 3:		if (track != 3) piano3.currentTime = 0;
		case 2:		if (track != 2) piano2.currentTime = 0;
		case 1:		if (track != 1) piano1.currentTime = 0;
	}

	return true; //?
}


function leiser(track, pianox)
{
	// divide in 0-9 so that it doesn't disturb the display with double-digits

	pianox.volume = Math.min(Math.max(pianox.volume - 0.11, 0), 1);

	document.getElementById('vol'+track).innerHTML = 'vol&nbsp;' + Math.round(pianox.volume * 9);

	return true; //?
}


function lauter(track, pianox)
{
	pianox.volume = Math.min(Math.max(pianox.volume + 0.11, 0), 1);

	document.getElementById('vol'+track).innerHTML = 'vol&nbsp;' + Math.round(pianox.volume * 9);

	return true; //?
}



function slower(track, pianox)
{
	pianox.playbackRate = Math.min(Math.max(pianox.playbackRate - 0.1, 0.5), 1);
	
	// display as %
	document.getElementById('speed'+track).innerHTML = 'speed&nbsp;&nbsp;' + Math.round(pianox.playbackRate * 100) + '%';

	return true; //?
}



function faster(track, pianox)
{
	pianox.playbackRate = Math.min(Math.max(pianox.playbackRate + 0.1, 0.5), 1);

	document.getElementById('speed'+track).innerHTML = 'speed&nbsp;&nbsp;' + Math.round(pianox.playbackRate * 100) + '%';

	return true; //?
}

//</script>
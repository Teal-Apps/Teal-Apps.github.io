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
		case 50:	if (track != 50) piano50['pause']();	
		case 49:	if (track != 49) piano49['pause']();	
		case 48:	if (track != 48) piano48['pause']();	
		case 47:	if (track != 47) piano47['pause']();	
		case 46:	if (track != 46) piano46['pause']();	
		case 45:	if (track != 45) piano45['pause']();	
		case 44:	if (track != 44) piano44['pause']();	
		case 43:	if (track != 43) piano43['pause']();	
		case 42:	if (track != 42) piano42['pause']();	
		case 41:	if (track != 41) piano41['pause']();	
		case 40:	if (track != 40) piano40['pause']();	
		case 39:	if (track != 39) piano39['pause']();	
		case 38:	if (track != 38) piano38['pause']();	
		case 37:	if (track != 37) piano37['pause']();	
		case 36:	if (track != 36) piano36['pause']();	
		case 35:	if (track != 35) piano35['pause']();	
		case 34:	if (track != 34) piano34['pause']();	
		case 33:	if (track != 33) piano33['pause']();	
		case 32:	if (track != 32) piano32['pause']();	
		case 31:	if (track != 31) piano31['pause']();	
		case 30:	if (track != 30) piano30['pause']();	
		case 29:	if (track != 29) piano29['pause']();	
		case 28:	if (track != 28) piano28['pause']();	
		case 27:	if (track != 27) piano27['pause']();	
		case 26:	if (track != 26) piano26['pause']();	
		case 25:	if (track != 25) piano25['pause']();	
		case 24:	if (track != 24) piano24['pause']();	
		case 23:	if (track != 23) piano23['pause']();	
		case 22:	if (track != 22) piano22['pause']();	
		case 21:	if (track != 21) piano21['pause']();	
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
		case 50:	if (track != 50) piano50.currentTime = 0;
		case 49:	if (track != 49) piano49.currentTime = 0;
		case 48:	if (track != 48) piano48.currentTime = 0;
		case 47:	if (track != 47) piano47.currentTime = 0;
		case 46:	if (track != 46) piano46.currentTime = 0;
		case 45:	if (track != 45) piano45.currentTime = 0;
		case 44:	if (track != 44) piano44.currentTime = 0;
		case 43:	if (track != 43) piano43.currentTime = 0;
		case 42:	if (track != 42) piano42.currentTime = 0;
		case 41:	if (track != 41) piano41.currentTime = 0;
		case 40:	if (track != 40) piano40.currentTime = 0;
		case 39:	if (track != 39) piano39.currentTime = 0;
		case 38:	if (track != 38) piano38.currentTime = 0;
		case 37:	if (track != 37) piano37.currentTime = 0;
		case 36:	if (track != 36) piano36.currentTime = 0;
		case 35:	if (track != 35) piano35.currentTime = 0;
		case 34:	if (track != 34) piano34.currentTime = 0;
		case 33:	if (track != 33) piano33.currentTime = 0;
		case 32:	if (track != 32) piano32.currentTime = 0;
		case 31:	if (track != 31) piano31.currentTime = 0;
		case 30:	if (track != 30) piano30.currentTime = 0;
		case 29:	if (track != 19) piano29.currentTime = 0;
		case 28:	if (track != 28) piano28.currentTime = 0;
		case 27:	if (track != 27) piano27.currentTime = 0;
		case 26:	if (track != 26) piano26.currentTime = 0;
		case 25:	if (track != 25) piano25.currentTime = 0;
		case 24:	if (track != 24) piano24.currentTime = 0;
		case 23:	if (track != 23) piano23.currentTime = 0;
		case 22:	if (track != 22) piano22.currentTime = 0;
		case 21:	if (track != 21) piano21.currentTime = 0;
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

	// set lyrics to blank
	document.getElementById('lyrics').innerHTML = ' <br> ';	

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



// new to try and add lyrics

function addlyrics(audio, track)
{
	if (track != currentlyplaying)
		return;

    	var time = audio.currentTime; // time in sec (float)

	for (i=1; i < lyrics[track].length; i++)
		if (time < lyrics[track][i][0]) // [0] is time
		{
			document.getElementById('lyrics').innerHTML = lyrics[track][i-1][1]; // [1] is lyrics
			return;
		}

	document.getElementById('lyrics').innerHTML = ' <br> ';
}



//</script>
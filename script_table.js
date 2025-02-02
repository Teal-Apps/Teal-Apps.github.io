//<script>
// this generates the table

var autoplay0 = 'Off';
var autoplay1 = 'Once';
var autoplay2 = 'Loop';
var radio = 2;

const header = []; //note arrays start at 0 but I'm ignoring 0
const number = []; // to display number if not i
const composer = [];
const title = [];
const video = [];
const mp3 = [];
const mp3a = []; // alternative mp3, eg dropbox keeps stopping
const lyrics = [];
// add the actual titles in the html


function generatetable()
{
//	var songcount = title.length-1;

	// generate first row plus video column
	// needs to check if that is a header or not
	if (header[1] != undefined)
	{
		document.getElementById('tbl').innerHTML = '<tr><td colspan=7><b>' + header[1] + '</b>' 
								+ generatevideocolumn() 
								+ generaterow(1);
	}
	else
	{
		document.getElementById('tbl').innerHTML = generaterow(1) 
							+ generatevideocolumn();
	}

	// generate one row per song for rest (add extra rows for any headers)
	for (i = 2; i <= songcount; i++)
	{
		// check if there is a header for this row, generate an extra row if yes
		if (header[i] != undefined)
			document.getElementById('tbl').innerHTML += '<tr><td colspan=7><b>' + header[i] + '</b>';

		document.getElementById('tbl').innerHTML += generaterow(i);
	}

	// check if there is one extra header without song at the end (eg saying 'more to come')
	if (header.length > title.length)
		document.getElementById('tbl').innerHTML += '<tr><td colspan=6><b>' + header[songcount+1] + '</b>';

}

function generatevideocolumn()
{
	// check state of autoplay radio
	var default0 = '';
	var default1 = '';
	var default2 = '';
	
	if (radio == 0)
		default0 = 'checked';
	else if (radio == 1)
		default1 = 'checked';
	else if (radio == 2)
		default2 = 'checked';

	vheader = header[1];

	vnumber = number[1];
	if (vnumber == undefined)
		vnumber = 1;

	// generate video column (defaults to first video)
	return '<td rowspan=' + (songcount*2) + ' valign=top>' 
		+ 'Autoplay options:<br>' 
		+ '<input type=radio name=auto id=off  ' + default0 + ' onclick="radio=0;"><label for=off>'  + autoplay0 + '</label><br>' 
		+ '<input type=radio name=auto id=once ' + default1 + ' onclick="radio=1;"><label for=once>' + autoplay1 + '</label><br>' 
		+ '<input type=radio name=auto id=loop ' + default2 + ' onclick="radio=2;"><label for=loop>' + autoplay2 + '</label><br>' 
		+ '<br><hr>' 
		+ '<h3 id=playing> #' + vnumber + ' ' + title[1] + '</h3>' 
		+ '<small id=video><a target=_blank href="https://www.youtube.com/watch?v=' + video[1] + '">https://www.youtube.com/watch?v=' + video[1] + '</a></small><br>' 
		+ '<small>(this is embedded from YouTube and covered by YouTube licence)</small><br>' 
		+ '<div id=youtube><br>!!! Your browser does not support YouTube player !!!<br>' 
		+ '(Try and refresh, sometimes it fails for some reason.)</div> <br>' 
		+ '<br><div id=lyrics> <br> </div> <br><br>'
		+ '<i><small style="color:red"><i>(please <a href=#email>email</a> me if you can\'t hear the alto part)<br>' 
		+ '(clicking \'play\' the first time might take a minute to load and start)</small></i><br><br></div>';
}


function generaterow(i)
{
	// work out autoplay option
	var onended;

	if (i == songcount)
		// last song
		onended = '"if (radio==2) no1.click(); else stopped();"';
	else
		onended = '"if (radio>0) no' + (i+1) + '.click(); else stopped();"';

	// display pause for first song by default
	var state
	if (i == 1)
		state = '||';
	else
		state = ' ';

	var vcomposer = composer[i];
	if (vcomposer == undefined)
		vcomposer = '';

	var vnumber = number[i];
	if (vnumber == undefined)
		vnumber = i;

	// add bit for lyrics if defined
	var ontimeupdate = ' ontimeupdate="addlyrics(this, ' + i + ')"';
	if (lyrics[i] == undefined)
		ontimeupdate = '';
		

	// generates one row of music (minus last video column)
	return '<tr><td> ' + vnumber 
		+ ' <td> ' + vcomposer 
		+ ' <td> ' + title[i] 
		// play column
			+ ' <td> <a id=no' + i + ' href="#!" onclick=\'loadvideo(' + i + ', "#' + vnumber + ' ' + title[i] + '", "' + video[i] + '"); piano' + i + '["play"]();\'>play</a>' 
		// pause column
			+ '<td> <a href="#!" onclick="stopall();">pause</a>' 
		// vol column (leave out now)
		//	+ '<td> <a href="#!" onclick=\'leiser(' + i + ', piano' + i + ');\'><b>&ndash;&#8288;</b></a>&nbsp;<i id=vol' + i + '>vol&nbsp;9</i>&nbsp;<a href="#!" onclick=\'lauter(' + i + ', piano' + i + ');\'><b>+</b></a>' 
		// skip column
			+ '<td> <a href="#!" onclick=\'back10s(' + i + ', piano' + i + ');\'>&lt;&lt;</a>&nbsp;&nbsp;&nbsp;<a href="#!" onclick=\'forward10s(' + i + ', piano' + i + ');\'>&gt;&gt;</a>' 
		// playing now column
			+ '<td> <b id=star' + i + '>' + state + '</b>' 
		// invisible audio column
			+ '<audio id=piano' + i + ' preload=none onended=' + onended + ontimeupdate + '>' 
			+ '<source id=source' + i + ' src="' + mp3[i] + '&dl=0&raw=1" type="audio/mpeg">'
		// add alternative sound files if available
			+ ((mp3a[i] == undefined)? ' ' : '<source id=source' + i + ' src="' + mp3a[i] + '" type="audio/mpeg">')
			+ '!!! Your browser does not support this audio player !!! </audio>';
}

//</script>



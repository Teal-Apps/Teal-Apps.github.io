//<script>
// this generates the table

var autoplay0 = 'Off';
var autoplay1 = 'Once';
var autoplay2 = 'Loop';
var radio = 2;

const header = []; //note arrays start at 0 but I'm ignoring 0
const composer = [];
const title = [];
const video = [];
const mp3 = [];
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
//	var songcount = title.length-1;
	
	if (radio == 0)
		default0 = 'checked';
	else if (radio == 1)
		default1 = 'checked';
	else if (radio == 2)
		default2 = 'checked';


	// generate video column (defaults to first video)
	return '<td rowspan=' + (songcount*2) + ' valign=top>' 
		+ 'Autoplay options:<br>' 
		+ '<input type=radio name=auto id=off  ' + default0 + ' onclick="radio=0;"><label for=off>'  + autoplay0 + '</label><br>' 
		+ '<input type=radio name=auto id=once ' + default1 + ' onclick="radio=1;"><label for=once>' + autoplay1 + '</label><br>' 
		+ '<input type=radio name=auto id=loop ' + default2 + ' onclick="radio=2;"><label for=loop>' + autoplay2 + '</label><br>' 
		+ '<br><hr>' 
		+ '<h3 id=playing> #1 ' + title[1] + '</h3>' 
		+ '<small id=video><a target=_blank href="https://www.youtube.com/watch?v=' + video[1] + '">https://www.youtube.com/watch?v=' + video[1] + '</a></small><br>' 
		+ '<small>(this is embedded from YouTube and covered by YouTube licence)</small><br>' 
		+ '<div id=youtube><br>!!! Your browser does not support YouTube player !!!<br>' 
		+ '(Try and refresh, sometimes it fails for some reason.)</div> <br>' 
		+ '<i><small style="color:red"><i>(please <a href=#email>email</a> me if you can\'t hear the alto part)<br>' 
		+ '(clicking \'play\' the first time might take a minute to load and start)</small></i><br><br>';
}


function generaterow(i)
{
	// work out autoplay option
	var onended;
//	var songcount = title.length-1;

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

	// generates one row of music (minus last video column)
	return '<tr><td> ' + i 
		+ ' <td> ' + vcomposer 
		+ ' <td> ' + title[i] 
		+ ' <td> <a id=no' + i + ' href="#!" onclick=\'loadvideo(' + i + ', "' + title[i] + '", "' + video[i] + '"); piano' + i + '["play"]();\'>play</a>' 
		+ '<td> <a href="#!" onclick="stopall();">pause</a>' 
		+ '<td> <a href="#!" onclick=\'leiser(' + i + ', piano' + i + ');\'><b>&ndash;&#8288;</b></a>&nbsp;<i id=vol' + i + '>vol&nbsp;9</i>&nbsp;<a href="#!" onclick=\'lauter(' + i + ', piano' + i + ');\'><b>+</b></a>' 
		+ '<td> <b id=star' + i + '>' + state + '</b>' 
		+ '<audio id=piano' + i + ' preload=none onended=' + onended + '>' 
		+ '<source id=source' + i + ' src="' + mp3[i] + '&dl=0&raw=1" type="audio/mpeg">!!! Your browser does not support this audio player !!!</audio>';

}

//</script>



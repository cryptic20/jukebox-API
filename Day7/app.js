
var images = ['background1.jpg', 'background2.jpg', 'background3.jpg', 'background4.jpg', 'background5.jpg', 'background6.jpg', 
'background7.jpg', 'background8.jpg', 'background9.jpg', 'background10.jpg'];

$(document).ready(function(){

 $('html').css({'background-image': 'url(background/' + images[Math.floor(Math.random() * images.length)] + ')'});


console.log("jukebox starting...");

Jukebox();

init();

$('#link').keyup(function(){
    spotify();

});


});



var track;
console.log("number of songs: " + track);

function addCheck(){
console.log("track added");
track += 1;
console.log("number of songs: "+ track)
var get = $('#link').val();
var link = "<li><a href='"+get+"'>"+ get + "</a></li>";
$('#playlist').append(link);
//choose();

}

var spotifyApi = new SpotifyWebApi();
while(token == null || token == "" || token.length < 20){
var token = prompt("enter access token for spotify...");
}

spotifyApi.setAccessToken(token);

function spotify(){


    var input = $('#link').val();

    if(input==null || input == ""){
        $('#playlist').html("<li class='active'>PLAYLIST</li>");
        console.clear();
    }else{

 spotifyApi.searchTracks(input)
  .then(function(data) {
    console.log('Search by ' + input, data.tracks);

    $('#playlist').empty();

    

     var artist = JSON.stringify(data.tracks.items[0].artists[0]);
     var parseArtist = JSON.parse(artist);

    for(i=0;i<data.tracks.items.length; i++){
        var string = JSON.stringify(data.tracks.items[i]);
        var obj = JSON.parse(string);

        spotifyLink = obj.preview_url;

        nameList = obj.name;

        console.log("number: "+[i] + "\n" + spotifyLink);
        if(obj.preview_url != null){
        $('#playlist').append("<li><a href='" +obj.preview_url+ "'>"+ parseArtist.name + " - " + obj.name + "</a></li>");
        init();
    }

}
  }, function(err) {
    console.error(err);
  });


    }
}



function Jukebox(){

this.add = function(){

//this will play the added song automatically if there are no other songs in the playlist
if(track == 1 ){
addCheck();
this.play();


}else{
addCheck();

}

}

// this.skip = function(){

// 		console.log("skipping to next track...");
// 		$(".song").prop("currentTime",$(".song").prop("currentTime")+100000)//forwards the song to its very end
// 	}

this.play = function (){
	console.log("playing...")
	$('.song').trigger('play');
	$('#play').hide();  
	$('#pause').show();
}

this.pause = function(){
	console.log("pausing...")
	$('.song').trigger('pause');
	$('#play').show(); 
	$('#pause').hide();
}

this.volumeUp = function(){
    var volume = $(".song").prop("volume")+0.2;
    if(volume >1){
        volume = 1;
    }
    $(".song").prop("volume",volume);
}
 
this.volumeDown = function (){
    var volume = $(".song").prop("volume")-0.2;
    if(volume <0){
        volume = 0;
    }
    $(".song").prop("volume",volume);
}
this.mute = function(){
    $(".song").prop("muted",!$(".song").prop("muted"));
}

this.stop = function(){
  //pause playing
  $(".song").trigger('pause');
  //set the song at the beginning
  $(".song").prop("currentTime",0);

  $('#play').show();
  $('#pause').hide();

}
 
this.forward = function(){
//forward the music about 5 seconds
$(".song").prop("currentTime",$(".song").prop("currentTime")+5);

}
this.backward = function (){
//backward the music about 5 seconds
$(".song").prop("currentTime",$(".song").prop("currentTime")-5);
}

this.replay = function(){
	//set play time to 0
  $(".song").prop("currentTime",0);
  this.play();
}
}

//playlist???? maybe?? I DONT EFFIN KNOW
var audio;
var playlist;
var tracks;
var current;



function init(){

    current = 0;
    audio = $('.song');
    playlist = $('#playlist');
    tracks = playlist.find('li a');
    len = tracks.length - 1;
    playlist.find('a').click(function(e){
        e.preventDefault(); //prevent links from going on a page..
        link = $(this);
        current = link.parent().index();
        run(link, audio[0]);
        console.clear();
    });


    audio[0].addEventListener('ended',function(e){
        current++;
        if(current == len){
            current = 0;
            link = playlist.find('a')[0];
        }else{
            link = playlist.find('a')[current];    
        }
        run($(link),audio[0]);

    });
}

function run(link, player){
        player.src = link.attr('href');
        par = link.parent();
        par.addClass('active').siblings().removeClass('active');
        audio[0].load();
        audio[0].play();
        $('#play').hide();  
        $('#pause').show();
        console.clear();
        
        
}





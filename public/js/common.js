var XSSfilter = function( content ) {
    return content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

$(document).ready(function() {
	$('.nick').characterCounter();
	var socket = io.connect();
	var userid = $('.nick');
	var nickform = $('#send-message');
	var subbtn = $('#submit');
	var users = $('.content_wrapper')

	nickform.submit(function(e){
		var len = userid.val().length;
		if(len>10 || len === 0) return false;
		e.preventDefault();
		socket.emit('new user', userid.val(), function(data){
			if(data){
				$('#info').css('visibility', 'hidden');
				$('section').css('visibility', 'visible');
			} else {
				userid.html('Username is already taken');
			}
		});
		nickform.val('');
	});

	socket.on('usernames', function(data){
		var html ='';
		for(i=0; i< data.length; i++){
			html += '<div class="article_box"><div class="user_name"><span class="user_id">'+ data[i]+'</span></div></div>';
		}
		users.html(html);
		socket.emit('')
	});

	var socket = io.connect();

$('#main').submit(function(e) {
    e.preventDefault();
    var data = $('#input').val();
    if (data) {
        socket.emit('send message', data);
        $('#input').val('');
    } else {
        return false;
    }
});

socket.on('new message', function(data) {
	console.log(data.nick);
    send_msg(data.nick, data.msg);
});


function send_msg(nick, msg) {
    var html = '<div class="msg_box"><img class="profile-pic" src="http://i.imgur.com/71rORgc.jpg"><div class="user_name_chat">{NAME}</div><div class="text">{MESSAGE}</div><div class="clear"></div>';
    var append = html.replace('{NAME}', nick);
    html = append.replace('{MESSAGE}', msg);
    html = $.parseHTML(html);
    $('#messages').append(html);
}
});
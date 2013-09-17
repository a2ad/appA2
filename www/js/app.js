//======= MAPS =======

// Inicialização do mapa
function initialize() {
    var myLatlng = new google.maps.LatLng(-23.530038, -46.673508);    
    var mapOptions = {
        zoom: 16,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map
    });

    $('#ondeestamos .loading').fadeOut();
}

// Load do Mapa
function loadMap() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' +
    'callback=initialize';
    document.body.appendChild(script);    
}

// Aplica altura no mapa
function alturaMap() {
    var altura = $('#wrapper').height();
    $('.map').height(altura);
}


// Conteúdo a ser mostrado sempre no topo
function showOnTop() {
    $('#wrapper').animate({scrollTop:0}, 'fast');
}

//====== TABS ======

// Clique no menu principal
$('#tab-bar a').on('click', function(event){
    event.preventDefault();
    var targetPage = $(this).attr('href'),
    pages = $('#pages > div'),
    links = $('#tab-bar a');

    pages.removeClass('current');
    links.removeClass('current');

    $(targetPage).addClass('current');
    $(this).addClass('current');

    showOnTop();

    if( targetPage == '#ondeestamos' ) {
        if( $('#map-canvas').is(':empty') ) {
            loadMap();
            alturaMap();
        }
    }
});

//======= BLOG ======

$(document).ready(function() {
	parseRSS('http://a2comunicacao.com.br/feed/', '.posts', 10);
});

function parseRSS(url, container, quant) {
  $.ajax({
    url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=' + quant + '&callback=?&q=' + encodeURIComponent(url),
    dataType: 'json',
    success: function(data) {
      //console.log(data.responseData.feed);
      var id = 1;
      $.each(data.responseData.feed.entries, function(key, value){
        var date = new Date(value.publishedDate);
        var thehtml = '<li><a href="javascript:showblogdata('+id+')"><span class="post-date">'+date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear()+'</span><h2 class="post-link">'+value.title+'</h2><span class="post-arrow">&gt;</span></a></li>';
        var theposthtml = '<div id="post-'+id+'" class="post-content"><a class="btn btn-back" href="javascript:blogback('+id+')">Voltar</a><h2 class="post-title">'+value.title+'</h2><span class="post-date">'+date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear()+'</span>'+value.content.replace('../../../uploads','http://a2comunicacao.com.br/uploads')+'<a class="btn" href="javascript:showOnTop()">Topo</a></div>';
        $(container).append(thehtml);
        $('#pages').append(theposthtml);
        id++;
      });
    }
  });
}

function showblogdata(id){
	$('#blog').removeClass('current');
	showOnTop();
	$('#post-'+id).addClass('current');
}

function blogback(id){
	$('#post-'+id).removeClass('current'); 
	$('#blog').addClass('current');
}


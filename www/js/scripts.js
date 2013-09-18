$(document).on('mobileinit', function() {
	$.mobile.loadingMessage = 'carregando...';
	$.mobile.pageLoadErrorMessage = 'erro ao carregar a página';
	$.mobile.listview.prototype.options.filterPlaceholder = 'Filtrar itens...';
	$.mobile.page.prototype.options.backBtnText = 'Voltar';
	$.mobile.defaultPageTransition = 'slide';
});

// Blog
$(document).on('pagecreate', '#index', function( event ) {
	parseRSS('http://a2comunicacao.com.br/feed/', '.posts', 15);
});

// Topo
function goTop() {
	$('.top').on('tap', function(event){
		$('html, body').animate({scrollTop:0}, 'fast');
	});
}

function parseRSS(url, container, quant) {
	$.ajax({
		beforeSend: function() {
		},
		complete: function() {
			$('.posts').listview('refresh');
			$('#loading-posts').fadeOut();
		},
		url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=' + quant + '&callback=?&q=' + encodeURIComponent(url),
		dataType: 'json',
		success: function(data) {
			//console.log(data.responseData.feed);
			var id = 1;
			$.each(data.responseData.feed.entries, function(key, value){
				var date = new Date(value.publishedDate);
                date = date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear();
                var li = '<li><a href="#post-'+id+'"><small>'+date+'</small><h2 class="">'+value.title+'</h2></a></li>';
                var page = '<div data-role="page" id="post-'+id+'" data-theme="a" data-add-back-btn="true"><div data-role="header" data-position="fixed" data-id="persistent" data-tap-toggle="false" data-theme="b"><h1>A2 Comunicação</h1><div data-role="navbar"><ul><li><a href="#index" class="ui-btn-active ui-state-persist">Blog</a></li><li><a href="#onde-estamos">Onde Estamos</a></li><li><a href="#redes-sociais">Redes Sociais</a></li></ul></div></div><div data-role="content">{content}</div><div class="footer" data-role="footer" data-theme="b"><p>info@a2comunicacao.com.br</p><p><a href="tel:+1138725565">55 (11) 3872-5565</a></p></div></div>';


				var theposthtml = '<div class="post-content"><h2 class="post-title">'+value.title+'</h2><span class="post-date">'+date+'</span>'+value.content.replace('../../../uploads','http://a2comunicacao.com.br/uploads')+'<a id="top" href="#" class="top" data-role="button" data-mini="true" data-inline="true" data-icon="arrow-u" data-theme="c">Topo</a></div>';

                page = page.replace('{content}', theposthtml);

				$(container).append(li);
				$('body').append(page);
				id++;
			});
			goTop();
		}
	});
}

// Mapa
$(document).on('pageinit', '#onde-estamos', function( event ) {
	$('#map-canvas').fadeOut();
	loadMap();
	$('#loading-map').fadeOut();
});

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

    var teste = google.maps.event.addListenerOnce(map, 'idle', function(){
		$('#map-canvas').fadeIn();
	});
}
 
// Load do Mapa
function loadMap() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' +
    'callback=initialize';
    document.body.appendChild(script);   
}

// Swipe
$( document ).on( "pageinit", "#index, #onde-estamos, #redes-sociais", function() {
    var page = "#" + $( this ).attr( "id" ),
        next = $( this ).jqmData( "next" ),
        prev = $( this ).jqmData( "prev" );

    if ( next ) {
        $( document ).on( "swipeleft", page, function() {
            $.mobile.changePage( '#' + next, { transition: "slide" });
        });
    }
   
    if ( prev ) {
        $( document ).on( "swiperight", page, function() {
            $.mobile.changePage( '#' + prev, { transition: "slide", reverse: true } );
        });
      
    }
});

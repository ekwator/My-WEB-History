/**
 * Скрипты для комментов
 */


/**
 * Функция для голосования за комменты.
 */
function comments_vote(link, target_id, target_type, post_target_id, vote){
	if($(link).hasClass('loading')){
		// повторный клик. ни чо чо делать не надо :) пущай ждет ответ с сервера...
	}else{
		$(link).addClass('loading');
		$.post('/json/vote/',{ti:target_id, tt:target_type, pti: post_target_id, v:vote},function(json){	 
			if(json.messages == 'ok'){					
				var voting = $('#voting_'+target_id);
				
				// выделим отмеченный пункт.
				if(vote === 1){
					voting.addClass('voted_plus').attr('title','Вы проголосовали положительно.');
				}else if(vote === -1){
					voting.addClass('voted_minus').attr('title','Вы проголосовали отрицательно.');
				}
				
				// обновим кол-во голосов
				$('.score', voting).replaceWith('<span class="score" title="Всего '+json.votes_count+': &uarr;'+json.votes_count_plus+' и &darr;'+json.votes_count_minus+'">'+json.score+'</span>');
				
				// раскрасим positive / negative
				$('.mark', voting).attr('class','mark '+json.sign);
				
	      // обновим строку с кол-вом доступных голосов в шапке сайта
	      $('#charge_string').html(json.charge_string);
	      
			}else{
				show_form_errors(json);
			}
			$(link).removeClass('loading');
		},'json');
	}
	
	return false;
}





/** 
 * Функция для добавления комментария в избранное.
 */
function comments_add_to_favorite(link, target_type, target_id){
			 
	if($(link).hasClass('add')){
		$(link).removeClass('add').addClass('remove');
		var action = 'add';
	}else{
		$(link).addClass('add').removeClass('remove');
		var action = 'remove';
	}
	$.post('/json/favorites/', {tt: target_type, ti: target_id, action: action}, function(json){
			if(json.messages == 'ok'){
				if(action == 'add'){
					$.jGrowl('Комментарий добавлен в избранное', { });	
				}else{
					$.jGrowl('Комментарий удален из избранного', { });
				}
			}else{
				show_system_error(json)
			}
	},'json');
	
	return false; 
}

/**
 * функция вызывается по нажатию кнопкии "предпросмотр"
 */
function comment_preview(form, button){
	
	$(form).ajaxSubmit({
		data: {action: 'preview' },
		form: $(form),
		beforeSubmit: function(){
			$(button).addClass('loading');
			var text = $('textarea[name="text"]',form).val();
			var allSpacesRe = /\s+/g;
			text = text.replace(allSpacesRe, "")
			if(text == ''){
				$.jGrowl('Вы забыли ввести текст комментария', { theme: 'error' });
				$(button).removeClass('loading');
				return false; 
			}
		},
		success: ajaxFormSuccess(function(json, statusText, xhr, jqForm){
			$('#preview_placeholder').html(json.text).show();
			$("pre code").each(function() {hljs.highlightBlock(this)});
		})
		
	});

}

/**
 * функция вызывается по нажатию кнопки "написать"
 */
function comment_send(form, button){

	$(form).ajaxSubmit({
		data: {action: 'add' },
		form: $(form),
		dataType: 'json',
		beforeSubmit: function(){
			$(button).addClass('loading');
			var text = $('textarea[name="text"]',form).val();
			var allSpacesRe = /\s+/g;
			text = text.replace(allSpacesRe, "")
			if(text == ''){
				$.jGrowl('Вы забыли ввести текст комментария', { theme: 'error' });
				$(button).removeClass('loading');
				return false; 
			}
		},
		error: ajaxFormError,
		success: ajaxFormSuccess(function(json, statusText, xhr, jqForm){
			$('#comments .title').removeClass('hidden');
			for(k in json.comments){
				if(json.comments[k].parent_id == 0){
				 $('#comments').append(json.comments[k].html); 
				}else{
				 $('#reply_comments_'+json.comments[k].parent_id).append(json.comments[k].html); 
				}
				show_comment_parents(json.comments[k].id);
				document.unreadcomments.push({id: parseInt(json.comments[k].id)});
			}
			if(typeof(json.ts) != 'undefined') { 
				$('input[name="ts"]',form).val(json.ts); 
			}
			
			// обновим кол-во новых комментов в xpanel если они там есть.
			var xpanel_new_comments = $('#xpanel .new');
			if(xpanel_new_comments){
				var last_count = parseInt(xpanel_new_comments.text());
				var new_comment = json.comments.length + last_count 
				if(new_comment > 0){				 		
					xpanel_new_comments.text(new_comment).show();
					$('#xpanel .divider').show();
				}
			}
			
			$('textarea[name="text"]',form).val('');
			$('#preview_placeholder').hide();
			$(form).hide();
			$('.comment_item .reply').show();
			
			// обновим кол-во комментов
			var comments_count = $('#comments_count');
			comments_count.text( parseInt($('#comments_count').text()) + json.comments.length);	 
			$("pre code").each(function() {hljs.highlightBlock(this)});
		})
		
	});
}

/** 
 * Функция показывает форму ответа на коммент
 */
function comment_show_reply_form(comment_id){
	$('.comment_item .reply').show();
	var form = $('#comments_form');
	$('input[name="parent_id"]',form).val(comment_id);
	var reply = $('#comment_'+comment_id+' > .reply');
	$('a',reply).hide();
	reply.append(form);
	form.show();
	$('#comment_text', form).focus();
	return false;
}

/** 
 *	форма написания нового комментария в низу.
 */
function comment_show_form(){
	$('.comment_item .reply').show();
	var form = $('#comments_form');
	$('input[name="parent_id"]',form).val(0);
	$('#comments_form_placeholder').append(form);
	form.show();
	return false;
}

function removeFromArray(arr, key) { // removes only one item!	
		for (itemIndex in arr) {	
				if (arr[itemIndex] == element) {	
						arr.splice(itemIndex, 1);	 
						return arr;	 
				}	 
		}	 
		return null;	
}	 

/**
 * получает GET параметры из URL
 */
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
          return unescape(pair[1]);
      }
  }
  return false;
}

/**
 * Функция подсвечивает указанный коммент и если у этого коммента есть родители - то и их тоже :)
 */
function show_comment_parents(comment_id){
	var comment = $('#comment_'+comment_id)
	var parent_id = $('> .parent_id', comment).data('parent_id')
	comment.show()

	if( typeof(parent_id) !== 'undefined' ) show_comment_parents(parent_id)
}

document.unreadcomments=[];


$(document).ready(function(){


	/**
	 * Стрелочка "вверх" в комментах" и "вниз" в родительском комменте.
	 */
	$('#comments .comment_item .to_parent').live('click',function(){		
			var parent_id = $(this).data('parent_id');
			var id = $(this).data('id');
			$.scrollTo( $('#comment_'+parent_id) , 800,	{ axis: 'y' } );
			
			if($(this).hasClass('back_to_children')){
				$('#comment_'+id+' > .info .to_chidren').html('');
			}else{
				$('#comment_'+parent_id+' > .info .to_chidren').html('<a href="#comment_'+id+'" data-id="'+parent_id+'" data-parent_id="'+id+'" class="to_parent back_to_children">&darr;</a>');
			}
			return false;
		});
	
	/**
	 * Показать ветку :) 
	 */
	$('.show_tree').live('click',function(){
		var comment_id = $(this).data('id')
		if( $(this).hasClass('open') ){
			$('.comment_item').show();
			$('.comment_item .show_tree').removeClass('open');
		}else{
			$('.comment_item').hide();
			$(this).addClass('open')
			show_comment_parents(comment_id)
		}
		$.scrollTo( $('#comment_'+comment_id) , 1,  { 
			axis: 'y', 
			offset: {
				top: ( -1 * ($(window).height() / 2) )
			}
		});
		
		console.log(   )
	})
	
	var comments_form = $('#comments_form');
	var comment_text = $('#comment_text');
	

	comment_text.live('keyup change blur focus', function (e) {
		// дизеблим кнопки/не дизеблим кнопки
		//console.log($(this).val().length, $(this).val())
		if( $(this).val().length > 0 ){
			$('input', comments_form).attr('disabled', false);
		}else{
			$('input', comments_form).attr('disabled', true);
		}
	});
	
	// если в урле передан параметр ?reply_to=ID то раскорем форму комментирования под указанным комментом
	if(  getQueryVariable('reply_to') ){
		var comment_id = getQueryVariable('reply_to');
		comment_show_reply_form(comment_id);
	}
   
	
	/**
	 * Подсветка плохих комментов.
	 */

	$('#comments .comment_item .bad').live({
		mouseenter: function() {
			if($(this).attr('data-default_opacity')){
				
			}else{
				var opacity = $(this).css('opacity');
				$(this).attr('data-default_opacity', opacity);
			}
			$(this).stop();
			$(this).fadeTo('slow', 1);
		},
		mouseleave: function() {
			$(this).stop();
			$(this).fadeTo('slow', $(this).data('default_opacity'));
		}
	})
	

	if(g_is_guest){
		
		/**
		 *	"подписаться на комментарии
		 */
		$('#subscribe_comments').change(function(){
			var subscribe_checkbox = $(this);
			eval('var data = '+subscribe_checkbox.attr('rel')+';');
			data.action = subscribe_checkbox.attr('checked') ? 'subscribe' : 'unsubscribe';
			$.post('/json/subscription/', data, function(json){
				if(json.messages == 'ok'){
					$.jGrowl('Настройки уведомления о новых комментариях успешно сохранены', { theme: 'notice' });
				}else{
				show_system_error(json);
				}
			},'json');			
		});
		
		/**
		 *	галочка "добавить в трекер"
		 */
		$('#tracker_comments').change(function(){
			var checkbox = $(this);
			
			eval('var data = '+checkbox.attr('rel')+';');
			var url = checkbox.attr('checked') ? '/json/tracker/add/' : '/json/tracker/remove/';
			$.post(url, data, function(json){
				if(json.messages == 'ok'){
					$.jGrowl('Настройки уведомления о новых комментариях успешно сохранены', { theme: 'notice' });
				}else{
				show_system_error(json);
				}
			},'json');			
		});
		
	}

	if(g_show_xpanel){ 
		 
				
		var xpanel = $('<div id="xpanel"></div>');
		var xpanel_place = 'right';
				xpanel.css(xpanel_place,'0px');
					 
				var new_comments = $('.comment_item .is_new');
				
		var divider = $('<div class="divider"></div>');
		var new_counter = $('<a href="#new" class="new">'+new_comments.size()+'</a>');

				if( new_comments.size() == 0 ){
					new_counter.hide();
					divider.hide();
				}
				
				new_counter.click(function(){
				
					var new_comments = $('.comment_item .is_new')
					var new_comment = new_comments.eq(0);
					
					if(new_comments.size() > 0){

							var id = parseInt(new_comment.attr('rel'));
						 	$.scrollTo( $('#comment_'+id), 800, { axis: 'y' } );
							 setTimeout(function(){
							 	$('#comment_'+id+' > .is_new').removeClass('is_new'); 
							 	new_counter.text($('.comment_item .is_new').size());
							 	if($('.comment_item .is_new').size() == 0){
							 		new_counter.text('0').hide();
									divider.hide();
							 	}														 
							 },1000);

					}else{
						new_counter.text('0').hide();
						divider.hide();
					}
					return false;
				});
		var refresh_button = $('<a href="#refresh" class="refresh"></a>');
				refresh_button.click(function(){
					// если релоад в процессе - то не надо запускать его еще раз :) 
					if(refresh_button.hasClass('loading')){
						return false;
					}
					
					$('.comment_item .info').removeClass('is_new');
					refresh_button.addClass('loading');
					var form = $('#comments_form');
					var data = {
						tt: $('input[name="tt"]',form).val(),
						ti: $('input[name="ti"]',form).val(),
						ts: $('input[name="ts"]',form).val(),
						action: 'get_new'
					};
					$.post('/json/comment/', data, function(json){
						for(k in json.comments){
							if(json.comments[k].parent_id == 0){
							 $('#comments').append(json.comments[k].html); 
							}else{
							 $('#reply_comments_'+json.comments[k].parent_id).append(json.comments[k].html); 
							}
							show_comment_parents(json.comments[k].id);
						}
						$('input[name="ts"]',form).val(json.ts);
						if(json.comments.length > 0){
							new_counter.text(json.comments.length).css('display','block');
							divider.css('display','block');
							//document.unreadcomments = json.comments;
						}else{
							new_counter.text('0').hide();
							divider.hide();
							//document.unreadcomments = json.comments;
						}
						// Посчитаем кол-во всех комментов на странице и обновим счетчик.
						$('#comments_count').text( $('#comments .comment_item').size() );
						refresh_button.removeClass('loading');
					}, 'json');
					return false;
				});
			

				xpanel.append(refresh_button);	
				xpanel.append(divider);
				xpanel.append(new_counter);
				$('body').append(xpanel);
				

	
	}
	
});
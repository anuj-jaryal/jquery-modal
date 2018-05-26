(function($){

	$.fn.modal =function(opt){
		var settings,
			createModal,
			body;

		settings= $.extend({
			'modal':'jquery-modal',
			'close':'jquery-modal-close',
			'closeText':'',
			'shade':'jquery-modal-shade'
		},opt);

		body = $('body');
		createModal=function(data){
			var shade, close, modal;

			close = $('<span/>',{
				html:settings.closeText,
				class:settings.close,
				href:'#'
			}).on('click',function(){
				closeModal(modal);
			});

			modalContent = $('<div/>',{
				class:settings.modalContent
			}).on('click',function(){
				closeModal(modal);
			}).append(
				$('<div/>',{class:'modal-header'}).append(close).append('<h2>Modal Header</h2>'),
				$('<div/>',{class:'modal-body', html:'<p>'+data+'</p>'}),
				$('<div/>',{class:'modal-footer'}).append('<h3>Modal Footer</h3>')
			);

			modal = $('<div/>',{class:settings.modal}).append(modalContent);
			body.prepend(modal);
		}

		closeModal = function(modal){
			modal.remove();
		};

		this.on('click',function(e){
			var self = $(this);
			$.ajax({
				url:self.data('content'),
				type:"GET",
				success:function(response){
					createModal(response);
				},
				error:function(err){
					console.log(err);
				}
			});
			e.preventDefault();
		});
	};
}(jQuery));
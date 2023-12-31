(function ($) {
	$( document ).ready(
		function () {
			var topicURL = wpds.latestURL,
			$topicList = $( '.wpds-topiclist-refresh' );

			if ($topicList.length) {
				$topicList.each(
					function () {

						var $this = $( this ),
						topicParams,
						maxTopics,
						cacheDuration,
						displayAvatars,
						source,
						period,
						tile,
						excerptLength,
						usernamePosition,
						namePosition,
						categoryPosition,
						datePosition,
						ajaxTimeout,
						shortcodeId,
						$topicOptions,
						$topicListWrapper;

						$topicOptions = $this.find( '.wpds-topic-shortcode-options' );
						maxTopics = parseInt( $topicOptions.data( 'wpds-maxtopics' ), 10 );
						cacheDuration = parseInt( $topicOptions.data( 'wpds-cache-duration' ), 10 );
						displayAvatars = $topicOptions.data( 'wpds-display-avatars' );
						source = $topicOptions.data( 'wpds-source' );
						period = $topicOptions.data( 'wpds-period' );
						tile = $topicOptions.data( 'wpds-tile' );
						usernamePosition = $topicOptions.data( 'wpds-username-position' );
						fnamePosition = $topicOptions.data( 'wpds-name-position' );
						categoryPosition = $topicOptions.data( 'wpds-category-position' );
						datePosition = $topicOptions.data( 'wpds-date-position' );
						ajaxTimeout = parseInt( $topicOptions.data( 'wpds-ajax-timeout' ), 10 );
						ajaxTimeout = ajaxTimeout < 1 ? 2 : ajaxTimeout;
						excerptLength = $topicOptions.data( 'wpds-excerpt-length' );
						shortcodeId = $topicOptions.data( 'wpds-id' );
						$this.wrap( '<div id="wpds-topic-list-wrapper-' + shortcodeId + '"></div>' );
						$topicListWrapper = $( '#wpds-topic-list-wrapper-' + shortcodeId );
						topicParams = '?max_topics=' + maxTopics +
						'&cache_duration=' + cacheDuration +
						'&display_avatars=' + displayAvatars +
						'&source=' + source +
						'&period=' + period +
						'&tile=' + tile +
						'&excerpt_length=' + excerptLength +
						'&username_position=' + usernamePosition +
						'&name_position=' + namePosition +
						'&category_position=' + categoryPosition +
						'&date_position=' + datePosition +
						'&id=' + shortcodeId +
						'&ajax_timeout=' + ajaxTimeout;

						(function getTopics() {
							$.ajax(
								{
									url: topicURL + topicParams,
									success: function (response) {
										if (0 !== response) {
											$topicListWrapper.addClass( 'wpds-ajax-loading' );
											$topicListWrapper.html( response );
										}
									},
									complete: function () {
										setTimeout(
											function () {
												$topicListWrapper.removeClass( 'wpds-ajax-loading' );
											}, 1000
										);
										setTimeout( getTopics, ajaxTimeout * 60 * 1000 );
									}
								}
							);
						})();

					}
				);
			}
		}
	);
})( jQuery );

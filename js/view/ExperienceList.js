define(
    [
        'jquery',
        'backbone',

        'view',
		'view/Base',
		'view/Experience/Work'

    ],
    function ( $, Backbone ) {


        view.ExperienceList = view.Base.extend( {

			/**
			 * @param	{String}	htmlTemplate	handlebars formatted template
			 */
			htmlTemplate: undefined,

			/**
			 * @param	{view.Experience}	experienceView
			 */
			experienceView: undefined,


			initialize: function() {

				this.listenTo( this.collection, 'reset', this.render );
				view.Base.prototype.initialize.apply( this );
			},


			/**
			 *
			 * @returns	{Array}	array of model.Experience objects in the desired order.
			 */
			getArray: function() {
				return this.collection.sortBy( 'title' );
			},


			/**
			 * @chainable
			 * @returns	{view.Work}
			 */
			render: function() {

				var jobs = [], html, $list, sortedExperience;

				html = this.template( this.htmlTemplate, {} );
				sortedExperience = this.getArray();

				$( this.el ).empty().append( html );

				$list = this.$el.find( 'ul.exp-list' );
				_.each(
					sortedExperience,
					function( experience ) {
						var work = new this.experienceView( {
							model: experience,
							el: $list
						} );
						work.render();
					},
					this
				);



				return this;
			}

		} );

		return view.WorkList;
	}
);
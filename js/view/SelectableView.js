define( function ( require ) {

		var	$ = require( 'jquery' ),
			Backbone = require( 'backbone' ),
			_ = require( 'underscore'),
			d3 = require( 'd3' ),
			EVENTS = require( 'events' ),
			BaseView = require( 'view/BaseView' ),
            app,
			SelectableView;



		SelectableView = BaseView.extend( {


			/**
			 * @property	{Marionette.Application}	app
			 */
			app: undefined,

			/**
			 * @property	{model.Experience}	model
			 */
			model: undefined,

			/**
			 * @property	{Boolean}	highlighted
			 */
			highlighted: undefined,

			/**
			 * @property	{d3}		d3el
			 */
			d3el: undefined,


			/**
			 *
			 */
			initialize: function() {

				this.highlighted = false;

                this.app = require( 'app' );
                
				if ( 'd3el' in this.options ) {
                    
                    var onNameClick = _.throttle( 
                        _.bind( this.onNameClick, this ), 
                        1000, 
                        { trailing: false } 
                    );
                    
					this.d3el = this.options.d3el;
					this.d3el.on( 'mouseover', _.bind( this.onMouseover, this ) );
					this.d3el.on( 'mouseout', _.bind( this.onMouseout, this ) );
                    this.d3el.on( 'mousedown', onNameClick );
                    
                     // Touch events
                    this.d3el.on( 'touchstart', onNameClick );
					this.d3el.on( 'touchenter', onNameClick );
                    this.d3el.on( 'touchleave', onNameClick );
                   
				}
                
                this.listenTo( this.model, EVENTS.EXPERIENCE.RESELECT, this.onMouseover );
               

			},


			/**
			 *
			 * @returns  {Boolean}   always false
			 */
			onNameClick: function() {
                var selected = !this.model.get( 'selected' );
				this.model.set( 'selected', selected );
                
                if( selected ) {
                    this.onMouseover();
                }
                return false;
            },


			/**
			 *
			 * @returns  {Boolean}   always false
			 */
            onMouseover: function() {
				this.model.trigger(
					EVENTS.SKILL.HOVER
				);
                return false;
			},


			/**
			 *
			 * @returns  {Boolean}   always false
			 */
            onMouseout: function() {
				this.model.trigger(
					EVENTS.SKILL.HOVER_END
				);
                app.vent.trigger( EVENTS.SKILL.HOVER_END, this.model );
                return false;
			}

		} );

		return SelectableView;
	}
);
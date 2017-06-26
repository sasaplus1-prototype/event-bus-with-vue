(function(){

  'use strict';

  /**
   * Store variable
   */
  var store = {
    count: 0,
  };

  //----------------------------------------------------------------------------

  /**
   * vue instance use as EventBus
   */
  var eventBus = new Vue();

  eventBus.$on('counter:decrement', function() {
    store.count--;

    console.log('emit counter:decremented', store.count);

    /**
     * trigger event with store value
     */
    eventBus.$emit('counter:decremented', store.count);
  });
  eventBus.$on('counter:increment', function() {
    store.count++;

    console.log('emit counter:incremented', store.count);

    /**
     * trigger event with store value
     */
    eventBus.$emit('counter:incremented', store.count);
  });

  //----------------------------------------------------------------------------

  /**
   * vue instance for counter
   */
  var counter = new Vue({
    el: '#main',
    data: {
      /**
       * use for component local
       */
      count: 0,
    },
    methods: {
      decrement() {
        console.log('trigger counter:decrement');

        /**
         * trigger event
         */
        eventBus.$emit('counter:decrement');
      },
      increment() {
        console.log('trigger counter:increment');

        /**
         * trigger event
         */
        eventBus.$emit('counter:increment');
      },
    },
    created() {
      var that = this;

      console.log('listen counter:decremented');

      /**
       * listen event
       */
      eventBus.$on('counter:decremented', function(val) {
        that.$data.count = val;
      });

      console.log('listen counter:incremented');

      /**
       * listen event
       */
      eventBus.$on('counter:incremented', function(val) {
        that.$data.count = val;
      });
    },
  });

}());

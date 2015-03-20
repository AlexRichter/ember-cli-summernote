import Ember from "ember";



var SummerNoteComponent = Ember.Component.extend({

  classNames: ['wysiwyg-editor'],
  btnSize: 'btn-xs',
  height: 120,
  focus: false,
  airMode: false,

  willDestroyElement: function() {
    this.$('textarea').destroy();
  },

  didInsertElement: function() {
    var _btnSize = this.get('btnSize');
    var _height = this.get('height');
    var _focus = this.get('focus');
    var _airMode = this.get('airMode');

    // ensure summernote is loaded
    // summernote 0.6.0 is not working as of this code written.
    // 0.5.10 is working version.

    Ember.assert("summernote has to exist on Ember.$.fn.summernote", typeof Ember.$.fn.summernote === "function" );
    Ember.assert("tooltip has to exist on Ember.$.fn.tooltip", typeof Ember.$.fn.tooltip === "function" );

    this.$('textarea').summernote({
      height: _height,
      focus: _focus,
      toolbar: [
        ['style', ['style']],
        ['font', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
        ['fontname', ['fontname']],
        ['fontsize', ['fontsize']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['height', ['height']],
        ['table', ['table']],
        ['insert', ['link', 'picture', 'video', 'hr']],
        ['view', ['fullscreen', 'codeview']],
        ['help', ['help']]
      ],
      airMode: _airMode,
      // airPopover: [
      //   ['color', ['color']],
      //   ['font', ['bold', 'underline', 'clear']],
      //   ['para', ['ul', 'paragraph']],
      //   ['table', ['table']],
      //   ['insert', ['link', 'picture']]
      // ]
    });

    var _content = this.get('content');
    this.$('textarea').code(_content);
    this.$('.btn').addClass(_btnSize);
  },
  
  keyUp: function() {
    this.doUpdate();
  },

  click: function() {
    this.doUpdate();
  },

  doUpdate: function() {
    var content = this.$('.note-editable').html();
    this.set('content', content);
  },
  
  setHeight: function() {
    this.$().find('.note-editable').css('height', this.get('height')); //use css height, as jQuery heigth/outerHeight does add the padding+margin
  }.observes('height')
});

export default SummerNoteComponent;

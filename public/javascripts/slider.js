export default class Slider {

    constructor(container) {
      // Properties
      this.container = container;
      this.images = $('.images img', this.container);
      this.controls = $('.controls li', this.container);
  
      // Events
      this.bindUI();
    }
  
    bindUI() {
      let parent = this;
      this.controls.click(function() {
        let id = $(this).data('index-number');
        parent.makeActiveSlide(id);
        parent.makeActiveControl(id);
      });
    }
  
    makeActiveSlide(index) {
      this.hideSlides();
      $(this.images[index]).addClass('active');
    }
  
    makeActiveControl(index) {
      this.resetControls();
      $(this.controls[index]).addClass('active');
    }
  
    hideSlides() {
      this.images.removeClass('active');
    }
  
    resetControls() {
      this.controls.removeClass('active');
    }
  
  }
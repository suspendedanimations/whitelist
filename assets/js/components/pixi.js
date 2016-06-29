import config from 'config'
import PIXI from 'pixi.js'

export default class Jello {

  constructor(options = {}) {

    this.defaults = {};
    this.options = options;
    this.container = options.container;
    this.imgWidth = options.image ? options.image.width : 800;
    this.imgHeight = options.image ? options.image.height : 516;
    this.imgRatio = this.imgHeight / this.imgWidth;
    this.winWidth = config.width;
    this.image = `${APP.THEME_URL}/assets/images/texture-min.jpg`;
    this.renderer = PIXI.autoDetectRenderer(this.winWidth, (this.winWidth * this.imgRatio) );
    this.stage = new PIXI.Container();
    this.imgContainer = new PIXI.Container();
    this.imageCounter = 0;
    this.displacementSprite = PIXI.Sprite.fromImage(`${APP.THEME_URL}/assets/images/dmap-clouds-01.jpg`);
    this.displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite);
    this.animateFilters = this.animateFilters.bind(this);
    this.rAF = undefined;

    this.now = null;
    this.last = null;

    this.isDistorted = true;
    this.isTransitioning = false;
  }

  init() {

    this.defaults = {
      transition: 1,
      speed: .4,
      dispScale: 250,
      dispX: true,
      dispY: true,
      count: 0
    };

    this.update();
    this.backgroundFill();
    this.buildStage();
    this.createBackgrounds();
    this.createFilters();
    this.animateFilters();
    
    this.container.appendChild(this.renderer.view);
  }

  animateFilters() {

    this.displacementFilter.scale.x = this.settings.dispX ? this.settings.transition * this.settings.dispScale : 0;
    this.displacementFilter.scale.y = this.settings.dispY ? this.settings.transition * (this.settings.dispScale + 10) : 0;

    this.displacementSprite.x = Math.sin(this.settings.count * 0.15) * 200;
    this.displacementSprite.y = Math.cos(this.settings.count * 0.13) * 200;

    this.displacementSprite.rotation = this.settings.count * 0.06;

    this.settings.count += 0.05 * this.settings.speed;

    this.renderer.render(this.stage);
    
    this.last = this.now;
    this.rAF = requestAnimationFrame(this.animateFilters);
  }

  backgroundFill() {

    this.renderer.view.setAttribute('style', 'min-height:100%;min-width:100%;width:auto;height:auto;');
  }

  // main container for animation
  buildStage() {

    this.imgContainer.position.x = this.imgWidth / 2;
    this.imgContainer.position.y = this.imgHeight / 2;

    this.stage.scale.x = this.stage.scale.y = this.winWidth / this.imgWidth;
    this.stage.interactive = true;
    this.stage.addChild(this.imgContainer);
  }

  // preload all backgrounds for quick transitions
  createBackgrounds() {
    
    const bg = PIXI.Sprite.fromImage(this.image);

    // Set image anchor to the center of the image
    bg.anchor.x = 0.5;
    bg.anchor.y = 0.5;

    bg.alpha = 1;

    this.imgContainer.addChild(bg);
  }

  // distortion filters added to stage
  createFilters() {
    
    this.stage.addChild(this.displacementSprite);

    this.displacementFilter.scale.x = this.displacementFilter.scale.y = this.winWidth / this.imgWidth;

    this.imgContainer.filters = [
      this.displacementFilter
    ]
  }

  // Object.assign overwrites defaults with options to create settings
  update() {
    
    this.settings = Object.assign({}, this.defaults, this.options);
  }

  resize() {

    
  }

  destroy() {

    cancelAnimationFrame(this.rAF);
    this.settings = {};
    this.bgArray = [];
  }
}

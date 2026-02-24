/**

Generative Pointillism v.5.1.5
Bitcrush

March 2024

*/


const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

let seed = random.getRandomSeed();
//seed = '187809';
random.setSeed(seed);
console.log('seed: ' + seed);

const settings = {
  //pixelRatio: 2, // Zoom x2
  dimensions: [ 6000, 6000 ],   // ratio = '1:1'  8000, 8000
  //dimensions: [ 6120, 10880 ],  // ratio = '16:9'
  //dimensions: [ 6730, 9970 ],   // ratio = 'movie poster'
  //dimensions: [ 10880, 6120 ],
  //pixelsPerInch: 300,
  name: seed,
}

let ratio, imagePath, imagePathBackground;

let enableLoadImage = true;
let enableWarp = random.pick([false, true]);
let enableWarpSlice = random.pick([true, true]);
let enableImageFlip = random.pick([false, true]);
let enableImageFlipLocal = random.pick([false, true]);
let enableImageRotate = random.pick([false, true]);
let enableImageSlice = random.pick([false, true]);
let enableFloatingBorders = random.pick([false, true]);
let enableWeirdSizeShift = random.pick([false, true]);
let enableColorShift = random.pick([false, false]);
let enableNonUniformBackground = random.pick([false, true]);
let enableWeirdDistortion = random.pick([false, true]);
let repeatImageDefault = random.pick([2, 3, 4]); // 1, 2, 3, 4, 5
console.log('repeatImageDefault:', repeatImageDefault);

let lineWidthDefault = random.pick([6, 8, 12]); // 8

let unitType = 'square'; // circle, square
let unitSizeDefault, imageTransparencyMin, imageTransparencyMax;
if (unitType == 'circle') {
  unitSizeDefault = random.pick([4, 6]); // 4, 6, 6, 8
  imageTransparencyMin = 0.2; // 0.2, 0.64
  imageTransparencyMax = 0.8; // 0.8, 0.96
} else {
  unitSizeDefault = random.pick([4, 6, 8, 12]); // 4, 6, 6, 8, 8, 12, 16, 16
  imageTransparencyMin = 0.80; // 0.2, 0.64, 0.72
  imageTransparencyMax = 0.96; // 0.8, 0.96
}
let warpTransparencyMin = 0.0; // Used in the warp layer only
let warpTransparencyMax = 0.08;

let enablePrimaryGrid = random.pick([true, true]);
let enablePrimaryGridPattern = random.pick([true, true]);
let enableSecondaryGrid = random.pick([false, false]);
let enableSecondaryGridPattern = random.pick([false, true]);

let enableFrame = random.pick([true, true]);

let enablePrimarySymbols = true;
let enableAccentSymbols = false;
let fontfamilyPrimary = 'Andale Mono'; // Andale Mono, Roboto Mono
let fontstylePrimary = '';
let charactersOpacityPrimary = 1.0;

let enablePhraseSymbols = false;
let fontfamilySecondary = 'Rubik';
let fontstyleSecondary = '900 italic'; // see https://fonts.google.com/specimen/Rubik
let phrase = '';
let charactersOpacitySecondary = 0.85;

let characterDensity = random.range(0.59, 0.89); // 0.6, 0.9

ratio = '1:1';
//ratio = '16:9';
//ratio = 'movie poster';

imagePath = random.pick([
    './images/2000-123-1.jpg',
    './images/2000-115-2.jpg',
    './images/2000-122-1.jpg',
]);

if (enableNonUniformBackground === true) {

  imagePathBackground = random.pick([
    './images/2000-123-1.jpg',
    './images/2000-115-2.jpg',
    './images/2000-122-1.jpg',
  ]);

} else {

  if (ratio === '16:9') {
    imagePathBackground = random.pick([
      './images/solid-colors-16x9/2a2a2a.png', './images/solid-colors-16x9/3a3d40.png',
      './images/solid-colors-16x9/7a3d7f.png', './images/solid-colors-16x9/9c769a.png',
      './images/solid-colors-16x9/41a6a4.png', './images/solid-colors-16x9/41a657.png',
      './images/solid-colors-16x9/285b70.png', './images/solid-colors-16x9/352ce7.png',
      './images/solid-colors-16x9/403f3a.png', './images/solid-colors-16x9/585b60.png',
      './images/solid-colors-16x9/615f59.png', './images/solid-colors-16x9/702c28.png',
      './images/solid-colors-16x9/4187a6.png', './images/solid-colors-16x9/6241a6.png',
      './images/solid-colors-16x9/28706f.png', './images/solid-colors-16x9/297138.png',
      './images/solid-colors-16x9/402870.png', './images/solid-colors-16x9/a82f28.png',
      './images/solid-colors-16x9/a64641.png', './images/solid-colors-16x9/aca49d.png',
      './images/solid-colors-16x9/b3b3b3.png', './images/solid-colors-16x9/b5b9e8.png', 
      './images/solid-colors-16x9/b5d9e8.png', './images/solid-colors-16x9/b5e8c0.png',
      './images/solid-colors-16x9/b5e8df.png', './images/solid-colors-16x9/b7b7b7.png',
      './images/solid-colors-16x9/bc4b46.png', './images/solid-colors-16x9/bc5a56.png',
      './images/solid-colors-16x9/cbb4d7.png', './images/solid-colors-16x9/cc6d69.png',
      './images/solid-colors-16x9/d1d1cf.png', './images/solid-colors-16x9/d1d98d.png',
      './images/solid-colors-16x9/d2c4db.png', './images/solid-colors-16x9/d7b5d6.png',
      './images/solid-colors-16x9/dde8b5.png', './images/solid-colors-16x9/e3dd7e.png',
      './images/solid-colors-16x9/e7e02c.png', './images/solid-colors-16x9/e8b5b5.png',
      './images/solid-colors-16x9/e8c7b5.png', './images/solid-colors-16x9/e74f2c.png',
      './images/solid-colors-16x9/e7772c.png',

      './images/solid-colors-16x9/f8f5f5.png', './images/solid-colors-16x9/f8f5f5.png',
      './images/solid-colors-16x9/f8f5f5.png', './images/solid-colors-16x9/f8f5f5.png',
      './images/solid-colors-16x9/f8f5f5.png', './images/solid-colors-16x9/f8f5f5.png',
      './images/solid-colors-16x9/f8f5f5.png', './images/solid-colors-16x9/f8f5f5.png',
      './images/solid-colors-16x9/f8f5f5.png', './images/solid-colors-16x9/f8f5f5.png',
    ]);
  }
  if (ratio === 'movie poster') {
    imagePathBackground = random.pick([
      './images/solid-colors-print/2a2a2a.png', './images/solid-colors-print/3a3d40.png',
      './images/solid-colors-print/7a3d7f.png', './images/solid-colors-print/9c769a.png',
      './images/solid-colors-print/41a6a4.png', './images/solid-colors-print/41a657.png',
      './images/solid-colors-print/285b70.png', './images/solid-colors-print/352ce7.png',
      './images/solid-colors-print/403f3a.png', './images/solid-colors-print/585b60.png',
      './images/solid-colors-print/615f59.png', './images/solid-colors-print/702c28.png',
      './images/solid-colors-print/4187a6.png', './images/solid-colors-print/6241a6.png',
      './images/solid-colors-print/28706f.png', './images/solid-colors-print/297138.png',
      './images/solid-colors-print/402870.png', './images/solid-colors-print/a82f28.png',
      './images/solid-colors-print/a64641.png', './images/solid-colors-print/aca49d.png',
      './images/solid-colors-print/b3b3b3.png', './images/solid-colors-print/b5b9e8.png', 
      './images/solid-colors-print/b5d9e8.png', './images/solid-colors-print/b5e8c0.png',
      './images/solid-colors-print/b5e8df.png', './images/solid-colors-print/b7b7b7.png',
      './images/solid-colors-print/bc4b46.png', './images/solid-colors-print/bc5a56.png',
      './images/solid-colors-print/cbb4d7.png', './images/solid-colors-print/cc6d69.png',
      './images/solid-colors-print/d1d1cf.png', './images/solid-colors-print/d1d98d.png',
      './images/solid-colors-print/d2c4db.png', './images/solid-colors-print/d7b5d6.png',
      './images/solid-colors-print/dde8b5.png', './images/solid-colors-print/e3dd7e.png',
      './images/solid-colors-print/e7e02c.png', './images/solid-colors-print/e8b5b5.png',
      './images/solid-colors-print/e8c7b5.png', './images/solid-colors-print/e74f2c.png',
      './images/solid-colors-print/e7772c.png',

      './images/solid-colors-print/f8f5f5.png', './images/solid-colors-print/f8f5f5.png',
      './images/solid-colors-print/f8f5f5.png', './images/solid-colors-print/f8f5f5.png',
      './images/solid-colors-print/f8f5f5.png', './images/solid-colors-print/f8f5f5.png',
      './images/solid-colors-print/f8f5f5.png', './images/solid-colors-print/f8f5f5.png',
      './images/solid-colors-print/f8f5f5.png', './images/solid-colors-print/f8f5f5.png',
    ]);
  }
  if (ratio === '1:1') {
    imagePathBackground = random.pick([
      './images/solid-colors-1x1/2a2a2a.png', './images/solid-colors-1x1/3a3d40.png',
      './images/solid-colors-1x1/7a3d7f.png', './images/solid-colors-1x1/9c769a.png',
      './images/solid-colors-1x1/41a6a4.png', './images/solid-colors-1x1/41a657.png',
      './images/solid-colors-1x1/285b70.png', './images/solid-colors-1x1/352ce7.png',
      './images/solid-colors-1x1/403f3a.png', './images/solid-colors-1x1/585b60.png',
      './images/solid-colors-1x1/615f59.png', './images/solid-colors-1x1/702c28.png',
      './images/solid-colors-1x1/4187a6.png', './images/solid-colors-1x1/6241a6.png',
      './images/solid-colors-1x1/28706f.png', './images/solid-colors-1x1/297138.png',
      './images/solid-colors-1x1/402870.png', './images/solid-colors-1x1/a82f28.png',
      './images/solid-colors-1x1/a64641.png', './images/solid-colors-1x1/aca49d.png',
      './images/solid-colors-1x1/b3b3b3.png', './images/solid-colors-1x1/b5b9e8.png', 
      './images/solid-colors-1x1/b5d9e8.png', './images/solid-colors-1x1/b5e8c0.png',
      './images/solid-colors-1x1/b5e8df.png', './images/solid-colors-1x1/b7b7b7.png',
      './images/solid-colors-1x1/bc4b46.png', './images/solid-colors-1x1/bc5a56.png',
      './images/solid-colors-1x1/cbb4d7.png', './images/solid-colors-1x1/cc6d69.png',
      './images/solid-colors-1x1/d1d1cf.png', './images/solid-colors-1x1/d1d98d.png',
      './images/solid-colors-1x1/d2c4db.png', './images/solid-colors-1x1/d7b5d6.png',
      './images/solid-colors-1x1/dde8b5.png', './images/solid-colors-1x1/e3dd7e.png',
      './images/solid-colors-1x1/e7e02c.png', './images/solid-colors-1x1/e8b5b5.png',
      './images/solid-colors-1x1/e8c7b5.png', './images/solid-colors-1x1/e74f2c.png',
      './images/solid-colors-1x1/e7772c.png',

      './images/solid-colors-1x1/f8f5f5.png', './images/solid-colors-1x1/f8f5f5.png',
      './images/solid-colors-1x1/f8f5f5.png', './images/solid-colors-1x1/f8f5f5.png',
      './images/solid-colors-1x1/f8f5f5.png', './images/solid-colors-1x1/f8f5f5.png',
      './images/solid-colors-1x1/f8f5f5.png', './images/solid-colors-1x1/f8f5f5.png',
      './images/solid-colors-1x1/f8f5f5.png', './images/solid-colors-1x1/f8f5f5.png',
    ]);
  }

}

const colorschemes = {
  // Misc
  technicolor: [ '0, 0, 0', '0, 0, 255', '255, 0, 0' ],
  // Generative Pointillism
  radioaxiom: [ '42, 42, 42', '41, 113, 56', '65, 166, 87', '181, 233, 181' ],
  amaranthblue: [ '42, 42, 42', '40, 112, 111', '65, 166, 164', '181, 232, 223' ],
  midnightblues: [ '42, 42, 42', '40, 91, 112', '65, 135, 166', '181, 217, 232' ],
  inkonfingertips: [ '42, 42, 42', '64, 40, 112', '98, 65, 166', '183, 183, 183' ],
  shallowwaters: [ '42, 42, 42', '58, 61, 64', '88, 91, 96', '221, 232, 181' ],
  shallowwatersaxiom: [ '42, 42, 42', '58, 61, 64', '88, 91, 96', '181, 233, 181' ],
  shallowwatersblues: [ '42, 42, 42', '58, 61, 64', '88, 91, 96', '181, 217, 232' ],
  shallowwatersroyal: [ '42, 42, 42', '58, 61, 64', '88, 91, 96', '181, 185, 232' ],
  poppyseed: [ '42, 42, 42', '168, 45, 40', '188, 75, 70', '207, 208, 209' ],
  silverhand: [ '42, 42, 42', '58, 61, 64', '88, 91, 96', '207, 208, 209' ],
  // Synthetic Dreams
  destructions: [ '42, 42, 42', '181, 217, 232', '181, 232, 223' ],
  transitions: [ '42, 42, 42', '215, 181, 214', '203, 180, 215', '210, 196, 219' ],
  strings: [ '42, 42, 42', '221, 232, 181', '209, 217, 141', '227, 221, 126' ],
  theories: [ '42, 42, 42', '232, 181, 181', '232, 199, 181' ],
  blood: [ '42, 42, 42', '188, 75, 70', '204, 109, 105', '232, 181, 181', '204, 109, 105', '232, 181, 181', '248, 245, 245' ],
    // special colorschemes
    silverinverted: [ '42, 42, 42', '64, 63, 58', '97, 95, 89', '209, 209, 207' ], // Black and white
    anxiety: [ '42, 42, 42', '112, 44, 40', '168, 47, 40', '166, 70, 65', '179, 179, 179' ], // Red
  // Virgin Suicides Accents
  virginsuicides_accents_1: [ '42, 42, 42', '53, 44, 231', '231, 224, 44', '231, 119, 44', '231, 79, 44' ], // Repeat to increase chances to be sellected
  //virginsuicides_accents_2: [ '42, 42, 42', '53, 44, 231', '231, 224, 44', '231, 119, 44', '231, 79, 44' ], 
  //virginsuicides_accents_3: [ '42, 42, 42', '53, 44, 231', '231, 224, 44', '231, 119, 44', '231, 79, 44' ],
  //virginsuicides_accents_4: [ '42, 42, 42', '53, 44, 231', '231, 224, 44', '231, 119, 44', '231, 79, 44' ],
  //virginsuicides_accents_5: [ '42, 42, 42', '53, 44, 231', '231, 224, 44', '231, 119, 44', '231, 79, 44' ],
  virginsuicides_accents_violet: [ '42, 42, 42', '122, 61, 127', '156, 118, 154', '210, 196, 219', '172, 164, 157' ],
}

const sketch = ({ context, width, height }) => {
// const sketch start

  let color = selectColor();
  let colorset = color.colorset,
      canvas_color = color.canvas_color,
      primary_color = color.primary_color,
      secondary_color = color.secondary_color,
      symbol_color = color.symbol_color,
      accent_color = color.accent_color;

  let horizontalAdjustment;
  if (width > height) {
    horizontalAdjustment = 2;
    console.log('horizontal adjustment: ' + horizontalAdjustment);
  } else {
    horizontalAdjustment = 1;
  }

  // Grid (1)
  let primary_grid_size = random.pick([6, 8, 10, 12, 16, 20, 24, 30]) * horizontalAdjustment; // 6, 8, 10, 12, 16, 20, 24, 30
  const primary_grid_properties = {

    // Enable primary grid code
    enable_primary_grid: enablePrimaryGrid,

    // Basic properties 
    grid_size: primary_grid_size,
    width: random.pick([width, width * 1.4, width * 1.6]),
    height: random.pick([height, height * 1.4, height * 1.6]),
    disperse_x: random.pick([random.range(-0.2, 0.2), random.range(-0.5, 0.5)]), // -0.5, 0.5
    disperse_y: random.pick([random.range(-0.2, 0.2), random.range(-0.5, 0.5)]), // -0.5, 0.5
    primary_color: primary_color,
    stroke: false, //random.pick([false, random.boolean(), true, true]), // random.boolean()

    // Modifiers
    // use "1" to avoid modifications
    modify_i_min: random.pick([-1, 1, 1]),
    modify_i_max: random.pick([1, random.range(-4.2, 6.9)]),
    modify_j_min: random.pick([-1, 1, 1]),
    modify_j_max: random.pick([1, random.range(-4.2, 6.9)]),

    modify_w_min: random.pick([-1, 1, 1]), // -1, 1, 1
    modify_w_max: random.pick([1, random.range(-4.2, 6.9)]),
    modify_w_more: random.boolean(),

    modify_h_min: random.pick([-1, 1, 1]), // -1, 1, 1
    modify_h_max: random.pick([1, random.range(-4.2, 6.9)]),
    modify_h_more: random.boolean(),

    // Debris
    density_min: 48,
    density_max: 128,
    radius_min: 4,
    radius_max: 12,
    secondary_color: secondary_color,
    destroy_x: random.boolean(), // random.boolean()
    destroy_y: random.boolean(), // random.boolean()

    // Pattern
    enable_pattern: enablePrimaryGridPattern,
    
  }
  let primary_grid_data = deployGrid(context, primary_grid_properties);
  let primary_grid = primary_grid_data.initialize_grid;
  let primary_grid_offset_x = (width / 2 - primary_grid_data.cell - primary_grid_data.cell * primary_grid_data.disperse_x) - primary_grid_data.offset_x / 2;
  let primary_grid_offset_y = (height / 2 - primary_grid_data.cell - primary_grid_data.cell * primary_grid_data.disperse_y) - primary_grid_data.offset_y / 2;


  // Grid (2)(aka Colorfield)
  let colorfield_size = random.pick([20, 24, 30]) * horizontalAdjustment; // 20, 24, 30
  const colorfield_properties = {

    // Enable colorfield-specific code
    enable_colorfield: enableSecondaryGrid,

    // Basic properties 
    grid_size: colorfield_size,
    width: random.pick([width, width * 1.05, width * 1.1, width * 1.15]),
    height: random.pick([height, height * 1.05, height * 1.1, height * 1.15]),
    disperse_x: random.range(-0.35, 0.45), // random.range(-0.35, 0.45)
    disperse_y: random.range(-0.35, 0.45), // random.range(-0.35, 0.45)
    primary_color: primary_color,
    stroke: false,

    // Modifiers
    // use "1" to avoid modifications
    modify_i_min: random.pick([-1, 1, 1]), // 1
    modify_i_max: 1,
    modify_j_min: random.pick([-1, 1, 1]), // 1
    modify_j_max: 1,

    modify_w_min: random.pick([-1, 1, 1, -20, -10, -10, 10, 10]), // random.pick([-1, 1, 1])
    modify_w_max: 1,
    modify_w_more: random.boolean(),

    modify_h_min: random.pick([-1, 1, 1, -20, -10, -10, 10, 10]), // random.pick([-1, 1, 1])
    modify_h_max: 1,
    modify_h_more: random.boolean(),

    // Debris
    density_min: 48, // 48
    density_max: 64, // 64
    radius_min: 0,
    radius_max: 16, // 18
    secondary_color: colorset,
    destroy_x: random.boolean(), // random.boolean()
    destroy_y: random.boolean(), // random.boolean()

    // Pattern
    enable_pattern: enableSecondaryGridPattern,
    
  }
  let colorfield_data = deployGrid(context, colorfield_properties);
  let colorfield = colorfield_data.initialize_grid;
  let colorfield_offset_x = (width / 2 - colorfield_data.cell - colorfield_data.cell * colorfield_data.disperse_x) - colorfield_data.offset_x / 2;
  let colorfield_offset_y = (height / 2 - colorfield_data.cell - colorfield_data.cell * colorfield_data.disperse_y) - colorfield_data.offset_y / 2;


  // Primary Symbols
  const symbols_grid_size = random.pick([16, 20, 24, 30]) * horizontalAdjustment; // 16, 20, 24, 30
  const symbols_grid_properties = {
    grid_size: symbols_grid_size,
    width: width,
    height: height,
    symbol_color: symbol_color,
    symbols_set: 'symbols',
  }
  let symbols_grid_data = deploySymbols(context, symbols_grid_properties);
  let symbols_grid = symbols_grid_data.initialize_symbols;

  
  // Accent Symbols (2)
  const symbols_accent_size = symbols_grid_size;
  const symbols_accent_properties = {
    grid_size: symbols_accent_size,
    width: width,
    height: height,
    symbol_color: accent_color,
    symbols_set: 'symbols',
  }
  let symbols_accent_data = deploySymbols(context, symbols_accent_properties);
  let symbols_accent = symbols_accent_data.initialize_symbols;


  // Phrase Symbols (3)
  const phrase_size = symbols_grid_size / random.pick([0.8, 1.4]);
  const phrase_properties = {
    grid_size: phrase_size,
    width: width,
    height: height,
    symbol_color: primary_color,
    symbols_set: 'phrase',
  }
  let phrase_data = deploySymbols(context, phrase_properties);
  let phrase = phrase_data.initialize_symbols;

  console.log('cells w/ symbols: ' + symbols_grid_size);

  // Frame
  // x, y, width, height, gutter, color
  let frame_size = random.pick([10, 12, 16, 20, 24, 30]) * horizontalAdjustment;
  while (frame_size === primary_grid_size) {
    console.log('frame equals to primary grid, re-roll');
    frame_size = random.pick([10, 12, 16, 20, 24, 30]);
  }
  console.log('frame size: ' + frame_size);
  let frame_cell = width / frame_size;
  const frame = new Frame(0, 0, width, height, frame_cell, accent_color);

  // const sketch return

  return {
  // start return

    begin () {

      // Flip canvas
      let flip_canvas;
      if (enableImageFlip === true) {
        flip_canvas = random.pick(['horizontal', 'vertical', 'one_eighty', 'none', 'none']); // 'horizontal', 'vertical', 'one_eighty', 'none', 'none'
      } else { 
        flip_canvas = 'none';
      }
      console.log('flip canvas: ' + flip_canvas);
      if (flip_canvas === 'horizontal') {
        context.translate(0, height);
        context.scale(1, -1);
      } else if (flip_canvas === 'vertical') {
        context.translate(width, 0);
        context.scale(-1, 1);
      } else if (flip_canvas === 'one_eighty') {
        context.translate(width, height);
        context.scale(-1, -1);
      } else {
        context.translate(0, 0);
        context.scale(1, 1);
      }

      // Avoid accidental transparency
      context.fillStyle = 'rgba(248, 245, 245)';
      context.fillRect(0, 0, width, height);
      
      // Canvas color (can have transparency)
      context.fillStyle = canvas_color;
      context.fillRect(0, 0, width, height);

      // Draw images
      let repeatImage, pickImage, i;

      if (enableImageSlice === true) {
        repeatImage = repeatImageDefault;
      } else {
        repeatImage = 1; // 0 - not drawing image; 1 - draw image at least once
      }
      if (enableLoadImage === true) {
        for (i = 1; i <= repeatImage; i++) {
          pickImage = random.pick([image, image, background]);
          console.log('IMAGE: ' + (i));
          drawImage(context, width, height, pickImage, enableImageSlice, 'image');
        }
      }

      /*
      // Background
      if (enableImageSlice === true) {
        repeatImage = repeatImageDefault;
      } else {
        repeatImage = 1; // 0 - not drawing image; 1 - draw image at least once
      }
      if (enableLoadImage === true) {
        for (i = 0; i < repeatImage; i++) {
          pickImage = random.pick([image, background]);
          console.log('background: ' + (i+1));
          drawImage(context, width, height, pickImage, enableImageSlice, 'image');
        }
      }
      
      // Foreground
      
      if (enableImageSlice === true) {
        repeatImage = repeatImageDefault;
      } else {
        repeatImage = 1; // 0 - not drawing image; 1 - draw image at least once
      }
      if (enableLoadImage === true) {
        for (i = 0; i < repeatImage; i++) {
          console.log('foreground: ' + (i+1));
          drawImage(context, width, height, image, enableImageSlice, 'image');
        }
      }
      */

      // Warp
      if (enableWarp === true) {
        console.log('WARP');
        drawImage(context, width, height, image, enableWarpSlice, 'warp');
      }

      // Flip image
      if (enableImageFlip === true) {
        // Flip horizontal
        context.translate(0, height);
        context.scale(1, -1);
      }
      
    },
    
    tick ({ context }) {
    // tick start

      let rotate_amplitude;

      // Grid (1)
      if (random.chance(1) === true) {
        context.save();
        rotate_amplitude = rotateCanvasAmplitude();
        context.translate(primary_grid_offset_x, primary_grid_offset_y); // Correct grid offset
        primary_grid.forEach(cell => {
          cell.draw(context, width, height);
          rotateCanvas(context, 0.55, rotate_amplitude);
        });
        context.restore();
        //console.log('grid primary: true');
      } else {
        console.log('grid primary: false');
      }

      // Grid (2)(aka Colorfield)
      if (random.chance(1) === true) {
        context.save();
        rotate_amplitude = rotateCanvasAmplitude();
        context.translate(colorfield_offset_x, colorfield_offset_y); // Correct grid offset
        colorfield.forEach(cell => {
          cell.draw(context, width, height);
          rotateCanvas(context, 0.75, rotate_amplitude);
        });
        context.restore();
        //console.log('colorfield: true');
      } else {
        console.log('colorfield: false');
      }

      // Frame
      while (enableFrame === true) {
        if (random.chance(0.65) === true) {
          frame.draw(context);
          //console.log('frame: true');
        } else {
          console.log('frame: false');
        }
        break;
     }

      // Primary Symbols (1)
      while (enablePrimarySymbols === true) {
        if (random.chance(1) === true) {
          context.save();
          rotate_amplitude = rotateCanvasAmplitude();
          context.globalAlpha = charactersOpacityPrimary;
          symbols_grid.forEach(symbol => {
            symbol.draw(context);
            rotateCanvas(context, 0.75, rotate_amplitude);
          });
          context.restore();
        } else {
          console.log('symbols: false');
        }
        break;
      }

      // Accent Symbols (2)
      while (enableAccentSymbols === true) {
        if (random.chance(1) === true) {
          context.save();
          rotate_amplitude = rotateCanvasAmplitude();
          context.globalAlpha = charactersOpacityPrimary;
          symbols_accent.forEach(symbol => {
            symbol.draw(context);
            rotateCanvas(context, 0.05, rotate_amplitude);
          });
          context.restore();
        } else {
          console.log('symbols accent: false');
        }
        break;
      }

      // Phrase (3)
      while (enablePhraseSymbols === true) {
        if (random.chance(1) === true) {
          context.save();
          rotate_amplitude = rotateCanvasAmplitude();
          context.globalAlpha = charactersOpacitySecondary;
          phrase.forEach(symbol => {
            symbol.draw(context);
            rotateCanvas(context, 0.25, rotate_amplitude);
          });
          context.restore();
        } else {
          console.log('phrase: false');
        }
        break;
      }

      //drawGuides(context, width, height);
      //showSeed(context, width, height);
      
    // tick end
    },

  // return end
  }

// const sketch end
}


// Wait for image load complete
const loadImage = async (url) => {
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.onload = () => resolve(image);
		image.onerror = () => reject();
		image.src = url;
	});
}
// Start code execution
const start = async () => {
	image = await loadImage(imagePath);
  console.log('foreground: ' + imagePath);
  background = await loadImage(imagePathBackground);
  console.log('background: ' + imagePathBackground);
	canvasSketch(sketch, settings);
}
start();


// Image pixels to color values
function pixelColor(width, height, image) {

  // Create a canvas element for the image
  const imageCanvas = document.createElement('canvas');

  // Get the 2D context of the image canvas
	const imageContext = imageCanvas.getContext('2d');
  
  // Calculate the scale factor to fit the image into the canvas
  const scale = Math.min(width / image.width, height / image.height);

  // Calculate the position to center the image on the canvas
  let x = (width - image.width * scale) / 2;
  let y = (height - image.height * scale) / 2;

  // Set the width and height of the image canvas to the size of the image
  imageCanvas.width = image.width * scale;
  imageCanvas.height = image.height * scale;

  // Draw the image on the canvas
  let zoom;
  if (enableFloatingBorders === true) {
    zoom = parseFloat(random.range(1, 2).toFixed(1));
  } else {
    zoom = 1;
  }
  x = random.pick([x, Math.round(random.range(x, (image.width * scale * zoom) / 2))]);
  y = random.pick([y, Math.round(random.range(y, (image.height * scale * zoom) / 2))]);
  console.log('x:', x);
  console.log('y:', y);
  console.log('image zoom:', zoom);
  imageContext.drawImage(image, x, y, image.width * scale * zoom, image.height * scale * zoom);
  
  // Read image data
  const imageData = imageContext.getImageData(x, y, image.width * scale, image.height * scale).data;

  return imageData;
}


// Read image pixels colors and draw units (circles, squares, etc.) instead
// Image
function drawImage(context, width, height, image, slice, type) {
  console.log('load image');

  let unitSize = unitSizeDefault;
  let pixelsData = pixelColor(width, height, image);
  let x, y;
  let sizeCorrection = 4; // Needed to correct the size of the generated image
  let shift_x, shift_y;
  let colorShift = 0;
  let distortPower;
  let i, r, g, b, a;
  let repeatPositionMin, repeatPositionMax;
  let chance;

  // Flip canvas
  let flip_canvas;
  if (enableImageFlipLocal === true) {
    flip_canvas = random.pick(['horizontal', 'vertical', 'one_eighty', 'none', 'none']); // 'horizontal', 'vertical', 'one_eighty', 'none', 'none'
  } else { 
    flip_canvas = 'none';
  }
  console.log('flip canvas: ' + flip_canvas);
  if (flip_canvas === 'horizontal') {
    context.translate(0, height);
    context.scale(1, -1);
  } else if (flip_canvas === 'vertical') {
    context.translate(width, 0);
    context.scale(-1, 1);
  } else if (flip_canvas === 'one_eighty') {
    context.translate(width, height);
    context.scale(-1, -1);
  } else {
    context.translate(0, 0);
    context.scale(1, 1);
  }

  // Enable image slice
  if (slice === true) {
    if (enableWeirdDistortion === true) {
      distortPower = random.pick([
        0,
        weirdDistort()
      ]);
    } else {
      distortPower = random.pick([
        0,
        standardDistort(), standardDistort(),
        moderateDistort(), moderateDistort(),
        weirdDistort()
      ]);
    }
  } else {
    distortPower = 0;
  }
  console.log('image distort type:', distortPower);

  // Enable minor position distortion to achieve a blur-like effect
  /*
  if (type == 'warp') {
    shift_x = random.pick([random.range(-16, 16), random.range(-12, 12), random.range(-8, 8)]);
    shift_y = random.pick([random.range(-16, 16), random.range(-12, 12), random.range(-8, 8)]);
  } else {
    shift_x = random.pick([random.range(-4.2, 4.2), random.range(-1.6, 1.6), 1, 1, 0, 0, 0]);
    shift_y = random.pick([random.range(-4.2, 4.2), random.range(-1.6, 1.6), 1, 1, 0, 0, 0]);
  }
  */

  // Enable color shift
  if (enableColorShift === true) colorShift = random.pick([0, 0, 0, 1, 2, 3]); // 0, 0, 0, 1, 2, 3
  // Enable size shift/correction
  if (enableFloatingBorders === true) {
    if (enableWeirdSizeShift === true) {
      //sizeCorrection = parseFloat(random.range(0, 4).toFixed(2));
      sizeCorrection = random.pick([1.05, 1.07, 1.1, 2, 2, 4, 4, 4, 4, 4]);
    } else {
      sizeCorrection = random.pick([2, 2, 4, 4, 4, 4]);
    }
  }
  console.log('image size correction:', sizeCorrection);
  // Prepearing to render
  context.save();
  context.translate(random.range(0, -shift_x * unitSize), random.range(0, -shift_y * unitSize));
  // Render
  for (y = 0; y < height; y += unitSize) {
    chance = random.chance(0.5);
    if (chance) {
      repeatPositionMin = y;
      repeatPositionMax = y + random.pick([
          unitSize * 2, unitSize * 4, unitSize * 6, 
          unitSize * 8, unitSize * 10, unitSize * 12,
          unitSize * 14, unitSize * 16, unitSize * 18
      ]);
    }
    for (x = -unitSize * 2; x < width; x += unitSize) {
      if (type == 'warp') {
        shift_x = random.pick([random.range(-16, 16), random.range(-12, 12), random.range(-8, 8)]);
        shift_y = random.pick([random.range(-16, 16), random.range(-12, 12), random.range(-8, 8)]);
      } else {
        shift_x = random.pick([random.range(-4.2, 4.2), random.range(-1.6, 1.6), 1, 1, 0, 0, 0]);
        shift_y = random.pick([random.range(-4.2, 4.2), random.range(-1.6, 1.6), 1, 1, 0, 0, 0]);
      }
      i = drawAxisX(y, x, width, sizeCorrection, repeatPositionMin, repeatPositionMax, chance);
      r = pixelsData[i + 0];
      g = pixelsData[i + 1];
      b = pixelsData[i + 2];
      if (type == 'warp') {
        a = random.range(warpTransparencyMin, warpTransparencyMax);
      } else {
        a = random.range(imageTransparencyMin, imageTransparencyMax);
      }
      context.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
      rotate_amplitude = rotateCanvasAmplitude();
      context.beginPath();
      if (unitType === 'circle') {
        context.arc(x + random.range(unitSize/4, unitSize * 4) * shift_x, y + random.range(unitSize/4, unitSize * 4) * shift_y, random.range(unitSize/4, unitSize * 4), 0, Math.PI * 2);
        context.rect(x, y, unitSize * 2, unitSize * 2);
      }
      if (unitType === 'square') {
        //context.rect(x + random.range(unitSize/4, unitSize * 4) * shift_x, y + random.range(unitSize/4, unitSize * 4) * shift_y, random.range(unitSize/4, unitSize * 4), random.range(unitSize/4, unitSize * 4));
        context.rect(x, y, unitSize, unitSize);
      }
      context.fill();
      rotateCanvas(context, random.pick(distortPower) * random.pick([-42, -16, -13, -5, -2, -1, -1, -0.5, 0, 0, 0, 0, 0, 0.5, 1, 1, 2, 5, 13, 16, 42]), rotate_amplitude);
    }
    console.log('Y');
  }
  context.restore();
  // Enable image rotation
  if (enableImageRotate === true) {
    let rotate_canvas = random.pick(['yes', 'yes', 'no', 'no', 'no']);
    if (rotate_canvas === 'yes') {
      context.rotate(90 * Math.PI / 180);
      context.translate(0, -width);
      context.save();
      context.restore();
    }
  }
}

function drawAxisX(y, x, width, sizeCorrection, repeatPositionMin, repeatPositionMax, chance) {
  let i, startLineRepeat, returnToNormal;
  if (chance) {
    i = (y * width + x) * sizeCorrection; // Draw line after line
  } else { // Repeat one line
    while (y <= repeatPositionMin) {
        i = (y * width + x) * sizeCorrection;
        break;
    }
    while (y > repeatPositionMin && y < repeatPositionMax) {
        startLineRepeat = repeatPositionMin;
        i = (startLineRepeat * width + x) * sizeCorrection;
        break;
    }
    while (y >= repeatPositionMax) {
        returnToNormal = y - (repeatPositionMax-repeatPositionMin)
        i = (returnToNormal * width + x) * sizeCorrection;
        break;
    }
  }
  return i;
}

// Image distort powers
function standardDistort() {
  let distort = [
     //0, 0, 0, 0, 0, 0, 0,
     //0.00013, 0.00008, 0.00005, 0.00003, 0.00002, 0.00001, 0.00001
     0, 0, 0, 0, 0, 0, 0,
     0, 0, 0, 0, 0, 0, 0,
     0.00013, 0.00008, 0.00005, 0.00003, 0.00002, 0.00001, 0.00001,
     0.00013, 0.00008, 0.00005, 0.00003, 0.00002, 0.00001, 0.00001,
     0.0013, 0.0008, 0.0005, 0.0003, 0.0002, 0.0001, 0.0001,
     0.0013, 0.0008, 0.0005, 0.0003, 0.0002, 0.0001, 0.0001,
     0.0013, 0.0008, 0.0005, 0.0003, 0.0002, 0.0001, 0.0001,
     0.013, 0.008, 0.005, 0.003, 0.002, 0.001, 0.001
  ];
  return distort;
}
function moderateDistort() {
  let i = random.pick([0.1, 0.2, -0.1, -0.2]);
  let distort = [0.00002 * i, 0.00002 * i, 0.00002 * i, 0, 0];
  //let distort = [
  //  0, 0, 0, 0, 0, 0, 0,
  //  0.00013, 0.00008, 0.00005, 0.00003, 0.00002, 0.00001, 0.00001
  //];
  return distort;
}
function weirdDistort() {
  let distort = [
     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
     0.000013, 0.000008, 0.000005, 0.000003, 0.000002, 0.000001, 0.000001,
     0.000013, 0.000008, 0.000005, 0.000003, 0.000002, 0.000001, 0.000001,
     -0.000013, -0.000008, -0.000005, -0.000003, -0.000002, -0.000001, -0.000001,
     -0.000013, -0.000008, -0.000005, -0.000003, -0.000002, -0.000001,- 0.000001,
     0.00013, 0.00008, 0.00005, 0.00003, 0.00002, 0.00001, 0.00001,
     0.00013, 0.00008, 0.00005, 0.00003, 0.00002, 0.00001, 0.00001,
     -0.00013, -0.00008, -0.00005, -0.00003, -0.00002, -0.00001, -0.00001,
     -0.00013, -0.00008, -0.00005, -0.00003, -0.00002, -0.00001, -0.00001,
     0.0013, 0.0008, 0.0005, 0.0003, 0.0002, 0.0001, 0.0001
  ];
  return distort;
}

// Define and select colors
function selectColor() {

  // Setting colors
  const colorkeys = Object.keys(colorschemes);
  let colorset, color_random_key, canvas_color;
  let primary_color, secondary_color;
  let symbol_color, accent_color;

  color_random_key = colorkeys[Math.floor(random.range(0, 1) * (colorkeys.length))];
  colorset = colorschemes[color_random_key];

  canvas_color = 'rgba(248, 245, 245)';
  primary_color = `rgba(${randomColor(colorset)}, 0.65)`;
  secondary_color = `rgba(${randomColor(colorset)}, 0.5)`;
  symbol_color = `rgba(${randomColor(colorset)}, 0.6)`;

  let accent_colorscheme = colorschemes['virginsuicides_accents_1'];
  accent_color = `rgba(${randomColor(accent_colorscheme)}, 1)`;
  
  // Modifying colors if conditions met
  let canvas_color_change_chance = random.chance(0.5); // Chance to get colored canvas background
  let bnw_chance = random.chance(0.2); // Chance to get black and white colorscheme
  let red_chance = random.chance(0.05); // Chance to get red inverted colorscheme

    // Black and white inverted colorscheme
    if (color_random_key === 'silverinverted') {
      canvas_color_change_chance = false; bnw_chance = true; red_chance = false;
    }
    while (canvas_color_change_chance === false && bnw_chance === true && red_chance === false) { 
      color_random_key = 'silverinverted';
      colorset = colorschemes[color_random_key];
      canvas_color = 'rgba(42, 42, 42, 0.95)';
      symbol_color = 'rgba(248, 245, 245, 0.45)';
      primary_color = 'rgba(248, 245, 245, 0.2)';
      secondary_color = primary_color;
      break;
    }

    // Red inverted colorscheme
    if (color_random_key === 'anxiety') {
      canvas_color_change_chance = false; bnw_chance = false; red_chance = true;
    }
    while (canvas_color_change_chance === false && bnw_chance === false && red_chance === true) {
      color_random_key = 'anxiety';
      colorset = colorschemes[color_random_key];
      canvas_color = 'rgba(42, 42, 42, 0.95)';
      symbol_color = 'rgba(188, 90, 86, 0.5)';
      primary_color = 'rgba(188, 90, 86, 0.2)';
      secondary_color = primary_color;
      break;
    }

    // Modified canvas color
    while (canvas_color_change_chance === true && bnw_chance === false && red_chance === false) {
      canvas_color = `rgba(${randomColor(colorset)}, 0.6)`;
      break;
    }

    // Nothing to change, values remain the same
    while (canvas_color_change_chance === true && bnw_chance === true && red_chance === true) {
      //console.log('all true');
      break;
    }
    while (canvas_color_change_chance === false && bnw_chance === false && red_chance === false) {
      //console.log('all false');
      break;
    }


  // Final color values
  console.log('chances: ');
  console.log(' - canvas color change: ' + canvas_color_change_chance);
  console.log(' - bnw: ' + bnw_chance);
  console.log(' - red: ' + red_chance);

  console.log('colorset: ');
  console.log(' - ' + color_random_key);
  //console.log(' - ' + accent_color);

  return { colorset, canvas_color, primary_color, secondary_color, symbol_color, accent_color }

}
function randomColor(colors) {
  return colors[Math.floor(random.range(0, 1) * colors.length)];
}


// Draw guides
function drawGuides(context, width, height) {

  context.save();
  context.beginPath();
  context.lineWidth = lineWidthDefault;
  context.strokeStyle = 'cyan';
  context.moveTo(width / 2, 0);
  context.lineTo(height / 2,  height);
  context.moveTo(0, width / 2);
  context.lineTo(width,  height / 2);
  context.closePath();
  context.stroke();
  context.restore();

  console.log('guides: active')
}

// Display seed
function showSeed(context, width, height) {

  context.save();
  context.translate(400, 500);
  context.font = "256px 'Andale Mono'";
  context.fillStyle = 'red';
  context.fillText(seed, 0, 0);
  context.restore();

  console.log('display seed: active')
}


// Grid
class GridPosition {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
class GridProperties {
  constructor(color, stroke, disperse_x, disperse_y) {
    this.color = color;
    this.stroke = stroke; // boolean
    this.disperse_x = disperse_x;
    this.disperse_y = disperse_y;
  }
}
class DebrisProperties {
  constructor(particle_radius, particle_color, density, destroy_x, destroy_y) {
    this.particle_radius = particle_radius;
    this.particle_color = particle_color;
    this.density = density;
    this.destroy_x = destroy_x; // boolean
    this.destroy_y = destroy_y; // boolean
  }
}
class PatternProperties {
  constructor(enable_pattern) {
    this.enable_pattern = enable_pattern; // boolean
  }
}
class Grid {
  constructor(x, y, width, height, color, stroke, disperse_x, disperse_y, particle_radius, particle_color, density, destroy_x, destroy_y, enable_pattern) {
    this.position = new GridPosition(x, y, width, height);
    this.properties = new GridProperties(color, stroke, disperse_x, disperse_y);
    this.debris = new DebrisProperties(particle_radius, particle_color, density, destroy_x, destroy_y);
    this.pattern = new PatternProperties(enable_pattern);
  }
  draw(context) {

    context.save();

      let x = this.position.x * this.properties.disperse_x;
      let y = this.position.y * this.properties.disperse_y;
      context.translate(x, y);

      // Grid
      context.beginPath();
      context.strokeStyle = this.properties.color;
      context.rect(this.position.x, this.position.y, this.position.width, this.position.height);
      context.closePath();
      if (this.properties.stroke === true) this.enable_stroke(context);

      // Recurring pattern
      if (this.pattern.enable_pattern === true) {
        let pattern_x = this.position.x + this.position.width / 2;
        let pattern_y = this.position.y + this.position.height / 2;
        context.beginPath();
        context.arc(pattern_x, pattern_y, this.debris.particle_radius, Math.PI * 2, 0);
        context.fillStyle = this.debris.particle_color;
        context.fill();
      }

      // Debris
      let offset_x = this.position.x;
        if (this.debris.destroy_x === true) offset_x = this.position.width * random.range(-10, 10);
        //console.log('offset_x: ' + offset_x);
      let offset_y = this.position.y;
        if (this.debris.destroy_y === true) offset_y = this.position.width * random.range(-10, 10);
        //console.log('offset_y: ' + offset_y);
      let variabledensity = random.range(0, this.debris.density);
      for (let i = 0; i < variabledensity; i++) {
        context.beginPath();
        context.arc(random.range(this.position.x, this.position.width + offset_x), random.range(this.position.y, this.position.height + offset_y), this.debris.particle_radius, Math.PI * 2, 0);
        context.fillStyle = this.debris.particle_color;
        context.fill();
      }

    context.restore();

  }
  enable_stroke(context) {
    context.lineWidth = lineWidthDefault;
    context.stroke();
  }
}
function deployGrid(context, properties) {

  const grid = [];

  //console.log('grid size: ');
  //console.log(' - ' + properties.grid_size);
  let cell = properties.width / properties.grid_size;

  // Destroy grid
  let disperse_x = 0, disperse_y = 0;
  if (random.chance(0.5)) {
    disperse_x = properties.disperse_x;
    //console.log(' - disperse x: ' + disperse_x);
  }
  if (random.chance(0.5)) {
    disperse_y = properties.disperse_y;
    //console.log(' - disperse y: ' + disperse_y);
  }

  // Correct grid offset
  let offset_x, offset_y;

  // Destroy debris
  let destroy_x, destroy_y;
  if (properties.destroy_x === true) {
    if (random.chance(0.75)) {
      destroy_x = true;
      //console.log(' - destroy x: true');
    }
  }
  if (properties.destroy_y === true) {
    if (random.chance(0.75)) {
      destroy_y = true;
      //console.log(' - destroy y: true');
    }
  }

  let random_negative = random.pick([-1, 1]);

  // Primary grid-specific code
  while (properties.enable_primary_grid === true) {

    for (let i = cell; i < properties.width - cell; i += cell) {
      for (let j = cell; j < properties.height - cell; j += cell) {

        // Custom modifiers
        let modify_w_more = 0, modify_h_more = 0;
        if (properties.modify_w_more === true) modify_w_more = (cell * random.range(properties.modify_w_min, properties.modify_w_max)) * 2 * random_negative;
        if (properties.modify_h_more === true) modify_h_more = (cell * random.range(properties.modify_h_min, properties.modify_h_max)) * 2 * random_negative;

        // Draw grid
        // x, y, width, height, color, stroke, disperse_x, disperse_y
        // particle_radius, particle_color, density, destroy_x, destroy_y
        grid.push(new Grid(
          i * random.range(properties.modify_i_min, properties.modify_i_max),
          j * random.range(properties.modify_j_min, properties.modify_j_max),
          cell * random.range(properties.modify_w_min, properties.modify_w_max) + modify_w_more,
          cell * random.range(properties.modify_h_min, properties.modify_h_max) + modify_h_more,
          properties.primary_color,
          properties.stroke,
          disperse_x, disperse_y,
          random.range(properties.radius_min, properties.radius_max),
          properties.secondary_color,
          random.range(properties.density_min, properties.density_max),
          destroy_x, destroy_y,
          properties.enable_pattern));

        // Values to correct grid offset
        offset_x = i + i * disperse_x;
        offset_y = i + j * disperse_y;

      }
    }
    //console.log('offset x: ' + Math.floor(offset_x));
    //console.log('offset y: ' + Math.floor(offset_y));
    
  break;
  } // Primary grid-specific code


  // Colorfield-specific code
  while (properties.enable_colorfield === true) {

    // Generate colorfield
    for (let c = 1; c < properties.grid_size; c++) {
      for (let i = (cell * c) - cell / 2; i < properties.width - cell * c; i += cell) { // c / x to reach horizontal spread
        for (let j = (cell * c) - cell / 2; j < properties.height - cell * c; j += cell) { // c / x to reach vertical spread

          context.lineWidth = random.range(4, 12);

          grid.push(new Grid(
            i,
            j,
            cell,
            cell,
            properties.primary_color,
            properties.stroke,
            disperse_x, disperse_y,
            random.range(properties.radius_min, properties.radius_max),
            `rgba(${randomColor(properties.secondary_color)}, ${c / properties.grid_size})`,
            random.range(properties.density_min, properties.density_max),
            destroy_x, destroy_y,
            properties.enable_pattern));

        }
      }
    }

    // Values to correct grid offset
    for (let i = cell; i < properties.width - cell; i += cell) {
      for (let j = cell; j < properties.height - cell; j += cell) {

        offset_x = i + i * disperse_x;
        offset_y = j + j * disperse_y;

      }
    }
    if (destroy_x === true) offset_x = offset_x - properties.width / 2 + cell;
    if (destroy_y === true) offset_y = offset_y - properties.height / 2 + cell;
    //console.log('offset x: ' + Math.floor(offset_x));
    //console.log('offset y: ' + Math.floor(offset_y));
    
  break;
  } // Colorfield-specific code

  console.log(properties);

  return {
    // Pass grid to draw
    initialize_grid: grid,
    // Pass values to correct grid offset
    cell: cell,
    disperse_x: disperse_x,
    disperse_y: disperse_y,
    offset_x: offset_x,
    offset_y: offset_y,
  }

}


// Rotate canvas
function rotateCanvas(context, chance, amplitude) {
  const canvas_rotate_chance = random.chance(chance);
  //console.log('canvas rotate chance: ' + canvas_rotate_chance);
  let context_rotate_min, context_rotate_max;
  if (canvas_rotate_chance === true) {
    context_rotate_min = random.range(-amplitude, amplitude);
    context_rotate_max = random.range(-amplitude, amplitude);
  } else {
    context_rotate_min = 0;
    context_rotate_max = 0;
  }
  return context.rotate(random.range(context_rotate_min, context_rotate_max));
}
function rotateCanvasAmplitude() {
  let i = random.pick([
    0.1, 0.2, 0.3, 0.5, 0.8, 1.3, 2.1, 1, 2, 3, 5, 8, 13, 21,
    -0.1, -0.2, -0.3, -0.5, -0.8, -1.3, -2.1, -1, -2, -3, -5, -8, -13, -21
  ]);
  const amplitude = random.pick([
    0, 0, 0, 0, 
    0.01, 0.01, 0.01, 0.01,
    0.02, 0.02, 0.02,
    0.03, 0.03, 
    0.05, 
    0.08,
    0.13,
    0.21]) * (i / 10); // Repeat a value to increase chances to be selected
  //console.log('rotate amplitude: ' + amplitude);
  return amplitude;
}


// Frame
class FrameProperties {
  constructor(color) {
    this.color = color;
  }
}
class FramePosition {
  constructor(x, y, width, height, gutter) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.gutter = gutter;
  }
}
class Frame {
  constructor(x, y, width, height, gutter, color) {
    this.position = new FramePosition(x, y, width, height, gutter);
    this.properties = new FrameProperties(color);
  }
  draw(context) {

    context.save();

      let narrow_x_chance, narrow_y_chance;

      let narrow_x = 0;
      let narrow_y = 0;
      
      narrow_x_chance = random.chance(0.5);
      narrow_y_chance = random.chance(0.5);
      if (narrow_x_chance === true && narrow_y_chance === false) {
        narrow_x = this.position.gutter * random.range(1, 3);
      } else if (narrow_x_chance === false && narrow_y_chance === true) {
        narrow_y = this.position.gutter * random.range(1, 3);
      } else if (narrow_x_chance === narrow_y_chance) {
        narrow_x = 0;
        narrow_y = 0;
      }
      //console.log(narrow_x, narrow_y);
      
      // Frame
      context.beginPath();
      context.lineWidth = lineWidthDefault;
      context.strokeStyle = this.properties.color;
      context.rect(this.position.x + this.position.gutter + narrow_x,
                   this.position.y + this.position.gutter + narrow_y,
                   this.position.width - this.position.gutter * 2 - narrow_x * 2,
                   this.position.height - this.position.gutter * 2 - narrow_y * 2);
      context.stroke();
      context.closePath();

    context.restore();
  }
}


// Symbols
class SymbolsProperties {
  constructor(x, y, cell_width, cell_height, symbol_color, symbols_set) {
    this.x = x;
    this.y = y;
    this.cell_width = cell_width;
    this.cell_height = cell_height;
    this.symbol_color = symbol_color;
    this.symbols_set = symbols_set;
  }
}
class Symbols {
  constructor(x, y, cell_width, cell_height, symbol_color, symbols_set) {
    this.param = new SymbolsProperties(x, y, cell_width, cell_height, symbol_color, symbols_set);
  }
  draw(context) {

    context.save();

      // Cell grid
      context.beginPath();
      context.lineWidth = lineWidthDefault;
      context.strokeStyle = this.param.symbol_color;
      context.rect(this.param.x, this.param.y, this.param.cell_width, this.param.cell_height);
      //context.stroke(); // Comment to switch off grid
      context.closePath();
      
      // Symbol setup
      let symbol, fontfamily, fontstyle;
      if (this.param.symbols_set === 'symbols') {
        symbol = getSymbol();
        fontfamily = fontfamilyPrimary;
        fontstyle = fontstylePrimary;
      }
      if (this.param.symbols_set === 'phrase') {
        symbol = getPhrase();
        fontfamily = fontfamilySecondary;
        fontstyle = fontstyleSecondary;
      }
      if (this.param.symbols_set === 'phrase' && phrase === '') {
        symbol = getSymbol();
        fontfamily = fontfamilySecondary;
        fontstyle = fontstyleSecondary;
      }
      
      context.font = `${fontstyle} ${this.param.cell_width / 2}px ${fontfamily}`;
      context.fillStyle = this.param.symbol_color;
      
      // Centring a symbol in the cell
      //context.textBaseline = 'top';
      //context.textAlign = 'center';
      const fontmeasures = context.measureText(symbol);
      const mx = fontmeasures.actualBoundingBoxLeft * -1;
      const my = fontmeasures.actualBoundingBoxAscent * -1;
      const mw = fontmeasures.actualBoundingBoxLeft + fontmeasures.actualBoundingBoxRight;
      const mh = fontmeasures.actualBoundingBoxAscent + fontmeasures.actualBoundingBoxDescent;
      const tx = (this.param.cell_width - mw) * 0.5 - mx;
      const ty = (this.param.cell_height - mh) * 0.5 - my;
      const centerx = this.param.x + tx;
      const centery = this.param.y + ty;

      // Displaying a symbol
      context.fillText(symbol, centerx, centery);

    context.restore();
  }
}
const getSymbol = () => {
  const whitespace = '';
  const character_number_variation = characterDensity;
  const chance = random.chance(character_number_variation);
  if (chance === true) return whitespace;
  
  const generic = '•○ ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789 ░▒▓ ►◄↕‼¶§▬↑↓→←∟↔▲▼!#$%&()*+,-./:;<=>?@[\\]^_` ';
  const ukranian = 'АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ ЇЇЇЇЇ ЇЇЇЇЇ ';
  const japanese1 = '亜 哀 愛 悪 握 圧 扱 安 暗 案';
  const japanese2 = '以 位 依 偉 囲 委 威 尉 意 慰 易 為 異 移 維 緯 胃 衣 違 遺 医 井 域 育 一 壱 逸 稲 芋 印 員 因 姻 引 飲 院 陰 隠 韻';
  const japanese3 = '右 宇 羽 雨 渦 浦 運 雲';
  const japanese4 = '営 影 映 栄 永 泳 英 衛 詠 鋭 液 疫 益 駅 悦 謁 越 閲 円 園 宴 延 援 沿 演 炎 煙 猿 縁 遠 鉛 塩';
  const japanese5 = '汚 凹 央 奥 往 応 押 横 欧 殴 王 翁 黄 沖 億 屋 憶 乙 卸 恩 温 穏 音';
  const japanese6 = '下 化 仮 何 価 佳 加 可 夏 嫁 家 寡 科 暇 果 架 歌 河 火 禍 稼 箇 花 荷 華 菓 課 貨 過 蚊 我 画 芽 賀 雅 餓 介 会 解 回 塊 壊 快 怪 悔 懐 戒 拐 改 械 海 灰 界 皆 絵 開 階 貝 劾 外 害 慨 概 涯 街 該 垣 嚇 各 拡 格 核 殻 獲 確 穫 覚 角 較 郭 閣 隔 革 学 岳 楽 額 掛 潟 割 喝 括 活 渇 滑 褐 轄 且 株 刈 乾 冠 寒 刊 勘 勧 巻 喚 堪 完 官 寛 干 幹 患 感 慣 憾 換 敢 棺 款 歓 汗 漢 環 甘 監 看 管 簡 緩 缶 肝 艦 観 貫 還 鑑 間 閑 関 陥 館 丸 含 岸 眼 岩 頑 顔 願';
  const japanese7 = '企 危 喜 器 基 奇 寄 岐 希 幾 忌 揮 机 旗 既 期 棋 棄 機 帰 気 汽 祈 季 紀 規 記 貴 起 軌 輝 飢 騎 鬼 偽 儀 宜 戯 技 擬 欺 犠 疑 義 議 菊 吉 喫 詰 却 客 脚 虐 逆 丘 久 休 及 吸 宮 弓 急 救 朽 求 泣 球 究 窮 級 糾 給 旧 牛 去 居 巨 拒 拠 挙 虚 許 距 漁 魚 享 京 供 競 共 凶 協 叫 境 峡 強 恐 恭 挟 教 橋 況 狂 狭 矯 胸 脅 興 郷 鏡 響 驚 仰 凝 暁 業 局 曲 極 玉 勤 均 斤 琴 禁 筋 緊 菌 襟 謹 近 金 吟 銀';
  const japanese8 = '九 句 区 苦 駆 具 愚 虞 空 偶 遇 隅 屈 掘 靴 繰 桑 勲 君 薫 訓 群 軍 郡';
  const japanese9 = '係 傾 刑 兄 啓 型 契 形 径 恵 慶 憩 掲 携 敬 景 渓 系 経 継 茎 蛍 計 警 軽 鶏 芸 迎 鯨 劇 撃 激 傑 欠 決 潔 穴 結 血 月 件 倹 健 兼 券 剣 圏 堅 嫌 建 憲 懸 検 権 犬 献 研 絹 県 肩 見 謙 賢 軒 遣 険 顕 験 元 原 厳 幻 弦 減 源 玄 現 言 限';
  const japanese10 = '個 古 呼 固 孤 己 庫 弧 戸 故 枯 湖 誇 雇 顧 鼓 五 互 午 呉 娯 後 御 悟 碁 語 誤 護 交 侯 候 光 公 功 効 厚 口 向 后 坑 好 孔 孝 工 巧 幸 広 康 恒 慌 抗 拘 控 攻 更 校 構 江 洪 港 溝 甲 皇 硬 稿 紅 絞 綱 耕 考 肯 航 荒 行 衡 講 貢 購 郊 酵 鉱 鋼 降 項 香 高 剛 号 合 拷 豪 克 刻 告 国 穀 酷 黒 獄 腰 骨 込 今 困 墾 婚 恨 懇 昆 根 混 紺 魂';
  const japanese11 = '佐 唆 左 差 査 砂 詐 鎖 座 債 催 再 最 妻 宰 彩 才 採 栽 歳 済 災 砕 祭 斎 細 菜 裁 載 際 剤 在 材 罪 財 坂 咲 崎 作 削 搾 昨 策 索 錯 桜 冊 刷 察 撮 擦 札 殺 雑 皿 三 傘 参 山 惨 散 桟 産 算 蚕 賛 酸 暫 残';
  const japanese12 = '仕 伺 使 刺 司 史 嗣 四 士 始 姉 姿 子 市 師 志 思 指 支 施 旨 枝 止 死 氏 祉 私 糸 紙 紫 肢 脂 至 視 詞 詩 試 誌 諮 資 賜 雌 飼 歯 事 似 侍 児 字 寺 慈 持 時 次 滋 治 璽 磁 示 耳 自 辞 式 識 軸 七 執 失 室 湿 漆 疾 質 実 芝 舎 写 射 捨 赦 斜 煮 社 者 謝 車 遮 蛇 邪 借 勺 尺 爵 酌 釈 若 寂 弱 主 取 守 手 朱 殊 狩 珠 種 趣 酒 首 儒 受 寿 授 樹 需 囚 収 周 宗 就 州 修 愁 拾 秀 秋 終 習 臭 舟 衆 襲 週 酬 集 醜 住 充 十 従 柔 汁 渋 獣 縦 重 銃 叔 宿 淑 祝 縮 粛 塾 熟 出 術 述 俊 春 瞬 准 循 旬 殉 準 潤 盾 純 巡 遵 順 処 初 所 暑 庶 緒 署 書 諸 助 叙 女 序 徐 除 傷 償 勝 匠 升 召 商 唱 奨 宵 将 小 少 尚 床 彰 承 抄 招 掌 昇 昭 晶 松 沼 消 渉 焼 焦 照 症 省 硝 礁 祥 称 章 笑 粧 紹 肖 衝 訟 証 詔 詳 象 賞 鐘 障 上 丈 乗 冗 剰 城 場 壌 嬢 常 情 条 浄 状 畳 蒸 譲 醸 錠 嘱 飾 植 殖 織 職 色 触 食 辱 伸 信 侵 唇 娠 寝 審 心 慎 振 新 森 浸 深 申 真 神 紳 臣 薪 親 診 身 辛 進 針 震 人 仁 刃 尋 甚 尽 迅 陣';
  const japanese13 = '酢 図 吹 垂 帥 推 水 炊 睡 粋 衰 遂 酔 錘 随 髄 崇 数 枢 据 杉 澄 寸';
  const japanese14 = '世 瀬 畝 是 制 勢 姓 征 性 成 政 整 星 晴 正 清 牲 生 盛 精 聖 声 製 西 誠 誓 請 逝 青 静 斉 税 隻 席 惜 斥 昔 析 石 積 籍 績 責 赤 跡 切 拙 接 摂 折 設 窃 節 説 雪 絶 舌 仙 先 千 占 宣 専 川 戦 扇 栓 泉 浅 洗 染 潜 旋 線 繊 船 薦 践 選 遷 銭 銑 鮮 前 善 漸 然 全 禅 繕';
  const japanese15 = '塑 措 疎 礎 祖 租 粗 素 組 訴 阻 僧 創 双 倉 喪 壮 奏 層 想 捜 掃 挿 操 早 曹 巣 槽 燥 争 相 窓 総 草 荘 葬 藻 装 走 送 遭 霜 騒 像 増 憎 臓 蔵 贈 造 促 側 則 即 息 束 測 足 速 俗 属 賊 族 続 卒 存 孫 尊 損 村';
  const japanese16 = '他 多 太 堕 妥 惰 打 駄 体 対 耐 帯 待 怠 態 替 泰 滞 胎 袋 貸 退 逮 隊 代 台 大 第 題 滝 卓 宅 択 拓 沢 濯 託 濁 諾 但 達 奪 脱 棚 谷 丹 単 嘆 担 探 淡 炭 短 端 胆 誕 鍛 団 壇 弾 断 暖 段 男 談';
  const japanese17 = '値 知 地 恥 池 痴 稚 置 致 遅 築 畜 竹 蓄 逐 秩 窒 茶 嫡 着 中 仲 宙 忠 抽 昼 柱 注 虫 衷 鋳 駐 著 貯 丁 兆 帳 庁 弔 張 彫 徴 懲 挑 朝 潮 町 眺 聴 脹 腸 調 超 跳 長 頂 鳥 勅 直 朕 沈 珍 賃 鎮 陳';
  const japanese18 = '津 墜 追 痛 通 塚 漬 坪 釣';
  const japanese19 = '亭 低 停 偵 貞 呈 堤 定 帝 底 庭 廷 弟 抵 提 程 締 艇 訂 逓 邸 泥 摘 敵 滴 的 笛 適 哲 徹 撤 迭 鉄 典 天 展 店 添 転 点 伝 殿 田 電';
  const japanese20 = '吐 塗 徒 斗 渡 登 途 都 努 度 土 奴 怒 倒 党 冬 凍 刀 唐 塔 島 悼 投 搭 東 桃 棟 盗 湯 灯 当 痘 等 答 筒 糖 統 到 討 謄 豆 踏 逃 透 陶 頭 騰 闘 働 動 同 堂 導 洞 童 胴 道 銅 峠 匿 得 徳 特 督 篤 毒 独 読 凸 突 届 屯 豚 曇 鈍';
  const japanese21 = '内 縄 南 軟 難';
  const japanese22 = '二 尼 弐 肉 日 乳 入 如 尿 任 妊 忍 認';
  const japanese23 = '寧 猫 熱 年 念 燃 粘';
  const japanese24 = '悩 濃 納 能 脳 農';
  const japanese25 = '把 覇 波 派 破 婆 馬 俳 廃 拝 排 敗 杯 背 肺 輩 配 倍 培 媒 梅 買 売 賠 陪 伯 博 拍 泊 白 舶 薄 迫 漠 爆 縛 麦 箱 肌 畑 八 鉢 発 髪 伐 罰 抜 閥 伴 判 半 反 帆 搬 板 版 犯 班 畔 繁 般 藩 販 範 煩 頒 飯 晩 番 盤 蛮';
  const japanese26 = '卑 否 妃 彼 悲 扉 批 披 比 泌 疲 皮 碑 秘 罷 肥 被 費 避 非 飛 備 尾 微 美 鼻 匹 必 筆 姫 百 俵 標 氷 漂 票 表 評 描 病 秒 苗 品 浜 貧 賓 頻 敏 瓶';
  const japanese27 = '不 付 夫 婦 富 布 府 怖 扶 敷 普 浮 父 符 腐 膚 譜 負 賦 赴 附 侮 武 舞 部 封 風 伏 副 復 幅 服 福 腹 複 覆 払 沸 仏 物 分 噴 墳 憤 奮 粉 紛 雰 文 聞';
  const japanese28 = '丙 併 兵 塀 幣 平 弊 柄 並 閉 陛 米 壁 癖 別 偏 変 片 編 辺 返 遍 便 勉 弁';
  const japanese29 = '保 舗 捕 歩 補 穂 募 墓 慕 暮 母 簿 倣 俸 包 報 奉 宝 峰 崩 抱 放 方 法 泡 砲 縫 胞 芳 褒 訪 豊 邦 飽 乏 亡 傍 剖 坊 妨 帽 忘 忙 房 暴 望 某 棒 冒 紡 肪 膨 謀 貿 防 北 僕 墨 撲 朴 牧 没 堀 奔 本 翻 凡 盆';
  const japanese30 = '摩 磨 魔 麻 埋 妹 枚 毎 幕 膜 又 抹 末 繭 万 慢 満 漫';
  const japanese31 = '味 未 魅 岬 密 脈 妙 民 眠';
  const japanese32 = '務 夢 無 矛 霧 婿 娘';
  const japanese33 = '名 命 明 盟 迷 銘 鳴 滅 免 綿 面';
  const japanese34 = '模 茂 妄 毛 猛 盲 網 耗 木 黙 目 戻 問 紋 門 匁';
  const japanese35 = '夜 野 矢 厄 役 約 薬 訳 躍 柳';
  const japanese36 = '愉 油 癒 諭 輸 唯 優 勇 友 幽 悠 憂 有 猶 由 裕 誘 遊 郵 雄 融 夕';
  const japanese37 = '予 余 与 誉 預 幼 容 庸 揚 揺 擁 曜 様 洋 溶 用 窯 羊 葉 要 謡 踊 陽 養 抑 欲 浴 翌 翼';
  const japanese38 = '羅 裸 来 頼 雷 絡 落 酪 乱 卵 欄 濫 覧';
  const japanese39 = '利 吏 履 理 痢 裏 里 離 陸 律 率 立 略 流 留 硫 粒 隆 竜 慮 旅 虜 了 僚 両 寮 料 涼 猟 療 糧 良 量 陵 領 力 緑 倫 厘 林 臨 輪 隣';
  const japanese40 = '塁 涙 累 類';
  const japanese41 = '令 例 冷 励 礼 鈴 隷 零 霊 麗 齢 暦 歴 列 劣 烈 裂 廉 恋 練 連 錬';
  const japanese42 = '炉 路 露 労 廊 朗 楼 浪 漏 老 郎 六 録 論';
  const japanese43 = '和 話 賄 惑 枠 湾 腕';
  
  const all = 
    generic.repeat(100)     +
    ukranian.repeat(3)      +
    japanese1  + japanese2  + japanese3  + japanese4  + japanese5  + japanese6  + japanese7  + japanese8  + japanese9  + japanese10
    japanese11 + japanese12 + japanese13 + japanese14 + japanese15 + japanese16 + japanese17 + japanese18 + japanese19 + japanese20 +
    japanese21 + japanese22 + japanese23 + japanese24 + japanese25 + japanese26 + japanese27 + japanese28 + japanese29 + japanese30 +
    japanese31 + japanese32 + japanese33 + japanese34 + japanese35 + japanese36 + japanese37 + japanese38 + japanese39 + japanese40 +
    japanese41 + japanese42 + japanese43;
  
  const symbols = all.split('');
  
  return random.pick(symbols);
}

let nextCharacter = 0;
const getPhrase = () => {

  const whitespace = '';
  const character_number_variation = characterDensity;
  const chance = random.chance(character_number_variation);
  if (chance === true) return whitespace;
  const sentence = phrase;
  const filler = ' ';
  const all = sentence + filler.repeat(50);
  const symbols = all.split('');

  if (nextCharacter >= symbols.length) {  // Preventing from going higher than the length
    nextCharacter = 0;
  }
  nextCharacter++;
  return symbols[nextCharacter-1];

}

function deploySymbols(context, properties) {
  const symbols = [];
  let symbol_cell = properties.width / properties.grid_size;
  for (let i = symbol_cell; i < properties.width - symbol_cell; i += symbol_cell) {
    for (let j = symbol_cell; j < properties.height - symbol_cell * 2; j += symbol_cell) { // "* 2" is needed to cut off the last horizontal line
      // x, y, width, height, color
      symbols.push(new Symbols(i, j, symbol_cell, symbol_cell, properties.symbol_color, properties.symbols_set));
    }
  }
  return {
    // Pass grid to draw
    initialize_symbols: symbols,
  }
}
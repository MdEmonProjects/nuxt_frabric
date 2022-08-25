var express = require('express');
const axios = require('axios');
const fabric = require('fabric').fabric; // or import { fabric } from 'fabric';
const fs = require('fs');
var router = express.Router();
var Canvas = require('canvas');

var fcanvas = new fabric.StaticCanvas(null, {
   width: 400,
   height: 400
});
var contextsss = fcanvas.getContext('2d')

function cropImageFromCanvas(ctx) {
   var canvas = ctx.canvas,
      w = canvas.width,
      h = canvas.height,
      pix = {
         x: [],
         y: []
      },
      imageData = ctx.getImageData(0, 0, canvas.width, canvas.height),
      x, y, index;

   for (y = 0; y < h; y++) {
      for (x = 0; x < w; x++) {
         index = (y * w + x) * 4;
         if (imageData.data[index + 3] > 0) {
            pix.x.push(x);
            pix.y.push(y);
         }
      }
   }
   pix.x.sort(function (a, b) {
      return a - b
   });
   pix.y.sort(function (a, b) {
      return a - b
   });
   var n = pix.x.length - 1;

   w = 1 + pix.x[n] - pix.x[0];
   h = 1 + pix.y[n] - pix.y[0];
   var cut = ctx.getImageData(pix.x[0], pix.y[0], w, h);

   canvas.width = w;
   canvas.height = h;
   ctx.putImageData(cut, 0, 0);

   var image = canvas.toDataURL();
   // console.log(image);
}

function trimCanvas(canvas) {
   const context = canvas.getContext('2d');

   const topLeft = {
      x: canvas.width,
      y: canvas.height,
      update(x, y) {
         this.x = Math.min(this.x, x);
         this.y = Math.min(this.y, y);
      }
   };

   const bottomRight = {
      x: 0,
      y: 0,
      update(x, y) {
         this.x = Math.max(this.x, x);
         this.y = Math.max(this.y, y);
      }
   };

   const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

   for (let x = 0; x < canvas.width; x++) {
      for (let y = 0; y < canvas.height; y++) {
         const alpha = imageData.data[((y * (canvas.width * 4)) + (x * 4)) + 3];
         if (alpha !== 0) {
            topLeft.update(x, y);
            bottomRight.update(x, y);
         }
      }
   }

   const width = bottomRight.x - topLeft.x;
   const height = bottomRight.y - topLeft.y;

   const croppedCanvas = context.getImageData(topLeft.x, topLeft.y, width, height);
   context.textBaseline = 'middle';
   context.textAlign = 'center';
   // console.log(canvas.toDataURL());
   canvas.width = width;
   canvas.height = height;
   context.putImageData(croppedCanvas, 50, 50);

   return canvas;
}
fabric.CurvedText = fabric.util.createClass(fabric.Object, {
   type: 'curved-text',
   diameter: 250,
   kerning: 0,
   text: '',
   flipped: false,
   fill: '#000',
   fontFamily: 'Lato',
   fontSize: 164, // in px
   fontWeight: 'normal',
   fontStyle: 'normal', // "normal", "italic" or "oblique".
   cacheProperties: fabric.Object.prototype.cacheProperties.concat('diameter', 'kerning', 'flipped', 'fill', 'fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'strokeStyle', 'strokeWidth'),
   strokeStyle: null,
   strokeWidth: 0,

   initialize: function (text, options) {
      options || (options = {});
      this.text = text;

      this.callSuper('initialize', options);
      this.set('lockUniScaling', true);

      // Draw curved text here initially too, while we need to know the width and height.
      var canvas = this.getCircularText();
      this._trimCanvas(canvas);
      this.set('width', canvas.width);
      this.set('height', canvas.height);
   },

   _getFontDeclaration: function () {
      return [
         // node-canvas needs "weight style", while browsers need "style weight"
         (fabric.isLikelyNode ? this.fontWeight : this.fontStyle),
         (fabric.isLikelyNode ? this.fontStyle : this.fontWeight),
         this.fontSize + 'px',
         (fabric.isLikelyNode ? ('"' + this.fontFamily + '"') : this.fontFamily)
      ].join(' ');
   },

   _trimCanvas: function (canvas) {
      var ctx = canvas.getContext('2d'),
         w = canvas.width,
         h = canvas.height,
         pix = {
            x: [],
            y: []
         },
         n,
         imageData = ctx.getImageData(0, 0, w, h),
         fn = function (a, b) {
            return a - b
         };

      for (var y = 0; y < h; y++) {
         for (var x = 0; x < w; x++) {
            if (imageData.data[((y * w + x) * 4) + 3] > 0) {
               // console.log(imageData.data[((y * w + x) * 4) + 3]);
               pix.x.push(x);
               pix.y.push(y);
            }
         }
      }
      pix.x.sort(fn);
      pix.y.sort(fn);
      n = pix.x.length - 1;

      w = pix.x[n] - pix.x[0];
      h = pix.y[n] - pix.y[0];
      // console.log(pix);
      // console.log("home");
      var cut = ctx.getImageData(pix.x[0], pix.y[0], w, h);

      canvas.width = w;
      canvas.height = h;
      ctx.putImageData(cut, 0, 0);
   },

   // Source: http://jsfiddle.net/rbdszxjv/
   getCircularText: function () {
      var text = this.text,
         diameter = this.diameter,
         flipped = this.flipped,
         kerning = this.kerning,
         fill = this.fill,
         inwardFacing = true,
         startAngle = 0,
         canvas = fabric.util.createCanvasElement(),
         ctx = canvas.getContext('2d'),
         cw, // character-width
         x, // iterator
         clockwise = -1; // draw clockwise for aligned right. Else Anticlockwise

      if (flipped) {
         // startAngle = 180;

         startAngle = 180;
         inwardFacing = false;
      }

      startAngle *= Math.PI / 180; // convert to radians

      // Calc heigt of text in selected font:
      // var d = document.createElement('div');
      // d.style.fontFamily = this.fontFamily;
      // d.style.whiteSpace = 'nowrap';
      // d.style.fontSize = this.fontSize + 'px';
      // d.style.fontWeight = this.fontWeight;
      // d.style.fontStyle = this.fontStyle;
      // d.textContent = text;
      // document.body.appendChild(d);
      var textHeight = 50;
      // document.body.removeChild(d);

      canvas.width = canvas.height = diameter;
      ctx.font = this._getFontDeclaration();

      // Reverse letters for center inward.
      if (inwardFacing) {
         text = text.split('').reverse().join('')
      };

      // Setup letters and positioning
      ctx.translate(diameter / 2, diameter / 2); // Move to center
      startAngle += (Math.PI * !inwardFacing); // Rotate 180 if outward
      ctx.textBaseline = 'middle'; // Ensure we draw in exact center
      ctx.textAlign = 'center'; // Ensure we draw in exact center

      // rotate 50% of total angle for center alignment

      for (x = 0; x < text.length; x++) {
         cw = ctx.measureText(text[x]).width;
         startAngle += ((cw + (x == text.length - 1 ? 0 : kerning)) / (diameter / 2 - textHeight)) / 2 * -clockwise;
      }

      // Phew... now rotate into final start position
      ctx.rotate(startAngle);

      // Now for the fun bit: draw, rotate, and repeat
      // ctx.fillText(text,-100,10);


      for (x = 0; x < text.length; x++) {
         cw = ctx.measureText(text[x]).width; // half letter
         // rotate half letter
         ctx.rotate((cw / 2) / (diameter / 2 - textHeight) * clockwise);
         // draw the character at "top" or "bottom"
         // depending on inward or outward facing

         // Stroke
         if (this.strokeStyle && this.strokeWidth) {
            ctx.strokeStyle = this.strokeStyle;
            ctx.lineWidth = this.strokeWidth;
            ctx.miterLimit = 2;
            ctx.strokeText(text[x], 0, (inwardFacing ? 1 : -1) * (0 - diameter / 2 + textHeight / 2));
         }

         // Actual text
         ctx.fillStyle = fill;
         ctx.fillText(text[x], 0, (inwardFacing ? 1 : -1) * (0 - diameter / 2 + textHeight / 2));

         ctx.rotate((cw / 2 + kerning) / (diameter / 2 - textHeight) * clockwise); // rotate half letter
      }

      return canvas;
   },

   _set: function (key, value) {
      switch (key) {
         case 'scaleX':
            this.fontSize *= value;
            this.diameter *= value;
            this.width *= value;
            this.scaleX = 1;
            if (this.width < 1) {
               this.width = 1;
            }
            break;

         case 'scaleY':
            this.height *= value;
            this.scaleY = 1;
            if (this.height < 1) {
               this.height = 1;
            }
            break;

         default:
            this.callSuper('_set', key, value);
            break;
      }
   },

   _render: function (ctx) {
      var canvas = this.getCircularText();
      this._trimCanvas(canvas);

      this.set('width', canvas.width);
      this.set('height', canvas.height);

      ctx.drawImage(canvas, -this.width / 2, -this.height / 2, this.width, this.height);
      this.setCoords();
      cropImageFromCanvas(ctx);
   },

   toObject: function (propertiesToInclude) {
      return this.callSuper('toObject', ['text', 'diameter', 'kerning', 'flipped', 'fill', 'fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'strokeStyle', 'strokeWidth'].concat(propertiesToInclude));
   }
});
fabric.CurvedText.fromObject = function (object, callback, forceAsync) {
   return fabric.Object._fromObject('CurvedText', object, callback, forceAsync, 'curved-text');
};

function editObject(text, fName, diameterVal = 120, colorCode = "#333", flipped = false) {
   fcanvas.clear();
   fcanvas.setWidth(400);
   fcanvas.setHeight(400);
   // console.log($('#diameter').val());
   // var text = "Emon hasan lorem ipsume dolor";
   // var fName = "Lato";
   var fSize = +"164px";
   // $('#diameter').val()
   // var diameter = +$('#diameter').val();
   var kerning = +0;
   // var flipped = false;
   // var obj = fcanvas.getActiveObject();

   var obj = new fabric.CurvedText(text, {
      diameter: diameterVal,
      fontSize: fSize,
      fontFamily: fName,
      kerning: kerning,
      flipped: flipped,
      left: 50,
      top: 50,
      status: "carve",
      fill: colorCode
   });

   fcanvas.add(obj);
   fcanvas.renderAll();


   // var out = fs.createWriteStream(__dirname + '/customfont.png');
   // var stream = fcanvas.createPNGStream();
   // stream.on('data', function (chunk) {
   //    out.write(chunk);
   // });

   return fcanvas.toDataURL();


}

function Addtext(ss = "No text set", font = "lato", colorCode = "#333") {

   fcanvas.add(new fabric.IText(ss, {
      left: 0,
      top: 0,
      fontFamily: font,
      fill: colorCode,
      fontSize: 40,
      status: "normal",
      cornerSize: 10,
   }));

   let getCanva = trimCanvas(fcanvas);

   return getCanva.toDataURL();
}

function renderBridgeText(iText = "Bridge Text", iTriangle = false, color = "#000000", fammily = "impact", curve = 70, offsetY = 4, textHeight = 100, bottom = 200) {
   const demo = Canvas.createCanvas(1400, 1400)
   let ctx = demo.getContext('2d');
   let font = '64px ' + fammily;
   let w = demo.width;
   let h = demo.height;
   let isTri = false;
   let dltY;
   let angleSteps = 180 / w;
   let i = w;
   let y;
   let os = Canvas.createCanvas(400, 400);
   let octx = os.getContext('2d');

   os.width = w;
   os.height = h;

   octx.font = font;
   octx.textBaseline = 'top';
   octx.textAlign = 'center';
   isTri = iTriangle;

   octx.clearRect(0, 0, w, h);
   ctx.clearRect(0, 0, w, h);
   octx.fillStyle = color;
   octx.fillText(iText.toUpperCase(), w * 0.5, 0);

   /// slide and dice
   i = w;
   dltY = curve / textHeight;
   y = 0;
   while (i--) {
      if (isTri) {
         y += dltY;
         if (i === (w * 0.5) | 0) dltY = -dltY;
      } else {
         y = bottom - curve * Math.sin(i * angleSteps * Math.PI / 180);
      }
      ctx.drawImage(os, i, 0, 1, textHeight,
         i, h * 0.5 - offsetY / textHeight * y, 1, y);
   }
   cropImageFromCanvas(ctx);
   // var dump = new Image();
   // dump.src = "https://swiperjs.com/demos/images/nature-4.jpg";
   // ctx.drawImage(dump,0,0);
   return demo.toDataURL("image/png").toString();
}
let str;

var text = new fabric.Text('GeeksforGeeks', {
   fill: 'green'
});
fcanvas.add(text);
fabric.Image.fromURL('http://fabricjs.com/assets/pug_small.jpg', function (myImg) {
   //i create an extra var for to change some image properties
   var img1 = myImg.set({
      left: 0,
      top: 0,
      width: 150,
      height: 150
   });
   fcanvas.add(img1);
   
   str = fcanvas.toDataURL("image/png").toString();
   fs.writeFile('test.txt', str, err => {
      if (err) {
        console.error(err)
        return
      }
      //file written successfully
   })
});


fabric.nodeCanvas.registerFont('text/Bakemono-Stereo-Extrabold-trial.ttf', {
   family: 'BakemonoStereotrial'
});
fabric.nodeCanvas.registerFont('text/built-titling-sb.ttf', {
   family: 'BuiltTitlingSb'
});
// =============================
fabric.nodeCanvas.registerFont('text/dDiam.ttf', {
   family: 'dDiam'
});
fabric.nodeCanvas.registerFont('text/dealerplate-california.ttf', {
   family: 'DealerplateCalifornia'
});
fabric.nodeCanvas.registerFont('text/Edensor-Free.otf', {
   family: 'EdensorFree'
});

fabric.nodeCanvas.registerFont('text/Future-Friends.ttf', {
   family: 'FutureFriends'
});

fabric.nodeCanvas.registerFont('text/LEMONMILK-BoldItalic.otf', {
   family: 'LEMONMILKBoldItalic'
});
fabric.nodeCanvas.registerFont('text/Lets-Coffee.ttf', {
   family: 'LetsCoffee'
});
fabric.nodeCanvas.registerFont('text/lottepaperfang.ttf', {
   family: 'lottepaperfang'
});
fabric.nodeCanvas.registerFont('text/MADE-Sunflower.otf', {
   family: 'MADESunflower'
});
// =======================

router.post('/api/', (req, res) => {
   contextsss.clearRect(0, 0, fcanvas.width, fcanvas.height);
   console.log(req.body);
   if (!req.body.textForegroundColor) {
      if (req.body.textShape == "foo") {
         let data = editObject(req.body.inputText, "MagicRetro", req.body.diameter, '#00000', req.body.flip)
         res.send(data);
      } else if (req.body.textShape == "foo-turn") {
         let data = editObject(req.body.inputText, "MagicRetro", req.body.diameter, '#000000', req.body.flip);
         res.send(data)

      } else if (req.body.textShape == "foo-2") {
         let data = editObject(req.body.inputText, "MagicRetro", req.body.diameter, '#000000', req.body.flip);
         res.send(data)
      } else if (req.body.textShape == "lineBtn") {
         // let data = Addtext(req.body.inputText, req.body.fontFamilyName);
         let data = renderBridgeText(req.body.inputText, false, "#000", req.body.fontFamilyName)
         res.send(data)
      } else if (req.body.textShape == "foo-3") {
         let data = renderBridgeText(req.body.inputText, false, "#000", req.body.fontFamilyName);
         res.send(data)
      } else if (req.body.textShape == "foo-perspective") {
         let data = renderBridgeText(req.body.inputText, true, "#000000", req.body.fontFamilyName, 200, 50, 85, 0);
         // console.log(data);
         res.send(data)
      } else if (req.body.textShape == "foo-vally") {
         let data = renderBridgeText(req.body.inputText, false, "#000000", req.body.fontFamilyName, 66, 51, 68, 200);
         res.send(data)
      } else if (req.body.textShape == "foo-pinch") {
         let data = renderBridgeText(req.body.inputText, false, "#000000", req.body.fontFamilyName, 66, 20, 65, 190);
         res.send(data)
      }
   } else if (req.body.textForegroundColor) {
      if (req.body.textShape == "foo") {
         let data = editObject(req.body.inputText, "MagicRetro", req.body.diameter, req.body.textForegroundColor, req.body.flip)
         res.send(data);
      } else if (req.body.textShape == "foo-turn") {
         let data = editObject(req.body.inputText, "MagicRetro", req.body.diameter, req.body.textForegroundColor, req.body.flip);
         res.send(data)

      } else if (req.body.textShape == "foo-2") {
         let data = editObject(req.body.inputText, "MagicRetro", req.body.diameter, req.body.textForegroundColor, req.body.flip);
         res.send(data)
      } else if (req.body.textShape == "lineBtn") {
         // let data = Addtext(req.body.inputText,req.body.fontFamilyName,req.body.textForegroundColor);
         let data = renderBridgeText(req.body.inputText, false, req.body.textForegroundColor, req.body.fontFamilyName)

         res.send(data)
      } else if (req.body.textShape == "foo-3") {
         let data = renderBridgeText(req.body.inputText, false, req.body.textForegroundColor, req.body.fontFamilyName);
         res.send(data)
      } else if (req.body.textShape == "foo-perspective") {
         let data = renderBridgeText(req.body.inputText, true, req.body.textForegroundColor, req.body.fontFamilyName, 200, 50, 85, 0);
         res.send(data)
      } else if (req.body.textShape == "foo-vally") {
         let data = renderBridgeText(req.body.inputText, false, req.body.textForegroundColor, req.body.fontFamilyName, 66, 51, 68, 200);
         res.send(data)
      } else if (req.body.textShape == "foo-pinch") {
         let data = renderBridgeText(req.body.inputText, false, req.body.textForegroundColor, req.body.fontFamilyName, 66, 20, 65, 190);
         res.send(data)
      }
   }



})
router.get('/api/', (req, res) => {
   res.send("doen");
})

module.exports = router;
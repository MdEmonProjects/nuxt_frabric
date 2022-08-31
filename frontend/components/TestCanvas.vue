<template>
    <div class="middle_section">
        <div class="row align-items-center">
            <div class="column mr-2">Text</div>
            <div class="column"><input type="text" id="text" class="mb-0 radius-10 border-3" value="Loremipsume"></div>
        </div>
        <div class="row align-items-center mt-3 mb-3">
            <div class="column mr-2">Font</div>
            <div class="column">
                <select name="kitchen_font" id="kitchen_font" class="w-100 p-2 mb-0">
                    <option v-for="font_family in font_familys" :value="font_family.value">{{ font_family.value }}
                    </option>
                </select>
            </div>
        </div>
        <div class="row align-items-center mb-3">
            <div class="column mr-2">Color</div>
            <div class="column">
                <button v-for="color in text_colors" :style='"background-color:" + color.color_code'
                    :data-color="color.color_code" :class='color.active && "active"' class="text-color mr-3"
                    v-on:click="handleNavClick"></button>
            </div>
        </div>
        <div class="row align-items-start mb-3 flex-fill flex-no-wrap">
            <div class="column mr-4">Shape</div>
            <div class="column">
                <div class="row align-items-center">
                    <button v-on:click="handleAllShapeClick" v-for="shape_image in shape_images" :id="shape_image.id"
                        :class="shape_image.active && 'active'" class="shape-btn mb-4">
                        <img v-bind:src="shape_image.image_path" class="img-fluid w-100">
                    </button>
                </div>

            </div>
        </div>
        <div class="row align-items-center mb-3">
            <div class="column mr-2 bg_image_text">Text Background Image</div>
            <div class="column">
                <button v-for="color in bg_shapes_image" :class='color.active && "active"' :data-imagename="color.image_path" class="text-bg-image mr-3"
                    v-on:click="handleNavClickForBG">
                        <img v-bind:src="color.image_path" :style='"pointer-events:none;"'>
                </button>
            </div>
        </div>

        <div class="noo_need">
            <div class="row">
                <div class="column">Diameter</div>
                <div class="column"><input type="range" id="diameter" min="100" max="1000" value="250" step="1"></div>
            </div>

            <div class="row">
                <div class="column">Font size</div>
                <div class="column"><input type="range" id="fontSize" min="8" max="100" value="24" step="1"></div>
            </div>

            <div class="row">
                <div class="column">Kerning</div>
                <div class="column"><input type="range" id="kerning" min="-10" max="10" value="0" step="1"></div>
            </div>

            <div class="row">
                <div class="column">Flip</div>
                <div class="column"><input type="checkbox" id="flip" value="1"></div>
            </div>

            <div class="row">
                <div class="column"><button class="button" type="button" id="newObject">Add to Canvas</button></div>
            </div>
        </div>

    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'TestCanvas',
    data: () => {
        return {

            font_familys: [
                { value: "BakemonoStereotrial" },
                { value: "BuiltTitlingSb" },
                { value: "dDiam" },
                { value: "DealerplateCalifornia" },
                { value: "EdensorFree" },
                { value: "FutureFriends" },
                { value: "LEMONMILKBoldItalic" },
                { value: "LetsCoffee" },
                { value: "LandpezGlich" },
                { value: "MADESunflower" },
            ],
            text_colors: [
                { color_code: "#F05900", active: null },
                { color_code: "#FEAF01", active: null },
                { color_code: "#F0F03E", active: null },
                { color_code: "#007243", active: null },
            ],
            shape_images: [
                { image_path: "normal.svg", id: "lineBtn", active: true },
                { image_path: "circle.svg", id: "foo-2", active: null },
                { image_path: "bridge.svg", id: "foo-3", active: null },
                { image_path: "roundup.svg", id: "foo", active: null },
                { image_path: "round.svg", id: "foo-turn", active: null },
                { image_path: "valley.svg", id: "foo-vally", active: null },
                { image_path: "pinch.svg", id: "foo-pinch", active: null },
                // { image_path: "bulge.svg", id: "foo-bulge", active: null },
                { image_path: "perspective.svg", id: "foo-perspective", active: null },
                // { image_path: "pointed.svg", id: "foo-pointed", active: null },
                // { image_path: "downward.svg", id: "foo-downward", active: null },
                // { image_path: "upward.svg", id: "foo-upword", active: null },
            ],
            bg_shapes_image: [
                { image_path: "FABRIC-TONES_03_small.png", active: null },
                { image_path: "FABRIC-TONES_01_small.png", active: null },
                { image_path: "FABRIC-TONES_26_small.png", active: null },
            ],
            


        }
    },
    methods: {
        handleNavClick(item) {
            // console.log(this.text_colors);

            document.querySelectorAll(".text-color").forEach((value, index) => {
                // value.active = false;
                value.classList.remove("active")
                // console.log(value.classList);
            })
            // item.classList.("active")
            // item.active = "active";
            item.srcElement.classList.add("active")
            // console.log(item.srcElement.classList);
        },
        handleNavClickForBG(item) {
            // console.log(this.text_colors);

            document.querySelectorAll(".text-bg-image").forEach((value, index) => {
                // value.active = false;
                value.classList.remove("active")
                // console.log(value.classList);
            })
            // item.classList.("active")
            // item.active = "active";
            item.srcElement.classList.add("active")
            // console.log(item.srcElement.classList);
        },
        handleAllShapeClick(item) {
            console.log(item);
            document.querySelectorAll(".shape-btn").forEach((value, index) => {
                // value.active = false;
                value.classList.remove("active")
                // console.log(value.classList);
            })
            // item.classList.("active")
            // item.active = "active";
            console.log(item.srcElement.classList);
            item.srcElement.classList.add("active")
        }

    },
    mounted: () => {

        fabric.Object.prototype.objectCaching = false;
        fabric.Object.prototype.transparentCorners = false;

        var fcanvas = new fabric.Canvas('canvas');
        fcanvas.setDimensions({width:150, height:150});

        
        async function addNewImage(url,scaleToWidth = 0.2,scaleToHeight = 0.2) {
            await fabric.Image.fromURL(url, function (oImg) {
                oImg.scaleToWidth(scaleToWidth);
                oImg.scaleToHeight(scaleToHeight);
                oImg.set({
                    'left': 20,
                });
                oImg.set({
                    'top': 20
                })
                
                fcanvas.add(oImg);
                
            });
            // if(bgImage){
            //     fcanvas.setBackgroundImage(bgImage, function() {
            //         fcanvas.renderAll();
            //     });
            // }
            
            await fcanvas.renderAll();
            // var dump = new Image();
            // dump.src = "https://swiperjs.com/demos/images/nature-4.jpg";
            // var ss_canvas = document.querySelector(".upper-canvas");
            // console.log(ss_canvas);
            // var ss_ctx = ss_canvas.getContext("2d");
            // ss_ctx.drawImage(dump,0,0); 
        }
        $('#red').on('click', async function () {
            let activeObj = fcanvas.getActiveObjects();
            console.log(activeObj);
            if (activeObj) {
                // activeObj.set({
                // 	text: $('#text').val(),})
                await fcanvas.getActiveObjects().forEach((obj) => {
                    obj.set({
                        selectionBackgroundColor: 'red'
                    })
                });
                fcanvas.renderAll()
            }
        })

        async function postReq(option) {
            console.log("home comming");
            let image = await axios.post('http://localhost:4000/api', option)
            await $("#add-to-canvas").prop('disabled', false)
            return image;
        }

        $("#add-to-canvas").on('click', async function () {
            let activeObj = fcanvas.getActiveObjects();
            //get text
            let inputText = await $("#text").val();
            $("#add-to-canvas").prop('disabled', true)
            //get active font family
            
            // console.log(fontFamilyName);

            // get text color
            let textForegroundColor = $(".text-color.active").attr("data-color");
            let textBackgroundImage = $(".text-bg-image.active").attr("data-imagename");
            console.log(textBackgroundImage);
            // get shape
            let textShape = $(".shape-btn.active").attr("id");
            console.log([inputText, fontFamilyName, textForegroundColor, textShape]);
            //get text background
            if (inputText == '') {
                alert("Plaease add some text");
            } else if (fontFamilyName = '') {
                alert("Plaease add font family");
            } 
            else {
                var fontFamilyName = await $("#kitchen_font").val();
                if (textShape == "lineBtn") {
                    let res = await postReq({textShape,inputText,fontFamilyName,textForegroundColor,textBackgroundImage});
                    setTimeout(()=>{
                       addNewImage(res.data,3,10);
                    },1000)
                } 
                else if (textShape == "foo") {
                    let res = await postReq({textShape,inputText,fontFamilyName,diameter: 200,flip: true,textForegroundColor,textBackgroundImage}) ;
                    setTimeout(()=>{
                       addNewImage(res.data,50,20);
                    },1000)
                } 
                else if (textShape == "foo-turn") {
                    let res = await postReq({textShape,inputText,fontFamilyName,diameter: 260,flip: false,textForegroundColor,textBackgroundImage}) 
                     setTimeout(()=>{
                       addNewImage(res.data,50,20);
                    },1000)
                } 
                else if (textShape == "foo-2") {
                    let res = await postReq({textShape,inputText,fontFamilyName,diameter: 120,flip: false,textForegroundColor,textBackgroundImage}) 
                     setTimeout(()=>{
                       addNewImage(res.data,50,50);
                    },1000)
                }
                else if (textShape == "foo-3") {
                    let res = await postReq({textShape,inputText,fontFamilyName,textForegroundColor,textBackgroundImage});
                    setTimeout(()=>{
                       addNewImage(res.data,3,10);
                    },1000)
                }
                else if (textShape == "foo-perspective") {
                    let res = await postReq({textShape,inputText,fontFamilyName,textForegroundColor,textBackgroundImage});
                    setTimeout(()=>{
                       addNewImage(res.data,3,10);
                    },1000)
                }
                else if (textShape == "foo-vally") {
                    let res = await postReq({textShape,inputText,fontFamilyName,textForegroundColor,textBackgroundImage});
                    setTimeout(()=>{
                       addNewImage(res.data,3,10);
                    },1000)
                }
                else if (textShape == "foo-pinch") {
                    let res = await postReq({textShape,inputText,fontFamilyName,textForegroundColor,textBackgroundImage});
                    setTimeout(()=>{
                       addNewImage(res.data,3,10);
                    },1000)
                }
                

            }
            /*else if (textForegroundColor) {
                var fontFamilyName = await $("#kitchen_font").val();
                if (textShape == "lineBtn") {
                    let res = await postReq({textShape,inputText,fontFamilyName,textForegroundColor});
                    setTimeout(()=>{
                       addNewImage(res.data,textBackgroundImage);
                    //    console.log(res.data);
                    },1000)
                } 
                else if (textShape == "foo") {
                    let res = await postReq({textShape,inputText,fontFamilyName,diameter: 200,flip: true,textForegroundColor}) ;
                    setTimeout(()=>{
                       addNewImage(res.data);
                    },1000)
                } 
                else if (textShape == "foo-turn") {
                    let res = await postReq({textShape,inputText,fontFamilyName,diameter: 260,flip: false,textForegroundColor}) 
                     setTimeout(()=>{
                       addNewImage(res.data);
                    },1000)
                } 
                else if (textShape == "foo-2") {
                    let res = await postReq({textShape,inputText,fontFamilyName,diameter: 120,flip: false,textForegroundColor}) 
                     setTimeout(()=>{
                       addNewImage(res.data);
                    },1000)
                }
                else if (textShape == "foo-3") {
                    let res = await postReq({textShape,inputText,fontFamilyName,textForegroundColor});
                    setTimeout(()=>{
                       addNewImage(res.data);
                    },1000)
                }
                else if (textShape == "foo-perspective") {
                    let res = await postReq({textShape,inputText,fontFamilyName,textForegroundColor});
                    setTimeout(()=>{
                       addNewImage(res.data);
                    },1000)
                }
                else if (textShape == "foo-vally") {
                    let res = await postReq({textShape,inputText,fontFamilyName,textForegroundColor});
                    setTimeout(()=>{
                       addNewImage(res.data);
                    },1000)
                }
                else if (textShape == "foo-pinch") {
                    let res = await postReq({textShape,inputText,fontFamilyName,textForegroundColor});
                    setTimeout(()=>{
                       addNewImage(res.data);
                    },1000)
                }
                

            }*/

        });
        /*$("#add-to-canvas").on('click', async function () {
            let activeObj = fcanvas.getActiveObjects();
            //get text
            let inputText = $("#text").val();
            //get active font family
            let fontFamilyName = $("#kitchen_font").val();

            // get text color
            let textForegroundColor = $(".text-color.active").attr("data-color");
            // get shape
            let textShape = $(".shape-btn.active").attr("id");
            console.log([inputText, fontFamilyName, textForegroundColor, textShape]);
            //get text background
            //.....
            if (inputText == '') {
                alert("Plaease add some text");
            } else if (fontFamilyName = '') {
                alert("Plaease add font family");


            } else if (textForegroundColor == undefined) {

                if (activeObj.length > 0) {
                    // console.log("I am from undifine");
                    activeObj.forEach(async (obj) => {
                        await fcanvas.remove(obj);
                    });
                }
                if (textShape == "lineBtn") {
                    await Addtext(inputText, fontFamilyName);
                }else if (textShape == "foo") {
                    $('#diameter').val(360);
                    $("#flip").prop("checked", true);
                    await editObject()

                } else if (textShape == "foo-turn") {
                    $('#diameter').val(360);
                    await editObject()

                } else if (textShape == "foo-2") {
                    $('#diameter').val(200);
                    await editObject(200)
                    fcanvas.discardActiveObject().renderAll()
                } else if (textShape == "foo-3") {
                    await renderBridgeText(inputText);
                    let uri_for_canva = await document.querySelector("#sub_canvas").toDataURL("image/png").toString();
                    await addNewImage(uri_for_canva);
                }
                else if (textShape == "foo-perspective") {
                    await renderBridgeText(inputText, false, "#000000", '', 200, 50, 85, 0);
                    let uri_for_canva = await document.querySelector("#sub_canvas").toDataURL("image/png").toString();
                    await addNewImage(uri_for_canva);
                }
                else if(textShape == "foo-vally"){
                    await renderBridgeText(inputText,false,"#000000","",66,51,68,200);
                    let uri_for_canva = await document.querySelector("#sub_canvas").toDataURL("image/png").toString();
                    await addNewImage(uri_for_canva);
                }
                else if(textShape == "foo-pinch"){
                    await renderBridgeText(inputText,false,"#000000","",66,20,65,190);
                    let uri_for_canva = await document.querySelector("#sub_canvas").toDataURL("image/png").toString();
                    await addNewImage(uri_for_canva);
                }
                //fcanvas.remove(obj);
            }
            else if (textForegroundColor) {

                if (activeObj.length > 0) {
                    // console.log("I am from undifine");
                    activeObj.forEach(async (obj) => {
                        await fcanvas.remove(obj);
                    });
                }
                if (textShape == "lineBtn") {
                    await Addtext(inputText, fontFamilyName,textForegroundColor);
                }else if (textShape == "foo") {
                    $('#diameter').val(360);
                    $("#flip").prop("checked", true);
                    await editObject(360,textForegroundColor);

                } else if (textShape == "foo-turn") {
                    $('#diameter').val(360);
                    await editObject(360, textForegroundColor);

                } else if (textShape == "foo-2") {
                    $('#diameter').val(200);
                    await editObject(200, textForegroundColor);
                    fcanvas.discardActiveObject().renderAll()
                } else if (textShape == "foo-3") {
                    await renderBridgeText(inputText, false, textForegroundColor);
                    let uri_for_canva = await document.querySelector("#sub_canvas").toDataURL("image/png").toString();
                    await addNewImage(uri_for_canva);
                }
                else if (textShape == "foo-perspective") {
                    await renderBridgeText(inputText, true, textForegroundColor, '', 91, 30, 64, 0);
                    let uri_for_canva = await document.querySelector("#sub_canvas").toDataURL("image/png").toString();
                    await addNewImage(uri_for_canva);
                }
                 else if(textShape == "foo-vally"){
                    await renderBridgeText(inputText,false,textForegroundColor,"",66,51,68,200);
                    let uri_for_canva = await document.querySelector("#sub_canvas").toDataURL("image/png").toString();
                    await addNewImage(uri_for_canva);
                }
                else if(textShape == "foo-pinch"){
                    await renderBridgeText(inputText,false,textForegroundColor,"",66,20,65,190);
                    let uri_for_canva = await document.querySelector("#sub_canvas").toDataURL("image/png").toString();
                    await addNewImage(uri_for_canva);
                }
                //fcanvas.remove(obj);
            }
        });*/

        function saveAs(uri, filename) {
            var link = document.createElement("a");
            if (typeof link.download === "string") {
                link.href = uri;
                link.download = filename;
                //Firefox requires the link to be in the body
                document.body.appendChild(link);
                //simulate click
                link.click();
                //remove the link when done
                document.body.removeChild(link);

            } else {
                window.open(uri);
            }
        }

        $("#download").on('click', async function () {
            $("#canvas").css("border", "0px");
            fabric.Object.prototype.hasControls = false;
            fabric.Object.prototype.hasBorders = false;
            fabric.Object.prototype.evented = false;
            fcanvas.renderAll()
            html2canvas(document.querySelector("#download-canvas")).then(canvas => {
                let finalImg = canvas.toDataURL("image/png").toString();
                saveAs(finalImg, "canvas-image")
                fabric.Object.prototype.hasControls = true;
                fabric.Object.prototype.hasBorders = true;
                fabric.Object.prototype.evented = true;
            });
            $("#canvas").css("border", "2px");

        });



    },
}
</script>

<template>
    <div class="left_section_parent pl-2">
        <div class="display_image" id="download-canvas">
            <img src="5V00L-front.png" name="image-swap" />
            <canvas id="canvas" width="300" height="300"></canvas>
        </div>
        
        


        <select name="kitchen_color" id="kitchen_color" v-on:change="setImage();">
            <!-- <option value="5V00L-front.png">Google</option>
            <option value="3600-front.png">Yandex</option>
            <option value="18000b-front.png">Mail</option> -->
            <option v-for="programme in image_name" :value="programme.value">{{ programme.innerText}}</option>
            <!-- <option v-for="image_nam in image_name ">{{image_nam}}</option> -->

        </select>

        <!-- product color section start -->
        <ul class="pl-0 mt-4 d-flex">
            <li v-for="product_color in product_background">
                <button v-bind:class='product_color.active && "active"' v-bind:style='"background-color:" + product_color.color_code'
                    v-bind:data-color="product_color.color_code" class="product-color mr-3"
                    v-on:click="handleProductColor"></button>
            </li>
            <!-- <li>
                <button class="btn btn-danger" v-on:click="changeImageColor()">red</button>
                <button class="btn btn-info" v-on:click="changeImageColor()">blue</button>
                <button class="btn btn-success" v-on:click="changeImageColor()">green</button>
            </li> -->
        </ul>
        <!-- product color section End -->
        
        <!-- v-model="blog.author" -->
        
    </div>


</template>
<script>
export default {
    name: 'Leftside',
    data: ()=>{
        return{
            
            image_name:[
                {value: "5V00L-front.png",innerText: "Class T-Shirt"},
                {value: "3600-front.png",innerText: "Class T-Shirt Two"},
                {value: "18000b-front.png",innerText: "T-Shirt three"}
            ],
            product_background: [
                { color_code: "#F05900", active: null },
                { color_code: "#FEAF01", active: null },
                { color_code: "#F0F03E", active: null },
                { color_code: "#007243", active: null },
            ],
            
            
        }
    },
    methods: {
        setImage: function (){
            // console.log("method");
            var image = document.getElementsByName("image-swap")[0];
            var selects = document.getElementById('kitchen_color');
           var option = selects.options[selects.selectedIndex];
           console.log(option.value);
            image.src = option.value;
        },
        handleProductColor: function(item){
             document.querySelectorAll(".product-color").forEach((value, index) => {
                // value.active = false;
                value.classList.remove("active")
                // console.log(value.classList);
            })
            // item.classList.("active")
            // item.active = "active";
            item.srcElement.classList.add("active");

             $("#download-canvas").css("background-color", $(item.target).attr("data-color"))
            console.log(item.target);

        }

    },
    
    mounted: ()=>{
        console.log("mounted");
    }

}
</script>

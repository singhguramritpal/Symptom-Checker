$(function(){

    /*global variables*/
    var scene, camera, renderer;
    var flag=0;
    var flag1=0;
    var flag2 = 0;
    var spotLight, hemi;
    var SCREEN_WIDTH = document.getElementById("webGL-container").offsetWidth;
    var SCREEN_HEIGHT = document.getElementById("webGL-container").offsetHeight;
    var loader;
    var axis1, axis, axis2;
    var starting_position;
    
    var mouse, raycaster;
    var objects = [];
    $(".popup").hide();
    function init(){
        /*creates empty scene object and renderer*/
        scene = new THREE.Scene();
        camera =  new THREE.PerspectiveCamera(27, SCREEN_WIDTH/SCREEN_HEIGHT, .1, 500);
        
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
       
        axis = new THREE.Vector3(1,0,0);
        axis1 = new THREE.Vector3(0,1,0);
        axis2 = new THREE.Vector3(1,0,0);
        
        renderer.setClearColor(0xffffff);
        renderer.shadowMapEnabled= true;
        renderer.shadowMapSoft = true;

        
        camera.position.x = 20;
        camera.position.y = 40;
        camera.position.z = 15;
        
        camera.lookAt(scene.position);


        hemi = new THREE.HemisphereLight(0xbbbbbb, 0x0099FF);
        scene.add(hemi);

        /*adds spot light with starting parameters*/
        spotLight = new THREE.SpotLight(0xffffff);
        spotLight.castShadow = true;
        spotLight.position.set (20, 100, 50);
        spotLight.intensity = 1;        
        spotLight.distance = 373;
        spotLight.angle = 1.6;
        spotLight.exponent = 38;
        spotLight.shadowCameraNear = 34;
        spotLight.shadowCameraFar = 2635;
        spotLight.shadowCameraFov = 68;
        spotLight.shadowCameraVisible = false;
        spotLight.shadowBias = 0.00;
        spotLight.shadowDarkness = 0.11;
        scene.add(spotLight);

        /*add loader call add model function*/
        var loader = new THREE.ObjectLoader();
        loader.load("https://pixels-health.herokuapp.com/male",function ( obj ) {
            
            scene.add( obj );

            $("#rotate").click(function(){
                
                obj.rotateOnAxis(axis1,Math.PI);
                if(flag == 0){
                    flag = 1;
                }
                else{
                    flag =0;
                }
            });
            
            obj.position.set( 1, -15, 0 )
            obj.rotation.x = -Math.PI/20
            obj.rotation.y = -Math.PI/1.4
            obj.rotation.z = -Math.PI/20
            obj.rotateOnAxis(axis,Math.PI/6);
            obj.rotateOnAxis(axis2,Math.PI/18);
            objects.push(obj);
            
        });

        $("#webGL-container").append(renderer.domElement);
    }

   
    $("#val1").on('change',function(){
        
        var value1 = $("#val1").val();
        if(flag2 == 1){
            flag2=0;
            objects[0].rotateOnAxis(axis1,-Math.PI/2);          
        }
        if(flag1==1){
            objects[0].rotateOnAxis(axis2,-Math.PI/2);
             flag1=0;
            
        }
        if(value1 == ""){
            if(flag==1){
                objects[0].rotateOnAxis(axis1,Math.PI);
                flag=0;
            }
            camera.position.x = 20;
            camera.position.y = 40;
            camera.position.z = 15;
            camera.updateProjectionMatrix ();
            $(".text" ).empty();
            $(".popup").hide();
            $("#possiblecondition" ).empty();
            $("#choices" ).empty();
            $(".list-group-item").remove();
        }
        else if(value1 == "Thigh"){
            if(flag==1){
                objects[0].rotateOnAxis(axis1,Math.PI);
                flag=0;
            }
            updateMe("Thigh");
            camera.position.x = 10;
            camera.position.y = 10;
            camera.position.z = 7;
            camera.updateProjectionMatrix ();
            $( ".text" ).empty();
            $( ".popup" ).append( "<div class='text'><p><strong id='data'>Thigh</strong></p></div>" );
            $(".popup").show();
            //var value = $("#data").html();
            //update(value);
        }
        else if(value1 == "Shin"){
            if(flag==1){
                objects[0].rotateOnAxis(axis1,Math.PI);
                flag=0;
            }
            updateMe("Shin")
            camera.position.x = 10;
            camera.position.y = 8;
            camera.position.z = 7;
            camera.updateProjectionMatrix ();
            $( ".text" ).empty();
            $( ".popup" ).css("top","40%");
            $( ".popup" ).css("left","30%");
            $( ".popup" ).append( "<div class='text'><p><strong>Shin</strong></p></div>" );
            $(".popup").show();
        }
        else if(value1 == "Foot"){
            if(flag==1){
                objects[0].rotateOnAxis(axis1,Math.PI);
                flag=0;
            }
            updateMe("Foot")
            camera.position.x = 10;
            camera.position.y = 2;
            camera.position.z = 7;
            camera.updateProjectionMatrix ();
            $( ".text" ).empty();
            $( ".popup" ).css("top","33%");
            $( ".popup" ).css("left","20%");
            $( ".popup" ).append( "<div class='text'><p><strong>Foot</strong></p></div>" );
            $(".popup").show();
        }
        else if(value1 == "Knee"){
            if(flag==1){
                objects[0].rotateOnAxis(axis1,Math.PI);
                flag=0;
            }
            updateMe("Knee")
            camera.position.x = 10;
            camera.position.y = 8;
            camera.position.z = 7;
            camera.updateProjectionMatrix ();
            $( ".text" ).empty();
            $( ".popup" ).css("top","28%");
            $( ".popup" ).css("left","20%");
            $( ".popup" ).append( "<div class='text'><p><strong>Knee</strong></p></div>" );
            $(".popup").show();
        }
        else if(value1 == "Hamstring"){
            if(flag==0){
                objects[0].rotateOnAxis(axis1,Math.PI);
                flag=1;
            }
            updateMe("Hamstring");
            camera.position.x = 10;
            camera.position.y = 8;
            camera.position.z = 7;
            camera.updateProjectionMatrix ();
            $( ".text" ).empty();
            $( ".popup" ).append( "<div class='text'><p><strong id='data'>Hamstring</strong></p></div>" );
            $(".popup").show();
        }
        
        else if(value1 == "Calf"){
            if(flag==0){
                objects[0].rotateOnAxis(axis1,Math.PI);
                flag=1;
            }
            updateMe("Calf")
            camera.position.x = 10;
            camera.position.y = 6;
            camera.position.z = 7;
            camera.updateProjectionMatrix ();
            $( ".text" ).empty();
            $( ".popup" ).css("top","35%");
            $( ".popup" ).css("left","20%");
            $( ".popup" ).append( "<div class='text'><p><strong>Calf</strong></p></div>" );
            $(".popup").show();
        }
        else if(value1 == "Back of knee"){
            if(flag==0){
                objects[0].rotateOnAxis(axis1,Math.PI);
                flag=1;
            }
            updateMe("Back of knee");
            camera.position.x = 10;
            camera.position.y = 6;
            camera.position.z = 7;
            camera.updateProjectionMatrix ();
            $( ".text" ).empty();
            $( ".popup" ).css("top","15%");
            $( ".popup" ).css("left","10%");
            $( ".popup" ).append( "<div class='text'><p><strong>Back of Knee</strong></p></div>" );
            $(".popup").show();

        }
        else if(value1 == "Toes"){
            if(flag==1){
                objects[0].rotateOnAxis(axis1,Math.PI);
                flag=0;
            }
            updateMe("Toes");
            camera.position.x = 10;
            camera.position.y = 6;
            camera.position.z = 7;
            camera.updateProjectionMatrix ();
            $( ".text" ).empty();
            $( ".popup" ).css("top","65%");
            $( ".popup" ).css("left","30%");
            $( ".popup" ).append( "<div class='text'><p><strong>Toes</strong></p></div>" );
            $(".popup").show();
        }
        
        else if(value1 == "Fingers"){
            updateMe("Fingers");
            camera.position.x = 20;
            camera.position.y = 29;
            camera.position.z = 4;
            camera.updateProjectionMatrix ();
            $( ".text" ).empty();
            $( ".popup" ).css("top","35%");
            $( ".popup" ).css("left","40%");
            $( ".popup" ).append( "<div class='text'><p><strong>Fingers</strong></p></div>" );
            $(".popup").show();
        }
        else if(value1 == "Palm"){
            objects[0].rotateOnAxis(axis2,Math.PI/2);
            flag1=1;
            updateMe("Palm");
            camera.position.x = 5;
            camera.position.y = -8;
            camera.position.z = -5;
            camera.updateProjectionMatrix ();
            $( ".text" ).empty();
            $( ".popup" ).css("top","40%");
            $( ".popup" ).css("left","44%");
            $( ".popup" ).append( "<div class='text'><p><strong>Palm</strong></p></div>" );
            $(".popup").show();
        }
        else if(value1 == "Wrist"){
            if(flag==1){
                objects[0].rotateOnAxis(axis1,Math.PI);
                flag=0;
            }
            updateMe("Wrist");
            camera.position.x = 15;
            camera.position.y = 20;
            camera.position.z = 4;
            camera.updateProjectionMatrix ();
            $( ".text" ).empty();       
            $( ".popup" ).css("top","20%");
            $( ".popup" ).css("left","50%");
            $( ".popup" ).append( "<div class='text'><p><strong>Wrist</strong></p></div>" );
            $(".popup").show();
        }
        else if(value1 == "Forearm"){
            if(flag==1){
                objects[0].rotateOnAxis(axis1,Math.PI);
                flag=0;
            }
            updateMe("Forearm");
            camera.position.x = 15;
            camera.position.y = 20;
            camera.position.z = 4;
            camera.updateProjectionMatrix ();
            $( ".text" ).empty();
            $( ".popup" ).css("top","8%");
            $( ".popup" ).css("left","42%");
            $( ".popup" ).append( "<div class='text'><p><strong>Forearm</strong></p></div>" );
            $(".popup").show();
        }
        
        else if(value1 == "Elbow"){
            if(flag==0){
                objects[0].rotateOnAxis(axis1,Math.PI);
                flag=1;
            }
            updateMe("Elbow");
            camera.position.x = 15;
            camera.position.y = 20;
            camera.position.z = 4;
            camera.updateProjectionMatrix ();
            $( ".text" ).empty();
            $( ".popup" ).css("top","8%");
            $( ".popup" ).css("left","42%");
            $( ".popup" ).append( "<div class='text'><p><strong>Elbow</strong></p></div>" );
            $(".popup").show();
        }
        else if(value1 == "Upper Arm"){
            
            if(flag==1){
                objects[0].rotateOnAxis(axis1,Math.PI);
                flag=0;
            }
            updateMe("Upper Arm");
            camera.position.x = 13;
            camera.position.y = 25;
            camera.position.z = 1;
            camera.updateProjectionMatrix ();
            $( ".text" ).empty();
            $( ".popup" ).css("top","35%");
            $( ".popup" ).css("left","30%");
            $( ".popup" ).append( "<div class='text'><p><strong>Upper arm</strong></p></div>" );
            $(".popup").show();
        }
        else if(value1 == "Armpit"){
            updateMe("Armpit");
            camera.position.x = 10;
            camera.position.y = 15;
            camera.position.z = 1;
            camera.updateProjectionMatrix ();
            $( ".text" ).empty();
            $( ".popup" ).css("top","35%");
            $( ".popup" ).css("left","30%");
            $( ".popup" ).append( "<div class='text'><p><strong>Armpit</strong></p></div>" );
            $(".popup").show();
        }
        else if(value1 == "Shoulder"){
            if(flag==1){
                objects[0].rotateOnAxis(axis1,Math.PI);
                flag=0;
            }
            updateMe("Shoulder");
            camera.position.x = 8;
            camera.position.y = 15;
            camera.position.z = 1;
            camera.updateProjectionMatrix ();
            $( ".text" ).empty();
            $( ".popup" ).css("top","15%");
            $( ".popup" ).css("left","20%");
            $( ".popup" ).append( "<div class='text'><p><strong>Shoulder</strong></p></div>" );
            $(".popup").show();
        }
        else if(value1 == "Hand"){
            if(flag==1){
                objects[0].rotateOnAxis(axis1,Math.PI);
                flag=0;
            }
            updateMe("Hand");
            camera.position.x = 15;
            camera.position.y = 25;
            camera.position.z = 1;
            camera.updateProjectionMatrix ();
            $( ".text" ).empty();
            $( ".popup" ).css("top","55%");
            $( ".popup" ).css("left","30%");
            $( ".popup" ).append( "<div class='text'><p><strong>Hand</strong></p></div>" );
            $(".popup").show();
        }
        else if(value1 == "Upper Abdomen"){
            if(flag==1){
                objects[0].rotateOnAxis(axis1,Math.PI);
                flag=0;
            }
            updateMe("Upper Abdomen");
            camera.position.x = 2;
            camera.position.y = 10;
            camera.position.z = 1;
            camera.updateProjectionMatrix ();
            $( ".text" ).empty();
            $( ".popup" ).css("top","55%");
            $( ".popup" ).css("left","30%");
            $( ".popup" ).append( "<div class='text'><p><strong>Upper Abdomen</strong></p></div>" );
            $(".popup").show();
        }
        else if(value1 == "Lower Abdomen"){
            if(flag==1){
                objects[0].rotateOnAxis(axis1,Math.PI);
                flag=0;
            }
            updateMe("Lower Abdomen");
            camera.position.x = 2;
            camera.position.y = 10;
            camera.position.z = 1;
            camera.updateProjectionMatrix ();
            $( ".text" ).empty();
            $( ".popup" ).css("top","75%");
            $( ".popup" ).css("left","30%");
            $( ".popup" ).append( "<div class='text'><p><strong>lower Abdomen</strong></p></div>" );
            $(".popup").show();
        }
        else if(value1 == "Back"){
            if(flag==0){
                objects[0].rotateOnAxis(axis1,Math.PI);
                flag=1;
            }
            updateMe("Back");
            camera.position.x = 2;
            camera.position.y = 10;
            camera.position.z = 1;
            camera.updateProjectionMatrix ();
            $( ".text" ).empty();
            $( ".popup" ).css({"top":"55%", "left":"30%", "width":"200px"});
            $( ".popup" ).append( "<div class='text'><p><strong>Back</strong></p></div>" );
            $(".popup").show();
        }
        else if(value1 == "Upper Spine"){
            if(flag==0){
                objects[0].rotateOnAxis(axis1,Math.PI);
                flag=1;
            }
            updateMe("Upper Spine");
            camera.position.x = 2;
            camera.position.y = 10;
            camera.position.z = 1;
            camera.updateProjectionMatrix ();
            $( ".text" ).empty();
            $( ".popup" ).css("top","30%");
            $( ".popup" ).css("left","40%");
            $( ".popup" ).append( "<div class='text'><p><strong>Upper Spine</strong></p></div>" );
            $(".popup").show();

        }
        else if(value1 == "Mouth"){
            if(flag==1){
                objects[0].rotateOnAxis(axis1,Math.PI);
                flag=0;
            }
            updateMe("Mouth");
            camera.position.x = -3;
            camera.position.y = 6;
            camera.position.z = -3;
            camera.updateProjectionMatrix ();
            $( ".text" ).empty();
            $( ".popup" ).css("top","60%");
            $( ".popup" ).css("left","50%");
            $( ".popup" ).append( "<div class='text'><p><strong>Mouth</strong></p></div>" );
            $(".popup").show();

        }
        else if(value1 == "Nose"){
            if(flag==1){
                objects[0].rotateOnAxis(axis1,Math.PI);
                flag=0;
            }
            updateMe("Nose");
            camera.position.x = -3;
            camera.position.y = 6;
            camera.position.z = -3;
            camera.updateProjectionMatrix ();
            $( ".text" ).empty();
            $( ".popup" ).css("top","30%");
            $( ".popup" ).css("left","43%");
            $( ".popup" ).append( "<div class='text'><p><strong>Nose</strong></p></div>" );
            $(".popup").show();

        }
        else if(value1 == "Ears"){
            flag2 = 1;
            objects[0].rotateOnAxis(axis1,Math.PI/2);

            updateMe("Ears");
            camera.position.x = -3;
            camera.position.y = 6;
            camera.position.z = -3;
            camera.updateProjectionMatrix ();
            $( ".text" ).empty();
            $( ".popup" ).css("top","30%");
            $( ".popup" ).css("left","30%");
            $( ".popup" ).append( "<div class='text'><p><strong>Ears</strong></p></div>" );
            $(".popup").show();

        }
        else if(value1 == "Cheeks"){
            flag2 = 1;
            objects[0].rotateOnAxis(axis1,Math.PI/2);

            updateMe("Cheeks");
            camera.position.x = -3;
            camera.position.y = 6;
            camera.position.z = -3;
            camera.updateProjectionMatrix ();
            $( ".text" ).empty();
            $( ".popup" ).css("top","50%");
            $( ".popup" ).css("left","40%");
            $( ".popup" ).append( "<div class='text'><p><strong>Cheeks</strong></p></div>" );
            $(".popup").show();

        }
        
        else if(value1 == "Eye"){
            if(flag==1){
                objects[0].rotateOnAxis(axis1,Math.PI);
                flag=0;
            }
            updateMe("Eye");
            camera.position.x = -3;
            camera.position.y = 6;
            camera.position.z = -3;
            camera.updateProjectionMatrix ();
            $( ".text" ).empty();
            $( ".popup" ).css("top","37%");
            $( ".popup" ).css("left","35%");
            $( ".popup" ).append( "<div class='text'><p><strong>Eyes</strong></p></div>" );
            $(".popup").show();

        }
        else if(value1 == "Front Neck"){
            if(flag==1){
                objects[0].rotateOnAxis(axis1,Math.PI);
                flag=0;
            }
            updateMe("Neck Front");
            camera.position.x = -3;
            camera.position.y = 3;
            camera.position.z = -3;
            camera.updateProjectionMatrix ();
            $( ".text" ).empty();
            $( ".popup" ).css("top","37%");
            $( ".popup" ).css("left","35%");
            $( ".popup" ).append( "<div class='text'><p><strong>Front Neck</strong></p></div>" );
            $(".popup").show();

        }
        else if(value1 == "Back Neck"){
            if(flag==0){
                objects[0].rotateOnAxis(axis1,Math.PI);
                flag=1;
            }
            updateMe("Neck Back");
            camera.position.x = -3;
            camera.position.y = 5;
            camera.position.z = -3;
            camera.updateProjectionMatrix ();
            $( ".text" ).empty();
            $( ".popup" ).css("top","50%");
            $( ".popup" ).css("left","30%");
            $( ".popup" ).append( "<div class='text'><p><strong>Back Neck</strong></p></div>" );
            $(".popup").show();

        }

    });    
    

    function animate(){
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    init();
    animate();

    $(window).resize(function(){
        SCREEN_WIDTH = document.getElementById("webGL-container").offsetWidth;
        SCREEN_HEIGHT = document.getElementById("webGL-container").offsetHeight;
        camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
        camera.updateProjectionMatrix();
        renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
    });
    
});

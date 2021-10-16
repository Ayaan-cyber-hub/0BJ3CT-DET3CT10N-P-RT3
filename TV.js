img = "";
status = "";
objects = [];

function preload(){
    img = loadImage('TV.jpg')
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw() {
    image(img, 0 , 0 , 380, 380);
    
     if(status != "")
     { 
         r = random(255);
         g = random(255);
         b = random(255);
         objectDetector.detect(img, gotResults);
         for (i = 0; i < objects.length; i++){

            document.getElementById("status").innerHTML = "Status : Objects Detected";

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y);
            nofill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

         }
     }
}

function modelLoaded() {
    console.log("modelLoaded");
    status = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results){
    if (error) {
        console.log(error);
    }
    console.log(results);
    object = results;
}
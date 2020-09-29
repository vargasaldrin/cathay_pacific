var checker = false,
    images,
    frameCount,
    ctaTxtArray,
    ctaBtnArray,
    fadeInTime = 2500,
    loop = 1;
    loadedImage = 0;

var startTime;

//Check the status of the richload
var checkRL = function () {
    if (myFT.richloadsLoaded) {
        clearInterval(startTime);
        instantInit(); //once the rl was loaded call the instantInit
    }
}

//Check the status of the instant ads
var checkIA = function () {
    if (myFT.instantAdsLoaded && myFT.richloadsLoaded) {
        clearInterval(startTime);
        textConstructor(); // once both the IA and RL were initialize, call the feedInitialize
    }
}

//initially load the rl
function ftInit() {
    myFT.on("richload", function (e) {
        startTime = setInterval(checkRL, 500);
    });
}

//this will load the instantads
function instantInit() {
    myFT.on("instantads", function (e) {
        startTime = setInterval(checkIA, 500);
    });
}

function textConstructor() {
    headlineArray = [
        myFT.instantAds.F1_headline_txt,
        myFT.instantAds.F2_headline_txt,
        myFT.instantAds.F3_headline_txt
    ]

    styleArray = [
        myFT.instantAds.F1_headlineTxt_size_hex,
        myFT.instantAds.F2_headlineTxt_size_hex,
        myFT.instantAds.F3_headlineTxt_size_hex
    ]

    var newHeadline = document.createElement("div");
    var textSizeHex = styleArray[0].split("|");
    newHeadline.style.fontSize = textSizeHex[0] + "px";
    newHeadline.style.color = textSizeHex[1];
    newHeadline.style.lineHeight = (parseInt(textSizeHex[0]) + 5) + "px";
    newHeadline.className = "headlines";
    newHeadline.style.opacity = "1";
    newHeadline.id = "F1_headline";
    var headlineParts = headlineArray[0].split("|");
    var frameOneHeadline = document.createElement("span");
    frameOneHeadline.innerHTML = headlineParts[0];
    newHeadline.appendChild(frameOneHeadline);
    headline.appendChild(newHeadline);
    for(var j = 1; j < headlineParts.length; j++){
        var inlineHead = document.createElement("span");
        inlineHead.classList.add("hide");
        inlineHead.classList.add("transitionOne");
        inlineHead.innerHTML = headlineParts[j];
        F1_headline.appendChild(inlineHead);
    };
    F1_headline.className = "headlines transitionOne";
    headline.appendChild(F1_headline);

    var ctaTxt = document.createElement("div");
    ctaTxt.style.paddingLeft = "2px";
    ctaTxt.innerHTML = myFT.instantAds.cta_txt
    cta.appendChild(ctaTxt);
    preload();
}

function preload() {
    images = new Array(
        myFT.instantAds.F1_background_img,
        myFT.instantAds.F2_background_img,
        myFT.instantAds.F3_background_img,
        myFT.instantAds.logo_img
    );

    for (var i = 0; i < images.length; i++) {
        imageObj = new Image();
        imageObj.src = images[i];
        imageObj.addEventListener("load", iLoad, false);
    }
    console.log('Entering preload');
}

function iLoad() {
    loadedImage++;
    if (images.length == loadedImage) {
        F1_image.src = images[0];
        F2_image.src = images[1];
        F3_image.src = images[2];
        logoImage.src = images[3];
        init();
    }
}

function init() {
    bgColor.style.backgroundColor = myFT.instantAds.background_hex;
    bird_cover.style.backgroundColor = myFT.instantAds.background_hex;

    ctaTxtArray = myFT.instantAds.ctaTxT_size_hex_hexHov.split("|");
    cta.style.fontSize = ctaTxtArray[0] + "px";
    cta.style.color = ctaTxtArray[1];
    ctaBtnArray = myFT.instantAds.ctaBtn_hex_hexHov.split("|");
    cta.style.backgroundColor = ctaBtnArray[0];

    brushwingGradient();
    document.addEventListener("mouseover", function(){
        cta.style.color = ctaTxtArray[2];
        cta.style.backgroundColor = ctaBtnArray[1];
    });
    document.addEventListener("mouseout", function(){
        cta.style.color = ctaTxtArray[1];
        cta.style.backgroundColor = ctaBtnArray[0];
    });

    textSetup(1);
    textSetup(2);

    exit.addEventListener('click', onBtnClick)
    main.style.visibility = "visible";
    startFrameOne();
}

function textSetup(x){
    var newHeadline = document.createElement("div");
    var textSizeHex = styleArray[x].split("|");
    newHeadline.style.fontSize = textSizeHex[0] + "px";
    newHeadline.style.color = textSizeHex[1];
    newHeadline.style.lineHeight = (parseInt(textSizeHex[0]) + 5) + "px";
    newHeadline.className = "headlines transitionOne";
    newHeadline.id = "F" + (x + 1) + "_headline";
    var headlineParts = headlineArray[x].split("|");
    for(var j = 0; j < headlineParts.length; j++){
        var inlineHead = document.createElement("span");
        inlineHead.classList.add("hide");
        inlineHead.classList.add("transitionOne");
        inlineHead.innerHTML = headlineParts[j];
        newHeadline.appendChild(inlineHead);
    };
    headline.appendChild(newHeadline);
};


function brushwingGradient(){
    var brushwingArray = myFT.instantAds.brushwingTrail_hex1_hex2_opacity.split("|");
    gradientOne.style.stopColor = brushwingArray[0];
    gradientOne.style.stopOpacity = brushwingArray[2];
    gradientTwo.style.stopColor = brushwingArray[1];
    gradientTwo.style.stopOpacity = brushwingArray[2];
}

function startFrameOne(){
    F1_image.classList.add("transitionOne");
    F1_image.style.opacity = "1";
    F1_image.style.transform = "scale(1)";
    var timeout = 1.5/F1_headline.childNodes.length;
    var opacityTime = 1/F1_headline.childNodes.length;
    for(var i = 1; i < F1_headline.childNodes.length; i++){
        var target = F1_headline.childNodes[i];
        target.style.transition = "opacity " + opacityTime + "s linear " + ((timeout * i) + 0.2) + "s";
        target.style.opacity = "1";
    }
    
    setTimeout(function(){
        F1_headline.style.opacity = "0";
    }, 2500);

    if(myFT.instantAds.F2_headline_txt == "" || myFT.instantAds.F2_background_img.indexOf('blank.png') !== -1){
        setTimeout(startFrameThree, 3000);
    } else { 
        setTimeout(startFrameTwo, 3000);
    }
}

function startFrameTwo(){
    F2_headline.style.opacity = "1";
    F2_image.classList.add("transitionOne");
    F2_image.style.opacity = "1";
    F2_image.style.transform = "scale(1.0)";

    var timeout = 1.5/F2_headline.childNodes.length;
    var opacityTime = 1/F2_headline.childNodes.length;

    for(var i = 0; i < F2_headline.childNodes.length; i++){
        var target = F2_headline.childNodes[i];
        target.style.transition = "opacity " + opacityTime + "s linear " + ((timeout * i) + 0.2) + "s";
        target.style.opacity = "1";
    }

    setTimeout(function(){
        F2_headline.style.opacity = "0";
    }, 2500);
    setTimeout(startFrameThree, 3000);
};

function startFrameThree(){
    setTimeout(function(){
        F3_headline.style.opacity = "1";
    }, 200);
    F3_image.classList.add("transitionOne");
    F3_image.style.opacity = "1";
    F3_image.style.transform = "scale(1.0)";

    var timeout = 1.5/F3_headline.childNodes.length + 0.2;
    var opacityTime = 1/F3_headline.childNodes.length;

    for(var i = 0; i < F3_headline.childNodes.length; i++){
        var target = F3_headline.childNodes[i];
        target.style.transition = "opacity " + opacityTime + "s linear " + ((timeout * i) + 0.2) + "s";
        target.style.opacity = "1";
    }

    var ctaTime = ((timeout * F3_headline.childNodes.length)+ 0.2) * 1000;
    Adjust_Brushwing.style.transform = "translate(130px, -42px)";
    setTimeout(function(){
        cta.style.opacity = "1";
    }, ctaTime);
    setTimeout(function(){
        bird_cover.style.transform = "translateY(-43px)";
    }, 3000)

};

//set the click on items
function onBtnClick(e) {
    myFT.clickTag(1, myFT.instantAds.clickTag1_url);
};

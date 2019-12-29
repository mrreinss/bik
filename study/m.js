var D15 = [];
D15.push({name:'10B', value:'rgb(140,164,178)'});
D15.push({name:'5B', value:'rgb(80,129,142)'});
D15.push({name:'10BG', value:'rgb(75,130,135)'});
D15.push({name:'5BG', value:'rgb(124,169,163)'});
D15.push({name:'10G', value:'rgb(79,132,117)'});
D15.push({name:'5G', value:'rgb(84,131,109)'});
D15.push({name:'10GY', value:'rgb(141,168,137)'});
D15.push({name:'5GY', value:'rgb(114,127,80)'});
D15.push({name:'5Y', value:'rgb(136,121,72)'});
D15.push({name:'10YR', value:'rgb(180,157,126)'});
D15.push({name:'2.5YR', value:'rgb(154,112,94)'});
D15.push({name:'7.5R', value:'rgb(155,110,104)'});
D15.push({name:'2.5R', value:'rgb(184,153,153)'});
D15.push({name:'5RP', value:'rgb(149,111,124)'});
D15.push({name:'10P', value:'rgb(142,113,134)'});
D15.push({name:'5P', value:'rgb(167,156,175)'});

var order = [];
order.push([0, 4, 9]);
order.push([5, 13, 9]);
order.push([11, 6, 9]);
order.push([10, 13, 15]);
order.push([2, 15, 4]);
order.push([11, 7, 0]);
order.push([15, 10, 6]);
order.push([5, 14, 9]);
order.push([14, 10, 2]);
order.push([14, 4, 1]);
order.push([13, 10, 7]);
order.push([9, 15, 12]);
order.push([15, 8, 3]);
order.push([7, 9, 8]);
order.push([2, 10, 6]);
order.push([6, 14, 10]);
order.push([2, 15, 12]);
order.push([8, 7, 6]);
order.push([1, 5, 9]);
order.push([12, 0, 5]);
order.push([9, 10, 11]);
order.push([15, 0, 1]);
order.push([0, 3, 13]);
order.push([1, 11, 14]);
order.push([11, 13, 12]);
order.push([6, 9, 3]);
order.push([1, 5, 13]);
order.push([15, 7, 3]);
order.push([1, 7, 4]);
order.push([1, 8, 12]);
order.push([4, 5, 3]);
order.push([3, 11, 15]);
order.push([7, 10, 12]);
order.push([10, 7, 4]);
order.push([0, 10, 13]);
order.push([14, 2, 7]);
order.push([0, 8, 12]);
order.push([12, 11, 10]);
order.push([0, 6, 3]);
order.push([8, 13, 4]);
order.push([8, 6, 3]);
order.push([11, 4, 15]);
order.push([6, 5, 4]);
order.push([0, 3, 5]);
order.push([5, 10, 8]);
order.push([8, 11, 13]);
order.push([0, 14, 15]);
order.push([15, 2, 5]);
order.push([3, 7, 12]);
order.push([2, 9, 13]);
order.push([7, 3, 11]);
order.push([13, 12, 14]);
order.push([11, 8, 14]);
order.push([0, 11, 14]);
order.push([4, 8, 12]);
order.push([10, 14, 3]);
order.push([2, 11, 6]);
order.push([5, 11, 8]);
order.push([1, 3, 2]);
order.push([1, 15, 12]);
order.push([12, 6, 9]);
order.push([12, 4, 0]);
order.push([14, 3, 1]);
order.push([8, 0, 4]);
order.push([2, 0, 1]);
order.push([7, 9, 4]);
order.push([7, 6, 5]);
order.push([7, 11, 15]);
order.push([5, 2, 7]);
order.push([1, 5, 10]);
order.push([8, 2, 5]);
order.push([6, 1, 13]);
order.push([6, 14, 2]);
order.push([9, 1, 13]);
order.push([2, 13, 0]);


var area1 = document.getElementById('area1');
var area2 = document.getElementById('area2');
var area3 = document.getElementById('area3');
Array.from(document.getElementsByTagName('a')).forEach(element => {
    element.addEventListener("click", function(e) { selectColor(e, element)}, false);
});
document.getElementById('begin').addEventListener('click', beginSurvey, false);
var currentPos = document.getElementById('current-pos');
var currentSelection = new Array(75 + 1).join( '0' );
var inputSelection = getParameterByName('selection');
if (inputSelection)
    currentSelection = inputSelection;

var user = getParameterByName('userId');
if (!user)
    user = uuidv4();

var gender = getParameterByName('gender');    

if (inputSelection && user && gender)
    beginSurvey();

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

function selectColor(e, element)
{
    e.preventDefault();
    var pos = currentSelection.indexOf('0');
    if (pos !== -1 ){                
        currentSelection = setCharAt(currentSelection, pos, element.getAttribute('data-item'));            
        window.history.replaceState('', '', updateURLParameter(window.location.href, "selection", currentSelection));                
        if (pos < order.length - 1){
            //if (pos % 5 === 0)
            //   writeData(user, currentSelection, gender)
            setColors(pos + 1);
            currentPos.innerHTML = `${pos + 2}/75`;
        }
        else{
            //writeData(user, currentSelection, gender)
            document.getElementById('background').remove();
            document.getElementById('message').innerHTML = 'Paldies par veltīto laiku!';
        }
    }
    else{
        document.getElementById('background').remove();
        document.getElementById('message').innerHTML = 'Index out of range';
    }
    // console.log(currentSelection, pos);
}      

function updateURLParameter(url, param, paramVal){
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";
    if (additionalURL) {
        tempArray = additionalURL.split("&");
        for (var i=0; i<tempArray.length; i++){
            if(tempArray[i].split('=')[0] != param){
                newAdditionalURL += temp + tempArray[i];
                temp = "&";
            }
        }
    }

    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function setCharAt(str,index,chr) 
{
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

function setColors(pos){
    var d1 = order[pos][0]
    var d2 = order[pos][1]
    var d3 = order[pos][2]; 
    area1.setAttribute('style', 'background-color:' + D15[d1].value + ';');
    area2.setAttribute('style', 'background-color:' + D15[d2].value + ';');
    area3.setAttribute('style', 'background-color:' + D15[d3].value + ';');
}

//var database = firebase.database();
//firebase.auth().signInAnonymously().catch(function(error) {
//    // Handle Errors here.
//    var errorCode = error.code;
//    var errorMessage = error.message;
//    // ...
//  });

function writeData(userId, selection, gender) {
 //   firebase.database().ref('survey/' + userId).set({
 //     userId: userId,
 //     selection: selection,
 //     gender : gender
 //   });
  }

function beginSurvey(){
    var tgender = document.getElementById('gender');
    if(tgender.selectedIndex !== 0 || gender) {
        if (!gender){
            gender = tgender.value
            window.history.replaceState('', '', updateURLParameter(window.location.href, "gender", gender));                
        }
        document.getElementById('intro').setAttribute('style', 'display: none;');
        document.getElementById('message').setAttribute('style', 'display: block;');
        document.getElementById('background').setAttribute('style', 'display: block;');
        window.history.replaceState('', '', updateURLParameter(window.location.href, "userId", user));                
        setColors(currentSelection.indexOf('0'));
    }
    else{
        document.getElementById('gender-warning').setAttribute('style', 'display: block;');
    }
    
}

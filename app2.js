var options = document.getElementById("people");
var theImportantT2DURL="https://script.google.com/macros/s/AKfycbxo8kjD4-TU-BiJWqXNRkXMdTC-O9H7SmzEZWw5RY7FFdGvQX2Sj7e_ta_JFqEmeGca/exec";
var url =
  "https://script.google.com/macros/s/AKfycbxDcej67zrhC5zOxbGN76qFBZc3AWbP4UUhexUqPRnzN79Lb5ZmTl5PMgYNFihoXXl3Kg/exec";
var newPerson = {};
var selectedPerson = {};
var allPeople = [];
var rowCount = 2;
var size = 0;
var personOption;
var allChains = [];
var newChain = {};
var currChain = {};
var descLines=[];
var linesInFive=[];
var linesInFullVideo=[];
var linesInPrepareTalk=[];
var linesInExplainChain=[];
var linesInShort=[];
var linesInSound=[];
var linesInPlaylistFive=[];
var linesInPlaylistFull=[];
var linesInLivePost=[];
var chainDataURL =
  "https://script.google.com/macros/s/AKfycbz7IgSM1Rhei0PPSgEHwxD_YHtyevYhZt32Mje9asUeGE20_J8a59XYw0xNFJMxjDKXKA/exec";
getDescData();
getChainData();
getData();
function getDescData(){
    fetch(theImportantT2DURL)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
         json.data.forEach((ele) => {         
             descLines.push(ele.lineindescription);
             linesInFive.push(ele.five);
             linesInFullVideo.push(ele.fullvideo);
             linesInPrepareTalk.push(ele.preparetalk);
             linesInExplainChain.push(ele.explainchain);
             linesInShort.push(ele.short);
             linesInSound.push(ele.sound);
             linesInPlaylistFive.push(ele.playlistfive);
             linesInPlaylistFull.push(ele.playlistfull);
             linesInLivePost.push(ele.livepost);
         })
       
    })
    
}
function getData() {
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      json.data.forEach((ele) => {
        newPerson = {
          name: ele.name,
          interviewerName: ele.interviewername,
          chain: ele.chain,
          topicOfStory: ele.topicofstory,
          subtitle: ele.subtitle,
          order: ele.order,
          fullVideo: ele.linkfull,
          fiveVideo: ele.linkfive,
          date: "",
          explainVideo: ele.linkexplain,
          prepTalk: ele.preptalk,
          aboutTheGuest: ele.abouttheguest,
          facebook: ele.facebook,
          instagram: ele.instagram,
          tiktok: ele.tiktok,
          sites: ele.othersites + " " + ele.moreothersites,
          row: rowCount,
        };

        if (ele.fixedname !== "") newPerson.name = ele.fixedname;
        if (ele.fixedinterviewername !== "")
          newPerson.interviewerName = ele.fixedinterviewername;
        if (newPerson.chain === "") {
          if (ele.chaintwo !== "") newPerson.chain = ele.chaintwo;
          if (ele.chainthree !== "") newPerson.chain = ele.chainthree;
        }
        if (ele.fixedchain !== "") newPerson.chain = ele.fixedchain;
        newPerson.chain = fixChain(newPerson.chain);
        if (ele.fixedtopicofstory !== "")
          newPerson.topicOfStory = ele.fixedtopicofstory;
        if (ele.fixedabouttheguest !== "")
          newPerson.aboutTheGuest = ele.fixedabouttheguest;
        if (ele.recordingdate !== "")
          newPerson.date = new Date(ele.recordingdate);
        if (ele.fixedrecordingdate !== "")
          newPerson.date = new Date(ele.fixedrecordingdate);

        if (newPerson.fullVideo === "שרשרת קצרה") newPerson.fullVideo = "";
        if (ele.fixedsubtitle !== "") newPerson.subtitle = ele.fixedsubtitle;
        allPeople.push(newPerson);
        console.log(allPeople[size]);
        personOption = document.createElement("option");
        personOption.value = newPerson.name + " + " + newPerson.chain;
        personOption.id = rowCount;
        if (newPerson.name !== "" || newPerson.chain !== "") {
          options.append(personOption);
        }
        rowCount++;
        size++;
      });
    });
}
function getChainData() {
  fetch(chainDataURL)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      json.data.chains.forEach((ele) => {
        newChain = {
          name: ele.name,
          altName: ele.othername,
          playlist: ele.playlist,
          description: ele.description,
          about:ele.about,
          participants:ele.participants,
        };
        allChains.push(newChain);
      });
    });
}
function submitData() {
  for (var i = 0; i < allPeople.length; i++) {
    var nameAndChain = document.getElementById("peopleList").value.split(" + ");
    if (
      allPeople[i].name === nameAndChain[0] &&
      allPeople[i].chain === nameAndChain[1]
    ) {
      console.log("row num:" + allPeople[i].row);
      selectedPerson = allPeople[i];
      if (selectedPerson.chain !== "") {
        for (var j = 0; j < allChains.length; j++) {
          if (
            selectedPerson.chain === allChains[j].name ||
            selectedPerson.chain === allChains[j].altName
          ) {
            currChain = allChains[j];
            console.log(currChain);
            selectedPerson.chain = allChains[j].name;
            if (
              endsWithNumber(selectedPerson.chain) &&
              selectedPerson.chain === allChains[j].name
            ) {
              selectedPerson.chain = allChains[j].altName;
            }
            if (
              endsWithNumber(selectedPerson.chain) &&
              selectedPerson.chain === allChains[j].altName
            ) {
              selectedPerson.chain = allChains[j].name;
            }
          }
        }
      }
    }
  }

  document.getElementById("order").value = selectedPerson.order;
  document.getElementById("linkToFive").value = selectedPerson.fiveVideo;
  document.getElementById("linkToFull").value = selectedPerson.fullVideo;
  document.getElementById("linkToPrep").value = selectedPerson.prepTalk;
  document.getElementById("linkToExplain").value = currChain.about;
  document.getElementById("linkToPlaylist").value = currChain.playlist;
  
}
function reset() {
  document.getElementById("order").value = "";
  document.getElementById("linkToFull").value = "";
  document.getElementById("linkToPrep").value = "";
  document.getElementById("linkToPlaylist").value = "";
  document.getElementById("linkToExplain").value = "";
  document.getElementById("linkToFive").value = "";
     document.getElementById("titleCopy").innerHTML="להעתקת הכותרת";
   document.getElementById("textCopy").innerHTML="להעתקת התיאור";
}
function copycat(id) {
  var text = document.getElementById(id).innerText;
  var elem = document.createElement("textarea");
  document.body.appendChild(elem);
  elem.value = text;
  elem.select();
  document.execCommand("copy");
  document.body.removeChild(elem);
  document.getElementById(id+"Copy").innerHTML="הועתק";
}
function fixDate(str) {
  var year = str.getFullYear();
  var month = str.getMonth() + 1;
  var day = str.getDate();

  return day + "/" + month + "/" + year;
}
function fixTags(str){

    while (str.includes(".")) {
        str = str.replace(".", "_");
    }
    while (str.includes(" ")) {
        str = str.replace(" ", "_");
    }
    return str;
}
function fixChain(chain) {
  var splittedChain; //
  if (chain.includes(" (") || chain.includes("-")) {
    splittedChain = chain.split(" (");
    var moresplitted;
    if (splittedChain[0].includes("-")) {
      moresplitted = splittedChain[0].split("-");
      return moresplitted[1].trim();
    }
    return splittedChain[0].trim();
  }
  return chain;
}
function submit() {
    document.getElementById("titleCopy").innerHTML="להעתקת הכותרת";
   document.getElementById("textCopy").innerHTML="להעתקת התיאור";
     if (document.getElementById("tiny").checked) 
        showText("short");
     if (document.getElementById("short").checked) 
        showText("five");
    if(document.getElementById("long").checked)
        showText("fullVideo");
    if(document.getElementById("sound").checked)
        showText("sound");
    if(document.getElementById("pre").checked)
        showText("prepareTalk");
    if(document.getElementById("exp").checked)
        showText("explainChain");
    if(document.getElementById("playlistFive").checked)
        showText("playlistFive");
    if(document.getElementById("playlistFull").checked)
        showText("playlistFull");
    if(document.getElementById("livePost").checked)
        showText("livePost");
    fixTitle();
     
    
}
function showText(type){
    var testDiv = document.getElementById("text");
    removeAllChildNodes(testDiv);
    console.log("in "+type+":");
    var currLine;
    for(var i=0;i<descLines.length;i++){
        currLine=descLines[i];
        currLine=swapWithData(currLine);
        if(
            (type==="five"&&linesInFive[i]==="v")||
            (type==="fullVideo"&&linesInFullVideo[i]==="v")||
            (type==="prepareTalk"&&linesInPrepareTalk[i]==="v")||
            (type==="explainChain"&&linesInExplainChain[i]==="v")||
            (type==="short"&&linesInShort[i]==="v")||
            (type==="sound"&&linesInSound[i]==="v")||
            (type==="playlistFive"&&linesInPlaylistFive[i]==="v")||
            (type==="playlistFull"&&linesInPlaylistFull[i]==="v")||
            (type==="livePost"&&linesInLivePost[i]==="v")
          ){
                if(currLine!==""){
                    console.log(currLine);
                    var testH4 = document.createElement("h4");
                    testH4.innerHTML = currLine;
                    testDiv.append(testH4);
                }
            
        }
        currLine="";
    }
    
}
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
function swapWithData(line){
    if(line.includes("fullVideoLink")){
        line=line.replace("fullVideoLink", document.getElementById("linkToFull").value);
        if(document.getElementById("linkToFull").value==="")
            line="";
    }
     if(line.includes("topicOfStory")){
        line=line.replace("topicOfStory", selectedPerson.topicOfStory);
        if(selectedPerson.topicOfStory==="")
            line="";
    }
     if(line.includes("aboutTheGuest")){
        line=line.replace("aboutTheGuest", selectedPerson.aboutTheGuest);
        if(selectedPerson.aboutTheGuest==="")
            line="";
    }
    if(line.includes("guestName")){
        line=line.replace("guestName", selectedPerson.name);
        if(selectedPerson.name==="")
            line="";
    }
    if(line.includes("facebookLink")){
        line=line.replace("facebookLink", selectedPerson.facebook);
        if( selectedPerson.facebook==="")
            line="";
    }
    if(line.includes("instagramLink")){
        line=line.replace("instagramLink", selectedPerson.instagram);
        if( selectedPerson.instagram==="")
            line="";
    }
    if(line.includes("websiteLink")){
        line=line.replace("websiteLink", selectedPerson.sites);
        if(selectedPerson.sites===""||selectedPerson.sites===" ")
            line="";
    }
    if(line.includes("chainName")){
        if(!line.includes("תגיות"))
            line=line.replace("chainName", currChain.name);
        if(line.includes("תגיות")){
            line=line.replace("chainName", fixTags(currChain.name));
        }
        if(currChain.name==="")
            line="";
    }
    if(line.includes("chainDescription")){
        line=line.replace("chainDescription", currChain.description);
        if(currChain.description==="")
            line="";
    }
    if(line.includes("chainAbout")){
        line=line.replace("chainAbout", document.getElementById("linkToExplain").value);
        if(document.getElementById("linkToExplain").value==="")
            line="";
    }
    if(line.includes("chainParticipants")){
        line=line.replace("chainParticipants", currChain.participants);
        if(currChain.participants==="")
            line="";
    }
    if(line.includes("playlistLink")){
        line=line.replace("playlistLink", document.getElementById("linkToPlaylist").value);
        if(document.getElementById("linkToPlaylist").value==="")
            line="";
    }
    if(line.includes("date")){
        if(selectedPerson.date!=="")
            line=line.replace("date", fixDate(selectedPerson.date));
        if(selectedPerson.date==="")
            line="";
    }
    if(line.includes("interviewerName")){
        line=line.replace("interviewerName", selectedPerson.interviewerName);
        if(selectedPerson.interviewerName==="")
            line="";
    }
    if(line.includes("prepTalkLink")){
        line=line.replace("prepTalkLink", document.getElementById("linkToPrep").value);
        if(document.getElementById("linkToPrep").value==="")
            line="";
    }
    return line;
}
function fixTitle() {
  document.getElementById("title").innerHTML="";
if (document.getElementById("tiny").checked) {
    document.getElementById("short").checked;
  }    
  var nameOfPerson = selectedPerson.name;
  const splittedName = nameOfPerson.split(" ");
  if (
    document.getElementById("short").checked ||
    document.getElementById("sound").checked ||
    document.getElementById("long").checked
  ) {
    document.getElementById("title").innerHTML =
      selectedPerson.topicOfStory + " | ";
  }
  document.getElementById("title").innerHTML +=
    nameOfPerson +
    " | " +
    selectedPerson.chain +
    "" +
    document.getElementById("order").value +
    " | סיפור555";

  if (document.getElementById("exp").checked) {
    document.getElementById("title").innerHTML += "-השרשרת";
  }
  if (document.getElementById("long").checked) {
    document.getElementById("title").innerHTML += "-הראיון";
  }
  if (document.getElementById("pre").checked) {
    document.getElementById("title").innerHTML += "-הכנה";
  }
  var firstName = splittedName[0];
  if (
    firstName === 'ד"ר' ||
    firstName === "ד״ר" ||
    firstName === "דוקטור" ||
    firstName === "פרופסור" ||
    firstName === "פרופ'"
  ) {
    firstName = splittedName[1];
  }
  if (document.getElementById("tiny").checked) {
    document.getElementById("title").innerHTML =
      selectedPerson.topicOfStory +
      " | " +
      firstName +
      " | " +
      selectedPerson.chain +
      "" +
      document.getElementById("order").value +
      " | סיפור55";
  }
  if (document.getElementById("playlistFive").checked) {
    document.getElementById("title").innerHTML = "סיפור555-"+selectedPerson.chain;
  }
  if (document.getElementById("playlistFull").checked) {
        document.getElementById("title").innerHTML = "סיפור555-"+selectedPerson.chain+"-הראיון" ; 
    }

}
function endsWithNumber(str) {
  str = str.trim();
  return isNaN(str.slice(-1)) ? false : true;
}

var options = document.getElementById("people");
var optionsEng = document.getElementById("peopleEng");
var theImportantT2DURL="https://script.google.com/macros/s/AKfycbxxJ_sg89Q6BMpdzxHh1UCgNW3TYRvOZO3xDOrHVixnRYSJUTdY2uSdeEib2ugUuzvl/exec";
var url =
  "https://script.google.com/macros/s/AKfycbxDcej67zrhC5zOxbGN76qFBZc3AWbP4UUhexUqPRnzN79Lb5ZmTl5PMgYNFihoXXl3Kg/exec";
var urlEng="https://script.google.com/macros/s/AKfycbwif1D1ZdoI1iYaL2Hya5Jke8UIFaoPxMo2Jkvd3cNytK35UIGbJZ0NKwhiYJQgana8-A/exec";
var newPerson = {};
var selectedPerson = {};
var allPeople = [];
var rowCount = 2;
var size = 0;
var personOption;
var allChains = [];
var newChain = {};
var currChain = {};
var descLines1=[];
var descLines2=[];
var linesInFiveHeb=[];
var linesInFullVideoHeb=[];
var linesInPrepareTalkHeb=[];
var linesInExplainChainHeb=[];
var linesInShortHeb=[];
var linesInSoundHeb=[];
var linesInPlaylistFiveHeb=[];
var linesInPlaylistFullHeb=[];
var linesInLivePostHeb=[];
var linesInFiveLiveHeb=[];
var linesInFullVideoLiveHeb=[];
var linesInEventHeb=[];
var linesInFiveEng=[];
var linesInFullVideoEng=[];
var linesInPrepareTalkEng=[];
var linesInExplainChainEng=[];
var linesInShortEng=[];
var linesInSoundEng=[];
var linesInPlaylistFiveEng=[];
var linesInPlaylistFullEng=[];
var linesInLivePostEng=[];
var linesInFiveLiveEng=[];
var linesInFullVideoLiveEng=[];
var linesInEventEng=[];
var currLang="";
var chainDataURL =
  "https://script.google.com/macros/s/AKfycbz7IgSM1Rhei0PPSgEHwxD_YHtyevYhZt32Mje9asUeGE20_J8a59XYw0xNFJMxjDKXKA/exec";
getDescData();
getChainData();
getData();
getDataEng();
function getDescData(){
    fetch(theImportantT2DURL)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
         json.data.heb.forEach((ele) => {         
             descLines1.push(ele.lineindescription);
             linesInFiveHeb.push(ele.five);
             linesInFullVideoHeb.push(ele.fullvideo);
             linesInPrepareTalkHeb.push(ele.preparetalk);
             linesInExplainChainHeb.push(ele.explainchain);
             linesInShortHeb.push(ele.short);
             linesInSoundHeb.push(ele.sound);
             linesInPlaylistFiveHeb.push(ele.playlistfive);
             linesInPlaylistFullHeb.push(ele.playlistfull);
             linesInLivePostHeb.push(ele.livepost);
             linesInFiveLiveHeb.push(ele.fivelive);
             linesInFullVideoLiveHeb.push(ele.fullvideolive);
             linesInEventHeb.push(ele.event);
         })
            json.data.eng.forEach((ele) => {         
             descLines2.push(ele.lineindescription);
             linesInFiveEng.push(ele.five);
             linesInFullVideoEng.push(ele.fullvideo);
             linesInPrepareTalkEng.push(ele.preparetalk);
             linesInExplainChainEng.push(ele.explainchain);
             linesInShortEng.push(ele.short);
             linesInSoundEng.push(ele.sound);
             linesInPlaylistFiveEng.push(ele.playlistfive);
             linesInPlaylistFullEng.push(ele.playlistfull);
             linesInLivePostEng.push(ele.livepost);
             linesInFiveLiveEng.push(ele.fivelive);
             linesInFullVideoLiveEng.push(ele.fullvideolive);
             linesInEventEng.push(ele.event);
         })
        
       
    })
    
}
function getDataEng(){
    fetch(urlEng)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      json.data.forEach((ele) => {
        newPerson = {
          name: ele.name,
          interviewerName: ele.interviewername,
          chain: ele.chain,
           email: ele.email,
           guestphone: ele.phone,
          interphone: ele.interviewerphone,
          topicOfStory: ele.topicofstory,
          order: ele.order,
          fullVideo: ele.linkfull,
          fiveVideo: ele.linkfive,
          date: "",
          explainVideo: ele.linkexplain,
          prepTalk: ele.preptalk,
          aboutTheGuest: ele.abouttheguestone,
          facebook: ele.facebook,
          instagram: ele.instagram,
          tiktok: ele.tiktok,
          sites: ele.othersites + " " + ele.moreothersites,
            id: ele.id,
          row: rowCount,
        };

        if (ele.fixedname !== "") newPerson.name = ele.fixedname;
        if (ele.fixedinterviewername !== "")
          newPerson.interviewerName = ele.fixedinterviewername;
        if (ele.fixedchain !== "") newPerson.chain = ele.fixedchain;
        newPerson.chain = fixChain(newPerson.chain);
        if (ele.fixedemail !== "") newPerson.email = ele.fixedemail;
        if (ele.fixedphone !== "") newPerson.guestphone = ele.fixedphone;
        if (ele.fixedinterviewerphone !== "")
          newPerson.interphone = ele.fixedinterviewerphone;
        if (ele.fixedtopicofstory !== "")
          newPerson.topicOfStory = ele.fixedtopicofstory;
        if (newPerson.abouttheguestone === "") {
          if (ele.abouttheguesttwo !== "") newPerson.aboutTheGuest = ele.abouttheguesttwo;
        }
        if (ele.fixedabouttheguest !== "")
          newPerson.aboutTheGuest = ele.fixedabouttheguest;
        if (ele.recordingdate !== "")
          newPerson.date = changeTimeZone(new Date(ele.recordingdate), 'Asia/Jerusalem');
       if (ele.fixedrecordingdate !== "")
          newPerson.date = changeTimeZone(new Date(ele.fixedrecordingdate), 'Asia/Jerusalem');
        if (newPerson.fullVideo === "שרשרת קצרה") newPerson.fullVideo = "";
        allPeople.push(newPerson);
        console.log(allPeople[size]);
        personOption = document.createElement("option");
        personOption.value = newPerson.name + " + " + newPerson.chain;
        personOption.id = rowCount;
        if (newPerson.name !== "" || newPerson.chain !== "") {
          optionsEng.append(personOption);
        }
        rowCount++;
        size++;
      });
    });
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
          email: ele.email,
           guestphone: ele.phone,
          interphone: ele.interviewerphone,
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
            id: ele.id,
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
        if (ele.fixedemail !== "") newPerson.email = ele.fixedemail;
        if (ele.fixedphone !== "") newPerson.guestphone = ele.fixedphone;
        if (ele.fixedinterviewerphone !== "")
          newPerson.interphone = ele.fixedinterviewerphone;
        if (ele.fixedtopicofstory !== "")
          newPerson.topicOfStory = ele.fixedtopicofstory;
        if (ele.fixedabouttheguest !== "")
          newPerson.aboutTheGuest = ele.fixedabouttheguest;
        if (ele.recordingdate !== "")
          newPerson.date = changeTimeZone(new Date(ele.recordingdate), 'Asia/Jerusalem');
       if (ele.fixedrecordingdate !== "")
          newPerson.date = changeTimeZone(new Date(ele.fixedrecordingdate), 'Asia/Jerusalem');
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
function submitDataEng() {
  for (var i = 0; i < allPeople.length; i++) {
    var nameAndChain = document.getElementById("peopleListEng").value.split(" + ");
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
     if (document.getElementById("tinyHeb").checked) 
        showText("short","heb");
     if (document.getElementById("shortHeb").checked) 
        showText("five","heb");
    if(document.getElementById("longHeb").checked)
        showText("fullVideo","heb");
    if(document.getElementById("soundHeb").checked)
        showText("sound","heb");
    if(document.getElementById("preHeb").checked)
        showText("prepareTalk","heb");
    if(document.getElementById("expHeb").checked)
        showText("explainChain","heb");
    if(document.getElementById("playlistFiveHeb").checked)
        showText("playlistFive","heb");
    if(document.getElementById("playlistFullHeb").checked)
        showText("playlistFull","heb");
    if(document.getElementById("livePostHeb").checked)
        showText("livePost","heb");
    if(document.getElementById("fullVideoLiveHeb").checked)
        showText("fullVideoLive","heb");
     if(document.getElementById("fiveLiveHeb").checked)
        showText("fiveLive","heb");
      if(document.getElementById("eventHeb").checked)
        showText("event","heb");
     if (document.getElementById("tinyEng").checked) 
        showText("short","eng");
     if (document.getElementById("shortEng").checked) 
        showText("five","eng");
    if(document.getElementById("longEng").checked)
        showText("fullVideo","eng");
    if(document.getElementById("soundEng").checked)
        showText("sound","eng");
    if(document.getElementById("preEng").checked)
        showText("prepareTalk","eng");
    if(document.getElementById("expEng").checked)
        showText("explainChain","eng");
    if(document.getElementById("playlistFiveEng").checked)
        showText("playlistFive","eng");
    if(document.getElementById("playlistFullEng").checked)
        showText("playlistFull","eng");
    if(document.getElementById("livePostEng").checked)
        showText("livePost","eng");
    if(document.getElementById("fullVideoLiveEng").checked)
        showText("fullVideoLive","eng");
    if(document.getElementById("fiveLiveEng").checked)
        showText("fiveLive","eng");
    if(document.getElementById("eventEng").checked)
        showText("event","eng");
    fixTitle();
     
    
}
function showText(type,lang){
    currLang=lang;
    var testDiv = document.getElementById("text");
    removeAllChildNodes(testDiv);
    console.log("in "+type+":");
    var currLine;
    if(lang==="heb"){
        document.getElementById("text").style.textAlign="right";
        document.getElementById("text").style.direction="rtl";
        document.getElementById("title").style.textAlign="right";
        document.getElementById("title").style.direction="rtl";
        for(var i=0;i<descLines1.length;i++){
            currLine=descLines1[i];
            currLine=swapWithData(currLine);
            if(
                (type==="five"&&linesInFiveHeb[i]==="v")||
                (type==="fullVideo"&&linesInFullVideoHeb[i]==="v")||
                (type==="prepareTalk"&&linesInPrepareTalkHeb[i]==="v")||
                (type==="explainChain"&&linesInExplainChainHeb[i]==="v")||
                (type==="short"&&linesInShortHeb[i]==="v")||
                (type==="sound"&&linesInSoundHeb[i]==="v")||
                (type==="playlistFive"&&linesInPlaylistFiveHeb[i]==="v")||
                (type==="playlistFull"&&linesInPlaylistFullHeb[i]==="v")||
                (type==="livePost"&&linesInLivePostHeb[i]==="v")||
                (type==="fullVideoLive"&&linesInFullVideoLiveHeb[i]==="v")||
                (type==="fiveLive"&&linesInFiveLiveHeb[i]==="v")||
                (type==="event"&&linesInEventHeb[i]==="v")
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
    if(lang==="eng"){
        document.getElementById("text").style.textAlign="left";
        document.getElementById("text").style.direction="ltr";
        document.getElementById("title").style.textAlign="left";
        document.getElementById("title").style.direction="ltr";
        for(var i=0;i<descLines2.length;i++){
            currLine=descLines2[i];
            currLine=swapWithData(currLine);
            if(
                (type==="five"&&linesInFiveEng[i]==="v")||
                (type==="fullVideo"&&linesInFullVideoEng[i]==="v")||
                (type==="prepareTalk"&&linesInPrepareTalkEng[i]==="v")||
                (type==="explainChain"&&linesInExplainChainEng[i]==="v")||
                (type==="short"&&linesInShortEng[i]==="v")||
                (type==="sound"&&linesInSoundEng[i]==="v")||
                (type==="playlistFive"&&linesInPlaylistFiveEng[i]==="v")||
                (type==="playlistFull"&&linesInPlaylistFullEng[i]==="v")||
                (type==="livePost"&&linesInLivePostEng[i]==="v")||
                (type==="fullVideoLive"&&linesInFullVideoLiveEng[i]==="v")||
                (type==="fiveLive"&&linesInFiveLiveEng[i]==="v")||
                (type==="event"&&linesInEventEng[i]==="v")
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
    
}
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
function swapWithData(line){
    if(line.includes("fullVideoLink")){
        if(document.getElementById("linkToFull").value!==""){
            line=line.replace("fullVideoLink", document.getElementById("linkToFull").value);
        }
        if(document.getElementById("linkToFull").value===""){
            line=line.replace("fullVideoLink", document.getElementById("linkToFive").value);
            if(line.includes("לראיון המלא:")){
                line=line.replace("לראיון המלא:", "לסיפור555:");
            }
            if(line.includes("the interview:")){
                line=line.replace("the interview:", "Story555:");
            }
            if(document.getElementById("linkToFive").value===""){
                line="";
            }
             if(document.getElementById("shortHeb").checked ||
                document.getElementById("shortEng").checked||
                document.getElementById("fiveLiveHeb").checked||
                document.getElementById("fiveLiveEng").checked){
                    line="";
            }
        }       
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
        if(!line.includes("תגיות")&&!line.includes("Tags"))
            line=line.replace("chainName", currChain.name);
        if(line.includes("תגיות")||line.includes("Tags")){
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
    if(line.includes("email")){
        line=line.replace("email", selectedPerson.email);
        if(selectedPerson.email==="")
            line="";
    }
    if(line.includes("guestPhone")){
        line=line.replace("guestPhone", selectedPerson.guestphone);
        if(selectedPerson.guestphone==="")
            line="";
    }
    if(line.includes("interviewerPhone")){
        line=line.replace("interviewerPhone", selectedPerson.interphone);
        if(selectedPerson.interphone==="")
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
    console.log(selectedPerson.topicOfStory);
    if(currLang==="heb"){
      document.getElementById("title").innerHTML="";
    if (document.getElementById("tinyHeb").checked) {
        document.getElementById("shortHeb").checked;
      }    
      var nameOfPerson = selectedPerson.name;
      const splittedName = nameOfPerson.split(" ");
        if(document.getElementById("soundHeb").checked){
            document.getElementById("title").innerHTML="פרק "+selectedPerson.id+": "+selectedPerson.topicOfStory + " | ";
        }
      if (
        document.getElementById("shortHeb").checked ||
        document.getElementById("longHeb").checked||
          document.getElementById("fiveLiveHeb").checked||
          document.getElementById("fullVideoLiveHeb").checked||
          document.getElementById("livePostHeb").checked
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
      if (document.getElementById("expHeb").checked) {
        document.getElementById("title").innerHTML = nameOfPerson +
        " | " +
        selectedPerson.chain +
        " | סיפור555-השרשרת";
      }
      if (document.getElementById("longHeb").checked||
          document.getElementById("fullVideoLiveHeb").checked||
          document.getElementById("livePostHeb").checked) {
        document.getElementById("title").innerHTML += "-הראיון";
      }
      if (document.getElementById("fullVideoLiveHeb").checked||document.getElementById("fiveLiveHeb").checked||
          document.getElementById("livePostHeb").checked) {
          document.getElementById("title").innerHTML += "-LIVE";
      }
      if (document.getElementById("preHeb").checked) {
        document.getElementById("title").innerHTML += "-הכנה";
      }
      var firstName = splittedName[0];
      if (
        firstName === 'ד"ר' ||
        firstName === "ד״ר" ||
        firstName === "דוקטור" ||
        firstName === "פרופסור" ||
        firstName === "פרופ'"||
     firstName === "הרב" ||
     firstName === "ד״ר" 
      ) {
        firstName = splittedName[1];
      }
      if (document.getElementById("tinyHeb").checked) {
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
    
      if (document.getElementById("playlistFiveHeb").checked) {
        document.getElementById("title").innerHTML = "סיפור555-"+selectedPerson.chain;
      }
      if (document.getElementById("playlistFullHeb").checked) {
            document.getElementById("title").innerHTML = "סיפור555-"+selectedPerson.chain+"-הראיון" ; 
        }
      if (document.getElementById("eventHeb").checked){
          document.getElementById("title").innerHTML="555-"+selectedPerson.chain+" - "+nameOfPerson;
      }
    }
    if(currLang==="eng"){
      document.getElementById("title").innerHTML="";
    if (document.getElementById("tinyEng").checked) {
        document.getElementById("shortEng").checked;
      }    
      var nameOfPerson = selectedPerson.name;
      const splittedName = nameOfPerson.split(" ");
        if(document.getElementById("soundEng").checked){
            document.getElementById("title").innerHTML="Episode "+selectedPerson.id+": "+selectedPerson.topicOfStory + " | ";
        }
      if (
        document.getElementById("shortEng").checked ||
        document.getElementById("longEng").checked||
          document.getElementById("fiveLiveEng").checked||
          document.getElementById("fullVideoLiveEng").checked||
          document.getElementById("livePostEng").checked
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
        " | Story555";   
      if (document.getElementById("expEng").checked) {
          
        document.getElementById("title").innerHTML =nameOfPerson +
        " | " +
        selectedPerson.chain +
        " | Story555-The Chain";
      }
      if (document.getElementById("longEng").checked||document.getElementById("fullVideoLiveEng").checked||
          document.getElementById("livePostEng").checked) {
        document.getElementById("title").innerHTML += "-The Interview";
      }
      if (document.getElementById("fullVideoLiveEng").checked||document.getElementById("fiveLiveEng").checked||
          document.getElementById("livePostEng").checked) {
          document.getElementById("title").innerHTML += "-LIVE";
      }
      if (document.getElementById("preEng").checked) {
        document.getElementById("title").innerHTML += "-Preparation";
      }
      var firstName = splittedName[0];
      if (
        firstName === 'ד"ר' ||
        firstName === "ד״ר" ||
        firstName === "דוקטור" ||
        firstName === "פרופסור" ||
        firstName === "פרופ'"||
           firstName === "Dr."||
          firstName === "Doctor"||
          firstName === "Professor" ||
     firstName === "הרב" ||
     firstName === "ד״ר" 
      ) {
        firstName = splittedName[1];
      }
      if (document.getElementById("tinyEng").checked) {
        document.getElementById("title").innerHTML =
          selectedPerson.topicOfStory +
          " | " +
          firstName +
          " | " +
          selectedPerson.chain +
          "" +
          document.getElementById("order").value +
          " | Story55";
      }
      if (document.getElementById("playlistFiveEng").checked) {
        document.getElementById("title").innerHTML = "Story555-"+selectedPerson.chain;
      }
      if (document.getElementById("playlistFullEng").checked) {
            document.getElementById("title").innerHTML = "Story555-"+selectedPerson.chain+"-The Interview" ; 
        }
      if (document.getElementById("eventEng").checked){
          document.getElementById("title").innerHTML="555-"+selectedPerson.chain+" - "+nameOfPerson;
      }
    }
}
function endsWithNumber(str) {
  str = str.trim();
  return isNaN(str.slice(-1)) ? false : true;
}
function changeTimeZone(date, timeZone) {
  if (typeof date === 'string') {
    return new Date(new Date(date).toLocaleString('en-US', { timeZone }));
  }
  return new Date(date.toLocaleString('en-US', { timeZone }));
}

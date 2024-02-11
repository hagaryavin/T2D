var options = document.getElementById("people");
console.log("wtf");

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
var chainDataURL =
  "https://script.google.com/macros/s/AKfycbz7IgSM1Rhei0PPSgEHwxD_YHtyevYhZt32Mje9asUeGE20_J8a59XYw0xNFJMxjDKXKA/exec";
getChainData();
getData();

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
  document.getElementById("linkToExplain").value = selectedPerson.explainVideo;
  document.getElementById("linkToPlaylist").value = currChain.playlist;
}
function reset() {
  document.getElementById("order").value = "";
  document.getElementById("linkToFull").value = "";
  document.getElementById("linkToPrep").value = "";
  document.getElementById("linkToPlaylist").value = "";
  document.getElementById("linkToExplain").value = "";
  document.getElementById("linkToFive").value = "";
}
function copycat(id) {
  var text = document.getElementById(id).innerText;
  var elem = document.createElement("textarea");
  document.body.appendChild(elem);
  elem.value = text;
  elem.select();
  document.execCommand("copy");
  document.body.removeChild(elem);
  alert("הטקסט הועתק!");
}
function isNull(thing) {
  if (thing.length > 2) return false;
  return true;
}

function fixDate(str) {
  var year = str.getFullYear();
  var month = str.getMonth() + 1;
  var day = str.getDate();

  return day + "/" + month + "/" + year;
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
  submitting();
}
function submitting() {
  //return to basic :|
  document.getElementById("title").innerHTML = "";
  document.getElementById("subtitle").innerHTML = "";
  document.getElementById("fullVideo").innerHTML = "לראיון המלא: ";
  document.getElementById("explainVideo").innerHTML = "הסבר על השרשרת: ";
  document.getElementById("topicOfStory").innerHTML = "נושא הסיפור:";
  document.getElementById("aboutTheGuest").innerHTML = "על האורח/ת:";
  document.getElementById("facebook").innerHTML = "פייסבוק:";
  document.getElementById("instagram").innerHTML = "אינסטגרם:";
  document.getElementById("tiktok").innerHTML = "טיקטוק:";
  document.getElementById("otherSite").innerHTML = "אתר";
  document.getElementById("playlist").innerHTML = " לצפייה בשרשרת";
  document.getElementById("nameOfInterviewer").innerHTML = "המראיינ/ת:";
  document.getElementById("date").innerHTML = "";
  document.getElementById("tags").innerHTML = "תגיות: #";
  document.getElementById("prepTalk").innerHTML = "לצפייה בשיחת ההכנה:";
  document.getElementById("categoryDescription").innerHTML = "תיאור השרשרת"; //"בשרשרת";

  document.getElementById("title").style.visibility = "visible";
  document.getElementById("subtitle").style.visibility = "visible";
  document.getElementById("fullVideo").style.visibility = "visible";
  document.getElementById("notExplainVideo").style.visibility = "visible";
  document.getElementById("explainVideo").style.visibility = "visible";
  document.getElementById("topicOfStory").style.visibility = "visible";
  document.getElementById("aboutTheGuest").style.visibility = "visible";
  document.getElementById("facebook").style.visibility = "visible";
  document.getElementById("instagram").style.visibility = "visible";
  document.getElementById("tiktok").style.visibility = "visible";
  document.getElementById("otherSite").style.visibility = "visible";
  document.getElementById("playlist").style.visibility = "visible";
  document.getElementById("nameOfInterviewer").style.visibility = "visible";
  document.getElementById("date").style.visibility = "visible";
  document.getElementById("tags").style.visibility = "visible";
  document.getElementById("prepTalk").style.visibility = "visible";
  document.getElementById("pod").style.visibility = "visible";
  //

  const str = " "; //= document.getElementById("myText").value;
  const myArray = str.split("	");
  //

  //
  if (document.getElementById("tiny").checked) {
    document.getElementById("short").checked;
  }

  //title

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

  //
  //categoryDescription
  document.getElementById("categoryDescription").innerHTML =
    "הסבר על השרשרת: " + currChain.name + " - " + currChain.description;

  //topicOfStory
  if (!isNull(selectedPerson.topicOfStory)) {
    document.getElementById("topicOfStory").innerHTML +=
      " " + selectedPerson.topicOfStory;
  }
  if (isNull(selectedPerson.topicOfStory)) {
    document.getElementById("topicOfStory").style.visibility = "hidden";
  }
  //

  //fullVideo
  if (document.getElementById("long").checked) {
    document.getElementById("fullVideo").style.visibility = "hidden";
  }
  if (!document.getElementById("long").checked) {
    if (!isNull(document.getElementById("linkToFull").value)) {
      document.getElementById("fullVideo").innerHTML +=
        document.getElementById("linkToFull").value;
    }
    if (isNull(document.getElementById("linkToFull").value)) {
      document.getElementById("fullVideo").style.visibility = "hidden";
      if (
        !document.getElementById("short").checked &&
        !isNull(document.getElementById("linkToFive").value)
      ) {
        document.getElementById("fullVideo").innerHTML =
          "לסרט5:55: " + document.getElementById("linkToFive").value;
        document.getElementById("fullVideo").style.visibility = "visible";
      }
    }
  }
  //
  //explain video
  if (!document.getElementById("exp").checked) {
    document.getElementById("notExplainVideo").style.visibility = "hidden";
  }
  if (document.getElementById("exp").checked) {
    document.getElementById("fullVideo").style.visibility = "hidden";
    document.getElementById("explainVideo").style.visibility = "hidden";
    document.getElementById("topicOfStory").style.visibility = "hidden";
    document.getElementById("aboutTheGuest").style.visibility = "hidden";
    document.getElementById("facebook").style.visibility = "hidden";
    document.getElementById("instagram").style.visibility = "hidden";
    document.getElementById("tiktok").style.visibility = "hidden";
    document.getElementById("otherSite").style.visibility = "hidden";
    document.getElementById("nameOfInterviewer").style.visibility = "hidden";
    document.getElementById("date").style.visibility = "hidden";
    document.getElementById("prepTalk").style.visibility = "hidden";
  }
  if (!document.getElementById("exp").checked) {
    if (!isNull(document.getElementById("linkToExplain").value)) {
      document.getElementById("explainVideo").innerHTML +=
        document.getElementById("linkToExplain").value;
    }
    if (isNull(document.getElementById("linkToExplain").value)) {
      document.getElementById("explainVideo").style.visibility = "hidden";
    }
  }

  //
  //playlist
  if (!isNull(document.getElementById("linkToPlaylist").value)) {
    document.getElementById("playlist").innerHTML +=
      " " +
      currChain.name +
      ": " +
      document.getElementById("linkToPlaylist").value;
  }
  if (isNull(document.getElementById("linkToPlaylist").value)) {
    document.getElementById("playlist").style.visibility = "hidden";
  }

  //

  //tags
  document.getElementById("tags").innerHTML +=
    selectedPerson.chain.replace(" ", "_") + " #";

  while (selectedPerson.chain.includes(".")) {
    selectedPerson.chain = selectedPerson.chain.replace(".", "_");
  }
  document.getElementById("tags").innerHTML += selectedPerson.chain + " #";
  if (document.getElementById("tiny").checked) {
    document.getElementById("tags").innerHTML += "shorts";
  }
  while (selectedPerson.chain.includes("_")) {
    selectedPerson.chain = selectedPerson.chain.replace("_", ".");
  }
  //

  //prepTalk
  if (
    document.getElementById("pre").checked ||
    document.getElementById("short").checked ||
    document.getElementById("tiny").checked ||
    document.getElementById("sound").checked
  ) {
    document.getElementById("prepTalk").style.visibility = "hidden";
  }
  if (document.getElementById("long").checked) {
    if (!isNull(document.getElementById("linkToPrep").value)) {
      document.getElementById("prepTalk").innerHTML +=
        " " + document.getElementById("linkToPrep").value;
    }
    if (isNull(document.getElementById("linkToPrep").value)) {
      document.getElementById("prepTalk").style.visibility = "hidden";
    }
  }

  //aboutTheGuest
  if (!isNull(selectedPerson.aboutTheGuest)) {
    document.getElementById("aboutTheGuest").innerHTML +=
      " " + selectedPerson.aboutTheGuest;
  }
  if (isNull(selectedPerson.aboutTheGuest)) {
    document.getElementById("aboutTheGuest").style.visibility = "hidden";
  }
  //
  //
  //subtitle מסר
  if (!isNull(selectedPerson.subtitle)) {
    document.getElementById("subtitle").innerHTML = selectedPerson.subtitle;
  }

  //
  //facebook
  if (!isNull(selectedPerson.facebook)) {
    document.getElementById("facebook").innerHTML +=
      " " + selectedPerson.facebook;
  }
  if (isNull(selectedPerson.facebook)) {
    document.getElementById("facebook").style.visibility = "hidden";
  }
  //

  //otherSite(s)
  if (!isNull(selectedPerson.sites)) {
    if (
      !isNull(selectedPerson.facebook) ||
      !isNull(selectedPerson.instagram) ||
      !isNull(selectedPerson.tiktok)
    ) {
      document.getElementById("otherSite").innerHTML +=
        " נוסף: " + selectedPerson.sites;
    }
    if (
      isNull(selectedPerson.facebook) &&
      isNull(selectedPerson.instagram) &&
      isNull(selectedPerson.tiktok)
    ) {
      document.getElementById("otherSite").innerHTML +=
        ": " + selectedPerson.sites;
    }
  }
  if (isNull(selectedPerson.sites)) {
    document.getElementById("otherSite").style.visibility = "hidden";
  }
  //

  //instagram
  if (!isNull(selectedPerson.instagram)) {
    document.getElementById("instagram").innerHTML +=
      " " + selectedPerson.instagram;
  }
  if (isNull(selectedPerson.instagram)) {
    document.getElementById("instagram").style.visibility = "hidden";
  }

  //

  //tiktok
  if (!isNull(selectedPerson.tiktok)) {
    document.getElementById("tiktok").innerHTML += " " + selectedPerson.tiktok;
  }
  if (isNull(selectedPerson.tiktok)) {
    document.getElementById("tiktok").style.visibility = "hidden";
  }
  //

  //nameOfInterviewer
  if (!isNull(selectedPerson.interviewerName)) {
    document.getElementById("nameOfInterviewer").innerHTML +=
      " " + selectedPerson.interviewerName;
  }
  if (isNull(selectedPerson.interviewerName)) {
    document.getElementById("nameOfInterviewer").style.visibility = "hidden";
  }
  //

  //date
  if (selectedPerson.date !== "") {
    document.getElementById("date").innerHTML +=
      " " + fixDate(selectedPerson.date);
  }
  if (selectedPerson.date === "") {
    document.getElementById("date").style.visibility = "hidden";
  }

  //pod
  if (document.getElementById("sound").checked) {
    document.getElementById("pod").style.visibility = "hidden";
  }
}
function endsWithNumber(str) {
  str = str.trim();
  return isNaN(str.slice(-1)) ? false : true;
}

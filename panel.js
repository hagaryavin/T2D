var options = document.getElementById("people");
var optionsEng = document.getElementById("peopleEng");
var theImportantT2DURL="https://script.google.com/macros/s/AKfycbzcWW--rxYPZWO-fogfe6Frn1YXVejatzNlBU53UMNOToe50OFC-cv_ndXojlLOePU4/exec";
var url =
  "https://script.google.com/macros/s/AKfycbxDcej67zrhC5zOxbGN76qFBZc3AWbP4UUhexUqPRnzN79Lb5ZmTl5PMgYNFihoXXl3Kg/exec";
var urlEng="https://script.google.com/macros/s/AKfycbwif1D1ZdoI1iYaL2Hya5Jke8UIFaoPxMo2Jkvd3cNytK35UIGbJZ0NKwhiYJQgana8-A/exec";
var newPerson = {};
var sameChain=false;
var selectedData = {
        guestName1:"",
        topicOfStory1:"",
        virtue1:"",
        message1:"",
        aboutTheGuest1:"",
        facebookLink1:"",
        instagramLink1:"",
        websiteLink1:"",
        email1:"",
        guestPhone1:"",
        order1:"",
        guestName2:"",
        topicOfStory2:"",
        message2:"",
        virtue2:"",
        aboutTheGuest2:"",
        facebookLink2:"",
        instagramLink2:"",
        websiteLink2:"",
        email2:"",
        guestPhone2:"",
        order2:"",
        guestName3:"",
        topicOfStory3:"",
        message3:"",
        virtue3:"",
        aboutTheGuest3:"",
        facebookLink3:"",
        instagramLink3:"",
        websiteLink3:"",
        email3:"",
        guestPhone3:"",
        order3:"",
        chainName:"",
        date:"",
        hour:"",
        interviewerName:"",
        interviewerPhone:""
};
var allPeople = [];
var rowCount = 2;
var size = 0;
var personOption;
var allChains = [];
var newChain = {};
var currChain = {};
var chainOption;
var descLines1=[];
var descLines2=[];
var linesInPanelHeb=[];
var linesInPanelPostHeb=[];
var linesInPanelEventHeb=[];
var linesInPanelEng=[];
var linesInPanelPostEng=[];
var linesInPanelEventEng=[];
var currLang="";
var titles={
     panelHeb:"",
     panelPostHeb:"",
     panelEventHeb:"",
     panelEng:"",
     panelPostEng:"",
     panelEventEng:"",
};
var chainDataURL =
  "https://script.google.com/macros/s/AKfycbz7IgSM1Rhei0PPSgEHwxD_YHtyevYhZt32Mje9asUeGE20_J8a59XYw0xNFJMxjDKXKA/exec";
getData();
getDataEng();
getTitlesData();
getDescData();
getChainData();

function getDescData(){
    fetch(theImportantT2DURL)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
         json.data.heb.forEach((ele) => {         
             descLines1.push(ele.lineindescription);
             linesInPanelHeb.push(ele.panel);
             linesInPanelPostHeb.push(ele.panelpost);
             linesInPanelEventHeb.push(ele.panelevent);
         })
            json.data.eng.forEach((ele) => {         
             descLines2.push(ele.lineindescription);
             linesInPanelEng.push(ele.panel);
             linesInPanelPostEng.push(ele.panelpost);
             linesInPanelEventEng.push(ele.panelevent);
    
         })
        
       
    })
    
}

function getTitlesData(){
    fetch(theImportantT2DURL)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
         json.data.titles.forEach((ele) => { 
             if(ele.language==="hebrew"){
                 titles.panelHeb=ele.panel,
                 titles.panelPostHeb=ele.panelpost,
                 titles.panelEventHeb=ele.panelevent
            }
             if(ele.language==="english"){
                 titles.panelEng=ele.panel,
                 titles.panelPostEng=ele.panelpost,
                 titles.panelEventEng=ele.panelevent
             }
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
            hour:"",
          explainVideo: ele.linkexplain,
          prepTalk: ele.preptalk,
          abouttheguest: ele.abouttheguestone,
          facebook: ele.facebook,
          instagram: ele.instagram,
          tiktok: ele.tiktok,
          sites: ele.othersites + " " + ele.moreothersites,
            id: ele.id,
            ide:ele.ide,
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
        if (newPerson.abouttheguest === "") {
          if (ele.abouttheguesttwo !== "") newPerson.abouttheguest = ele.abouttheguesttwo;
        }
        if (ele.fixedabouttheguest !== "")
          newPerson.abouttheguest = ele.fixedabouttheguest;
        if (ele.recordingdate !== "")
          newPerson.date = changeTimeZone(new Date(ele.recordingdate), 'Asia/Jerusalem');
       if (ele.fixedrecordingdate !== "")
          newPerson.date = changeTimeZone(new Date(ele.fixedrecordingdate), 'Asia/Jerusalem');
        if (ele.recordinghour !== "")
          newPerson.hour = changeTimeZone(new Date(ele.recordinghour), 'Asia/Jerusalem');
        if (ele.fixedrecordinghour !== "")
          newPerson.hour = changeTimeZone(new Date(ele.fixedrecordinghour), 'Asia/Jerusalem');
        if (newPerson.fullVideo === "שרשרת קצרה") newPerson.fullVideo = "";
        allPeople.push(newPerson);
        personOption = document.createElement("option");
        personOption.value = newPerson.name + " + " + newPerson.chain;
        personOption.id = rowCount;
        if (ele.fixedrecordingdate!=="ללא תאריך"&&(newPerson.name !== "" || newPerson.chain !== "")) {
          console.log(allPeople[size]);
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
          message: ele.subtitle,
            virtue: ele.virtue,
          order: ele.order,
          fullVideo: ele.linkfull,
          fiveVideo: ele.linkfive,
          date: "",
            hour:"",
          explainVideo: ele.linkexplain,
          prepTalk: ele.preptalk,
          abouttheguest: ele.abouttheguest,
          facebook: ele.facebook,
          instagram: ele.instagram,
          tiktok: ele.tiktok,
          sites: ele.othersites + " " + ele.moreothersites,
            id: ele.id,
            ide:ele.id,
          row: rowCount,
        };

        if (ele.fixedname !== "") newPerson.name = ele.fixedname;
        if (ele.fixedinterviewername !== "")
          newPerson.interviewerName = ele.fixedinterviewername;
        if (newPerson.chain === "") {
          if (ele.chaintwo !== "") newPerson.chain = ele.chaintwo;
          if (ele.chainthree !== "") newPerson.chain = ele.chainthree;
          if (ele.chainfour !== "") newPerson.chain = ele.chainfour;
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
          newPerson.abouttheguest = ele.fixedabouttheguest;
        if (ele.recordingdate !== "")
          newPerson.date = changeTimeZone(new Date(ele.recordingdate), 'Asia/Jerusalem');
       if (ele.fixedrecordingdate !== "")
          newPerson.date = changeTimeZone(new Date(ele.fixedrecordingdate), 'Asia/Jerusalem');
        if (ele.recordinghour !== "")
          newPerson.hour = changeTimeZone(new Date(ele.recordinghour), 'Asia/Jerusalem');
        if (ele.fixedrecordinghour !== "")
          newPerson.hour = changeTimeZone(new Date(ele.fixedrecordinghour), 'Asia/Jerusalem');
        if (newPerson.fullVideo === "שרשרת קצרה") newPerson.fullVideo = "";
        if (ele.fixedsubtitle !== "")
            newPerson.message = ele.fixedsubtitle;
        if (ele.fixedvirtue!== "")
            newPerson.virtue = ele.fixedvirtue;
        allPeople.push(newPerson);
        personOption = document.createElement("option");
        personOption.value = newPerson.name + " + " + newPerson.chain;
        personOption.id = rowCount;
        if (ele.fixedrecordingdate!=="ללא תאריך"&&(newPerson.name !== "" || newPerson.chain !== "")) {
          console.log(allPeople[size]);
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
        chainOption = document.createElement("option");
        chainOption.value = newChain.name;
        document.getElementById("chainsNames").append(chainOption);
      });
    });
}
function submitData() {
    selectedData.guestName1="";
      selectedData.topicOfStory1="";
    selectedData.virtue1="";
        selectedData.message1="";
        selectedData.aboutTheGuest1="";
        selectedData.facebookLink1="";
        selectedData.instagramLink1="";
        selectedData.websiteLink1="";
        selectedData.email1="";
        selectedData.guestPhone1="";
        selectedData.order1="";
        selectedData.guestName2="";
        selectedData.topicOfStory2="";
    selectedData.virtue2="";
        selectedData.message2="";
        selectedData.aboutTheGuest2="";
        selectedData.facebookLink2="";
        selectedData.instagramLink2="";
        selectedData.websiteLink2="";
        selectedData.email2="";
        selectedData.guestPhone2="";
        selectedData.order2="";
        selectedData.guestName3="";
        selectedData.topicOfStory3="";
    selectedData.virtue3="";
        selectedData.message3="";
        selectedData.aboutTheGuest3="";
        selectedData.facebookLink3="";
        selectedData.instagramLink3="";
        selectedData.websiteLink3="";
        selectedData.email3="";
        selectedData.guestPhone3="";
       selectedData.order3="";
        selectedData.chainName="";
        selectedData.date="";
        selectedData.hour="";
        selectedData.interviewerName="";
        selectedData.interviewerPhone="";
    var nameAndChain1 = document.getElementById("peopleList1").value.split(" + ");
    var nameAndChain2 = document.getElementById("peopleList2").value.split(" + ");
    var chainVal=document.getElementById("chain").value;

    if(nameAndChain1[1]===nameAndChain2[1]){
        sameChain=true;
    }
  for (var i = 0; i < allPeople.length; i++) {
    
    if (
      allPeople[i].name === nameAndChain1[0] &&
      allPeople[i].chain === nameAndChain1[1]
    ) {
      console.log("row num#1:" + allPeople[i].row+" - "+nameAndChain1[0]);
        
     selectedData.guestName1=allPeople[i].name;
    selectedData.topicOfStory1=allPeople[i].topicOfStory;
    selectedData.message1=allPeople[i].message;
        selectedData.virtue1=allPeople[i].virtue;
    selectedData.aboutTheGuest1=allPeople[i].abouttheguest;
    selectedData.facebookLink1=allPeople[i].facebook;
    selectedData.instagramLink1=allPeople[i].instagram;
    selectedData.websiteLink1=allPeople[i].sites;
    selectedData.email1=allPeople[i].email;
    selectedData.guestPhone1=allPeople[i].guestphone;
        selectedData.order1=allPeople[i].order;
        if(allPeople[i].date!==""){
            selectedData.date=allPeople[i].date;
            
          }
        if(allPeople[i].hour!==""){
            selectedData.hour=allPeople[i].hour;
            
          }
        if(allPeople[i].interviewerName!==""){
            selectedData.interviewerName=allPeople[i].interviewerName;
        }
        if(allPeople[i].interphone!==""){
            selectedData.interviewerPhone=allPeople[i].interphone;
        }
        
      if (allPeople[i].chain !== ""&&chainVal === "") {
        for (var j = 0; j < allChains.length; j++) {
          if (
            allPeople[i].chain === allChains[j].name ||
            allPeople[i].chain === allChains[j].altName
          ) {
            currChain = allChains[j];
            document.getElementById("chain").value=currChain.name;
            document.getElementById("linkToPlaylist").value = currChain.playlist;
            console.log(currChain);
            allPeople[i].chain = allChains[j].name;
            if (
              endsWithNumber(allPeople[i].chain) &&
              allPeople[i].chain === allChains[j].name
            ) {
              allPeople[i].chain = allChains[j].altName;
            }
            if (
              endsWithNumber(allPeople[i].chain) &&
              allPeople[i].chain === allChains[j].altName
            ) {
              allPeople[i].chain = allChains[j].name;
            }
          }
        }
      }
    }
  }
    for (var i = 0; i < allPeople.length; i++) {
    
    if (
      allPeople[i].name === nameAndChain2[0] &&
      allPeople[i].chain === nameAndChain2[1]
    ) {
      console.log("row num#2:" + allPeople[i].row+" - "+nameAndChain2[0]);
        
     selectedData.guestName2=allPeople[i].name;
    selectedData.topicOfStory2=allPeople[i].topicOfStory;
    selectedData.message2=allPeople[i].message;
          selectedData.virtue2=allPeople[i].virtue;
    selectedData.aboutTheGuest2=allPeople[i].abouttheguest;
    selectedData.facebookLink2=allPeople[i].facebook;
    selectedData.instagramLink2=allPeople[i].instagram;
    selectedData.websiteLink2=allPeople[i].sites;
    selectedData.email2=allPeople[i].email;
    selectedData.guestPhone2=allPeople[i].guestphone;
        selectedData.order2=allPeople[i].order;
        if(allPeople[i].date!==""){
            selectedData.date=allPeople[i].date;
            
          }
        if(allPeople[i].hour!==""){
            selectedData.hour=allPeople[i].hour;
            
          }
        if(allPeople[i].interviewerName!==""){
            selectedData.interviewerName=allPeople[i].interviewerName;
        }
        if(allPeople[i].interphone!==""){
            selectedData.interviewerPhone=allPeople[i].interphone;
        }
      if (allPeople[i].chain !== ""&&chainVal === "") {
        for (var j = 0; j < allChains.length; j++) {
          if (
            allPeople[i].chain === allChains[j].name ||
            allPeople[i].chain === allChains[j].altName
          ) {
            currChain = allChains[j];
            document.getElementById("chain").value=currChain.name;

            document.getElementById("linkToPlaylist").value = currChain.playlist;
            console.log(currChain);
            allPeople[i].chain = allChains[j].name;
            if (
              endsWithNumber(allPeople[i].chain) &&
              allPeople[i].chain === allChains[j].name
            ) {
              allPeople[i].chain = allChains[j].altName;
            }
            if (
              endsWithNumber(allPeople[i].chain) &&
              allPeople[i].chain === allChains[j].altName
            ) {
              allPeople[i].chain = allChains[j].name;
            }
          }
        }
      }
    }
  }
    if(document.getElementById("peopleList3").value!==""){
        var nameAndChain3 = document.getElementById("peopleList3").value.split(" + ");
        for (var i = 0; i < allPeople.length; i++) {
    
    if (
      allPeople[i].name === nameAndChain3[0] &&
      allPeople[i].chain === nameAndChain3[1]
    ) {
      console.log("row num#3:" + allPeople[i].row+" - "+nameAndChain3[0]);
        
     selectedData.guestName3=allPeople[i].name;
    selectedData.topicOfStory3=allPeople[i].topicOfStory;
    selectedData.message3=allPeople[i].message;
          selectedData.virtue3=allPeople[i].virtue;
    selectedData.aboutTheGuest3=allPeople[i].abouttheguest;
    selectedData.facebookLink3=allPeople[i].facebook;
    selectedData.instagramLink3=allPeople[i].instagram;
    selectedData.websiteLink3=allPeople[i].sites;
    selectedData.email3=allPeople[i].email;
    selectedData.guestPhone3=allPeople[i].guestphone;
        selectedData.order3=allPeople[i].order;
        if(allPeople[i].date!==""){
            selectedData.date=allPeople[i].date;
            
          }
        if(allPeople[i].hour!==""){
            selectedData.hour=allPeople[i].hour;
            
          }
        if(allPeople[i].interviewerName!==""){
            selectedData.interviewerName=allPeople[i].interviewerName;
        }
        if(allPeople[i].interphone!==""){
            selectedData.interviewerPhone=allPeople[i].interphone;
        }
    }
  }
    
    }    
    if (chainVal !== "") {
        for (var j = 0; j < allChains.length; j++) {
          if (
            chainVal === allChains[j].name ||
            chainVal === allChains[j].altName
          ) {
            currChain = allChains[j];
            document.getElementById("linkToPlaylist").value = currChain.playlist;
            console.log(currChain);
            if (
              endsWithNumber(chainVal) &&
              chainVal === allChains[j].name
            ) {
              chainVal = allChains[j].altName;
            }
            if (
              endsWithNumber(allPeople[i].chain) &&
              chainVal === allChains[j].altName
            ) {
              chainVal = allChains[j].name;
            }
          }
        }
      }

}
function submitDataEng() {
    selectedData.guestName1="";
      selectedData.topicOfStory1="";
        selectedData.virtue1="";
        selectedData.message1="";
        selectedData.aboutTheGuest1="";
        selectedData.facebookLink1="";
        selectedData.instagramLink1="";
        selectedData.websiteLink1="";
        selectedData.email1="";
        selectedData.guestPhone1="";
        selectedData.order1="";
        selectedData.guestName2="";
        selectedData.topicOfStory2="";
    selectedData.virtue2="";
        selectedData.message2="";
        selectedData.aboutTheGuest2="";
        selectedData.facebookLink2="";
        selectedData.instagramLink2="";
        selectedData.websiteLink2="";
        selectedData.email2="";
        selectedData.guestPhone2="";
        selectedData.order2="";
        selectedData.guestName3="";
        selectedData.topicOfStory3="";
        selectedData.message3="";
    selectedData.virtue3="";
        selectedData.aboutTheGuest3="";
        selectedData.facebookLink3="";
        selectedData.instagramLink3="";
        selectedData.websiteLink3="";
        selectedData.email3="";
        selectedData.guestPhone3="";
       selectedData.order3="";
        selectedData.chainName="";
        selectedData.date="";
        selectedData.hour="";
        selectedData.interviewerName="";
        selectedData.interviewerPhone="";
    var nameAndChain1 = document.getElementById("peopleListEng1").value.split(" + ");
    var nameAndChain2 = document.getElementById("peopleListEng2").value.split(" + ");
    
    if(nameAndChain1[1]===nameAndChain2[1]){
  for (var i = 0; i < allPeople.length; i++) {
    
    if (
      allPeople[i].name === nameAndChain1[0] &&
      allPeople[i].chain === nameAndChain1[1]
    ) {
      console.log("row num#1:" + allPeople[i].row+" - "+nameAndChain1[0]);
        
     selectedData.guestName1=allPeople[i].name;
    selectedData.topicOfStory1=allPeople[i].topicOfStory;
    selectedData.message1="";
        selectedData.virtue1="";
    selectedData.aboutTheGuest1=allPeople[i].abouttheguest;
    selectedData.facebookLink1=allPeople[i].facebook;
    selectedData.instagramLink1=allPeople[i].instagram;
    selectedData.websiteLink1=allPeople[i].sites;
        selectedData.email1=allPeople[i].email;
    selectedData.guestPhone1=allPeople[i].guestphone;
        selectedData.order1=allPeople[i].order;
        if(allPeople[i].date!==""){
            selectedData.date=allPeople[i].date;
            
          }
        if(allPeople[i].hour!==""){
            selectedData.hour=allPeople[i].hour;
            
          }
        if(allPeople[i].interviewerName!==""){
            selectedData.interviewerName=allPeople[i].interviewerName;
        }
        if(allPeople[i].interphone!==""){
            selectedData.interviewerPhone=allPeople[i].interphone;
        }
      if (allPeople[i].chain !== "") {
        for (var j = 0; j < allChains.length; j++) {
          if (
            allPeople[i].chain === allChains[j].name ||
            allPeople[i].chain === allChains[j].altName
          ) {
            currChain = allChains[j];
            console.log(currChain);
            allPeople[i].chain = allChains[j].name;
            if (
              endsWithNumber(allPeople[i].chain) &&
              allPeople[i].chain === allChains[j].name
            ) {
              allPeople[i].chain = allChains[j].altName;
            }
            if (
              endsWithNumber(allPeople[i].chain) &&
              allPeople[i].chain === allChains[j].altName
            ) {
              allPeople[i].chain = allChains[j].name;
            }
          }
        }
      }
    }
  }
    for (var i = 0; i < allPeople.length; i++) {
    
    if (
      allPeople[i].name === nameAndChain2[0] &&
      allPeople[i].chain === nameAndChain2[1]
    ) {
      console.log("row num#2:" + allPeople[i].row+" - "+nameAndChain2[0]);
        
     selectedData.guestName2=allPeople[i].name;
    selectedData.topicOfStory2=allPeople[i].topicOfStory;
    selectedData.message2="";
         selectedData.virtue2="";
    selectedData.aboutTheGuest2=allPeople[i].abouttheguest;
    selectedData.facebookLink2=allPeople[i].facebook;
    selectedData.instagramLink2=allPeople[i].instagram;
    selectedData.websiteLink2=allPeople[i].sites;
        selectedData.email2=allPeople[i].email;
    selectedData.guestPhone2=allPeople[i].guestphone;
        selectedData.order2=allPeople[i].order;
        if(allPeople[i].date!==""){
            selectedData.date=allPeople[i].date;
            
          }
        if(allPeople[i].hour!==""){
            selectedData.hour=allPeople[i].hour;
            
          }
        if(allPeople[i].interviewerName!==""){
            selectedData.interviewerName=allPeople[i].interviewerName;
        }
        if(allPeople[i].interphone!==""){
            selectedData.interviewerPhone=allPeople[i].interphone;
        }
      if (allPeople[i].chain !== "") {
        for (var j = 0; j < allChains.length; j++) {
          if (
            allPeople[i].chain === allChains[j].name ||
            allPeople[i].chain === allChains[j].altName
          ) {
            currChain = allChains[j];
            console.log(currChain);
            allPeople[i].chain = allChains[j].name;
            if (
              endsWithNumber(allPeople[i].chain) &&
              allPeople[i].chain === allChains[j].name
            ) {
              allPeople[i].chain = allChains[j].altName;
            }
            if (
              endsWithNumber(allPeople[i].chain) &&
              allPeople[i].chain === allChains[j].altName
            ) {
              allPeople[i].chain = allChains[j].name;
            }
          }
        }
      }
    }
  }
    if(document.getElementById("peopleListEng3").value!==""){
        var nameAndChain3 = document.getElementById("peopleListEng3").value.split(" + ");
        for (var i = 0; i < allPeople.length; i++) {
    
    if (
      allPeople[i].name === nameAndChain3[0] &&
      allPeople[i].chain === nameAndChain3[1]
    ) {
      console.log("row num#3:" + allPeople[i].row+" - "+nameAndChain3[0]);
        
     selectedData.guestName3=allPeople[i].name;
    selectedData.topicOfStory3=allPeople[i].topicOfStory;
    selectedData.message3="";
         selectedData.virtue3="";
    selectedData.aboutTheGuest3=allPeople[i].abouttheguest;
    selectedData.facebookLink3=allPeople[i].facebook;
    selectedData.instagramLink3=allPeople[i].instagram;
    selectedData.websiteLink3=allPeople[i].sites;
        selectedData.email3=allPeople[i].email;
    selectedData.guestPhone3=allPeople[i].guestphone;
        selectedData.order3=allPeople[i].order;
        if(allPeople[i].date!==""){
            selectedData.date=allPeople[i].date;
            
          }
        if(allPeople[i].hour!==""){
            selectedData.hour=allPeople[i].hour;
            
          }
        if(allPeople[i].interphone!==""){
            selectedData.interviewerPhone=allPeople[i].interphone;
        }
        if(allPeople[i].interviewerName!==""){
            selectedData.interviewerName=allPeople[i].interviewerName;
        }
    }
  }
    
    }    
  document.getElementById("linkToPlaylist").value = currChain.playlist;
    }
    else{
        alert("החרוזים שנבחרו לא באותה שרשרת!")
    }
}
function reset() {
  document.getElementById("order").value = "";
  document.getElementById("linkToPlaylist").value = "";
    document.getElementById("chain").value = "";
     document.getElementById("titleCopy").innerHTML="להעתקת הכותרת";
   document.getElementById("textCopy").innerHTML="להעתקת התיאור";
}
function copycat(id) {
    
  var text = document.getElementById(id).innerText;
    while(text.includes("_שורה_ריקה_")){
        text=text.replace("_שורה_ריקה_","");
    }
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
function fixHour(str) {
  var hour = str.getHours();
  var minute = str.getMinutes();
 if (minute < 10){
     return hour+":0" +minute;
 }
 return hour+":"+minute;
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
    var type="panel";
    var lang="heb";

    if(document.getElementById("panelHeb").checked)
    {
             type="panel";
             lang="heb";
         }

    if(document.getElementById("panelPostHeb").checked)
    {
             type="panelPost";
             lang="heb";
         }


      if(document.getElementById("panelEventHeb").checked)
    {
             type="panelEvent";
             lang="heb";
         }

    if(document.getElementById("panelEng").checked)
    {
             type="panel";
             lang="eng";
         }

    if(document.getElementById("panelPostEng").checked)
    {
             type="panelPost";
             lang="eng";
         }
    if(document.getElementById("panelEventEng").checked)
    {
             type="panelEvent";
             lang="eng";
         }
    showText(type,lang);
    fixTitle(type,lang);
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
                (type==="panel"&&linesInPanelHeb[i]==="v")||
                (type==="panelPost"&&linesInPanelPostHeb[i]==="v")||
                (type==="panelEvent"&&linesInPanelEventHeb[i]==="v")
              ){
                    if(currLine!==""&&currLine!=="_שורה_ריקה_"){
                        var testH4 = document.createElement("h4");
                        testH4.innerHTML = currLine;
                        testDiv.append(testH4);
                    }
                    if(currLine==="_שורה_ריקה_"){
                      var testH4 = document.createElement("h4");
                        testH4.innerText = "<br>";
                        testH4.innerHTML = currLine;
                        testH4.style.color="white";
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
                (type==="panel"&&linesInPanelEng[i]==="v")||
                (type==="panelPost"&&linesInPanelPostEng[i]==="v")||
                (type==="panelEvent"&&linesInPanelEventEng[i]==="v")
              ){
                    if(currLine!==""&&currLine!=="_שורה_ריקה_"){
                        var testH4 = document.createElement("h4");
                        testH4.innerHTML = currLine;
                        testDiv.append(testH4);
                    }
                    if(currLine==="_שורה_ריקה_"){
                      var testH4 = document.createElement("h4");
                        testH4.innerText = "<br>";
                        testH4.innerHTML = currLine;
                        testH4.style.color="white";
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
function swapData4titles(line){
    if(line.includes("topicOfStory1")){
        line=line.replace("topicOfStory1", selectedData.topicOfStory1);
    }
    if(line.includes("guestName1")){
        if(currChain.name==="סגולות"){
            if(selectedData.virtue3!==""){
                line=line.replace("guestName1", selectedData.virtue1+", "+selectedData.virtue2+" ו"+selectedData.virtue3+" | "+selectedData.guestName1);
            }
            if(selectedData.virtue3===""){
                line=line.replace("guestName1", selectedData.virtue1+" ו"+selectedData.virtue2+" | "+selectedData.guestName1);
            }
        }
        if(currChain.name!=="סגולות"){
            line=line.replace("guestName1", selectedData.guestName1);
        }
    }
    if(line.includes("firstNameOfGuest1")){
        line=line.replace("firstNameOfGuest1", fixFirstName(selectedData.guestName1));
    }
     if(line.includes("topicOfStory2")){
        line=line.replace("topicOfStory2", selectedData.topicOfStory2);
    }
    if(line.includes("guestName2")){
        if(selectedData.guestName3==="")
            line=line.replace(", guestName2", " ו"+selectedData.guestName2);
        else
           line=line.replace("guestName2", selectedData.guestName2);

    }
    if(line.includes("firstNameOfGuest2")){
        line=line.replace("firstNameOfGuest2", fixFirstName(selectedData.guestName2));
    }
      if(line.includes("topicOfStory3")){
        line=line.replace("topicOfStory3", selectedData.topicOfStory3);
    }
    if(line.includes("guestName3")){
        if(selectedData.guestName3!=="")
            line=line.replace("guestName3", "ו"+selectedData.guestName3);
        else
            line=line.replace("guestName3", selectedData.guestName3);
    }
    if(line.includes("firstNameOfGuest3")){
        line=line.replace("firstNameOfGuest3", fixFirstName(selectedData.guestName3));
    }
    if(line.includes("chainName")){
        line=line.replace("chainName", currChain.name);
    }
    if(line.includes("order")){
        line=line.replace("order", document.getElementById("order").value);
    }
    if(line.includes("interviewerName")){
        line=line.replace("interviewerName", selectedData.interviewerName);
    }
    if(line.includes("firstNameOfInterviewer")){
        line=line.replace("firstNameOfInterviewer", fixFirstName(selectedData.interviewerName));
    }
    return line;
}
function swapWithData(line){
    
     if(line.includes("topicOfStory1")){
        line=line.replace("topicOfStory1", selectedData.topicOfStory1);
        if(selectedData.topicOfStory1==="")
            line="";
    }
    if(line.includes("message1")){
        line=line.replace("message1", selectedData.message1);
        if(selectedData.message1==="")
            line="";
    }
    if(line.includes("virtue1")){
        line=line.replace("virtue1", selectedData.virtue1);
        if(selectedData.virtue1==="")
            line="";
    }
     if(line.includes("aboutTheGuest1")){
        line=line.replace("aboutTheGuest1", selectedData.aboutTheGuest1);
        if(selectedData.aboutTheGuest1==="")
            line="";
    }
    if(line.includes("guestName1")){
        line=line.replace("guestName1", selectedData.guestName1);
        if(selectedData.guestName1==="")
            line="";
    }
    if(line.includes("facebookLink1")){
        line=line.replace("facebookLink1", selectedData.facebookLink1);
        if( selectedData.facebookLink1==="")
            line="";
    }
    if(line.includes("instagramLink1")){
        line=line.replace("instagramLink1", selectedData.instagramLink1);
        if( selectedData.instagramLink1==="")
            line="";
    }
    if(line.includes("websiteLink1")){
        line=line.replace("websiteLink1", selectedData.websiteLink1);
        if(selectedData.websiteLink1===""||selectedData.websiteLink1===" ")
            line="";
    }
    if(line.includes("email1")){
        line=line.replace("email1", selectedData.email1);
        if(selectedData.email1==="")
            line="";
    }
    if(line.includes("guestPhone1")){
        line=line.replace("guestPhone1", selectedData.guestPhone1);
        if(selectedData.guestPhone1==="")
            line="";
    }
    if(line.includes("ordr1")){
        line=line.replace("ordr1", selectedData.order1);
        if(selectedData.order1==="")
            line="";
    }
     if(line.includes("topicOfStory2")){
        line=line.replace("topicOfStory2", selectedData.topicOfStory2);
        if(selectedData.topicOfStory2==="")
            line="";
    }
    if(line.includes("message2")){
        line=line.replace("message2", selectedData.message2);
        if(selectedData.message2==="")
            line="";
    }
     if(line.includes("virtue2")){
        line=line.replace("virtue2", selectedData.virtue2);
        if(selectedData.virtue2==="")
            line="";
    }
     if(line.includes("aboutTheGuest2")){
        line=line.replace("aboutTheGuest2", selectedData.aboutTheGuest2);
        if(selectedData.aboutTheGuest2==="")
            line="";
    }
    if(line.includes("guestName2")){
        line=line.replace("guestName2", selectedData.guestName2);
        if(selectedData.guestName2==="")
            line="";
    }
    if(line.includes("facebookLink2")){
        line=line.replace("facebookLink2", selectedData.facebookLink2);
        if( selectedData.facebookLink2==="")
            line="";
    }
    if(line.includes("instagramLink2")){
        line=line.replace("instagramLink2", selectedData.instagramLink2);
        if( selectedData.instagramLink2==="")
            line="";
    }
    if(line.includes("websiteLink2")){
        line=line.replace("websiteLink2", selectedData.websiteLink2);
        if(selectedData.websiteLink2===""||selectedData.websiteLink2===" ")
            line="";
    }
    if(line.includes("email2")){
        line=line.replace("email2", selectedData.email2);
        if(selectedData.email2==="")
            line="";
    }
    if(line.includes("guestPhone2")){
        line=line.replace("guestPhone2", selectedData.guestPhone2);
        if(selectedData.guestPhone2==="")
            line="";
    }
    if(line.includes("ordr2")){
        line=line.replace("ordr2", selectedData.order2);
        if(selectedData.order2==="")
            line="";
    }
     if(line.includes("topicOfStory3")){
        line=line.replace("topicOfStory3", selectedData.topicOfStory3);
        if(selectedData.topicOfStory3==="")
            line="";
    }
    if(line.includes("message3")){
        line=line.replace("message3", selectedData.message3);
        if(selectedData.message3==="")
            line="";
    }
     if(line.includes("virtue3")){
        line=line.replace("virtue3", selectedData.virtue3);
        if(selectedData.virtue3==="")
            line="";
    }
     if(line.includes("aboutTheGuest3")){
        line=line.replace("aboutTheGuest3", selectedData.aboutTheGuest3);
        if(selectedData.aboutTheGuest3==="")
            line="";
    }
    if(line.includes("guestName3")){
        line=line.replace("guestName3", selectedData.guestName3);
        if(selectedData.guestName3==="")
            line="";
    }
    if(line.includes("facebookLink3")){
        line=line.replace("facebookLink3", selectedData.facebookLink3);
        if( selectedData.facebookLink3==="")
            line="";
    }
    if(line.includes("instagramLink3")){
        line=line.replace("instagramLink3", selectedData.instagramLink3);
        if( selectedData.instagramLink3==="")
            line="";
    }
    if(line.includes("websiteLink3")){
        line=line.replace("websiteLink3", selectedData.websiteLink3);
        if(selectedData.websiteLink3===""||selectedData.websiteLink3===" ")
            line="";
    }
    if(line.includes("email3")){
        line=line.replace("email3", selectedData.email3);
        if(selectedData.email3==="")
            line="";
    }
    if(line.includes("guestPhone3")){
        line=line.replace("guestPhone3", selectedData.guestPhone3);
        if(selectedData.guestPhone3==="")
            line="";
    }
    if(line.includes("ordr3")){
        line=line.replace("ordr3", selectedData.order3);
        if(selectedData.order3==="")
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
        if(selectedData.date!=="")
            line=line.replace("date", fixDate(selectedData.date));
        if(selectedData.date==="")
            line="";
    }
     if(line.includes("hour")){
        if(selectedData.hour!=="")
            line=line.replace("hour", fixHour(selectedData.hour));
        if(selectedData.hour==="")
            line="";
    }
    if(line.includes("interviewerName")){
        line=line.replace("interviewerName", selectedData.interviewerName);
        if(selectedData.interviewerName==="")
            line="";
    }
    if(line.includes("interviewerPhone")){
        line=line.replace("interviewerPhone", selectedData.interviewerPhone);
        if(selectedData.interviewerPhone==="")
            line="";
    }
    if(line.includes("- virtues")){
          if(currChain.name==="סגולות"){
                if(selectedData.virtue3!==""){
                    line=line.replace("virtues", selectedData.virtue1+", "+selectedData.virtue2+" ו"+selectedData.virtue3);
                }
                if(selectedData.virtue3===""){
                    line=line.replace("virtues", selectedData.virtue1+" ו"+selectedData.virtue2);
                }
            }
        if(currChain.name!=="סגולות"){
                line=line.replace("- virtues", "");
        }
    }
    return line;
}
function fixTitle(type,lang) {
    var finalTitle="";
    var finalType="";
    if(lang==="heb"){
        finalType=type+"Heb";
    }
    if(lang==="eng"){
        finalType=type+"Eng";
    }
    finalTitle=swapData4titles(titles[finalType]);
    document.getElementById("title").innerHTML=finalTitle;
}
function fixFirstName(fullName){
    const splittedName = fullName.split(" ");
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
     firstName === "ד״ר" ||
     firstName === 'עו"ד'||
      firstName === 'עו״ד'
      ) {
        firstName = splittedName[1];
      }
    return firstName;       
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

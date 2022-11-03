var timelineCheckboxState = false;
//Find each floor
var floors = {};
var constructionQueue = new Array();
var hiddenNodes = {};
var hiddenNodesArray = new Array();

function findTypes(children, onesArr){
  if( children.length == 0 ){
    return;
  }
  var newKids = new Array();
  for(var i in children ){
    if( viewer.getModel().getNodeType(children[i]) == "1" ){
      var nName = String(viewer.getModel().getNodeName(viewer.getModel().getNodeParent(children[i])))
      var nID = parseInt(viewer.getModel().getNodeParent(children[i]));
      var n = {"name": nName, "id": nID};
      if( n.name == "Stair" || n.name == "unnamed" || n.name.substring(0,7).toLowerCase() == "product"){
        onesArr[String(viewer.getModel().getNodeName(viewer.getModel().getNodeParent(n.id)))]=parseInt(viewer.getModel().getNodeParent(n.id));
      }else{
        onesArr[String(n.name)]=parseInt(n.id);
      }

    }else{
      newKids = newKids.concat(viewer.getModel().getNodeChildren(children[i]));
    }
  }
  findTypes(newKids, onesArr);
}

function floorType(newName, newID){
  this.name = newName;
  this.id = newID;
  this.parts = {};
  this.visibility = true;
};

function getFloors(rootNode){ //3 == rootnode
  var bldFloors = viewer.getModel().getNodeChildren(rootNode);
  for( i in bldFloors ){
    //floors.push( new floorType( String( viewer.getModel().getNodeName( bldFloors[i] ) ), parseInt(bldFloors[i]) ) );
    floorName = viewer.getModel().getNodeName( bldFloors[i] );
    floors[floorName] = ( new floorType( String( floorName ), parseInt(bldFloors[i]) ) );
    findTypes([floors[floorName].id], floors[floorName].parts);
  }
}

function initConstructionQueue(){
  constructionQueue = [
    floors["Foundation"].parts["IFCFOOTING"],
    floors["Foundation"].parts["IFCWALLSTANDARDCASE"],
    floors["Parking 1"].parts["IFCBEAM"],
    floors["Parking 1"].parts[ "IFCCOLUMN"],
    floors["Parking 2"].parts["IFCSLAB"],
    floors["Parking 2"].parts["IFCCOLUMN"],
    floors["Story 1"].parts["IFCSLAB"],
    floors["Story 1"].parts["IFCCOLUMN"],
    floors["Story 2"].parts["IFCSLAB"],
    floors["Story 2"].parts["IFCCOLUMN"],
    floors["Story 3"].parts["IFCSLAB"],
    floors["Story 3"].parts["IFCCOLUMN"],
    floors["Story 4"].parts["IFCSLAB"],
    floors["Story 4"].parts["IFCCOLUMN"],
    floors["Story 5"].parts["IFCSLAB"],
    floors["Parking 1"].parts["IFCBEAM"],
    floors["Story 5"].parts["IFCCOLUMN"],
    floors["Parking 2"].parts["IFCBEAM"],
    floors["Story 6"].parts["IFCSLAB"],
    floors["Story 1"].parts["IFCBEAM"],
    floors["Story 6"].parts["IFCCOLUMN"],
    floors["Story 2"].parts["IFCBEAM"],
    floors["Story 7"].parts["IFCSLAB"],
    floors["Story 3"].parts["IFCBEAM"],
    floors["Story 7"].parts["IFCCOLUMN"],
    floors["Story 4"].parts["IFCBEAM"],
    floors["Story 8"].parts["IFCSLAB"],
    floors["Story 5"].parts["IFCBEAM"],
    floors["Story 8"].parts["IFCCOLUMN"],
    floors["Story 6"].parts["IFCBEAM"],
    floors["Story 9"].parts["IFCSLAB"],
    floors["Story 7"].parts["IFCBEAM"],
    floors["Story 9"].parts["IFCCOLUMN"],
    floors["Story 8"].parts["IFCBEAM"],
    floors["Story 10"].parts["IFCSLAB"],
    floors["Story 9"].parts["IFCBEAM"],
    floors["Story 10"].parts["IFCCOLUMN"],
    floors["Story 10"].parts["IFCBEAM"],
    floors["Story 11"].parts["IFCSLAB"],
    floors["Story 11"].parts["IFCBEAM"],
    floors["Story 11"].parts["IFCCOLUMN"],
    floors["Story 12"].parts["IFCSLAB"],
    floors["Story 12"].parts["IFCCOLUMN"],
    floors["Story 12"].parts["IFCBEAM"],
    
    floors["Parking 1"].parts["IFCDOOR"],
    floors["Parking 2"].parts["IFCDOOR"],
    floors["Story 1"].parts["IFCDOOR"],
    floors["Story 2"].parts["IFCDOOR"],
    floors["Story 3"].parts["IFCDOOR"],
    floors["Parking 1"].parts["IFCCURTAINWALL"],
    floors["Story 4"].parts["IFCDOOR"],
    floors["Parking 1"].parts["IFCSTAIR"],
    floors["Parking 2"].parts["IFCCURTAINWALL"],
    floors["Story 5"].parts["IFCDOOR"],
    floors["Parking 2"].parts["IFCSTAIR"],
    floors["Story 1"].parts["IFCCURTAINWALL"],
    floors["Story 6"].parts["IFCDOOR"],
    floors["Story 1"].parts["IFCSTAIR"],
    floors["Story 2"].parts["IFCCURTAINWALL"],
    floors["Story 7"].parts["IFCDOOR"],
    floors["Story 2"].parts["IFCSTAIR"],
    floors["Story 3"].parts["IFCCURTAINWALL"],
    floors["Story 8"].parts["IFCDOOR"],
    floors["Story 3"].parts["IFCSTAIR"],
    floors["Story 4"].parts["IFCCURTAINWALL"],
    floors["Story 9"].parts["IFCDOOR"],
    floors["Story 4"].parts["IFCSTAIR"],
    floors["Story 5"].parts["IFCCURTAINWALL"],
    floors["Story 10"].parts["IFCDOOR"],
    floors["Story 5"].parts["IFCSTAIR"],
    floors["Story 6"].parts["IFCCURTAINWALL"],
    floors["Story 11"].parts["IFCDOOR"],
    floors["Story 6"].parts["IFCSTAIR"],
    floors["Story 7"].parts["IFCCURTAINWALL"],
    floors["Story 12"].parts["IFCDOOR"],
    floors["Story 7"].parts["IFCSTAIR"],
    floors["Story 8"].parts["IFCCURTAINWALL"],
    floors["Story 9"].parts["IFCCURTAINWALL"],
    floors["Story 8"].parts["IFCSTAIR"],
    floors["Story 10"].parts["IFCCURTAINWALL"],
    floors["Story 9"].parts["IFCSTAIR"],
    floors["Story 11"].parts["IFCCURTAINWALL"],
    floors["Story 10"].parts["IFCSTAIR"],
    floors["Story 12"].parts["IFCCURTAINWALL"],
    floors["Story 11"].parts["IFCSTAIR"],
    floors["Story 12"].parts["IFCSTAIR"],
    floors["Parking 1"].parts["IFCRAILING"],
    floors["Parking 1"].parts["IFCOVERING"],
    floors["Parking 2"].parts["IFCRAILING"],
    floors["Parking 2"].parts["IFCOVERING"],
    floors["Story 1"].parts["IFCRAILING"],
    floors["Story 1"].parts["IFCOVERING"],
    floors["Story 2"].parts["IFCRAILING"],
    floors["Story 2"].parts["IFCOVERING"],
    floors["Story 3"].parts["IFCRAILING"],
    floors["Story 3"].parts["IFCOVERING"],
    floors["Story 4"].parts["IFCRAILING"],
    floors["Story 4"].parts["IFCOVERING"],
    floors["Story 5"].parts["IFCRAILING"],
    floors["Story 5"].parts["IFCOVERING"],
    floors["Story 6"].parts["IFCRAILING"],
    floors["Story 6"].parts["IFCOVERING"],
    floors["Story 7"].parts["IFCRAILING"],
    floors["Story 7"].parts["IFCOVERING"],
    floors["Parking 1"].parts["IFCFURNISHINGELEMENT"],
    floors["Parking 1"].parts["IFCFLOWTERMINAL"],
    floors["Story 8"].parts["IFCRAILING"],
    floors["Parking 2"].parts["IFCFURNISHINGELEMENT"],
    floors["Parking 2"].parts["IFCFLOWTERMINAL"],
    floors["Story 8"].parts["IFCOVERING"],
    floors["Story 9"].parts["IFCRAILING"],
    floors["Story 1"].parts["IFCFURNISHINGELEMENT"],
    floors["Story 1"].parts["IFCFLOWTERMINAL"],
    floors["Story 9"].parts["IFCOVERING"],
    floors["Story 10"].parts["IFCRAILING"],
    floors["Story 2"].parts["IFCFURNISHINGELEMENT"],
    floors["Story 2"].parts["IFCFLOWTERMINAL"],
    floors["Story 10"].parts["IFCOVERING"],
    floors["Story 11"].parts["IFCRAILING"],
    floors["Story 3"].parts["IFCFURNISHINGELEMENT"],
    floors["Story 3"].parts["IFCFLOWTERMINAL"],
    floors["Story 11"].parts["IFCOVERING"],
    floors["Story 4"].parts["IFCFURNISHINGELEMENT"],
    floors["Story 4"].parts["IFCFLOWTERMINAL"],
    floors["Story 12"].parts["IFCRAILING"],
    floors["Story 12"].parts["IFCOVERING"],
    floors["Story 5"].parts["IFCFURNISHINGELEMENT"],
    floors["Story 5"].parts["IFCFLOWTERMINAL"],
    floors["Story 6"].parts["IFCFURNISHINGELEMENT"],
    floors["Story 6"].parts["IFCFLOWTERMINAL"],
    floors["Story 7"].parts["IFCFURNISHINGELEMENT"],
    floors["Story 7"].parts["IFCFLOWTERMINAL"],
    floors["Parking 1"].parts["IFCWALLSTANDARDCASE"],
    floors["Story 8"].parts["IFCFURNISHINGELEMENT"],
    floors["Story 8"].parts[ "IFCFLOWTERMINAL"],
    floors["Parking 2"].parts["IFCWALLSTANDARDCASE"],
    floors["Story 9"].parts["IFCFURNISHINGELEMENT"],
    floors["Story 9"].parts["IFCFLOWTERMINAL"],
    floors["Story 1"].parts["IFCWALLSTANDARDCASE"],
    floors["Story 10"].parts["IFCFURNISHINGELEMENT"],
    floors["Story 10"].parts["IFCFLOWTERMINAL"],
    floors["Story 2"].parts["IFCWALLSTANDARDCASE"],
    floors["Story 11"].parts["IFCFURNISHINGELEMENT"],
    floors["Story 11"].parts["IFCFLOWTERMINAL"],
    floors["Story 3"].parts["IFCWALLSTANDARDCASE"],
    floors["Story 12"].parts["IFCFURNISHINGELEMENT"],
    floors["Story 12"].parts["IFCFLOWTERMINAL"],
    floors["Parking 1"].parts["IFCWINDOW"],
    floors["Story 4"].parts["IFCWALLSTANDARDCASE"],
    floors["Parking 2"].parts["IFCWINDOW"],
    floors["Story 5"].parts["IFCWALLSTANDARDCASE"],
    floors["Story 1"].parts["IFCWINDOW"],
    floors["Story 6"].parts["IFCWALLSTANDARDCASE"],
    floors["Story 2"].parts["IFCWINDOW"],
    floors["Story 7"].parts["IFCWALLSTANDARDCASE"],
    floors["Story 3"].parts["IFCWINDOW"],
    floors["Story 8"].parts["IFCWALLSTANDARDCASE"],
    floors["Story 4"].parts["IFCWINDOW"],
    floors["Story 9"].parts["IFCWALLSTANDARDCASE"],
    floors["Story 5"].parts["IFCWINDOW"],
    floors["Story 10"].parts["IFCWALLSTANDARDCASE"],
    floors["Story 6"].parts["IFCWINDOW"],
    floors["Story 11"].parts["IFCWALLSTANDARDCASE"],
    floors["Story 7"].parts["IFCWINDOW"],
    floors["Story 12"].parts["IFCWALLSTANDARDCASE"],
    floors["Story 8"].parts["IFCWINDOW"],
    floors["Story 9"].parts["IFCWINDOW"],
    floors["Story 10"].parts["IFCWINDOW"],
    floors["Story 11"].parts["IFCWINDOW"],
    floors["Story 12"].parts["IFCWINDOW"],
    floors["Building Skin"].parts["IFCBUILDINGELEMETNPROXY"],
  ]
}
var timelineOnOff = false;
var timelineMax = 160;
var shiftkey = false;
var currentTimelineTime = 0;
completeNodes = new Array();
inProgressNodes = new Array();

function handleTimelineOnOff(cb) {
    if (!timelineCheckboxState) {
      viewer.getModel().resetNodesColor();
      $("#timelineSlider").slider("disable");
      updateFloorVisibility();
    } else {
      initConstructionQueue();
      $("#timelineSlider").slider("enable");
      updateTimelineData();
    }
}

var timelineVisArray = new Array();
var timelineRedArray = new Array();

function updateTimelineData(){
      viewer.getModel().setNodesVisibility([viewer.getModel().getRootNode()], false);
      viewer.getModel().resetNodesColor();
      var visPtr = Math.round(currentTimelineTime / timelineMax * constructionQueue.length) + 1;
      var cqSlice = constructionQueue.slice(0, visPtr);
      var redPtr = Math.round(cqSlice.length * (currentTimelineTime / timelineMax));
      
      //viewer.getModel().setNodesVisibility(constructionQueue.slice(0, visPtr), true);
      timelineVisArray = constructionQueue.slice(0, visPtr);
      if( currentTimelineTime < 160 ){
        //viewer.getModel().setNodesFaceColor(constructionQueue.slice(redPtr,visPtr), new Communicator.Color(255, 0, 0));
        timelineRedArray = constructionQueue.slice( redPtr, visPtr );
      }else{
        viewer.getModel().resetNodesColor();
        timelineRedArray = new Array();
      }
      updateFloorVisibility();
}


function updateHiddenNodesArray(){
    $(".subfloor").each(function (index) {
        var nodeName = this.innerText;
        if( this.className.indexOf( "ui-selected" ) == -1 ) {
            if (nodeName == "Other") {
                //viewer.getModel().setNodesVisibility([floors["Building Skin"].id], false);
                //viewer.getModel().setNodesVisibility([floors["Foundation"].id], false);
                floors["Building Skin"].visibility = false;
                floors["Foundation"].visibility = false;
                hiddenNodes[String( floors["Building Skin"].id )] = floors["Building Skin"].id;
                hiddenNodes[String( floors["Foundation"].id )] = floors["Foundation"].id;
            }else{
                //viewer.getModel().setNodesVisibility([floors[nodeName].id], false);
                floors[nodeName].visibility = false;
                hiddenNodes[String(floors[nodeName].id)] = floors[nodeName].id;
            }
        }else {
          if(nodeName == "Other") {
             //viewer.getModel().setNodesVisibility([floors["Building Skin"].id], true);
             //viewer.getModel().setNodesVisibility([floors["Foundation"].id], true);
             floors["Building Skin"].visibility = true;
             floors["Foundation"].visibility = true;
             delete hiddenNodes[String(floors["Building Skin"].id)]
             delete hiddenNodes[String(floors["Foundation"].id)]
          }else{
            //viewer.getModel().setNodesVisibility([floors[nodeName].id], true);
            floors[nodeName].visibility = true;
            if( hiddenNodes[String(floors[nodeName].id)] != undefined ){
              delete hiddenNodes[String(floors[nodeName].id)];
            }
          }
        }
    });

    $(".ifcelements").each(function (index) {
        var partName = this.innerText.toUpperCase();
        for( n in floors ){
          if( floors[n].parts[partName] != undefined ){
            if( $(this).hasClass('ui-selected') ){
              if( floors[n].visibility == true ){
                //viewer.getModel().setNodesVisibility([floors[n].parts[partName]], true);
                if( hiddenNodes[String(floors[n].parts[partName])] != undefined ){
                  delete hiddenNodes[String(floors[n].parts[partName])];
                }
              }
            }else{
              //viewer.getModel().setNodesVisibility([floors[n].parts[partName]], false);
              hiddenNodes[String(floors[n].parts[partName])] = floors[n].parts[partName];
            }
          }
        }
    });
  //hiddenNodesArray = Object.keys(hiddenNodes).map(key => hiddenNodes[key]);
  hiddenNodesArray = Object.keys(hiddenNodes).map(function(key){
    return hiddenNodes[key];
  });
}

function updateFloorVisibility(){
  viewer.getModel().resetNodesColor();
  if (timelineCheckboxState) {
    viewer.getModel().setNodesVisibility( timelineVisArray, true );
    viewer.getModel().setNodesFaceColor( timelineRedArray, new Communicator.Color(255, 0, 0) );
    
  } else {
    viewer.getModel().setNodesVisibility([viewer.getModel().getRootNode()], true);
  }
  viewer.getModel().setNodesVisibility(hiddenNodesArray, false);
}

var _selectRange = false, _deselectQueue = [];

function setupUiElements(){
    $("#timelineSlider").slider({
        range: false,
        min: 0,
        max: timelineMax,
        value: 0,
        slide: function (event, ui) {
            $("#timeline").val(ui.value + " Days");
            currentTimelineTime = ui.value;
            setTimeout(function () {
            updateTimelineData();
           }, 10);
        },
        stop: function (event, ui) {
            updateTimelineData();
        }
    });
    $("#timeline").val("" + $("#timelineSlider").slider("value") + " Days");
    $("#timelineSlider").slider("disable");
    $('#timelineCheckboxImg').hasClass("timelineChecked") ? ConstructionClick() :  $("#timelineControls").hide();


    $(function () {
        $("#selectable").selectable({
            selected: function (event, ui) {
            },
            selecting: function (event, ui) {
                if (event.detail == 0) {
                    _selectRange = true;
                    return true;
                }
                if ($(ui.selecting).hasClass('ui-selected')) {
                    _deselectQueue.push(ui.selecting);
                }
            },
            unselecting: function (event, ui) {
                $(ui.unselecting).addClass('ui-selected');
            },
            stop: function () {
                if (!_selectRange) {
                    $.each(_deselectQueue, function (ix, de) {
                        $(de)
                            .removeClass('ui-selecting')
                            .removeClass('ui-selected');
                    });
                }
                _selectRange = false;
                _deselectQueue = [];
                updateHiddenNodesArray();
                updateFloorVisibility();
            }
        });
    });
  
    $(function () {
        $("#selectableStructure").selectable({
            selected: function (event, ui) {
            },
            selecting: function (event, ui) {
                if (event.detail == 0) {
                    _selectRange = true;
                    return true;
                }
                if ($(ui.selecting).hasClass('ui-selected')) {
                    _deselectQueue.push(ui.selecting);
                }
            },
            unselecting: function (event, ui) {
                $(ui.unselecting).addClass('ui-selected');
            },
            stop: function () {
                if (!_selectRange) {
                    $.each(_deselectQueue, function (ix, de) {
                        $(de)
                            .removeClass('ui-selecting')
                            .removeClass('ui-selected');
                    });
                }
                _selectRange = false;
                _deselectQueue = [];
                updateHiddenNodesArray();
                updateFloorVisibility();
            }
        });
    });
}


function switchView() {
  var queries = {};
  $.each(document.location.search.substr(1).split('&'), function(c,q){
      var i = q.split('=');
      queries[String(i[0])] = String(i[1]);
  });
    if (queries['viewer']=='ssr') {
        window.location.href = "?viewer=csr";
    }else{
        window.location.href = "?viewer=ssr";
    }
}

function keyDownHandler(event) {
    if (event.shiftKey)
        shiftkey = true;
}

function keyUpHandler(event) {
    shiftkey = false;
};


var targetID = "";
var keyInProgress = false;
function initDemo() {
    window.addEventListener('keydown', keyDownHandler, false);
    window.addEventListener('keyup', keyUpHandler, false);

   $('input').not("#timelineCheckbox").iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
    });

    $('input').not("#timelineCheckbox").on('ifChecked', function (event) {
        if (shiftkey && !keyInProgress) {
            targetID = "#" + event.currentTarget.id;
            setTimeout(function () {
                keyInProgress = true;
                $('input').not("#timelineCheckbox").iCheck('uncheck');
                $(targetID).iCheck('check');
                setTimeout(function () {
                    keyInProgress = false;
                    updateHiddenNodesArray();
                    updateFloorVisibility();
                }, 10);
            }, 10);
        }
        if (!shiftkey){
           updateHiddenNodesArray();
           updateFloorVisibility();
        }
    });

    viewer.setCallbacks({
        selection: function (selection) {
           var uid = selection.getSelection().getNodeId();
           uid = viewer.getModel().getNodeParent(uid);
           var mod = viewer.getModel().getNodeProperties(uid);
        },

        modelStructureReady: function () {
            viewer.getView().setBackgroundColor(new Communicator.Color(230, 230, 230), new Communicator.Color(230, 230, 230))
            updateFloorVisibility();

        }
    });

     $('input').not("#timelineCheckbox").on('ifUnchecked', function (event) {
        if (shiftkey && !keyInProgress) {
            targetID = "#" + event.currentTarget.id;
            setTimeout(function () {
                keyInProgress = true;
                $('input').not("#timelineCheckbox").iCheck('uncheck');
                $(targetID).iCheck('check');
                setTimeout(function () {
                    keyInProgress = false;
                    updateHiddenNodesArray();
                    updateFloorVisibility();
                }, 10);
            }, 10);

        }
        if (!shiftkey)
           updateHiddenNodesArray();
           updateFloorVisibility();

     });

    setupUiElements();

    $("#switchButton").click(function () {
        switchView();
    });

}


// FTS Additions:
function menuToggle() {
    $(".rightside").toggle();
  if ($("#menuIcon").hasClass("menuCollapse"))
  {
    $("#menuIcon").removeClass("menuCollapse");
    $("#menuIcon").addClass("menuExpand");
    $("#menuIcon").attr("src", "/demos/apartment-building-architecture/images/up-arrow.jpg");
    //$("#menuIcon").attr("src", "/css/images/modelbrowser_collapse.png");
  }
  else {
    $("#menuIcon").removeClass("menuExpand");
    $("#menuIcon").addClass("menuCollapse");
    $("#menuIcon").attr("src", "/demos/apartment-building-architecture/images/down-arrow.jpg");
    //$("#menuIcon").attr("src", "/css/images/modelbrowser_expand.png");
  }
}

function toggleArchitectural() {
  $("#selectableStructure").hide();
  $("#notselectableStructure").hide();
  $("#itempanel").hide();
  $("#tabStructural").removeClass("selected");
  $("#selectableStructure").hide();
  $("#notselectableStructure").hide();
  $("#selectable").show();
  $("#notselectable").show();
  $("#tabArchitectural").addClass("selected");
}

function toggleStructural() {
  $("#selectable").hide();
  $("#notselectable").hide();
  $("#selectableStructure").show();
  $("#notselectableStructure").show();
  $("#tabArchitectural").removeClass("selected");
  $("#itempanel").show();
  $("#tabStructural").addClass("selected");
}

function ConstructionClick() {
    timelineCheckboxState = !timelineCheckboxState;
    if ($("#timelineCheckboxImg").hasClass("timelineUnchecked")) {
        $("#timelineControls").show();
        $("#timelineCheckboxImg").removeClass("timelineUnchecked");
        $("#timelineCheckboxImg").addClass("timelineChecked");
        $("#timelineCheckboxImg").attr("src", "/demos/apartment-building-architecture/images/check-box-new.png");
        $("#timelineCheckbox").attr("checked", "checked");
    } else {
        $("#timelineControls").hide();
        $("#timelineCheckboxImg").removeClass("timelineChecked");
        $("#timelineCheckboxImg").addClass("timelineUnchecked");
        $("#timelineCheckboxImg").attr("src", "/demos/apartment-building-architecture/images/unchecked-box-new.png");
        $("#timelineCheckbox").removeAttr("checked");
        if ($("#autoplayCheckbox").hasClass("autoplayChecked")) {
            clearInterval(acOn);
            autoplayClick();
        }
    }
    handleTimelineOnOff();
}

var acOn;
function autoplayClick() {
  if ($("#autoplayCheckbox").hasClass("autoplayUnChecked"))
  {
    $("#autoplayCheckbox").removeClass("autoplayUnChecked");
    $("#autoplayCheckbox").addClass("autoplayChecked");
    $("#playImg").attr("src", "/demos/apartment-building-architecture/images/pause.png");
    acOn = setInterval(autoplay, 500);
  }
  else {
    $("#autoplayCheckbox").removeClass("autoplayChecked");
    $("#autoplayCheckbox").addClass("autoplayUnChecked");
    $("#playImg").attr("src", "/demos/apartment-building-architecture/images/play.png");
    clearInterval(acOn);
  }
}

function toggleAllFloors(target)
{
  if (!$(target).hasClass('subfloor'))
  {
    if ($(target).hasClass("ui-selected"))
    {
      $(target).removeClass("ui-selected").addClass("ui-unselecting")
      $(".subfloor").removeClass("ui-selected").addClass("ui-unselecting");
    }
    else {
      $(".subfloor").addClass("ui-selected");
      $(target).addClass("ui-selected");
    }
  }
  else {
    if ($(".subfloor.ui-selected").length <= 1)
    {
      $(target).removeClass("ui-selected").addClass("ui-unselecting");
    }
    else {
      $(target).addClass("ui-selected");
    }

    $("#selectable").data("ui-selectable")._mouseStop(null);
  }
  updateHiddenNodesArray();
  updateFloorVisibility();
}

function toggleAllDomains(target)
{
  if (!$(target).hasClass('subdomain'))
  {
    if ($(target).hasClass("ui-selected"))
    {
      $(target).removeClass("ui-selected").addClass("ui-unselecting")
      $(".subdomain").removeClass("ui-selected").addClass("ui-unselecting");
    }
    else {
      $(".subdomain").addClass("ui-selected");
      $(target).addClass("ui-selected");
    }
  }
  else {
    if ($(".subdomain.ui-selected").length <= 1)
    {
      $(target).removeClass("ui-selected").addClass("ui-unselecting");
    }
    else {
      $(target).addClass("ui-selected");
    }

    $("#selectableStructure").data("ui-selectable")._mouseStop(null);
  }
  updateHiddenNodesArray();
  updateFloorVisibility();
}

function autoplay() {
  currentTimelineTime = currentTimelineTime < timelineMax ? ++currentTimelineTime : 0 ;
  $("#timelineSlider").slider({value: currentTimelineTime});
  $("#timeline").val(currentTimelineTime + " Days");
  updateTimelineData();
}


function toggleStructuralItem(item) {
  //console.log("Are we toggling?");
  if ($(item).hasClass("ui-selected"))
  {
    $(item).removeClass("ui-selected");
  }
  else {
    $(item).addClass("ui-selected");
  }

  updateFloorVisibility();
}

var views = JSON.parse('{ "cameras" :[' +
    '{"name":"Default View",' +
        '"camera":{"position":{"x":-53469,"y":-23219,"z":30264},"target":{"x":-636,"y":-1873,"z":18152},"up":{"x":0.19277308590766995,"y":0.07788537845601243,"z":0.9781474352940858},"width":65000,"height":65000,"projection":0,"nearLimit":0.01,"className":"Communicator.Camera"}' +
    '},' +
    '{"name":"Kitchen",' +
        '"camera":{"position": {"x": -1228.5878296727456,"y": -1230.0229432348012,"z": 25901.03008916919},"target": {"x": 4.260430626285199,"y": 178.40595765962325,"z": 25503.167910590724},"up":{"x": 0.13694107156879134,"y": 0.15644404029913325,"z": 0.978147435294125},"width": 2135.158653203469,"height": 2135.158653203469,"projection": 1,"nearLimit": 0.01,"className": "Communicator.Camera"}' +
    '},' +
    '{"name":"Bathroom",' +
        '"camera":{"position": {"x": 490.2733675172111,"y": 6667.540118030185,"z": 28930.989796588216},"target": {"x": 524.4025194072624,"y": 5269.912636664929,"z": 27915.26021636236},"up": {"x": 0.01434897248698102,"y": -0.587606698864515,"z": 0.8090194524472912}, "width": 1928.1461310494353,"height": 1928.1461310494353,"projection": 1,"nearLimit": 0.01,"className": "Communicator.Camera"}' +
    '},' +
    '{"name":"Roof 1",' +
        '"camera":{"position": {"x": -943.3460819647689,"y": 18744.940065043746,"z": 55316.445509067526},"target": {"x": -1340.972530604844,"y": 1048.0923422818214,"z": 39378.11057055665},"up": {"x": -0.015030749861364885,"y": -0.6689617664147772,"z": 0.743144825477394},"width": 26577.252625101413,"height": 26577.252625101413,"projection": 1,"nearLimit": 0.01,"className": "Communicator.Camera"}' +
    '},' +
    '{"name":"Roof 2",' +
        '"camera":{"position": {"x": 3030.4207686287155,"y": 2726.000007130022,"z": 43281.65291736975},"target": {"x": 152.099044347965,"y": 5684.059240438178,"z": 41698.2945083578},"up": {"x": -0.24978496845081713,"y": 0.2567047060912416,"z": 0.9336541990515728},"width": 4932.432350158377,"height": 4932.432350158377,"projection": 1,"nearLimit": 0.01,"className": "Communicator.Camera"}' +
    '},' +
    '{"name":"Garage",' +
        '"camera":{"position": {"x": -2895.435830362874,"y": -2501.1586127379614,"z": 4058.5831144068175}, "target": {"x": 35.132860347879614,"y": 801.1863005648047,"z": 3370.6373278034685},"up": {"x": 0.10218863073288556,"y": 0.11515242961811423,"z": 0.9880776293905168},"width": 4985.793275571217,"height": 4985.793275571217,"projection": 1,"nearLimit": 0.01,"className": "Communicator.Camera"}' +
    '}' +
    ']}');

    
async function toggleView(index)
{
    var newcamera = Communicator.Camera.fromJson(views.cameras[index].camera);
    await viewer.view.setCamera(newcamera);
    if(index == 0 || index == 3 ){
      viewer.operatorManager.set(Communicator.OperatorId.Navigate, 0);
    }
    else{
        viewer.operatorManager.set(Communicator.OperatorId.Navigate, 0);
        enableKeyboardWalk();
            
    }
    
}

function enableKeyboardWalk() {
  // var keyboardWalkOperator = viewer.operatorManager.getOperator(Communicator.OperatorId.KeyboardWalk);
  // keyboardWalkOperator.setWalkSpeed(10);
  // keyboardWalkOperator.setElevationSpeed(10);
  var walkModeOperator = viewer.operatorManager.getOperator(Communicator.OperatorId.WalkMode);
 
  walkModeOperator.setWalkMode(1);
  viewer.operatorManager.set(Communicator.OperatorId.WalkMode, 0);
}

$(document).ready(function (e) {
  //$("#itempanel li").unbind("click").bind("click", function () {
  //    toggleStructuralItem($(this));
  //});

  $("#notselectable li").unbind("click").bind("click", function (e) {
    toggleAllFloors(e.target);
  });
  $("#notselectableStructure li").unbind("click").bind("click", function (e) {
    toggleAllDomains(e.target);
  });

  window.onresize = function(){
      viewer.resizeCanvas();
    }


   $("#timelinePanel #construction").unbind("click").bind("click", function () {
     if ($("#constructionArrow").attr("src") == "/demos/apartment-building-architecture/images/arrow_down.png")
     {
       $("#constructionArrow").attr("src", "/demos/apartment-building-architecture/images/arrow_up.png");
     }
     else {
       $("#constructionArrow").attr("src", "/demos/apartment-building-architecture/images/arrow_down.png");
     }
     $("#ConstructionExpand").toggle();
   });
});

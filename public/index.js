/**
 * Created by luc on 03/08/16.
 */
$(document).ready(function () {
  var options = {
    data: [
      {
        "id": "group1",
        "name": "group1",
        "childs": [
          {
            "id": "viewType",
            "name": "viewType",
            "type": "combo",
            "selectedIndex": 2,
            "options": [
              {text: "Standard", value: "1"},
              {text: "Actual", value: "2"},
              {text: "Yard Plan", value: "3"}
            ]
          }
        ]
      },
      {
        "id": "group2",
        "name": "group2",
        "childs": [
          {
            "id": "btnDedicate",
            "name": "btnBoundary",
            "text": "D",
            "type": "toggleButton",
            "styleName": "btn btn-default btn-sm"
          },
          {
            "id": "btnNomination",
            "name": "btnBoundary",
            "text": "N",
            "type": "toggleButton",
            "styleName": "btn btn-default btn-sm"
          },
          {
            "id": "btnBoundary",
            "name": "btnBoundary",
            "text": "B",
            "type": "toggleButton",
            "styleName": "btn btn-default btn-sm"
          }
        ]
      },
      {
        "id": "group3",
        "name": "group3",
        "childs": [
          {
            "id": "btnShowCargo",
            "name": "btnShowCargo",
            "type": "toggleButton",
            "useIcon": "fa fa-car fa-lg",
            "styleName": "btn btn-default btn-sm"
          },
          {
            "id": "btnDisabled",
            "name": "btnDisabled",
            "type": "toggleButton",
            "useImage": "./assets/images/bd.png",
            "imageStyle": "width: 14px;height:17px",
            "styleName": "btn btn-default btn-sm",
            "state": {
              "disabled": true
            }
          },
          {
            "id": "btnNW",
            "name": "btnNW",
            "type": "toggleButton",
            "useImage": "./assets/images/nw.png",
            "imageStyle": "width: 14px;height:17px",
            "styleName": "btn btn-default btn-sm"
          }
        ]
      },
      {
        "id": "group4",
        "name": "group4",
        "childs": [
          {
            "id": "btnShowNL",
            "name": "btnShowNL",
            "text": "N",
            "type": "toggleButton",
            "styleName": "btn btn-default btn-sm"
          },
          {
            "id": "btnShowWL",
            "name": "btnShowWL",
            "text": "W",
            "type": "toggleButton",
            "styleName": "btn btn-default btn-sm"
          }
        ]
      },
      {
        "id": "group5",
        "name": "group5",
        "childs": [
          {
            "id": "optXYZ",
            "name": "optXYZ",
            "type": "combo",
            "selectedIndex": 0,
            "options": [
              {text: "POD", value: "444"},
              {text: "Shipper", value: "445"},
              {text: "Consignee", value: "446"},
              {text: "Commodity", value: "447"},
              {text: "Maker + POD", value: "448"}
            ]
          }
        ]
      },
      {
        "id": "group6",
        "name": "group6",
        "childs": [
          {
            "id": "btnLevel1",
            "name": "btnLevel1",
            "text": "1",
            "type": "toggleButton",
            "styleName": "btn btn-default btn-sm"
          },
          {
            "id": "btnLevel2",
            "name": "btnLevel2",
            "text": "2",
            "type": "toggleButton",
            "styleName": "btn btn-default btn-sm"
          },
          {
            "id": "btnLevel3",
            "name": "btnLevel3",
            "text": "3",
            "type": "toggleButton",
            "styleName": "btn btn-default btn-sm"
          }
        ]
      },
      {
        "id": "group7",
        "name": "group7",
        "childs": [
          {
            "id": "inpZoom",
            "name": "inpZoom",
            "type": "inputText",
            "value": "100%",
            "styleName": "col-md-1 col-lg-1",
            "inlineStyle": "width: 62px"
          },
          {
            "id": "btnZoomOut",
            "name": "btnZoomOut",
            "text": "-",
            "type": "button",
            "useIcon": "fa fa-minus",
            "styleName": "btn btn-default btn-sm"
          },
          {
            "id": "btnZoomIn",
            "name": "btnZoomIn",
            "text": "+",
            "type": "button",
            "useIcon": "fa fa-plus",
            "styleName": "btn btn-default btn-sm"
          }
        ]
      },
      {
        "id": "group8",
        "name": "group8",
        "childs": [
          {
            "id": "btnManual",
            "name": "btnManual",
            "type": "toggleButton",
            "text": "Manual",
            "styleName": "btn btn-default btn-sm"
          },
          {
            "id": "btnDrag",
            "name": "btnDrag",
            "type": "toggleButton",
            "useIcon": "fa fa-crop fa-lg",
            "styleName": "btn btn-default btn-sm"
          },
          {
            "id": "btnSave",
            "name": "btnSave",
            "type": "button",
            "useIcon": "fa fa-save fa-lg",
            "styleName": "btn btn-default btn-sm"
          },
          {
            "id": "btnD1",
            "name": "XaX",
            "type": "radio",
            "value": "2",
            "useHtml": '<div class="icon icon-down-right"><i class="fa fa-long-arrow-down"></i><i class="fa fa-long-arrow-right"></i></div>'
          },
          {
            "id": "btnD2",
            "name": "XaX",
            "type": "radio",
            "value": "3",
            "useHtml": '<div class="icon icon-left-down"><i class="fa fa-long-arrow-left"></i><i class="fa fa-long-arrow-down"></i></div>'
          },
          {
            "id": "btnD3",
            "name": "XaX",
            "type": "radio",
            "value": "4",
            "useHtml": '<div class="icon icon-up-right"><i class="fa fa-long-arrow-up"></i><i class="fa fa-long-arrow-right"></i></div>'
          },
          {
            "id": "btnD4",
            "name": "XaX",
            "type": "radio",
            "value": "5",
            "useHtml": '<div class="icon icon-left-up"><i class="fa fa-long-arrow-left"></i><i class="fa fa-long-arrow-up"></i></div>'
          }
        ]
      },
      {
        "id": "group9",
        "name": "group9",
        "childs": [
          {
            "id": "btnMove",
            "name": "btnMove",
            "text": "M",
            "type": "toggleButton",
            "useIcon": "fa fa-hand-rock-o fa-lg",
            "styleName": "btn btn-default btn-sm"
          }
        ]
      },
      {
        "id": "group9",
        "name": "group9",
        "childs": [
          {
            "id": "btnCurrent",
            "name": "btnCurrent",
            "type": "button",
            "text": "Current",
            "styleName": "btn btn-default btn-sm"
          }
        ]
      }
    ],
    onDropDownSelected: onDropDownSelected,
    onButtonToggled: onButtonToggled
  };
  var $toolbar = $('#toolbar').toolbar(options);
  console.log($toolbar);

  function onDropDownSelected(event, item) {
  }

  function onButtonToggled(event, item) {
    switch (item.id) {
      case "btnBoundary":
        console.log("I am btnBoundary and my state: " + item.state.toggled);
        break;
      case "btnDedicate":
        console.log("I am btnDedicate and my state: " + item.state.toggled);
        break;
      case "btnNomination":
        console.log("I am btnNomination and my state: " + item.state.toggled);
        break;
    }
  }
});
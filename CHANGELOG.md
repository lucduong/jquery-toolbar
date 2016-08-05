# v1.0.1
## Bug fixes
- Radio button is broken 

## Features
- New Functions
    - `hideItemById(id, flag)` - Hide an item by item id
        - Usage `$('#toolbar').toolbar('hideItemById', ['item01', false])`
    - `hideGroupById(id, flag)` - Hide a group by group id
        - Usage `$('#toolbar').toolbar('hideGroupById', ['item01', false])`
    - `hideGroupByItemId(id, flag)` - Hide a group that contains the item by item id
        - Usage `$('#toolbar').toolbar('hideGroupByItemId', ['item01', false])`
- New Events
    - `onButtonClick(event, item)` - When normal button click


# v1.0.0
The first version

![Example](https://github.com/lucduong/jquery-toolbar/blob/master/screenshots/ExampleToolbar.png)

## Available functions:
**getState(id)**
Get the state of item by Id

`$('#toolbar').toolbar('getState', id)`

**getSelectedItem(id)**
Get selected item by Id

`$('#toolbar').toolbar('getState', id);`

**getItemValue(id)**
Get value of item by Id

`$('#toolbar').toolbar('getItemValue', id);`

## Available events:
`onDropDownSelected(event, item)` - When selected an item in dropdown list

`onButtonToggled(event, item)` - When toggled the button

`onItemSelected(event, item)` - When selected radio or checkbox
import React from 'react';
import CreateMenu from './CreateMenu'
import SplitPane from 'react-split-pane';
import {LeftPanel, RightPanel, Panels, ResizerPanel} from './style.js'
import {createMapping, createJsonFile, populateOptions} from './util';
import {addNewOption} from './addingNewOptions';
import MenuVis from './MenuVis';
import PriceSetVis from './PriceSetVis';
import MeanShift from './MeanShift';


class Sections extends React.Component {
  //TODO:Deal with a file being loaded with exisiting counters
  counter = {cb: 0, dd: 0, cp: 0, sc:0, md: 0};

  state = {
    height : window.innerHeight - 70,
    mapping : {},
    stl: {},
    models: [],
    numVarients : 0,
    options : [
      {
        id : "sc" + this.counter.sc++,
        section : "Body",
        type : "section",
        colorId : "",
        hasCostTier : false,
        costTier: {Stand: 1.00, Prem: 2.00, UltPrem:3.00},
        colorInclusion :"all",
        items: [],
        modelSection : {
          models:{ 
            "md0":{
              id: "md" + this.counter.md++,
              name: "Body",
              filename: "LitRoc-Standard.stl",
              show: true,
              colorId: "",
              price:{Stand: 1.00, Prem: 2.00, UltPrem: 3.00},
              inGroup: true,
              selected: true,
              group: "Nozzle"          
            },
            "md1":{
              id: "md" + this.counter.md++,
              name: "Bottom Plate",
              filename: "LitRoc-BottomPlate.stl",
              show: true,
              colorId: "",
              price:{Stand: 1.00, Prem: 2.00, UltPrem: 3.00},
              inGroup: true,
              selected: false,
              group: "Nozzle"           
            }
          }, 
          modelOrder:["md0", "md1"]
        },
        multiSelect : false
      }
  ]
  }

  determineNumberofVarients = (options) => {
    var res = options.reduce((sum, option) => {
      if(option.priceDiff){
        if(option.type === "colorpicker"){
          return sum * 3;
        } else if(option.type === "dropdown"){
          return sum * ((option.items.length === 0) ? 1 : option.items.length);
        } else if(option.type === "checkbox"){
          return sum * 2;
        }  else {
          console.log("Type not implemented for Counting")
          return sum;
        }
      } else if(option.type === 'section'){
          if(option.multiSelect && option.hasCostTier){
            return sum * 4 * option.modelSection.modelOrder.length;
          } else if(option.multiSelect ) {
            return sum * 2 * option.modelSection.modelOrder.length;
          } else if(option.hasCostTier ) {
            return sum * 3;
          } else {
            return sum;
          }
      }
      return sum;
    }, 1);
    return res;
  }

  handleAddingNewOptions = (optiontype) => {
    const newOption =  addNewOption(optiontype, this.counter);
    if(newOption){
      const options = this.state.options.slice();
      options.push(newOption);
      this.setState({options : options,
        numVarients : this.determineNumberofVarients(options)});
    } else {
      console.log("Option type "+ optiontype + " is not implemented for Add");
    }
  }

  handleUpdateingOptions = (idx, event, isDict) => {
    const options = this.state.options.slice();
    const {name, value, type, checked} = event.target
    
    if(type === "number"){
      if(name.split(".").length === 2){
        const [prop, val] = name.split(".");
        options[idx][prop][val] = parseFloat(value);
      } else {
        options[idx][name] = parseFloat(value);
      }
    } else if (type === "checkbox") {
      options[idx][name] = checked;
    }  else {
      options[idx][name] = value;
    }
    console.log(options);
    this.setState({options : options,
                   numVarients : this.determineNumberofVarients(options)});
  }

  handleUpdatingTagOrder = (idx, tags) => {
    const options = this.state.options.slice();
    options[idx].items = tags;
    this.setState({options : options,
                   numVarients : this.determineNumberofVarients(options)});
  }

  handleClickDeleteTag = (idx, tagInfo) => {
    const options = this.state.options.slice();
    const tags = options[idx].items.filter(t => tagInfo.id !== t.id);
    options[idx].items = tags;
    this.setState({options : options,
                   numVarients : this.determineNumberofVarients(options)})
  }

  handleClickAddTag = (idx, tagInfo) => {
    const options = this.state.options.slice();
    if(options[idx].type === "colorpicker" || options[idx].type === "section"){
      options[idx]["items"].push({id: tagInfo.tagId, name: tagInfo.tagName});
    } else {
      if(tagInfo.tagName.includes("$")){
        var tagName = tagInfo.tagName.split("$")
        options[idx]["items"].push({id: options[idx].id + "t" + tagInfo.tagId, name: tagName[0], price: parseFloat(tagName[1])});
      } else {
        options[idx]["items"].push({id: options[idx].id + "t" + tagInfo.tagId, name: tagInfo.tagName});
      }
      
    }

    this.setState({options : options,
                   numVarients : this.determineNumberofVarients(options)})
  }

  handleClickDeleteOption = (panelInfo) => {
    const options = this.state.options.slice();
    const newOptions = options.filter(t => panelInfo.id !== t.id);
    this.setState({options: newOptions,
                   numVarients : this.determineNumberofVarients(newOptions)});
  }

  handleUpdatingOptionOrder = (layout) => {
    layout.sort((a,b)=>{return a.y - b.y});
    const layoutOrder = layout.map(l => l.i);
    const newOptions = this.state.options.slice().sort((a,b) =>
                                      {
                                        var A = a["id"], B = b["id"]
                                        return layoutOrder.indexOf(A) - layoutOrder.indexOf(B)
                                      });
    this.setState({options: newOptions,
                   numVarients : this.determineNumberofVarients(newOptions)});
  }

  handleClickDuplicateOption = (panel) => {
    const newPanel = JSON.parse(JSON.stringify(panel));
    if(newPanel.type === "checkbox"){
      newPanel.id = "cb" + this.counter.cb++;
    } else if(newPanel.type === "dropdown"){
      newPanel.id = "dd" + this.counter.dd++;
    } else if(newPanel.type === "colorpicker"){
      newPanel.id = "cp" + this.counter.cp++;
    } else if(newPanel.type === "section"){
      newPanel.id = "sc" + this.counter.sc++;
      let newModelOrder = [];
      newPanel.modelSection.modelOrder.forEach((modelId) =>{
        var newModelId = "md" + this.counter.md++;
        newPanel.modelSection.models[modelId].id = newModelId;
        newPanel.modelSection.models[newModelId] = newPanel.modelSection.models[modelId];
        delete newPanel.modelSection.models[modelId];
        newModelOrder.push(newModelId);
      });
      newPanel.modelSection.modelOrder = newModelOrder;
      console.log(newPanel);
    } else if(newPanel.type === "stl"){
      console.log("Can't duplicate this version.");
      return;
    } else {
      console.log("Duplicate is not implement for this type");
    }
    const options = this.state.options.slice();
    options.push(newPanel);
    this.setState({options: options});
  }

  handleSetPrice = () => {

    for(var i = 0; i < this.state.options.length; i++){
      var option = this.state.options[i];
      if(option.selected === "" || option.colorId === ""){
        alert("Option " + (option.name ? option.name : option.section) + " does not have default selected.");
        return;
      }
    };

    const newMapping = createMapping(this.state.options);
    if(Object.keys(newMapping).length === Object.keys(this.state.mapping).length){
      var match = true;
      for(const [key] of Object.entries(this.state.mapping)){
        if(newMapping.hasOwnProperty(key) === false){
          match = false;
          break;
        }
      }
      if(match){
        return;
      }
    }
    this.setState({mapping: newMapping});
    this.setState({height: window.innerHeight/2})
  }

  exportJson = (columns) => {
    createJsonFile(this.state, columns);
  }

  importJson = (textArea)=>{
    const newState = populateOptions(textArea, this.counter);
    this.setState({options: newState.options,
                    mapping: newState.mapping});
  }

  changeHeight = (direction)=>{
    if(direction ==="up"){
      this.setState({height: 50});
    } else {
      this.setState({height: window.innerHeight-70});
    }
  }

  updateHeight = (size)=>{
    this.setState({height: size});
  }
  
  reorderModels = (optionIdx, result)=>{
    const {destination, source, draggableId} = result;
    if(!destination){
      return;
    }
    if(destination.droppableId === source.drop 
      && destination.index === source.index){
        return;
    }
    const options = this.state.options.slice();

    const newModelOrder = Array.from(options[optionIdx].modelSection.modelOrder);
    newModelOrder.splice(source.index, 1);
    newModelOrder.splice(destination.index, 0, draggableId);
    options[optionIdx].modelSection.modelOrder = newModelOrder;

    this.setState({options : options});
  }

  handleClickAddModel = (idx, event) => {
    const options = this.state.options.slice();
    var id = "md" + this.counter.md++;
    options[idx].modelSection.models[id] = {
        id: id,
        name: "",
        filename: "",
        show: true,
        price:{Stand: 1.00, Prem: 2.00, UltPrem: 3.00},
        colorId:"",
        inGroup: false,
        selected: false,
        group:""     
    };
    options[idx].modelSection.modelOrder.push(id);

    this.setState({options : options,
      numVarients : this.determineNumberofVarients(options)})
  }

  handleDeleteModel = (idx, modelId) => {
    const options = this.state.options.slice();
    //delete dict
    delete options[idx].modelSection.models[modelId];
    //remove from order
    const newModelOrder = options[idx].modelSection.modelOrder;
    newModelOrder.splice(newModelOrder.indexOf(modelId), 1);
    options[idx].modelSection.modelOrder = newModelOrder;

    this.setState({options : options,
      numVarients : this.determineNumberofVarients(options)})
  }

  handleUpdatingModel = (idx, modelId, event) => {
    const options = this.state.options.slice();
    const {name, value, type, checked} = event.target
    console.log(name);
    if(type === "number"){
      if(name.split(".").length === 2){
        const [prop, val] = name.split(".");
        options[idx].modelSection.models[modelId][prop][val] = parseFloat(value);
      } else {
        options[idx].modelSection.models[modelId][name] = parseFloat(value);
      }
    } else if (type === "checkbox") {
      options[idx].modelSection.models[modelId][name] = checked;
    }  else {
      options[idx].modelSection.models[modelId][name] = value;
    }
    console.log(options[idx].modelSection.models[modelId]);
    this.setState({options : options,
                   numVarients : this.determineNumberofVarients(options)});
  }

  handleClickDupModel = (idx, model) =>{
    const newModel = JSON.parse(JSON.stringify(model));
    var id = "md" + this.counter.md++;
    newModel.id = id;
    const options = this.state.options.slice();
    options[idx].modelSection.models[id] = newModel;
    options[idx].modelSection.modelOrder.push(id);

    this.setState({options : options,
                   numVarients : this.determineNumberofVarients(options)});
  }
  mapOptionstoId(options){
    var mapOption = {}
    options.forEach((option)=>{
      mapOption[option.id] = option;
      if(option.type === 'section'){
        option.modelSection.modelOrder.forEach((modelId) =>{
          var model =  option.modelSection.models[modelId];
          mapOption[model.id] = model;
        })
      }
    })
    return mapOption;
  }

  calculatePriceofVariant = (mapping, optionMap) => {
    var prices = [];
    for( const[key, value] of Object.entries(mapping)){
      var lstOptions = value.id.split("&");
      const sum = lstOptions.reduce((currSum, priceSet)=>{
        let [id, set] = priceSet.split("=");
        if(optionMap[id].type === 'checkbox') {
          if(set === "true"){
            return currSum + optionMap[id].price;
          }
          return currSum;
        } else if(optionMap[id].type === 'dropdown'){
          for(var j = 0; j < optionMap[id].items.length; j++){
            if(optionMap[id].items[j].id === set){
              return currSum + optionMap[id].items[j].price;
            }
          }
          return currSum;
        } else if(optionMap[id].type === 'section'){
          if(set ==='Stand'){
            return currSum;
          }
          return currSum + optionMap[id].costTier[set];
        } else {
          if(set === "false"){
            return currSum;
          } else if(set ==='Stand' && optionMap[id].type ==='colorpicker'){
            return currSum;
          }
          return currSum + optionMap[id].price[set];
        }
      }, 0);
      prices.push(sum);
    }
    return prices;
  }
  
  generatePriceBuckets = () => {
    if(Object.entries(this.state.mapping).length === 0){
      return;
    }
    const optionMap = this.mapOptionstoId(this.state.options);
    const prices = this.calculatePriceofVariant(this.state.mapping, optionMap);

    var meanShift = new MeanShift();
    var results = meanShift.cluster(prices, .5);
    return results;
  }

  combineSamePrices = () => {
    if(Object.entries(this.state.mapping).length === 0){
      return;
    }
    const optionMap = this.mapOptionstoId(this.state.options);
    const prices = this.calculatePriceofVariant(this.state.mapping, optionMap);

    var meanShift = new MeanShift();
    var results = meanShift._pointGrouper(prices);
    return [prices, results];
  }

  render(){
    const height = window.innerHeight - this.state.height - 70;
    const width = window.innerWidth - 505;
    return (
      <Panels>
      <LeftPanel>
        <CreateMenu
          data = {this.state}
          handleAdd = {this.handleAddingNewOptions}
          handleUpdate = {this.handleUpdateingOptions}
          handleUpdatingTagOrder = {this.handleUpdatingTagOrder}
          handleClickDeleteTag = {this.handleClickDeleteTag}
          handleClickAddTag = {this.handleClickAddTag}
          handleClickDeleteOption = {this.handleClickDeleteOption}
          handleUpdatingOptionOrder = {this.handleUpdatingOptionOrder}
          handleClickDuplicateOption = {this.handleClickDuplicateOption}
          handleSetPrice = {this.handleSetPrice}
          importJson = {this.importJson}
          reorderModels = {this.reorderModels}
          handleClickAddModel = {this.handleClickAddModel}
          handleDeleteModel = {this.handleDeleteModel}
          handleUpdatingModel = {this.handleUpdatingModel}
          handleClickDupModel = {this.handleClickDupModel}
        />
      </LeftPanel>
      <RightPanel>
        <ResizerPanel>
          <SplitPane split="horizontal" 
            style={{position:"relative"}} 
            paneStyle={{overflow:"auto", display:"inline", width:width}}
            size={this.state.height}
            onDragFinished={this.updateHeight}
            >
            <MenuVis data={this.state} />          
            <PriceSetVis 
              mapping={this.state.mapping} 
              exportJson={this.exportJson} 
              changeHeight={this.changeHeight}
              generatePriceBuckets={this.generatePriceBuckets}
              combineSamePrices={this.combineSamePrices}
              height={height}
              />
          </SplitPane>
        </ResizerPanel>
      </RightPanel>
    </Panels>
    );
  }
}


export default Sections;

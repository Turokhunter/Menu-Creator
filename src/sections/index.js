import React from "react";
import CreateMenu from "./CreateMenu";
import SplitPane from "react-split-pane";
import { LeftPanel, RightPanel, Panels, ResizerPanel } from "./style.js";
import { createMapping, createJsonFile, populateOptions } from "./util";
import { addNewOption } from "./addingNewOptions";
import MenuVis from "./MenuVis";
import PriceSetVis from "./PriceSetVis";
import MeanShift from "./MeanShift";

class Sections extends React.Component {
  //TODO:Deal with a file being loaded with exisiting counters
  counter = { cb: 0, dd: 0, cp: 0, sc: 0, md: 0, ps: 0, cn: 0 };
  storage = window.localStorage;

  state = {
    height: window.innerHeight - 70,
    mapping: {},
    numVarients: 0,
    options:
      /*[],*/ localStorage.getItem("options") !== null
        ? this.updateCounter(
            JSON.parse(localStorage.getItem("options")),
            this.counter
          )
        : [],
  };

  updateOptions(options) {
    this.storage.setItem("options", JSON.stringify(options));
    this.setState({
      options: options,
      numVarients: this.determineNumberofVarients(options),
    });
  }

  determineNumberofVarients = (options) => {
    var res = options.reduce((sum, option) => {
      if (option.priceDiff) {
        if (option.type === "colorpicker") {
          return sum * 3;
        } else if (option.type === "dropdown") {
          return sum * (option.items.length === 0 ? 1 : option.items.length);
        } else if (option.type === "checkbox") {
          return sum * 2;
        } else {
          console.log("Type not implemented for Counting");
          return sum;
        }
      } else if (option.type === "section") {
        if (option.multiSelect && option.hasCostTier) {
          return sum * Math.pow(4, option.modelSection.modelOrder.length);
        } else if (option.multiSelect) {
          return sum * Math.pow(2, option.modelSection.modelOrder.length);
        } else if (option.hasCostTier) {
          return sum * 3;
        } else {
          return sum;
        }
      }
      return sum;
    }, 1);
    return res;
  };

  handleAddingNewOptions = (optiontype) => {
    const newOption = addNewOption(optiontype, this.counter);
    if (newOption) {
      const options = this.state.options.slice();
      options.push(newOption);
      this.updateOptions(options);
    } else {
      console.log("Option type " + optiontype + " is not implemented for Add");
    }
  };

  handleUpdateingOptions = (idx, event, isDict) => {
    const options = this.state.options.slice();
    const { name, value, type, checked } = event.target;

    if (type === "number") {
      if (name.split(".").length === 2) {
        const [prop, val] = name.split(".");
        options[idx][prop][val] = parseFloat(value);
      } else {
        options[idx][name] = parseFloat(value);
      }
    } else if (type === "checkbox") {
      options[idx][name] = checked;
    } else {
      options[idx][name] = value;
    }
    // console.log(options);
    this.updateOptions(options);
  };

  handleUpdatingTagOrder = (idx, tags) => {
    const options = this.state.options.slice();
    options[idx].items = tags;
    this.updateOptions(options);
  };

  handleClickDeleteTag = (idx, tagInfo) => {
    const options = this.state.options.slice();
    const tags = options[idx].items.filter((t) => tagInfo.id !== t.id);
    options[idx].items = tags;
    this.updateOptions(options);
  };

  handleClickAddTag = (idx, tagInfo) => {
    const options = this.state.options.slice();
    if (
      options[idx].items.filter((e) => e.name === tagInfo.tagName).length > 0
    ) {
      return;
    }

    if (
      options[idx].type === "colorpicker" ||
      options[idx].type === "section"
    ) {
      options[idx]["items"].push({ id: tagInfo.tagId, name: tagInfo.tagName });
    } else {
      options[idx]["items"].push({
        id: options[idx].id + "t" + tagInfo.tagId,
        name: tagInfo.tagName,
        price: parseFloat(tagInfo.price),
      });
    }
    this.updateOptions(options);
  };

  handleClickDeleteOption = (panelInfo) => {
    const options = this.state.options.slice();
    options.forEach((option) => {
      if (option.type === "preset") {
        option.optionSelection = option.optionSelection.filter(
          (t) => panelInfo.id !== t.id
        );
      }
    });
    const newOptions = options.filter((t) => panelInfo.id !== t.id);
    this.updateOptions(newOptions);
  };

  handleUpdatingOptionOrder = (layout) => {
    layout.sort((a, b) => {
      return a.y - b.y;
    });
    const layoutOrder = layout.map((l) => l.i);
    const newOptions = this.state.options.slice().sort((a, b) => {
      var A = a["id"],
        B = b["id"];
      return layoutOrder.indexOf(A) - layoutOrder.indexOf(B);
    });
    this.updateOptions(newOptions);
  };

  handleClickDuplicateOption = (panel) => {
    const newPanel = JSON.parse(JSON.stringify(panel));
    if (newPanel.type === "checkbox") {
      newPanel.id = "cb" + this.counter.cb++;
    } else if (newPanel.type === "dropdown") {
      newPanel.id = "dd" + this.counter.dd++;
    } else if (newPanel.type === "colorpicker") {
      newPanel.id = "cp" + this.counter.cp++;
    } else if (newPanel.type === "preset") {
      newPanel.id = "ps" + this.counter.ps++;
    } else if (newPanel.type === "connect") {
      newPanel.id = "cn" + this.counter.cn++;
    } else if (newPanel.type === "section") {
      newPanel.id = "sc" + this.counter.sc++;
      let newModelOrder = [];
      newPanel.modelSection.modelOrder.forEach((modelId) => {
        var newModelId = "md" + this.counter.md++;
        newPanel.modelSection.models[modelId].id = newModelId;
        newPanel.modelSection.models[newModelId] =
          newPanel.modelSection.models[modelId];
        delete newPanel.modelSection.models[modelId];
        newModelOrder.push(newModelId);
      });
      newPanel.modelSection.modelOrder = newModelOrder;
      console.log(newPanel);
    } else if (newPanel.type === "stl") {
      console.log("Can't duplicate this version.");
      return;
    } else {
      console.log("Duplicate is not implement for this type");
    }
    const options = this.state.options.slice();
    options.push(newPanel);
    this.updateOptions(options);
  };

  handleSetPrice = () => {
    for (var i = 0; i < this.state.options.length; i++) {
      var option = this.state.options[i];
      if (option.selected === "" || option.colorId === "") {
        alert(
          "Option " +
            (option.name ? option.name : option.section) +
            " does not have default selected."
        );
        return;
      }
    }

    const newMapping = createMapping(this.state.options);
    if (
      Object.keys(newMapping).length === Object.keys(this.state.mapping).length
    ) {
      var match = true;
      for (const [key] of Object.entries(this.state.mapping)) {
        if (newMapping.hasOwnProperty(key) === false) {
          match = false;
          break;
        }
      }
      if (match) {
        console.log("match");
        return;
      }
    }
    console.log("Generated ", Object.entries(newMapping).length, " mappings.");
    this.setState({ mapping: newMapping });
    this.setState({ height: window.innerHeight / 2 });
  };

  exportJson = (columns) => {
    createJsonFile(this.state, columns);
  };

  importJson = (textArea) => {
    const newState = populateOptions(textArea, this.counter);
    this.setState({ options: newState.options, mapping: newState.mapping });
  };

  changeHeight = (direction) => {
    if (direction === "up") {
      this.setState({ height: 50 });
    } else {
      this.setState({ height: window.innerHeight - 70 });
    }
  };

  updateHeight = (size) => {
    this.setState({ height: size });
  };

  handleAddPresetOption = (idx, modifyId, type, groupName) => {
    const options = this.state.options.slice();
    var newPresetOption = { id: modifyId, type: type };
    if (type === "checkbox") {
      newPresetOption["selected"] = false;
    } else {
      newPresetOption["selected"] = "";
      if (type === "group" || type === "multiSelect") {
        newPresetOption["groupName"] = groupName;
      }
      if (type === "multiSelect") {
        newPresetOption["selected"] = {};
      }
    }

    options[idx]["optionSelection"].push(newPresetOption);
    this.updateOptions(options);
  };

  handleDeletePresetOption = (idx, modifyId) => {
    const options = this.state.options.slice();
    options[idx]["optionSelection"] = options[idx]["optionSelection"].filter(
      (t) => modifyId !== t.id
    );
    this.updateOptions(options);
  };

  handleUpdatePresetOption = (idx, modifyId, type, newValue, modelId) => {
    console.log(idx, modifyId, type, newValue, modelId);
    const options = this.state.options.slice();
    for (let i = 0; i < options[idx]["optionSelection"].length; i++) {
      let currOption = options[idx]["optionSelection"][i];
      if (currOption.id === modifyId && currOption.type === type) {
        if (type === "multiSelect") {
          if (newValue === true) {
            options[idx]["optionSelection"][i].selected[modelId] = true;
          } else {
            delete options[idx]["optionSelection"][i].selected[modelId];
          }
        } else {
          options[idx]["optionSelection"][i].selected = newValue;
        }
        break;
      }
    }
    this.updateOptions(options);
  };

  handleAddConnectOption = (direction, idx, modifyId, type, groupName) => {
    const options = this.state.options.slice();
    var newPresetOption = { id: modifyId, type: type };
    if (type === "checkbox") {
      newPresetOption["selected"] = false;
    } else {
      newPresetOption["selected"] = "";
      if (type === "group" || type === "multiSelect") {
        newPresetOption["groupName"] = groupName;
      }
      if (type === "multiSelect") {
        newPresetOption["selected"] = {};
      }
    }

    options[idx][direction].push(newPresetOption);
    this.updateOptions(options);
  };

  handleDeleteConnectOption = (direction, idx, modifyId) => {
    const options = this.state.options.slice();
    options[idx][direction] = options[idx][direction].filter(
      (t) => modifyId !== t.id
    );
    this.updateOptions(options);
  };

  handleUpdateConnectOption = (
    direction,
    idx,
    modifyId,
    type,
    newValue,
    modelId
  ) => {
    console.log(idx, modifyId, type, newValue, modelId);
    const options = this.state.options.slice();
    for (let i = 0; i < options[idx][direction].length; i++) {
      let currOption = options[idx][direction][i];
      if (currOption.id === modifyId && currOption.type === type) {
        if (type === "multiSelect") {
          if (newValue === true) {
            options[idx][direction][i].selected[modelId] = true;
          } else {
            delete options[idx][direction][i].selected[modelId];
          }
        } else {
          options[idx][direction][i].selected = newValue;
        }
        break;
      }
    }
    this.updateOptions(options);
  };

  reorderModels = (optionIdx, result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.drop &&
      destination.index === source.index
    ) {
      return;
    }
    const options = this.state.options.slice();

    const newModelOrder = Array.from(
      options[optionIdx].modelSection.modelOrder
    );
    newModelOrder.splice(source.index, 1);
    newModelOrder.splice(destination.index, 0, draggableId);
    options[optionIdx].modelSection.modelOrder = newModelOrder;

    this.setState({ options: options });
  };

  handleClickAddModel = (idx, event) => {
    const options = this.state.options.slice();
    var id = "md" + this.counter.md++;
    options[idx].modelSection.models[id] = {
      id: id,
      name: "",
      filename: "",
      show: true,
      price: { Stand: 1.0, Prem: 2.0, UltPrem: 3.0 },
      colorId: "",
      inGroup: false,
      selected: false,
      group: "",
    };
    options[idx].modelSection.modelOrder.push(id);
    this.updateOptions(options);
  };

  handleDeleteModel = (idx, modelId) => {
    const options = this.state.options.slice();
    //delete dict
    delete options[idx].modelSection.models[modelId];
    //remove from order
    const newModelOrder = options[idx].modelSection.modelOrder;
    newModelOrder.splice(newModelOrder.indexOf(modelId), 1);
    options[idx].modelSection.modelOrder = newModelOrder;

    this.updateOptions(options);
  };

  handleUpdatingModel = (idx, modelId, event) => {
    const options = this.state.options.slice();
    const { name, value, type, checked } = event.target;
    if (type === "number") {
      if (name.split(".").length === 2) {
        const [prop, val] = name.split(".");
        options[idx].modelSection.models[modelId][prop][val] =
          parseFloat(value);
      } else {
        options[idx].modelSection.models[modelId][name] = parseFloat(value);
      }
    } else if (type === "checkbox") {
      options[idx].modelSection.models[modelId][name] = checked;
    } else {
      options[idx].modelSection.models[modelId][name] = value;
    }
    // console.log(options[idx].modelSection.models[modelId]);
    this.updateOptions(options);
  };

  handleClickDupModel = (idx, model) => {
    const newModel = JSON.parse(JSON.stringify(model));
    var id = "md" + this.counter.md++;
    newModel.id = id;
    const options = this.state.options.slice();
    options[idx].modelSection.models[id] = newModel;
    options[idx].modelSection.modelOrder.push(id);

    this.updateOptions(options);
  };
  updateCounter(options, counter) {
    options.forEach((option) => {
      if (option.type === "colorpicker") {
        counter.cp = Math.max(
          counter.cp,
          parseInt(option.id.replace("cp", "")) + 1
        );
      } else if (option.type === "dropdown") {
        counter.dd = Math.max(
          counter.dd,
          parseInt(option.id.replace("dd", "")) + 1
        );
      } else if (option.type === "checkbox") {
        counter.cb = Math.max(
          counter.cb,
          parseInt(option.id.replace("cb", "")) + 1
        );
      } else if (option.type === "preset") {
        counter.ps = Math.max(
          counter.ps,
          parseInt(option.id.replace("ps", "")) + 1
        );
      } else if (option.type === "connect") {
        counter.cn = Math.max(
          counter.cn,
          parseInt(option.id.replace("cn", "")) + 1
        );
      } else if (option.type === "section") {
        counter.sc = Math.max(
          counter.sc,
          parseInt(option.id.replace("sc", "")) + 1
        );
        option.modelSection.modelOrder.forEach((modelId) => {
          let model = option.modelSection.models[modelId];
          counter.md = Math.max(
            counter.md,
            parseInt(model.id.replace("md", "")) + 1
          );
        });
      }
    });
    return options;
  }
  mapOptionstoId(options) {
    var mapOption = {};
    options.forEach((option) => {
      mapOption[option.id] = option;
      if (option.type === "section") {
        option.modelSection.modelOrder.forEach((modelId) => {
          var model = option.modelSection.models[modelId];
          mapOption[model.id] = model;
        });
      }
    });
    return mapOption;
  }

  calculatePriceofVariant = (mapping, optionMap) => {
    var prices = [];
    for (const [key, value] of Object.entries(mapping)) {
      var lstOptions = value.id.split("&");
      const sum = lstOptions.reduce((currSum, priceSet) => {
        let [id, set] = priceSet.split("=");
        if (optionMap[id].type === "checkbox") {
          if (set === "true") {
            return currSum + optionMap[id].price;
          }
          return currSum;
        } else if (optionMap[id].type === "dropdown") {
          for (var j = 0; j < optionMap[id].items.length; j++) {
            if (optionMap[id].items[j].id === set) {
              return currSum + optionMap[id].items[j].price;
            }
          }
          return currSum;
        } else if (optionMap[id].type === "section") {
          if (set === "Stand") {
            return currSum;
          }
          return currSum + optionMap[id].costTier[set];
        } else {
          if (set === "false") {
            return currSum;
          } else if (set === "Stand" && optionMap[id].type === "colorpicker") {
            return currSum;
          }
          return currSum + optionMap[id].price[set];
        }
      }, 0);
      prices.push(sum);
    }
    console.log("There are ", prices.length, " price buckets");
    return prices;
  };

  generatePriceBuckets = () => {
    if (Object.entries(this.state.mapping).length === 0) {
      return;
    }
    const optionMap = this.mapOptionstoId(this.state.options);
    const prices = this.calculatePriceofVariant(this.state.mapping, optionMap);

    var meanShift = new MeanShift();
    var results = meanShift.cluster(prices, 0.5);
    return results;
  };

  combineSamePrices = () => {
    if (Object.entries(this.state.mapping).length === 0) {
      return;
    }
    const optionMap = this.mapOptionstoId(this.state.options);
    const prices = this.calculatePriceofVariant(this.state.mapping, optionMap);

    var results = [];
    var groupMap = {};
    var count = 0;
    for (let i = 0; i < prices.length; i++) {
      if (prices[i] in groupMap) {
        results.push(groupMap[prices[i]]);
      } else {
        results.push(count);
        groupMap[prices[i]] = count;
        count++;
      }
    }
    console.log("Grouping achieved.");
    console.log(prices, results);
    return [prices, results];
  };

  render() {
    const height = window.innerHeight - this.state.height - 70;
    const width = window.innerWidth - 505;
    return (
      <Panels>
        <LeftPanel>
          <CreateMenu
            data={this.state}
            handleAdd={this.handleAddingNewOptions}
            handleUpdate={this.handleUpdateingOptions}
            handleUpdatingTagOrder={this.handleUpdatingTagOrder}
            handleClickDeleteTag={this.handleClickDeleteTag}
            handleClickAddTag={this.handleClickAddTag}
            handleClickDeleteOption={this.handleClickDeleteOption}
            handleUpdatingOptionOrder={this.handleUpdatingOptionOrder}
            handleClickDuplicateOption={this.handleClickDuplicateOption}
            handleSetPrice={this.handleSetPrice}
            importJson={this.importJson}
            reorderModels={this.reorderModels}
            handleClickAddModel={this.handleClickAddModel}
            handleDeleteModel={this.handleDeleteModel}
            handleUpdatingModel={this.handleUpdatingModel}
            handleClickDupModel={this.handleClickDupModel}
            handleAddPresetOption={this.handleAddPresetOption}
            handleDeletePresetOption={this.handleDeletePresetOption}
            handleUpdatePresetOption={this.handleUpdatePresetOption}
            handleAddConnectOption={this.handleAddConnectOption}
            handleDeleteConnectOption={this.handleDeleteConnectOption}
            handleUpdateConnectOption={this.handleUpdateConnectOption}
          />
        </LeftPanel>
        <RightPanel>
          <ResizerPanel>
            <SplitPane
              split="horizontal"
              style={{ position: "relative" }}
              paneStyle={{ overflow: "auto", display: "inline", width: width }}
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

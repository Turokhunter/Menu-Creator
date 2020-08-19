import React from 'react';
import {Form, Col, Button, InputGroup} from 'react-bootstrap';
import deleteBtn from '../img/delete.png';
import {DraggableArea} from 'react-draggable-tags';
import {AddAndDelete, DeleteIcon, MyRadioPos, Tag, RadioLabel} from "./style";
import {getColors} from "../getColors";
import colorData from "../../data/filament.json"
import Autosuggest from 'react-autosuggest';

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

class ColorPicker extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      color: '',
      suggestions:[],
      filament: colorData.filament
    }
  }

  updateSelectchoice(option, filament){
    return getColors(option, filament);
  }

  getSuggestions = value => {
    const escapedValue = escapeRegexCharacters(value.trim());
    if (escapedValue === '') {
     return [];
    }

    const regex = new RegExp(escapedValue, 'i');
    return this.state.filament.filter(filament => filament.name.search(regex) !== -1);
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (event, {suggestionValue}) =>{
    const filament = this.state.filament.filter(filament => filament.name === suggestionValue);
    if(filament.length !== 0){
      const items = this.props.option.items;
      const matchItems = items.filter(item => item.name === filament[0].name);
      if(matchItems.length === 0){
        this.props.handleClickAddTag({tagId: filament[0].id, tagName:filament[0].name});
        this.setState({choices : getColors(this.props.option, this.state.filament)});
      }
      this.setState({
        color: ""
      });
    }
  }


  setColor = (event, { newValue, method }) => {
    this.setState({
      color: newValue
    });
  };

  handleClickAddAllColor= () => {
    var tags = [];
    for(var i = 0; i < this.state.filament.length; i++){
      tags.push({id: this.state.filament[i].id, name:this.state.filament[i].name});
    }
    this.props.handleUpdatingTagOrder(tags);
    this.setState({choices : getColors(this.props.option, this.state.filament)});
  }

  handleClickClearAllColor= () => {
    this.props.handleUpdatingTagOrder([]);
    this.setState({choices : getColors(this.props.option, this.state.filament)});
  }


  render(){
    const { color, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Color',
      value:color,
      onChange: this.setColor,
      disabled : this.props.option.colorEnclusion === "all"
    };
    const theme = {
      container: 'autosuggest',
      input: 'form-control',
      suggestionsContainer: 'dropdown',
      suggestionsList: `dropdown-menu ${suggestions.length ? 'show' : ''}`,
      suggestion: 'dropdown-item',
      suggestionHighlighted: 'active'
    };

    const choices = this.updateSelectchoice(this.props.option, this.state.filament);

    return (
      <>
        <Form>
          <Form.Row>
            <Form.Group as={Col} md="8">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Selected:</InputGroup.Text>
                </InputGroup.Prepend>
                  <Form.Control as="select" name ="colorId" onChange={this.props.handleUpdate}>
                    <option  key="-1" value ="-1">{" "}</option>
                    {choices.map((item) =>(
                       <option key={item.id}  value={item.id} >{item.name}</option>
                     ))}
                  </Form.Control>
              </InputGroup>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Color Enclusion:</InputGroup.Text>
                </InputGroup.Prepend>
                <MyRadioPos>
                    <RadioLabel className="radio-inline">
                      <input
                        type="radio"
                        name="colorEnclusion"
                        value="all"
                        checked={this.props.option.colorEnclusion === "all"}
                        onChange={this.props.handleUpdate}
                        className="form-check-input"
                      />
                      All
                    </RadioLabel>
                    <RadioLabel className="radio-inline">
                      <input
                        type="radio"
                        name="colorEnclusion"
                        value="include"
                        className="form-check-input"
                        checked={this.props.option.colorEnclusion === "include"}
                        onChange={this.props.handleUpdate}
                      />
                      Include
                    </RadioLabel>
                    <RadioLabel className="radio-inline">
                      <input
                        type="radio"
                        name="colorEnclusion"
                        value="exclude"
                        className="form-check-input"
                        checked={this.props.option.colorEnclusion === "exclude"}
                        onChange={this.props.handleUpdate}
                      />
                      Exclude
                    </RadioLabel>
                </MyRadioPos>
              </InputGroup>
            </Form.Group>
          </Form.Row>
        </Form>
        <InputGroup>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            onSuggestionSelected ={this.onSuggestionSelected}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            theme={theme}
          />
          <InputGroup.Append>
            <Button onClick={this.handleClickAddAllColor} variant="info" disabled={this.props.option.colorEnclusion === "all"}>Add All</Button>
          </InputGroup.Append>
          <InputGroup.Append>
            <Button onClick={this.handleClickClearAllColor} variant="info" disabled={this.props.option.colorEnclusion === "all"}>Clear All</Button>
          </InputGroup.Append>
        </InputGroup>

        <AddAndDelete>
          <DraggableArea
            tags={this.props.option.items}
            render={({tag, index}) => (
              <Tag>
                <DeleteIcon
                  src={deleteBtn}
                  onClick={() => this.props.handleClickDeleteTag(tag)}
                />
                {tag.name}
              </Tag>
            )}
            onChange={tags => this.props.handleUpdatingTagOrder(tags)}
          />
        </AddAndDelete>
      </>
    )
  };
}

export default ColorPicker;

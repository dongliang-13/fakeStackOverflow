import { Component } from "react"

export default class SearchParam extends Component{
    constructor(props){
        super(props);
        this.keyDown = this.keyDown.bind(this);
    }

    keyDown(e){
        if(e.key === 'Enter' || e.keyCode === 12){
            this.props.changeSearchResult(e.target.value);
        }
    }

    render(){
        return (
            <input 
                id = "banner-input"
                type="text" 
                placeholder="Search . . ." 
                onKeyDown = {this.keyDown}
            />
        )
    }
}
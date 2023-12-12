import { Component } from "react";
import AskQuestionButton from "./askQuestionButton";
import TagForTagsPage from "./tagForTagsPage";

export default class TagsPage extends Component{
    constructor(props){
        super(props);

        this.getMapOfTags = this.getMapOfTags.bind(this);
    }

    getMapOfTags(){
        let map = new Map();
        this.props.data.tag.forEach( (t) => {
            map.set(t._id, {name: t.name, value:0});
        })
        this.props.data.question.forEach((q) => {
            q.tags.forEach((t) => {
                map.set(t, {name: map.get(t).name, value: map.get(t).value+1});
            })
        });
        return map;
    }
    

    render(){
        this.tagMap = this.getMapOfTags();
        this.htmlTag = Array.from(this.tagMap, ([key,value], index) => {
            if(value.value!==0){
                return <TagForTagsPage 
                    tagName={value.name} 
                    tagAmount = {value.value} 
                    key={index} 
                    changePage = {this.props.changePage}
                    changeSearchResult = {this.props.changeSearchResult} />
            }
            return null;
        })
        const isLoggedIn = (this.props.user.userType === 'registered' || this.props.user.userType === 'admin');
        return(
            <div id = "tagsPage">
                <div id="tagsPage-top">
                    <div id = "tagsPage-numTags">
                        {this.props.data.tag.length} Tags
                    </div>
                    <div id = "tagsPage-title">
                        All Tags
                    </div>
                    <div id = "tagsPage-askQuestion">
                        {isLoggedIn ? <AskQuestionButton changePage = {this.props.changePage}/> : null}
                    </div>
                </div>
                <div id="tagsPage-bottom">
                    {this.htmlTag}
                </div>
            </div>
        )
    }
}

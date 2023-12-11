import { Component } from "react";
import Answer from "./answer";
import NewAnswerButton from "./newAnswerButton";
import axios from "axios";

export default class Answers extends Component{
    constructor(props){
        super(props);
        this.state = {
            answers: [],
        };
    }

    componentDidMount() {
        this.getAnswers(this.props.question.answers);
    }

    async getAnswers(answersArr) {
        const answerPromises = answersArr.map(async (ans, index) => {
            const result = await axios.get(`http://127.0.0.1:8000/getAnswer/${ans}`, {withCredentials:true});
            ans = result.data;
            return <Answer
                question={this.props.question}
                answer={ans}
                key={index}
                index={index}
            />;
        });
        const answers = await Promise.all(answerPromises);
        this.setState({ answers });
    }

    render(){
        return (
            <div id = "answers">
                {this.state.answers}
                <NewAnswerButton key = {"newAnswerButton"} changePage = {this.props.changePage} question = {this.props.question}/>
            </div>
        );
    }
}

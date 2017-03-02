import React, {Component} from 'react';

import PageService from '../services/pageService.jsx';
import FormService from '../services/formService.jsx';

import BotCheck from './botCheck.component.jsx';

class SendForm extends Component {

	constructor(props){
		super(props);
		this.submitForm = this.submitForm.bind(this);
	}

	submitForm(e){
		e.preventDefault();
		var data = FormService.getJSON(e.target);
		if(FormService.botCheck(e.target)){
			console.log(data);
			PageService.createPage(data)
			.then(this.props.responseHandler);
		}else{
			this.props.responseHandler("http://localhost:3000/index.html")
		}
	}

	render(){
		var el = null;
		if(this.props.showMe){
			el = (
				<form onSubmit={this.submitForm} className="form pure-form">
					<fieldset className="pure-group">
						<input className="pure-input-1" type="text" placeholder="Page Title" name="title" maxLength="50" required="true"></input>
						<BotCheck/>
						<input className="pure-input-1" type="text" placeholder="Preview Image" name="image" required="true"></input>
						<textarea className="pure-input-1" type="text" placeholder="Custom message (optional)" name="message" maxLength="250" rows="3"></textarea>
						<textarea className="pure-input-1" type="text" placeholder="Page description" name="description" maxLength="150" rows="5" required="true"></textarea>
					</fieldset>
					<button className="pure-button pure-input-1 pure-button-primary" type="submit">Make it!</button>
				</form>
			);	
		}
		return el;
	}

}

export default SendForm;
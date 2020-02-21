import React from 'react';
import ReactDOM from 'react-dom';



  
class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: ''};
	this.vowels = "aeiouAEIOU";
	this.alphabets_small = "abcdefghijklmnopqrstuvwxyz";
	this.alphabets_caps = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	this.encryption = this.encryption.bind(this);
	
	
  }
  
  
  
  check_vowel(inputx){
	  var status = false;
	  var i;
		for (i = 0 ; i<10 ; i++){
			if (inputx == this.vowels[i]){
				status = true;
				break;
			}
		}
	return status;
  }
  
  encryption(input,x,y){
	  
	  var output = "";
	  var i;
	  var z;
	  
	  for (z=0; z < input.length ; z++){
		  if (input[z] != " "){													// Checking for spaces
			  var checkvowel = this.check_vowel(input[z]);						// Checking if current alphabet is a vowel or consonant
			  if (checkvowel == true) {											// Vowel detected hence move by x number of times
				  for (i = 0 ; i<26 ; i++){
					  if (input[z] == this.alphabets_small[i]){
						  if ((i+x) < 26){										// Creating a loop within the available alphabets in the array
							output = output + this.alphabets_small[i + x];
						  }
						  else {
							output = output + this.alphabets_small[(i + x)-26]; 
						  }
					  }
				  }
				  
				  for (i = 0 ; i<26 ; i++){
					  if (input[z] == this.alphabets_caps[i]){
						 if ((i+x) < 26){
							output = output + this.alphabets_caps[i + x];
						  }
						 else {
							output = output + this.alphabets_caps[(i + x)-26]; 
						  }
					  }
				  }
				  
			  }  
			
			  
			  else {															// Consonant deteced hence move by y number of times 
				   for (i = 0 ; i<26 ; i++){
					  if (input[z] == this.alphabets_small[i]){
						  if ((i+y) < 26){										// Creating a loop within the available alphabets in the array
							output = output + this.alphabets_small[i + y];
						  }
						  else {
							output = output + this.alphabets_small[(i + y)-26]; 
						  }
					  }
				  }
				  
				  for (i = 0 ; i<26 ; i++){
					  if (input[z] == this.alphabets_caps[i]){
						 if ((i+y) < 26){
							output = output + this.alphabets_caps[i + y];
						  }
						 else {
							output = output + this.alphabets_caps[(i + y)-26]; 
						  }
					  }
				  }
			  }
		  }
		  
		  else {
			  output = output + " ";
		  }
	  }
		  return output;
	  
  }

  handleChange(event) {
    this.setState({username: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
	
	let randomnum = Math.floor((Math.random() * 88) + 11);
	var random = (""+randomnum).split('').map(Number);
	
	var inputstr = this.state.username;
	var outputstr = "";	
	
	var valid_inputs = /^[A-Za-z\s]+$/;									// Ensure inputs are either letters or spaces 
    if(inputstr.match(valid_inputs)){
		outputstr = this.encryption(inputstr, random[0], random[1]);
		console.log("Valid");
	}	
	
	else {
		console.log ("Invalid");
		outputstr = "Invalid Original Text";
	}
	
	document.getElementById("encrypt").innerHTML = "Encrypted Text: " + outputstr;	
	
	document.getElementById("randomnum").innerHTML = "Random Key Generated: " + randomnum;
	document.getElementById("oritext").innerHTML = "Original Text: " + inputstr;
	
	
  }
  
  

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Original Text:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
		<p id="randomnum"></p>
		<p id="oritext"></p>
		<p id="encrypt"></p>
      </form>
    );
  }
}

ReactDOM.render(<MyForm />, document.getElementById('root'));
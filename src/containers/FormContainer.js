import React, { Component } from 'react';
import TextInput from '../components/TextInput';
import SelectInput from '../components/SelectInput';
import CheckboxOrRadioGroup from '../components/CheckboxOrRadioGroup';
import TextArea from '../components/TextArea';

class FormContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			ownerName: '',
			petSelection: [],
			selectedPets: [],
			ageOptions: [],
			ownerAgeRangeSelection: '',
			siblingOptions: [],
			siblingSelection: [],
			currentPetCount: 0,
			description: ''
		};

		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleClearForm = this.handleClearForm.bind(this);
		this.handleFullNameChange = this.handleFullNameChange.bind(this);
		this.handleCurrentPetCountChange = this.handleCurrentPetCountChange.bind(this);
		this.handleAgeRangeSelect = this.handleAgeRangeSelect.bind(this);
		this.handlePetSelection = this.handlePetSelection.bind(this);
		this.handleSiblingSelection = this.handlePetSelection.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
	}

	componentDidMount() {
		fetch('../fake_db.json')
			.then(res => res.json())
			.then(data => {
				this.setState({
					ownerName: data.ownerName,
					petSelection: data.petSelection,
					selectedPets: data.selectedPets,
					ageOptions: data.ageOptions,
					ownerAgeRangeSelection: data.ownerAgeRangeSelection,
					siblingOptions: data.siblingOptions,
					siblingSelection: data.siblingSelection,
					currentPetCount: data.currentPetCount,
					description: data.description
				});
			});
	}

	handleFullNameChange(e) {
		this.setState({ ownerName: e.target.value });
	}

	handleAgeRangeSelect(e) {
		this.setState({ ownerAgeRangeSelection: e.target.value });
	}

	handlePetSelection(e) {
		const newSelection = e.target.value;
		let newSelectionArray;
	
		if(this.state.selectedPets.indexOf(newSelection) > -1) {
			newSelectionArray = this.state.selectedPets.filter(s => s !== newSelection)
		} else {
			newSelectionArray = [...this.state.SelectedPets, newSelection];
		}
	
		this.setState({ selectedPets: newSelectionArray });
	}

	handleCurrentPetCountChange(e) {
		this.setState({ currentPetCount: e.targetValue });
	}

	handleDescriptionChange(e) {
		this.setState({ description: e.targetValue });
	}

	handleFormSubmit(e) {
		e.preventDefault();

		const formPayload = {
			ownerName: this.setState.ownerName,
			selectedPets: this.setState.selectedPets,
			ownerAgeRangeSelection: this.setState.ownerAgeRangeSelection,
			siblingSelection: this.setState.siblingSelection,
			currentPetCount: this.setState.currentPetCount,
			description: this.setState.description
		};

		console.log('Payload for form request: ' + formPayload);
		this.handleClearForm(e);
	}

	handleClearForm(e) {
		e.preventDefault();
		this.setState({
			ownerName: '',
			selectedPets: [],
			ownerAgeRangeSelection: '',
			siblingSelection: '',
			currentPetCount: '',
			description: ''
		});
	}

	render() {
		return(
			<form className="container" onSubmit={this.handleFormSubmit}>
				<h5>Pet Adoption Form</h5>
				<TextInput 
					inputType={'text'}
					title={'Full name'}
					name={'name'}
					controlFunc={this.handleFullNameChange}
					content={this.state.ownerName} 
					placeholder={'Type first and last name here'} /> // Full name text input
				<SelectInput 
					name={'ageRange'}
					placeholder={'Choose your age range'}
					options={this.state.ageOptions}
					controlFunc={this.handleAgeRangeSelect}
					selectedOption={this.state.ownerAgeRangeSelection} /> // Owner Age range text
				<CheckboxOrRadioGroup
					title={'Which kinds of pets would you like to adopt?'} 
					setName={'pets'} 
					type={'checkbox'}
					controlFunc={this.handlePetSelection}
					options={this.state.petSelection}
					selectedOption={this.state.selectedPets} /> // Pet type checkboxes
				<CheckboxOrRadioGroup
					title={'Are you willing to adopt more than one pet if we have siblings for adoption?'}
					setName={'siblings'}
					controlFunc={this.handleSiblingSelection}
					type={'radio'}
					options={this.state.siblingOptions}
					selectedOption={this.state.siblingSelection} /> // Will you adopt siblings? radios
				<TextInput 
					inputType={'number'}
					title={'How many pets do you currently own?'} 
					name={'currentPetCount'}
					controlFunc={this.handleCurrentPetCountChange}
					content={this.state.currentPetCount}
					placeholder={'Enter number of current pets'}/> // Number of current pets input
				<TextArea 
					title={'If you currently own pets, please write their names, breeds and an outline of their personalities'}
					rows={5}
					resize={true}
					content={this.state.description}
					name={'currentPetInfo'}
					controlFunc={this.handleDescriptionChange}
					placeholder={'Please be through in your descriptions'} />
				<input
					type="submit"
					className="btn btn-primary float-right"
					value="Submit" />
				<button
					className="btn btn-link float-left"
					onClick={this.handleClearForm}>
						Clear form
				</button>
			</form>
		);
	}
} // end FormContainer

export default FormContainer;
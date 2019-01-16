import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
	getAppDescription,
} from './selectors/sampleSelector';
import { addPhraseToFirestore } from './actions/sampleActions';
import { AppState } from './reducers/rootReducer';
import { bindActionCreators, Dispatch, Action } from 'redux';
//@ts-ignore
import { FirestoreCollection } from 'react-firestore';
import moment from 'moment';
import './App.scss';

type Props = {
	description: string,
	addPhraseToFirestore: (phrase: string) => Action,
}

type FirebaseCollectionProps = {
	isLoading: boolean,
	data: any,
}

type Phrase = {
	id: string,
	phrase: string,
	datetime: string,
	es?: string,
	fr?: string,
	ar?: string,
	pa?: string,
	nl?: string,
}

const ReduxComponent = ({ description, addPhraseToFirestore }: Props) => {
	const [inputText, setText] = useState(""); // Demonstration of latest React Hooks

	const handleNameInput = (e: any) => {
		setText(e.target.value);
	};

	const validateInputAndSubmit = () => {
		if (inputText === "") {
			// Ignore submission as no phrase entered
		} else {
			addPhraseToFirestore(inputText);
			setText("");
			window.scrollTo(0, 0);
		}
	}

	const handleKeyPress = (e: any) => {
		if (e.key === 'Enter') {
			validateInputAndSubmit();
		}
	}

	return (
		<div className="container">
			<FirestoreCollection
				path="phrases"
				sort="datetime:desc"
				render={({ isLoading, data }: FirebaseCollectionProps) => {
					return isLoading ? (
						<p>Loading...</p>
					) : (
							<div>
								<div className="header">
									<h1>Realtime Translater Bot!</h1>
									{/* We could have stored description in FireStore for realtime updates
										however this was to demonstrate the usage of Redux! */}
									<p>{description}</p>
									<hr className="line" />
								</div>
								<ul>
									{data.map((phrase: Phrase) => (
										<div className="dialog">
											<p className="bot">Translator bot replied ({moment(phrase.datetime).format('DD MMM YYYY hh:mm')})</p>
											<p className="chat response">
												{phrase.ar && <p><b>In Arabic: </b>{phrase.ar}</p>}
												{phrase.es && <p><b>In Spanish: </b>{phrase.es}</p>}
												{phrase.fr && <p><b>In French: </b>{phrase.fr}</p>}
												{phrase.pa && <p><b>In Punjabi: </b>{phrase.pa}</p>}
												{phrase.nl && <p><b>In Dutch: </b>{phrase.nl}</p>}
											</p>

											<p className="chat response">Translating <em><b>"{phrase.phrase}"</b></em> for you now!</p>
											<p className="sender">You</p>
											<p className="chat phrase">{phrase.phrase}</p>
										</div>

									))}
								</ul>
							</div>
						);
				}}
			/>

			<div className="inputContainer">
				<input
					className="input"
					type="text"
					onKeyPress={handleKeyPress}
					onChange={handleNameInput}
					value={inputText}
					placeholder="Enter phrase and press ENTER to translate!"
				/>
			</div>

		</div>
	)
};

const mapStateToProps = (state: AppState) => ({
	description: getAppDescription(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
	addPhraseToFirestore
}, dispatch);

const ReduxComponentConnect = connect(
	mapStateToProps,
	mapDispatchToProps
)(ReduxComponent);

export default ReduxComponentConnect;
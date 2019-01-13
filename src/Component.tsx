import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
	sampleValueSelector,
	revealSelector
} from './selectors/sampleSelector';
import { sampleCalled, sampleCalledAction } from './actions/sampleActions';
import { AppState } from './reducers/rootReducer';
import { bindActionCreators, Dispatch } from 'redux';

type Props = {
	sampleCalled: (value: boolean) => sampleCalledAction,
	sampleValue: string,
	reveal: boolean
}

const ReduxComponent = ({ sampleCalled, sampleValue, reveal }: Props) => {
	const [count, setCount] = useState(0);
	const [inputText, setText] = useState("Test name");

	// Use instead of componentDidMount 
	useEffect(() => {
		setInterval(() => {
			setText('updated every 5 seconds');
		}, 5000);
	});

	const handleNameInput = (e: any) => {
		setText(e.target.value);
	};

	return (
		<div className="redux-component">

			<p>You clicked {count} times</p>
			<button onClick={() => setCount(count + 1)}>
				Click me
      		</button>

			<input
				type="text"
				onChange={handleNameInput}
				value={inputText}
				placeholder="Your name"
			/>

			<p onClick={e => sampleCalled(true)}>Click me to reveal the secret value</p>
			{reveal && <p>{sampleValue}</p>}
		</div>
	)
};

const mapStateToProps = (state: AppState) => ({
	sampleValue: sampleValueSelector(state),
	reveal: revealSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
	sampleCalled
}, dispatch);

const ReduxComponentConnect = connect(
	mapStateToProps,
	mapDispatchToProps
)(ReduxComponent);

export default ReduxComponentConnect;
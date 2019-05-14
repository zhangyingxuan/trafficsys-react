/**
 * Created by yingxuan.zhang 2019-5-13 10:44:42
 */
import React from 'react';
import img from '../../res/imgs/404.png';


class NotFound extends React.Component {
	state = {
		animated: ''
	};
	enter = () => {
		this.setState({animated: 'hinge'})
	};
	render() {
		return (
			<div className="center" style={{height: '100%', background: '#ececec', overflow: 'hidden'}}>
				role
			</div>
		)
	}
}

export default NotFound;

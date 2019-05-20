import React from 'react';
import {
	Form,
	Input,
	Button,
} from 'antd';

class RegistrationForm extends React.Component {
	state = {
		ready: false,
		confirmDirty: false,
		autoCompleteResult: [],
		fromData: {
			title: '12412'
		}
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				// 保存或修改 菜单

			}
		});
	};

	componentWillReceiveProps(nextProps, nextContext) {
		if(this.state.ready && nextProps.permissionItem && this.props.permissionItem && (nextProps.permissionItem.title !== this.props.permissionItem.title)) {
			this.props.form.setFieldsValue({
				title: nextProps.permissionItem.title,
				url: nextProps.permissionItem.url,
				component: nextProps.permissionItem.component,
				icon: nextProps.permissionItem.icon,
			});
		}
	}

	componentDidMount() {
		this.setState({
			ready: true
		})
	}

	compareToFirstPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('password')) {
			callback('Two passwords that you enter is inconsistent!');
		} else {
			callback();
		}
	};
	render() {
		const { getFieldDecorator, setFieldsValue } = this.props.form;

		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 8 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 16 },
			},
		};
		const tailFormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24,
					offset: 0,
				},
				sm: {
					span: 16,
					offset: 8,
				},
			},
		};

		return (
			<Form {...formItemLayout} onSubmit={this.handleSubmit}>
				<Form.Item label="菜单名称">
					{getFieldDecorator('title', {
						rules: [
							{
								required: true,
								message: '请输入菜单名称！',
							}
						],
					})(<Input />)}
				</Form.Item>
				<Form.Item label="菜单路径">
					{getFieldDecorator('url', {
						rules: [
							{
								required: true,
								message: '请输入菜单路径！',
							}
						],
					})(<Input />)}
				</Form.Item>
				<Form.Item label="组件名">
					{getFieldDecorator('component', {
						rules: [
							{
								required: true,
								message: '请输入组件名!',
							},
						],
					})(<Input />)}
				</Form.Item>
				<Form.Item label="图标">
					{getFieldDecorator('icon', {
						rules: [
						],
					})(<Input />)}
				</Form.Item>
				<Form.Item label="排序">
					{getFieldDecorator('order', {
						rules: [
							{
								required: true,
								message: '请输入菜单（数字）!',
							},
							{
								validator: this.compareToFirstPassword,
							},
						],
					})(<Input />)}
				</Form.Item>

				<Form.Item {...tailFormItemLayout}>
					<Button type="primary" htmlType="submit">
						保存
					</Button>
				</Form.Item>
			</Form>
		);
	}
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

export default WrappedRegistrationForm

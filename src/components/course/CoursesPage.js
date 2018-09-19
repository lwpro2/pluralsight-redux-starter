import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';
import {bindActionCreators} from 'redux';
import CourseList from './courseList';
import {browserHistory} from 'react-router';

class CoursesPage extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			course: {title: ""}
		};

		this.onTitleChange = this.onTitleChange.bind(this);
		this.onClickSave = this.onClickSave.bind(this);
		this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
	}

	onTitleChange(event) {
		const course = this.state.course;
		course.title = event.target.value;
		this.setState({course: course});
	}

	onClickSave() {
		//alert(`Saving ${this.state.course.title}`);
		//this.props.dispatch(courseActions.createCourse(this.state.course));
		this.props.actions.createCourse(this.state.course);
	}

	courseRow(course, index) {
		return (
			<div key={index}>{course.title}</div>
		);
	}

	render(){
		debugger;
		const {courses} = this.props;
		return (
			<div>
				<h1>Courses</h1>
				<input type={"submit"} value={"Add Course"} className={"btn btn-primary"} onClick={this.redirectToAddCoursePage} />

				<CourseList courses={courses}/>
				{/*{this.props.courses.map(this.courseRow)}*/}
				{/*<input type={"text"} onChange={this.onTitleChange} value={this.state.course.title} />*/}
				{/*<input type={"submit"} value={"save"} onClick={this.onClickSave} />*/}
			</div>
		);
	}

	redirectToAddCoursePage() {
		browserHistory.push('/course');
	}
}

CoursesPage.propTypes = {
	//dispatch: PropTypes.func.isRequired,
	courses: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired

};

function mapStateToProps(state, ownProps) {
	debugger;
	return {
		courses: state.courses
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(courseActions, dispatch)
		//createCourse: course => dispatch(courseActions.createCourse(course))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import toastr from 'toastr';

class ManageCoursePage extends React.Component {
	constructor(props, context){
		super(props, context);

		this.state = {
			course: Object.assign({}, this.props.course),
			errors: {},
			saving: false
		};

		this.updateCourseState = this.updateCourseState.bind(this);
		this.saveCourse = this.saveCourse.bind(this);
	}

	componentWillReceiveProps(nextProps){
		if(this.props.course.id != nextProps.course.id){
			this.setState({course: Object.assign({}, nextProps.course)});
		}
	}

	updateCourseState(event) {
		debugger;
		const field = event.target.name;
		let course = Object.assign({}, this.state.course);
		course[field] = event.target.value;
		return this.setState({course});
	}

	saveCourse(event) {
		debugger;
		event.preventDefault();
		this.setState({saving: true});
		this.props.actions.saveCourse(this.state.course)
			.then(() => this.redirect())
			.catch(error => {
				toastr.error(error);
				this.setState({saving: false});
			});

	}
	redirect(){
		this.setState({saving: false});
		toastr.success('Course saved');
		this.context.router.push('/courses');
	}
	render(){
		debugger;
		return (
				<CourseForm
					allAuthors={this.props.authors}
					course={this.state.course}
					errors={this.state.errors}
					onChange={this.updateCourseState}
					onSave={this.saveCourse}
					saving={this.state.saving}
					/>
		);
	}
}

ManageCoursePage.properTypes = {
	course: PropTypes.object.isRequired,
	authors: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
	router: PropTypes.object
};

function getCourseById(courses, courseId) {
	const course = courses.filter(course => course.id == courseId);
	if(course) return course[0];
	return null;
}

function mapStateToProps(state, ownProps) {
	debugger;
	const courseId = ownProps.params.id;
	let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

	if(courseId && state.courses.length > 0 ){
		course = getCourseById(state.courses, courseId);
	}
	const authorsFormattedForDropdown = state.authors.map(author => {
		debugger;
		return {
			value: author.id,
			text: author.firstName + ' ' + author.lastName
		};
	});

	return {
		//state : state
		course: course,
		authors: authorsFormattedForDropdown
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions: bindActionCreators(courseActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);

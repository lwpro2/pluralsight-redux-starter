import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';
import {ajaxCallError, beginAjaxCall} from "./ajaxStatusActions";

export function createCourse(course){
	debugger;
	return {
		type: types.CREATE_COURSE,
		course
	};
}
export function loadCoursesSuccess(courses){
	debugger;
	return {
		type: types.LOAD_COURSES_SUCCESS,
		courses
	};
}

export function loadCourses(){
	return function(dispatch){
		dispatch(beginAjaxCall());
		return courseApi.getAllCourses().then(courses => {
			dispatch(loadCoursesSuccess(courses));
		}).catch(error =>{
			throw (error);
		})
			;
	};
}

export function updateCourseSuccess(course) {
	return {type: types.UPDATE_COURSE_SUCCESS, course};
}

export function createCourseSuccess(course) {
	return {type: types.CREATE_COURSE_SUCCESS, course};
}

export function saveCourse(course) {
	debugger;
	return function (dispatch, getState) {
		dispatch(beginAjaxCall());
		return courseApi.saveCourse(course).then(savedCourse => {
			course.id ? dispatch(updateCourseSuccess(savedCourse)) :
				dispatch(createCourseSuccess(savedCourse));
		}).catch(error => {
			dispatch(ajaxCallError(error));
			throw (error);
		});
	};
}

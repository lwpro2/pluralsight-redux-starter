import React from 'react';
import expect from 'expect';
import {mount, shallow} from 'enzyme';
import {ManageCoursePage} from './ManageCoursePage';
import {saveCourse} from "../../actions/courseActions";

describe('Manage Course Page', () => {
	it('sets error message when trying to save empty title', () =>{
		const props = {
			authors: [],
			course : {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''},
			actions: {saveCourse: () => {return Promise.resolve();}}
		};
		const wrapper = mount(<ManageCoursePage {...props}/>);
		const saveButton = wrapper.find('input').last();
		expect(saveButton.prop('type')).toBe('submit');
		saveButton.simulate('click');
	});
});

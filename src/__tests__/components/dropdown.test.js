import React from 'react';
import { shallow } from 'enzyme';
import DropDown from './../../components/dropdown/DropDown';

describe('Dropdown component', () => {
    it('Will render', () => {
        const component = shallow(
            <DropDown />
        );
        console.log(component)
    })
})
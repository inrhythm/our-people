

import { expect } from 'chai';


import { filter } from 'our-people/questions/github';
import validGithubHandle from '../../../helpers/github-handle.js';

describe('github question', () => {



    describe('filter', () => {


        function filterOutput () {

            return filter(validGithubHandle);

        }


        it('should create create a valid link with a valid github handle', () =>

            expect(filterOutput()).to.be.a('string'));


    });


});
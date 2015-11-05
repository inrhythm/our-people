

import webApi from './our-people/web-api';
import createStorage from '../test/helpers/storage';

webApi(createStorage()).listen(3001);
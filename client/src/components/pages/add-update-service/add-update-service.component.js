import React from 'react';

import Banner from '../../banner/banner.component';
import IconButton from '../../icon-button/icon-button.component';
import AddUpdateServicForm from '../../add-update-service-form/add-update-service-form.component';

import { getPreviousURL } from '../../../utils/url-utils';

import './add-update-service.styles.scss';

const AddUpdateServicePage = ({ history, match }) => {
  return (
    <div className='add-servcie-history'>
      <IconButton
        option='icon-back-btn-in-add-service'
        onClick={() => history.push(getPreviousURL(match.url))}
      />
      <Banner>Please Enter Service Information</Banner>
      <AddUpdateServicForm history={history} match={match} />
    </div>
  );
};

export default AddUpdateServicePage;

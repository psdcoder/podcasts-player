import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCheck, faExclamation } from '@fortawesome/fontawesome-pro-solid';
import { faTimes } from '@fortawesome/fontawesome-pro-light';
import Button from '../../../button';

import './styles.pcss';

export default function NotificationMessage({
  actionCallback,
  actionText,
  children,
  onClose,
  type,
}) {
  return (
    <div
      className={cn(
        'notification-message',
        type && `notification-message_type_${type}`,
      )}
    >
      {type && (
        <div className={cn('notification-message__icon-container', `notification-message__icon-container_type_${type}`)}>
          {type === 'success' && <FontAwesomeIcon className="notification-message__icon" icon={faCheck} />}
          {type === 'error' && <FontAwesomeIcon className="notification-message__icon" icon={faExclamation} />}
        </div>
      )}
      <div className="notification-message__text">{children}</div>
      {actionText && (
        <Button
          className="notification-message__action-button"
          onClick={() => {
            actionCallback();
            onClose();
          }}
          theme="text"
        >
          {actionText}
        </Button>
      )}
      <button className="notification-message__close-button" onClick={onClose}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
}

NotificationMessage.propTypes = {
  actionCallback: PropTypes.func,
  actionText: PropTypes.string,
  children: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf([
    'error',
    'success',
  ]),
};
NotificationMessage.defaultProps = {
  actionCallback: () => {},
  actionText: undefined,
  type: undefined,
};

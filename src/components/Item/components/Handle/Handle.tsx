import React, {forwardRef} from 'react';

import {Action, ActionProps} from '../Action';
import { DragIndicator} from '@mui/icons-material';

export const Handle = forwardRef<HTMLButtonElement, ActionProps>(
  (props, ref) => {
    return (
      <Action
        ref={ref}
        cursor="grab"
        data-cypress="draggable-handle"
        {...props}
        disableRipple
      >
        <DragIndicator />
      </Action>
    );
  }
);

Handle.displayName = "Handle"
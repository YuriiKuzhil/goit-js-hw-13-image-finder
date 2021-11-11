import { error, Stack } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

const showAlert = message => {
  error({
    title: 'Waring!',
    text: message,
    delay: 2000,
    stack: new Stack({
      dir1: 'down',
      dir2: 'left',
      firstpos1: 30,
      firstpos2: 30,
      spacing1: 36,
      spacing2: 36,
    }),
  });
};
export default showAlert;

import { Router } from 'express';
import newTextController from './new_text/new_text.controller';
import updateTextController from './update_text/update_text.controller';
import hintController from './hint/hint.controller';
import validationController from './validation/validation.controller';

const monoalphabetic = Router().use(newTextController).use(updateTextController).use(hintController).use(validationController);

export default Router().use('/monoalphabetic', monoalphabetic);
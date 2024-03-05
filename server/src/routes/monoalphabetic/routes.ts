import { Router } from 'express';
import newTextController from './new_text/new_text.controller';
import updateTextController from './update_text/update_text.controller';
import revealTextController from './reveal_text/reveal_text.controller';
import hintController from './hint/hint.controller';
import validationController from './validation/validation.controller';
import scheduleDeletionOfExpiredSessions from './scheduled_jobs/delete_expired_sessions';

const monoalphabetic = Router().use(newTextController).use(updateTextController).use(revealTextController).use(hintController).use(validationController);
scheduleDeletionOfExpiredSessions();

export default Router().use('/monoalphabetic', monoalphabetic);
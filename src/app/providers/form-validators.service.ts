import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationConstants } from '../utils/validation-constants';
import { ApplicationConstant } from '../utils/application-constants';
import { RegularExpressions } from '../utils/regular-expressions';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorsService {

  constructor() { }

  public static validateName(form: FormControl) {
    let invalidMessage = null;
    const value = form.value;
    if (!value) {
      invalidMessage = ValidationConstants.EMPTY_NAME;
    } else if (!RegularExpressions.NAME_REGEXP.test(value)) {
      invalidMessage = ValidationConstants.INVALID_NAME;
    }
    return invalidMessage ? { validateName: { error: invalidMessage } } : null;
  }
  public static validateEmail(form: FormControl) {
    let invalidMessage = null;
    const value = form.value;
    if (!value) {
      invalidMessage = ValidationConstants.EMPTY_EMAIL;
    } else if (!RegularExpressions.EMAIL_REGEXP.test(value)) {
      invalidMessage = ValidationConstants.INVALID_EMAIL;
    }
    return invalidMessage ? { validateEmail: { error: invalidMessage } } : null;
  }
  public static validatePhone(form: FormControl) {
    let invalidMessage = null;
    const value = form.value;
    if (!value) {
      invalidMessage = ValidationConstants.EMPTY_CONTACT_NUMBER;
    } else if (!RegularExpressions.PHONE_REGEXP.test(value)) {
      invalidMessage = ValidationConstants.INVALID_CONTACT_NUMBER;
    }
    return invalidMessage ? { validatePhone: { error: invalidMessage } } : null;
  }
}

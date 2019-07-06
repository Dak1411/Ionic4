export class RegularExpressions {
    public static NAME_REGEXP = /^[a-z ]+((.|')?[ a-z])+$/i;
    public static PHONE_REGEXP = /^[\+]?[1]?[-\s\.]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    public static EMAIL_REGEXP = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
}

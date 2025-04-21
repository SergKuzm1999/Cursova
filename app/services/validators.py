

def validate_login_data(data):
    errors = {}
    if not data.get('email'):
        errors['email'] = 'Це поле не може бути пустим!'
    elif '@' not in data.get('email'):
        errors['email'] = 'Некоректний формат електронної пошти!'

    if not data.get('password'):
        errors['password'] = 'Це поле не може бути пустим!'
    elif len(data.get('password')) < 6:
        errors['password'] = 'Пароль має містити щонайменше 6 символів!'

    return errors

def validate_register_data(data):
    errors = {}
    if not data.get('email'):
        errors['email'] = 'Це поле не може бути пустим!'
    elif '@' not in data.get('email'):
        errors['email'] = 'Некоректний формат електронної пошти!'

    if not data.get('password'):
        errors['password'] = 'Це поле не може бути пустим!'
    elif len(data.get('password')) < 6:
        errors['password'] = 'Пароль має містити щонайменше 6 символів!'

    return errors
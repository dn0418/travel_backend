import { ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';
import { expectedMimeTypes } from 'src/config/mime-type-config';
interface IsFileOptions {
    mime: expectedMimeTypes[];
}

export function IsFile(options: IsFileOptions, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        return registerDecorator({
            name: 'isFile',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    if (value?.mimetype && (options?.mime ?? []).includes(value?.mimetype)) {
                        return true;
                    }
                    return false;
                },
            }
        });
    }
}
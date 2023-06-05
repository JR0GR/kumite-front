import { ControlValueAccessor } from '@angular/forms';

export class AbstractFormComponent<T> implements ControlValueAccessor {
    value!: T;
    isDisabled!: boolean;
    onChange: (value: T) => void = (_: T) => { };
    onTouch: () => void = () => { };
    writeValue(obj: T): void {
        this.value = obj;
    }
    registerOnChange(fn: (value: T) => void): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: () => void): void {
        this.onTouch = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }
}

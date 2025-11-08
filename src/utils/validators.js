export const phoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;
export const nidRegex = /^(\d{10}|\d{13}|\d{17})$/;
export const isValidPhone = (value) => phoneRegex.test(value.trim());
export const isValidNid = (value) => nidRegex.test(value.trim());
export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const containsSensitiveContact = (value) => {
    const trimmed = value.trim();
    return phoneRegex.test(trimmed) || emailRegex.test(trimmed);
};
export const maskPhone = (value) => {
    if (!phoneRegex.test(value)) {
        return value;
    }
    return value.replace(/(\d{3})\d{4}(\d{4})/, '$1••••$2');
};

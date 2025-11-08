import * as yup from 'yup';
import { nidRegex, phoneRegex } from './validators';
const locationFields = {
    division: yup.string().required('validation.division'),
    district: yup.string().required('validation.district'),
    upazila: yup.string().required('validation.upazila')
};
export const providerSchema = yup.object({
    nameBn: yup.string().required('validation.required'),
    nameEn: yup.string().required('validation.required'),
    phone: yup
        .string()
        .matches(phoneRegex, 'validation.phone')
        .required('validation.required'),
    area: yup.string().required('validation.required'),
    skills: yup.array().of(yup.string().required()).min(1, 'validation.skills'),
    wallet: yup
        .string()
        .matches(phoneRegex, 'validation.wallet')
        .required('validation.required'),
    email: yup.string().email('validation.email').optional(),
    nid: yup.string().matches(nidRegex, 'validation.nid').optional(),
    ...locationFields
});
export const clientSchema = yup.object({
    name: yup.string().required('validation.required'),
    orgType: yup.string().required('validation.required'),
    phone: yup
        .string()
        .matches(phoneRegex, 'validation.phone')
        .required('validation.required'),
    area: yup.string().required('validation.required'),
    ...locationFields
});
export const gigSchema = yup.object({
    skill: yup.string().required('validation.required'),
    title: yup.string().max(80).required('validation.required'),
    description: yup.string().max(1500).required('validation.required'),
    price: yup.number().typeError('validation.required').min(100).required('validation.required')
});
export const requestSchema = yup.object({
    details: yup.string().required('validation.required'),
    priceRange: yup.number().typeError('validation.required').min(100).optional()
});
export const walletSchema = yup.object({
    amount: yup.number().typeError('validation.required').min(100).required('validation.required'),
    method: yup.string().required('validation.required'),
    msisdn: yup
        .string()
        .matches(phoneRegex, 'validation.wallet')
        .required('validation.required')
});

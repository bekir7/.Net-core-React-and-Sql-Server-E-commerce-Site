import * as yup from 'yup';

export const validationSchema=[

yup.object({
    aliciname:yup.string().required(),
    adres1:yup.string().required(),
    adres2:yup.string().required(),
    il:yup.string().required(),
    ilce:yup.string().required(),
    ulke:yup.string().required(),
}),
yup.object(),
yup.object({
 nameOnCard:yup.string().required()   
}),


]
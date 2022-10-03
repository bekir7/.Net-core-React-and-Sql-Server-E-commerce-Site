import * as yup from 'yup';

export const validationSchema=yup.object({
    urunName: yup.string().max(100).required(),
    urunColor: yup.string(),
    urunDurum: yup.string().required(),
    urunMarka: yup.string(),
    type: yup.string().required(),
    urunFiyat: yup.number().required().moreThan(100),
    stok: yup.number().required().min(0),
    urunDescription: yup.string().max(500).required(),
    file: yup.mixed().when('urunImageUrl', {
        is: (value: string) => !value,
        then: yup.mixed().required('Lütfen bir resim girin')
    })
})
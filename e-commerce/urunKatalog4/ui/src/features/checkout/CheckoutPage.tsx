import { Box, Button, Paper, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import AdresForm from "./AdresForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import {yupResolver} from '@hookform/resolvers/yup'
import { validationSchema } from "./checkoutValidation";
import agent from "../../app/api/agent";
import { useAppDispatch } from "../../app/store/configureStore";
import { clearSepet } from "../sepet/sepetSlice";
import { LoadingButton } from "@mui/lab";
import 'bootstrap/dist/css/bootstrap.min.css';
const steps = ['Shipping address', 'Review your order', 'Payment details'];


export default function CheckoutPage() {
   const [activeStep, setActiveStep] = useState(0);
   const [orderNumber,setOrderNumber]= useState(0);
   const [loading,setLoading]=useState(false);
   const dispatch=useAppDispatch();
   const currentValidationSchema=validationSchema[activeStep];
  
   const methods=useForm({
    mode:'all',
    resolver:yupResolver(currentValidationSchema)
  });

 useEffect(()=>{
    agent.Account.fetchAdres()
    .then(response=>{
        if(response){
            methods.reset({ ...methods.getValues(), ...response, saveAdres:false})
        }
    })
 },[methods])


  function getStepContent(step: number) {
    switch (step) {
        case 0:
            return <AdresForm/>;
        case 1:
            return <Review/>;
        case 2:
            return <PaymentForm/>;
        default:
            throw new Error('Unknown step');
    }
}


   //next sayfa
    const handleNext = async (data:FieldValues) => {
      const {nameOnCard,saveAdres,...shippingAdres}=data;
        if(activeStep===steps.length-1){
        setLoading(true);
        try {
            const orderNumber=await agent.Order.create({saveAdres,shippingAdres});
            setOrderNumber(orderNumber);
            setActiveStep(activeStep+1);
            dispatch(clearSepet());
            setLoading(false);
        } catch (error:any) {
            console.log(error);
            setLoading(false);
        }
      }else{
        setActiveStep(activeStep + 1);

      }
    };
//geri sayfa
    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
<FormProvider {...methods}>
<Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
            <Typography component="h1" variant="h4" align="center">
                Siparişi Tamamla
            </Typography>
            <Stepper activeStep={activeStep} sx={{pt: 3, pb: 5}}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <>
                {activeStep === steps.length ? (
                    <>
                        <Typography variant="h5" gutterBottom>
                            Siparişin için Teşekkür Ederiz
                        </Typography>
                        <Typography variant="subtitle1">
                            Sipariş numaranız #{orderNumber}.
                        </Typography>
                    </>
                ) : (
                  <form onSubmit={methods.handleSubmit(handleNext)}>
                    
                        {getStepContent(activeStep)}
                        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                            {activeStep !== 0 && (
                                <Button onClick={handleBack} sx={{mt: 3, ml: 1}}>
                                    Geri
                                </Button>
                            )}
                            <LoadingButton
                               loading={loading}
                               disabled={!methods.formState.isValid}
                               variant="contained"
                               type='submit'
                               sx={{mt: 3, ml: 1}}
                            >
                                {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                            </LoadingButton>
                        </Box>
                   </form>
                )}
            </>
        </Paper>
</FormProvider>
        
    );
}

export default function Vaildation(values){
    let errors={}

    const email_pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-z0-9]{8,}$/;

    if(values?.name){
    if(values.name===""){
        errors.name="Name Should Not empty"
    }else if(values.name.length<3 || values.name.length>30){
        errors.name="Name must be less than 30"
    }
    else{
        errors.name=""
    }
    }
    
    if(values.email===""){
        errors.email="Email Should Not empty"
    // }else if(!email_pattern.test(values.email)){
    //     errors.email="Invalid Email"
    }
    else{
        errors.email=""
    }

    if(values.password===""){
        errors.name="Email Should Not empty"
    // }else if(!password_pattern.test(values.password)){
    //     errors.password="1Small and Capital char a Capital 1 Number to 8"
    }
    else{
        errors.password=""
    }


    return errors;

}
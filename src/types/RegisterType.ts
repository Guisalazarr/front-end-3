import ErrandsType from './ErrandsType';


type RegisterType = {
  name: string;
  email: string;
  password: string;
  errands: ErrandsType[];
};

export default RegisterType;

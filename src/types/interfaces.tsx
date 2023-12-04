export interface DataForm {
  name: string;
  age: string;
  email: string;
  password: string;
}

export interface DataUserOnpage extends DataForm {
  title: string;
}

export interface DataUncontrolledForm {
  userDataUncontrolledForm: {
    dataUser: DataForm;
  };
}

export interface DataReactHookForm {
  userDataReactHookForm: {
    dataUser: DataForm;
  };
}

interface ICat {
  name: string;
  age: number;
  breed: string;
  //   id: string;
  //   name: string;
}

interface ICatsResponse {
  message: string;
  data: ICat;
}

export { ICat, ICatsResponse };

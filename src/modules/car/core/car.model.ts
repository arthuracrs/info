export class Car {
  carId: string;
  placa: string;
  chassi: string;
  renavam: string;
  modelo: string;
  marca: string;
  ano: string;

  constructor(data: any) {
    this.ano = data.ano;
    this.carId = data.carId;
    this.chassi = data.chassi;
    this.marca = data.marca;
    this.modelo = data.modelo;
    this.placa = data.placa;
    this.renavam = data.renavam;
  }
}

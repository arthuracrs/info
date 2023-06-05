export class CarFromDbDto {
  carId: number;
  placa: string;
  chassi: string;
  renavam: string;
  modelo: string;
  marca: string;
  ano: number;

  constructor(data: any) {
    this.ano = data?.ano;
    this.carId = data?.carId;
    this.chassi = data?.chassi;
    this.marca = data?.marca;
    this.modelo = data?.modelo;
    this.placa = data?.placa;
    this.renavam = data?.renavam;
  }
}

import { Vendor } from './vendor';
export class Product {
  id: number;
  vendor: Vendor;
  partNumber: string;
  name: string;
  price: number;
  unit: string;
  photoPath: string;

  constructor(
    id: number = 0,
    vendor: Vendor = new Vendor(),
    partNumber: string = '',
    name: string = '',
    price: number = 0,
    unit: string = '',
    photoPath: string = ''
  ) {
    this.id = id;
    this.vendor = vendor;
    this.partNumber = partNumber;
    this.name = name;
    this.price = price;
    this.unit = unit;
    this.photoPath = photoPath;
  }
}
